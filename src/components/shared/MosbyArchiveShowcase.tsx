import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectData } from '../../types/portfolio';
import { ResilientImage } from './ResilientImage';
import {
  ArrowUpRight,
  ChevronRight,
  Edit3,
  RotateCcw,
  Check,
  Move,
  ArrowDown,
  ArrowUp,
  Layers,
  Columns,
  FolderOpen,
} from 'lucide-react';

interface MosbyArchiveShowcaseProps {
  projects: (ProjectData & { primaryNarrative: string; focusQuestion: string })[];
  mode: 'system' | 'life';
  isZh: boolean;
  onOpenProject: (slug: string) => void;
}

interface CustomDossierEdits {
  title?: string;
  oneLine?: string;
  narrative?: string;
  problem?: string;
  fieldNote?: string;
}

const STORAGE_KEY = 'jiajia_mosby_files_edits_v2';

interface FolderTheme {
  fileNumber: string;
  fileCode: string;
  tabLabelZh: string;
  tabLabelEn: string;
  shortTitleZh: string;
  shortTitleEn: string;
  folderBg: string;
  folderDarkerBg: string;
  folderBorder: string;
  tabTextColor: string;
  tabOffsetClass: string;
  stampZh: string;
  stampEn: string;
  blueprintCode: string;
  defaultNoteZh: string;
  defaultNoteEn: string;
}

const FOLDER_THEMES: Record<string, FolderTheme> = {
  'ai-music-record-store': {
    fileNumber: '01',
    fileCode: 'FILE NO. 01 // AUDIO-ARCHIVE',
    tabLabelZh: '01 · 独立黑胶唱片店',
    tabLabelEn: '01 · AI RECORD STORE',
    shortTitleZh: '独立黑胶唱片店',
    shortTitleEn: 'AI Music Record Store',
    folderBg: '#EAE2D1', // Warm Manila Cardstock
    folderDarkerBg: '#DDD2BC',
    folderBorder: '#C2B59B',
    tabTextColor: '#181614',
    tabOffsetClass: 'ml-0 sm:ml-4',
    stampZh: 'ARCHIVE // 声音与黑胶卷宗',
    stampEn: 'ARCHIVE // ANALOG & AI SOUND',
    blueprintCode: 'FIG 1.1 — SEMANTIC MOOD EMBEDDING & SLEEVE ENGINE',
    defaultNoteZh:
      '【可点击右上角“编辑本卷描述”修改】每一座我生活过的城市，记忆里都有一家小小的独立唱片行。我想写一个懂得尊重唱片封面、内页文字（Liner Notes）与曲间留白的推荐算法。',
    defaultNoteEn:
      '[Click "EDIT FILE" to customize] Every city I have lived in is anchored by small independent record stores. I wanted an algorithm that respects the sleeve, the liner notes, and the silence between tracks.',
  },
  'finger-touch-piano': {
    fileNumber: '02',
    fileCode: 'FILE NO. 02 // KINEMATIC-SYNTH',
    tabLabelZh: '02 · 指尖桌面视觉钢琴',
    tabLabelEn: '02 · FINGER TOUCH PIANO',
    shortTitleZh: '指尖桌面视觉钢琴',
    shortTitleEn: 'Finger Touch Piano',
    folderBg: '#DFB464', // Vintage Ochre / Mustard Folder
    folderDarkerBg: '#CCA04E',
    folderBorder: '#B58938',
    tabTextColor: '#181614',
    tabOffsetClass: 'ml-8 sm:ml-56',
    stampZh: 'ARCHIVE // 视觉与空间乐器',
    stampEn: 'ARCHIVE // SPATIAL INSTRUMENT',
    blueprintCode: 'FIG 2.4 — 21-POINT HAND KINEMATICS & VELOCITY FILTER',
    defaultNoteZh:
      '【可点击右上角“编辑本卷描述”修改】深夜写完代码时，狭小的书桌放不下一台真正的 88 键钢琴。我突然想：如果木头桌面本身就能通过摄像头听懂指尖落下的力度与和弦呢？',
    defaultNoteEn:
      '[Click "EDIT FILE" to customize] Late nights at a small desk without room for an 88-key keyboard made me wonder: what if the wooden tabletop itself could remember music?',
  },
  'medication-companion': {
    fileNumber: '03',
    fileCode: 'FILE NO. 03 // CARE-COMPANION',
    tabLabelZh: '03 · 智能用药与健康陪伴系统',
    tabLabelEn: '03 · MEDICATION COMPANION',
    shortTitleZh: '智能用药与健康陪伴系统',
    shortTitleEn: 'Medication Companion',
    folderBg: '#CD7054', // Terracotta / Burnt Sienna Folder
    folderDarkerBg: '#B85C40',
    folderBorder: '#9E492F',
    tabTextColor: '#FAF6EE',
    tabOffsetClass: 'ml-16 sm:ml-[420px]',
    stampZh: 'ARCHIVE // 无障碍语音陪伴',
    stampEn: 'ARCHIVE // HUMANE HEALTHCARE',
    blueprintCode: 'FIG 3.2 — DETERMINISTIC JSON SCHEMA VOICE LOGGING',
    defaultNoteZh:
      '【可点击右上角“编辑本卷描述”修改】陪伴长辈时看到他们面对细小药盒标签与复杂医院 App 的无措。我希望技术像餐桌旁耐心的倾听者，说一句话就能安心记下今日用药。',
    defaultNoteEn:
      '[Click "EDIT FILE" to customize] Inspired by watching elderly relatives struggle with tiny pill labels and cold clinical forms. Technology should listen like a patient friend at the kitchen table.',
  },
};

export const MosbyArchiveShowcase: React.FC<MosbyArchiveShowcaseProps> = ({
  projects,
  isZh,
  onOpenProject,
}) => {
  const orderedSlugs = [
    'ai-music-record-store',
    'finger-touch-piano',
    'medication-companion',
  ];

  const sortedProjects = [...projects].sort(
    (a, b) => orderedSlugs.indexOf(a.slug) - orderedSlugs.indexOf(b.slug)
  );

  // Supports both:
  // 1) 'scroll-stack' (Default): Mosby's Files signature scroll-driven overlapping folder stack + bottom "NEXT FILE" pull-up lip + stacked back-folder peek
  // 2) 'interactive-flip': Single-folder pull-over animation when clicking tabs, bottom "NEXT DOSSIER" lip, or stacked back-folder headers
  const [browseMode, setBrowseMode] = useState<'scroll-stack' | 'interactive-flip'>('scroll-stack');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editsBySlug, setEditsBySlug] = useState<Record<string, CustomDossierEdits>>({});

  const folderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cabinetTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setEditsBySlug(JSON.parse(saved));
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  // Track which folder is active during scroll in 'scroll-stack' mode
  useEffect(() => {
    if (browseMode !== 'scroll-stack') return;

    const handleScroll = () => {
      let currentIdx = 0;
      folderRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.42) {
          currentIdx = idx;
        }
      });
      setActiveIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [browseMode]);

  const saveEdit = (slug: string, field: keyof CustomDossierEdits, value: string) => {
    setEditsBySlug((prev) => {
      const next = {
        ...prev,
        [slug]: {
          ...(prev[slug] || {}),
          [field]: value,
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetCurrentFolder = (slug: string) => {
    setEditsBySlug((prev) => {
      const next = { ...prev };
      delete next[slug];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const goToFolder = (targetIdx: number) => {
    const clamped = (targetIdx + sortedProjects.length) % sortedProjects.length;
    setFlipDirection(clamped >= activeIndex ? 1 : -1);
    setActiveIndex(clamped);

    if (browseMode === 'scroll-stack') {
      const targetEl = folderRefs.current[clamped];
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (cabinetTopRef.current) {
      cabinetTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  if (sortedProjects.length === 0) return null;

  const renderFolderSpread = (
    proj: ProjectData & { primaryNarrative: string; focusQuestion: string },
    idx: number,
    isFlipMode: boolean
  ) => {
    const theme = FOLDER_THEMES[proj.slug] || FOLDER_THEMES['ai-music-record-store'];
    const currentEdits = editsBySlug[proj.slug] || {};
    const isEditing = editingSlug === proj.slug;

    const displayedTitle = currentEdits.title ?? proj.title;
    const displayedOneLine = currentEdits.oneLine ?? proj.oneLine;
    const displayedNarrative = currentEdits.narrative ?? proj.primaryNarrative;
    const displayedProblem = currentEdits.problem ?? proj.problem;
    const displayedFieldNote =
      currentEdits.fieldNote ?? (isZh ? theme.defaultNoteZh : theme.defaultNoteEn);

    const nextIdx = (idx + 1) % sortedProjects.length;
    const prevIdx = (idx - 1 + sortedProjects.length) % sortedProjects.length;
    const nextProj = sortedProjects[nextIdx];
    const prevProj = sortedProjects[prevIdx];
    const nextTheme = FOLDER_THEMES[nextProj.slug] || FOLDER_THEMES['ai-music-record-store'];
    const prevTheme = FOLDER_THEMES[prevProj.slug] || FOLDER_THEMES['ai-music-record-store'];

    return (
      <div className="relative w-full">
        {/* =================================================================
            IN INTERACTIVE FLIP MODE:
            Render all folder tabs + stacked background folder edges peeking out
            behind the active folder so clicking any background folder edge or tab
            physically pulls that folder to the front!
           ================================================================= */}
        {isFlipMode ? (
          <div className="relative z-20 flex flex-wrap items-end gap-1.5 sm:gap-2.5 px-1 sm:px-3">
            {sortedProjects.map((tabProj, tabIdx) => {
              const tabTheme =
                FOLDER_THEMES[tabProj.slug] || FOLDER_THEMES['ai-music-record-store'];
              const isTabActive = tabIdx === idx;
              return (
                <button
                  key={tabProj.slug}
                  type="button"
                  onClick={() => goToFolder(tabIdx)}
                  style={{
                    backgroundColor: isTabActive ? tabTheme.folderBg : tabTheme.folderDarkerBg,
                    borderColor: tabTheme.folderBorder,
                    color: tabTheme.tabTextColor,
                  }}
                  className={`cursor-pointer relative rounded-t-xl border-t-2 border-x-2 px-4 sm:px-7 transition-all duration-200 flex items-center gap-2.5 ${
                    isTabActive
                      ? 'pt-3 pb-3.5 translate-y-[2px] z-30 shadow-[0_-8px_20px_rgba(0,0,0,0.4)] font-bold'
                      : 'pt-2 pb-2.5 opacity-80 hover:opacity-100 hover:-translate-y-1 z-10'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-inner shrink-0"
                    style={{ backgroundColor: isTabActive ? '#9E2A2B' : '#161514' }}
                  />
                  <span className="font-mosby-display text-xs sm:text-base tracking-wider uppercase whitespace-nowrap">
                    {isZh ? tabTheme.tabLabelZh : tabTheme.tabLabelEn}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          /* IN SCROLL-STACK MODE:
             Each physical folder has its own staggered die-cut tab at the top,
             so as Folder 02 and Folder 03 scroll up over Folder 01, all three tabs
             stay visible in a staggered horizontal cascade! */
          <div className="relative z-20 flex items-end">
            <button
              type="button"
              onClick={() => goToFolder(idx)}
              style={{
                backgroundColor: theme.folderBg,
                borderColor: theme.folderBorder,
                color: theme.tabTextColor,
              }}
              className={`cursor-pointer relative ${theme.tabOffsetClass} rounded-t-xl border-t-2 border-x-2 px-5 sm:px-8 pt-2.5 pb-3 shadow-[0_-8px_20px_rgba(0,0,0,0.42)] flex items-center gap-3 translate-y-[2px] group`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-inner shrink-0"
                style={{ backgroundColor: activeIndex === idx ? '#9E2A2B' : '#161514' }}
              />
              <span className="font-mosby-display text-sm sm:text-base font-bold tracking-wider uppercase whitespace-nowrap">
                {isZh ? theme.tabLabelZh : theme.tabLabelEn}
              </span>
              <span className="hidden md:inline font-mosby-typewriter text-[10px] opacity-80">
                [{theme.fileCode.split('//')[0].trim()}]
              </span>
            </button>
          </div>
        )}

        {/* Main Physical Folder Body */}
        <div
          style={{
            backgroundColor: theme.folderBg,
            borderColor: theme.folderBorder,
          }}
          className="relative z-10 rounded-b-md rounded-tr-md rounded-tl-md border-2 p-4 sm:p-8 md:p-10 shadow-[0_-18px_48px_rgba(0,0,0,0.58),0_24px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="mosby-paper-grain pointer-events-none absolute inset-0 rounded-md" />

          {/* Center Bi-Fold Crease Line */}
          <div
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute top-0 bottom-0 left-[54%] w-px bg-black/15 shadow-[1px_0_4px_rgba(0,0,0,0.12)]"
          />

          {/* Top Folder Toolbar: Prev / Next Folder Spine Switchers + Inline Edit Toggle */}
          <div
            style={{ color: theme.tabTextColor }}
            className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-black/15 font-mosby-typewriter text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="font-mosby-display text-lg font-bold tracking-wider">
                FILE {theme.fileNumber} / 0{sortedProjects.length}
              </span>
              <span className="opacity-60">·</span>
              <span className="text-[11px] opacity-85">{theme.fileCode}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Previous Folder Quick Flip */}
              <button
                type="button"
                onClick={() => goToFolder(prevIdx)}
                className="px-2.5 py-1 bg-[#181614]/10 hover:bg-[#181614] hover:text-[#FAF6EC] border border-black/20 transition-colors text-[11px] inline-flex items-center gap-1"
              >
                <ArrowUp className="w-3 h-3" />
                <span>
                  {isZh
                    ? `上一卷: ${prevTheme.shortTitleZh}`
                    : `PREV: ${prevTheme.fileNumber}`}
                </span>
              </button>

              {/* Next Folder Quick Flip */}
              <button
                type="button"
                onClick={() => goToFolder(nextIdx)}
                className="px-2.5 py-1 bg-[#181614]/10 hover:bg-[#181614] hover:text-[#FAF6EC] border border-black/20 transition-colors text-[11px] inline-flex items-center gap-1"
              >
                <span>
                  {isZh
                    ? `下一卷: ${nextTheme.shortTitleZh}`
                    : `NEXT: ${nextTheme.fileNumber}`}
                </span>
                <ArrowDown className="w-3 h-3" />
              </button>

              {Object.keys(currentEdits).length > 0 && (
                <button
                  type="button"
                  onClick={() => resetCurrentFolder(proj.slug)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#181614]/10 hover:bg-[#181614] hover:text-[#FAF6EC] border border-black/20 transition-colors text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isZh ? '重置' : 'RESET'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setEditingSlug(isEditing ? null : proj.slug)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 font-mosby-typewriter text-[11px] border transition-colors ${
                  isEditing
                    ? 'bg-[#9E2A2B] text-[#FAF6EC] border-[#9E2A2B]'
                    : 'bg-[#FAF6EC] text-[#181614] border-[#181614]/40 hover:bg-[#181614] hover:text-[#FAF6EC]'
                }`}
              >
                {isEditing ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>{isZh ? '完成编辑' : 'DONE'}</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3 h-3" />
                    <span>{isZh ? '编辑本卷描述' : 'EDIT FILE'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Open Two-Leaf Folder Interior */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT LEAF: Typewritten Archival Dossier Sheet */}
            <div className="lg:col-span-7 bg-[#FAF6EC] text-[#181614] border border-[#C7BDA6] shadow-[0_10px_28px_rgba(0,0,0,0.18)] p-6 sm:p-9 relative">
              {/* Two Punched Archival Binder Holes at Top */}
              <div
                aria-hidden="true"
                className="flex items-center justify-center gap-16 mb-6 pb-4 border-b border-[#181614]/15"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#161514]/85 border-2 border-[#B5A88E] shadow-inner" />
                <span className="font-mosby-typewriter text-[10px] tracking-[0.25em] text-[#6E6556] uppercase">
                  JIAJIA&apos;S ARCHIVE // {theme.fileCode}
                </span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#161514]/85 border-2 border-[#B5A88E] shadow-inner" />
              </div>

              {/* Punched Classification Header Table */}
              <div className="border-y-2 border-[#181614] py-2.5 px-3 bg-[#F1EADA] grid grid-cols-3 gap-2 font-mosby-typewriter text-[11px] text-[#181614]">
                <div>
                  <span className="text-[9px] text-[#6E6556] block">INDEX NO.</span>
                  <span className="font-bold">{proj.code}</span>
                </div>
                <div className="border-x border-[#181614]/20 px-3">
                  <span className="text-[9px] text-[#6E6556] block">DISCIPLINE</span>
                  <span className="font-bold">{proj.crossDomainLabel}</span>
                </div>
                <div className="pl-2 flex items-center justify-end">
                  <span className="border-2 border-[#9E2A2B] text-[#9E2A2B] px-2 py-0.5 font-mosby-display text-[10px] font-bold tracking-widest uppercase -rotate-2">
                    {isZh ? theme.stampZh : theme.stampEn}
                  </span>
                </div>
              </div>

              {/* Project Title */}
              <div className="mt-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={displayedTitle}
                    onChange={(e) => saveEdit(proj.slug, 'title', e.target.value)}
                    className="w-full bg-white border-2 border-[#9E2A2B] px-3 py-2 font-mosby-serif text-2xl sm:text-3xl font-bold text-[#181614] focus:outline-none"
                  />
                ) : (
                  <h3 className="font-mosby-serif text-3xl sm:text-4xl font-bold text-[#181614] tracking-tight leading-tight">
                    {displayedTitle}
                  </h3>
                )}
              </div>

              {/* I. Executive Abstract */}
              <div className="mt-6 space-y-2">
                <div className="font-mosby-typewriter text-[11px] font-bold tracking-widest text-[#6E6556] uppercase">
                  I. 卷宗摘要 // EXECUTIVE ABSTRACT
                </div>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={displayedOneLine}
                    onChange={(e) => saveEdit(proj.slug, 'oneLine', e.target.value)}
                    className="w-full bg-white border-2 border-[#9E2A2B] p-3 font-mosby-typewriter text-xs sm:text-sm text-[#181614] leading-relaxed focus:outline-none"
                  />
                ) : (
                  <p className="font-mosby-typewriter text-xs sm:text-sm text-[#181614] leading-relaxed border-l-2 border-[#181614] pl-3.5">
                    {displayedOneLine}
                  </p>
                )}
              </div>

              {/* II & III. Problem & Build/Personal Story */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-dashed border-[#181614]/25">
                <div className="space-y-1.5">
                  <div className="font-mosby-typewriter text-[11px] font-bold tracking-wider text-[#6E6556] uppercase">
                    II. {isZh ? '现实痛点 // PROBLEM' : 'II. PROBLEM'}
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={4}
                      value={displayedProblem}
                      onChange={(e) => saveEdit(proj.slug, 'problem', e.target.value)}
                      className="w-full bg-white border-2 border-[#9E2A2B] p-2.5 font-mosby-typewriter text-xs text-[#181614] focus:outline-none"
                    />
                  ) : (
                    <p className="font-mosby-typewriter text-xs text-[#2B2723] leading-relaxed">
                      {displayedProblem}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="font-mosby-typewriter text-[11px] font-bold tracking-wider text-[#6E6556] uppercase">
                    III. {proj.focusQuestion}
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={4}
                      value={displayedNarrative}
                      onChange={(e) => saveEdit(proj.slug, 'narrative', e.target.value)}
                      className="w-full bg-white border-2 border-[#9E2A2B] p-2.5 font-mosby-typewriter text-xs text-[#181614] focus:outline-none"
                    />
                  ) : (
                    <p className="font-mosby-typewriter text-xs text-[#2B2723] leading-relaxed">
                      {displayedNarrative}
                    </p>
                  )}
                </div>
              </div>

              {/* IV. Technical Spec Strip */}
              <div className="mt-6 pt-4 border-t-2 border-[#181614] flex flex-wrap items-center justify-between gap-4 font-mosby-typewriter text-[11px]">
                <div>
                  <span className="font-bold text-[#181614]">TECH SPEC: </span>
                  <span className="text-[#4A443B]">{proj.stack.join(' / ')}</span>
                </div>
                <span className="text-[#6E6556]">REPO: STANDALONE</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#181614]/15 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenProject(proj.slug)}
                  className="px-4 py-2.5 bg-[#181614] text-[#FAF6EC] font-mosby-display text-xs tracking-[0.15em] uppercase hover:bg-[#9E2A2B] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>
                    {isZh ? '阅读完整 10 节档案 / READ FULL DOSSIER' : 'READ FULL DOSSIER'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {proj.liveUrl && proj.liveUrl.startsWith('http') && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#FAF6EC] border-2 border-[#181614] text-[#181614] font-mosby-display text-xs tracking-[0.15em] uppercase hover:bg-[#181614] hover:text-[#FAF6EC] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>LIVE DEMO</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 border border-[#181614]/40 text-[#181614] font-mosby-typewriter text-xs hover:border-[#181614] transition-colors inline-flex items-center gap-1"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* RIGHT LEAF: Draggable Desk Clippings (Photo Plate + Blueprint + Yellow Margin Note) */}
            <div className="lg:col-span-5 space-y-6 relative">
              {/* DRAGGABLE ARTIFACT 1: Taped Photographic Evidence Plate */}
              <motion.div
                drag
                dragConstraints={{ left: -35, right: 35, top: -25, bottom: 40 }}
                whileDrag={{ scale: 1.04, zIndex: 40, rotate: 0 }}
                initial={{ rotate: 1.4 }}
                className="cursor-grab active:cursor-grabbing bg-[#FAF6EC] text-[#181614] p-3.5 pb-4 border border-[#BFB59E] shadow-[0_12px_30px_rgba(0,0,0,0.28)] relative"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#F5E6B8]/75 border border-[#D8C896]/60 rotate-[-2deg] shadow-2xs"
                />

                <div className="flex items-center justify-between font-mosby-typewriter text-[10px] text-[#6E6556] mb-2">
                  <span>PLATE 0{idx + 1} // PHOTOGRAPHIC EVIDENCE</span>
                  <span className="inline-flex items-center gap-1 text-[#9E2A2B]">
                    <Move className="w-3 h-3" />
                    {isZh ? '可拖拽' : 'DRAG'}
                  </span>
                </div>

                <div className="overflow-hidden border border-[#181614]/20 bg-[#181614]">
                  <ResilientImage
                    src={proj.cover}
                    alt={proj.title}
                    className="w-full aspect-video pointer-events-none"
                  />
                </div>

                <div className="mt-2.5 flex items-baseline justify-between font-mosby-typewriter text-[11px] text-[#181614]">
                  <span className="font-bold truncate">{displayedTitle}</span>
                  <button
                    type="button"
                    onClick={() => onOpenProject(proj.slug)}
                    className="text-[#9E2A2B] underline underline-offset-2 shrink-0 ml-2"
                  >
                    {isZh ? '展开详情 ↗' : 'INSPECT ↗'}
                  </button>
                </div>
              </motion.div>

              {/* DRAGGABLE ARTIFACT 2: Cyanotype Blueprint Schematic */}
              <motion.div
                drag
                dragConstraints={{ left: -35, right: 35, top: -35, bottom: 35 }}
                whileDrag={{ scale: 1.04, zIndex: 40, rotate: 0 }}
                initial={{ rotate: -1.1 }}
                className="cursor-grab active:cursor-grabbing bg-[#1E3F5A] text-[#E6F0FA] mosby-blueprint-grid border-2 border-[#8AB4D8]/50 p-4 shadow-[0_12px_25px_rgba(0,0,0,0.25)] space-y-2.5"
              >
                <div className="flex items-center justify-between font-mosby-typewriter text-[10px] tracking-widest text-[#A3C9EA] border-b border-white/20 pb-1.5">
                  <span>{theme.blueprintCode}</span>
                  <span>SCALE 1:1</span>
                </div>

                <ul className="space-y-1.5 font-mosby-typewriter text-xs text-[#F0F7FF]">
                  {proj.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#F2C14E] font-bold">0{i + 1}.</span>
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* DRAGGABLE ARTIFACT 3: Pinned Yellow Margin Note (Inline Editable) */}
              <motion.div
                drag={!isEditing}
                dragConstraints={{ left: -35, right: 35, top: -35, bottom: 35 }}
                whileDrag={{ scale: 1.04, zIndex: 40, rotate: 0 }}
                initial={{ rotate: 1.6 }}
                className={`${
                  isEditing ? '' : 'cursor-grab active:cursor-grabbing'
                } bg-[#F7E8A4] text-[#1F1C16] border border-[#D4C16A] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.22)] relative space-y-2`}
              >
                <div
                  aria-hidden="true"
                  className="w-3.5 h-3.5 rounded-full bg-[#B8332A] border border-black/30 shadow-sm mx-auto -mt-3 mb-1"
                />

                <div className="flex items-center justify-between font-mosby-typewriter text-[10px] tracking-widest text-[#6B5E26] uppercase border-b border-[#1F1C16]/15 pb-1">
                  <span>JIAJIA&apos;S MARGIN NOTE // 嘉嘉手记便签</span>
                  <button
                    type="button"
                    onClick={() => setEditingSlug(isEditing ? null : proj.slug)}
                    className="underline font-bold text-[#9E2A2B]"
                  >
                    {isEditing ? (isZh ? '完成' : 'DONE') : isZh ? '点击编辑' : 'EDIT'}
                  </button>
                </div>

                {isEditing ? (
                  <textarea
                    rows={4}
                    value={displayedFieldNote}
                    onChange={(e) => saveEdit(proj.slug, 'fieldNote', e.target.value)}
                    className="w-full bg-[#FFFDF2] border-2 border-[#9E2A2B] p-2.5 font-mosby-typewriter text-xs text-[#181614] leading-relaxed focus:outline-none"
                  />
                ) : (
                  <p className="font-mosby-typewriter text-xs text-[#1F1C16] leading-relaxed">
                    {displayedFieldNote}
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* =================================================================
              MOSBY'S FILES SIGNATURE BOTTOM "NEXT DOSSIER" PULL-UP LIP
              At the bottom of every open file, the next colored folder peeks out
              so clicking or scrolling pulls the next dossier directly over this one.
             ================================================================= */}
          <div className="relative z-10 mt-10 pt-6 border-t-2 border-black/20">
            <button
              type="button"
              onClick={() => goToFolder(nextIdx)}
              style={{
                backgroundColor: nextTheme.folderBg,
                borderColor: nextTheme.folderBorder,
                color: nextTheme.tabTextColor,
              }}
              className="group w-full rounded-t-xl border-t-2 border-x-2 p-4 sm:px-8 sm:py-5 shadow-[0_-10px_25px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1.5 flex flex-wrap items-center justify-between gap-4 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 bg-[#161514] text-[#FAF6EC] font-mosby-display text-xs tracking-widest uppercase">
                  NEXT FILE // 0{nextIdx + 1}
                </span>
                <div>
                  <div className="font-mosby-typewriter text-[10px] tracking-widest uppercase opacity-75">
                    {isZh
                      ? '点击或向下滚动翻开下一份档案 · PULL NEXT DOSSIER OVER'
                      : 'CLICK OR SCROLL DOWN TO PULL NEXT DOSSIER OVER'}
                  </div>
                  <div className="font-mosby-serif text-xl sm:text-2xl font-bold tracking-tight">
                    {isZh ? nextTheme.tabLabelZh : nextTheme.tabLabelEn} —{' '}
                    {nextProj.oneLine.slice(0, 42)}...
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 font-mosby-display text-xs sm:text-sm tracking-widest uppercase border-b-2 border-current pb-0.5 group-hover:translate-x-1 transition-transform">
                <span>{isZh ? '翻开下一卷档案' : 'TURN TO NEXT FILE'}</span>
                <ArrowDown className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={cabinetTopRef}
      className="relative w-full rounded-sm bg-[#161514] text-[#EAE2D1] p-4 sm:p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-[#2E2B27] select-none"
    >
      {/* Subtle Dark Desk Texture Overlay */}
      <div className="mosby-paper-grain pointer-events-none absolute inset-0 z-0" />

      {/* =====================================================================
          1. ARCHIVAL CABINET MASTHEAD ("嘉嘉の文件们") + STICKY QUICK-SWITCH RAIL
         ===================================================================== */}
      <div className="relative z-30 border-b-2 border-[#EAE2D1]/20 pb-8 mb-8">
        {/* Top Control Strip: Collection ID + Page-Turn Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mosby-typewriter text-[11px] tracking-[0.2em] text-[#A89F8E] uppercase mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#CD7054]" />
            <span>COLLECTION NO. 2026-VC // 嘉嘉の文件们 ARCHIVE</span>
          </div>

          {/* Toggle between Scroll-Stacked Folder Cascade vs Interactive Single-Folder Flip */}
          <div className="flex items-center gap-2 bg-[#22201D] p-1 border border-[#EAE2D1]/20">
            <button
              type="button"
              onClick={() => setBrowseMode('scroll-stack')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mosby-typewriter transition-colors ${
                browseMode === 'scroll-stack'
                  ? 'bg-[#EAE2D1] text-[#161514] font-bold'
                  : 'text-[#A89F8E] hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{isZh ? '滚动叠层翻页 (Mosby 原版)' : 'SCROLL STACK'}</span>
            </button>
            <button
              type="button"
              onClick={() => setBrowseMode('interactive-flip')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mosby-typewriter transition-colors ${
                browseMode === 'interactive-flip'
                  ? 'bg-[#EAE2D1] text-[#161514] font-bold'
                  : 'text-[#A89F8E] hover:text-white'
              }`}
            >
              <Columns className="w-3 h-3" />
              <span>{isZh ? '单卷抽拉翻页 (Flip View)' : 'SINGLE FLIP'}</span>
            </button>
          </div>
        </div>

        {/* Giant Editorial Masthead ("嘉嘉の文件们") */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <div className="font-mosby-display text-xs sm:text-sm tracking-[0.35em] text-[#DFB464] uppercase mb-2">
              JIAJIA&apos;S FILES · VIBE CODING DOSSIERS
            </div>
            <h2 className="font-mosby-serif text-5xl sm:text-7xl md:text-[82px] font-bold tracking-tight leading-[0.98] text-[#F4EFE4]">
              嘉嘉の文件们
            </h2>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-[#EAE2D1]/20 lg:pl-6 space-y-2">
            <p className="font-mosby-typewriter text-xs text-[#C7BFAEE6] leading-relaxed">
              {isZh
                ? '复刻 Mosby’s Files 的多维翻阅逻辑：① 向下滚动时，新档案夹会携顶部错位模切标签从底部向上滑出并覆盖在旧档案夹之上；② 每份卷宗底部均露出下一份彩色档案夹边缘（NEXT FILE），点击即可直接向上抽拉翻页；③ 顶栏索引条与卷宗内页「上一卷 / 下一卷」全程联动。'
                : "Replicating Mosby's Files multi-way folder transitions: scroll-driven overlapping folder cards, bottom next-file pull-up lip, and synchronized index tabs."}
            </p>
          </div>
        </div>

        {/* Synchronized Quick-Jump Folder Spine Bar */}
        <div className="mt-8 pt-4 border-t border-[#EAE2D1]/15 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mosby-typewriter text-[11px] text-[#A89F8E] uppercase tracking-widest inline-flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-[#DFB464]" />
            <span>
              {isZh
                ? '档案柜快速调阅 // CLICK ANY TAB, SCROLL DOWN, OR PULL BOTTOM FOLDER LIP:'
                : 'CLICK ANY TAB, SCROLL DOWN, OR PULL BOTTOM FOLDER LIP:'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {sortedProjects.map((proj, idx) => {
              const t = FOLDER_THEMES[proj.slug] || FOLDER_THEMES['ai-music-record-store'];
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={proj.slug}
                  type="button"
                  onClick={() => goToFolder(idx)}
                  style={{
                    backgroundColor: isCurrent ? t.folderBg : '#24221F',
                    color: isCurrent ? t.tabTextColor : '#EAE2D1',
                    borderColor: isCurrent ? t.folderBorder : 'rgba(234,226,209,0.2)',
                  }}
                  className="px-3.5 py-1.5 border font-mosby-display text-xs tracking-wider uppercase transition-all flex items-center gap-2"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: t.folderBg }}
                  />
                  <span>{isZh ? t.tabLabelZh : t.tabLabelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          2A. MODE 1: MOSBY'S FILES SCROLL-DRIVEN OVERLAPPING FOLDER STACK
              Each folder uses sticky positioning with staggered top offsets so
              scrolling down physically slides Folder 02 and Folder 03 up over
              Folder 01 while keeping all staggered top folder tabs visible!
         ===================================================================== */}
      {browseMode === 'scroll-stack' ? (
        <div className="relative z-20 space-y-24 pb-8">
          {sortedProjects.map((proj, idx) => {
            // Stagger sticky top offset so earlier folder tabs remain visible & clickable!
            const stickyTopPx = 64 + idx * 18;
            return (
              <motion.div
                key={proj.slug}
                ref={(el) => {
                  folderRefs.current[idx] = el;
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  top: `${stickyTopPx}px`,
                  zIndex: 10 + idx * 10,
                }}
                className="sticky transition-transform duration-300"
              >
                {renderFolderSpread(proj, idx, false)}
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* ===================================================================
           2B. MODE 2: INTERACTIVE PHYSICAL FOLDER PULL-OVER FLIP
               Clicking any tab, side spine, or bottom "NEXT FILE" lip triggers
               a directional folder pull-up/pull-down physics animation.
           =================================================================== */
        <div className="relative z-20">
          <AnimatePresence mode="wait" custom={flipDirection}>
            <motion.div
              key={sortedProjects[activeIndex].slug}
              custom={flipDirection}
              initial={{
                opacity: 0,
                y: flipDirection > 0 ? 80 : -80,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: flipDirection > 0 ? -60 : 60,
                scale: 0.96,
              }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {renderFolderSpread(sortedProjects[activeIndex], activeIndex, true)}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
