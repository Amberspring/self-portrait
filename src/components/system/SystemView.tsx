import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getProfile,
  getEducation,
  getExperiences,
  getSystemProjects,
  getCompetitions,
  getFeaturedWorks,
  getMediaHighlights,
  getAIThinkingWriting,
} from '../../content/selectors';
import { useLanguage } from '../../context/LanguageContext';
import { VisualWorkData, MediaWorkData } from '../../types/portfolio';
import { ResilientImage } from '../shared/ResilientImage';
import { MosbyArchiveShowcase } from '../shared/MosbyArchiveShowcase';
import { ArrowUpRight, Menu, X, ChevronRight } from 'lucide-react';

interface SystemViewProps {
  onSwitchToLife: () => void;
  onReturnToOpening: () => void;
  onOpenProject: (slug: string) => void;
  onOpenWriting: (slug: string) => void;
}

export const SystemView: React.FC<SystemViewProps> = ({
  onSwitchToLife,
  onReturnToOpening,
  onOpenProject,
  onOpenWriting,
}) => {
  const { lang, setLang } = useLanguage();
  const isZh = lang === 'zh';

  const profile = getProfile(lang);
  const education = getEducation(lang);
  const experiences = getExperiences(lang);
  const projects = getSystemProjects(lang);
  const competitions = getCompetitions(lang);
  const visualWorks = getFeaturedWorks(lang);
  const mediaWorks = getMediaHighlights(lang);
  const aiWriting = getAIThinkingWriting(lang);

  const SYSTEM_SECTIONS = isZh
    ? [
        { id: 'sys-education', num: '01', label: 'EDUCATION / 教育经历' },
        { id: 'sys-experience', num: '02', label: 'EXPERIENCE / 实习经历' },
        { id: 'sys-projects', num: '03', label: 'PROJECTS / 项目经历' },
        { id: 'sys-competitions', num: '04', label: 'COMPETITIONS / 比赛经历' },
        { id: 'sys-visual', num: '05', label: 'VISUAL / 视觉与报告' },
        { id: 'sys-media', num: '06', label: 'MEDIA / 新媒体与社群' },
        { id: 'sys-ai', num: '07', label: 'AI + COMPUTING / 计算与思考' },
        { id: 'sys-contact', num: '08', label: 'CONTACT / 联系方式' },
      ]
    : [
        { id: 'sys-education', num: '01', label: 'EDUCATION' },
        { id: 'sys-experience', num: '02', label: 'EXPERIENCE' },
        { id: 'sys-projects', num: '03', label: 'PROJECTS' },
        { id: 'sys-competitions', num: '04', label: 'COMPETITIONS' },
        { id: 'sys-visual', num: '05', label: 'VISUAL COMMUNICATION' },
        { id: 'sys-media', num: '06', label: 'MEDIA' },
        { id: 'sys-ai', num: '07', label: 'AI + COMPUTING' },
        { id: 'sys-contact', num: '08', label: 'CONTACT' },
      ];

  const [activeSection, setActiveSection] = useState<string>('sys-education');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<VisualWorkData | null>(null);
  const [selectedMediaCase, setSelectedMediaCase] = useState<MediaWorkData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 260;
      for (let i = SYSTEM_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SYSTEM_SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SYSTEM_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [SYSTEM_SECTIONS]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#111111] font-sans-system selection:bg-[#111111] selection:text-[#F5F5F2]">
      {/* Top Bar Contract: 3 Zones (Wordmark | Navigation Links | Language & Mode Actions) */}
      <header className="sticky top-0 z-30 bg-[#F5F5F2]/90 backdrop-blur-md border-b border-black/10 px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={onReturnToOpening}
          className="font-sans-system text-sm font-semibold tracking-tight text-[#111111] hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          {isZh ? '杨蕊嘉 FLORA YEUNG' : 'FLORA YEUNG'}
        </button>

        {/* Zone 2: Clean navigation links on desktop */}
        <nav className="hidden lg:flex items-center gap-6 font-mono-system text-xs text-[#747474]">
          <button
            type="button"
            onClick={() => scrollToSection('sys-education')}
            className="hover:text-[#111111] transition-colors whitespace-nowrap"
          >
            {isZh ? '教育经历' : 'Education'}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('sys-experience')}
            className="hover:text-[#111111] transition-colors whitespace-nowrap"
          >
            {isZh ? '实习经历' : 'Experience'}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('sys-projects')}
            className="hover:text-[#111111] transition-colors whitespace-nowrap"
          >
            {isZh ? '项目经历' : 'Projects'}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('sys-competitions')}
            className="hover:text-[#111111] transition-colors whitespace-nowrap"
          >
            {isZh ? '比赛获奖' : 'Competitions'}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('sys-ai')}
            className="hover:text-[#111111] transition-colors whitespace-nowrap"
          >
            {isZh ? 'AI + 计算' : 'AI + Computing'}
          </button>
        </nav>

        {/* Zone 3: Language Switcher & Mode Switch Action */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 font-mono-system text-xs">
            <button
              type="button"
              onClick={() => setLang('zh')}
              className={`px-1.5 py-0.5 transition-colors whitespace-nowrap ${
                isZh
                  ? 'text-[#111111] font-semibold underline underline-offset-4'
                  : 'text-[#747474] hover:text-[#111111]'
              }`}
            >
              中
            </button>
            <span className="text-[#747474]/50">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 transition-colors whitespace-nowrap ${
                !isZh
                  ? 'text-[#111111] font-semibold underline underline-offset-4'
                  : 'text-[#747474] hover:text-[#111111]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={onSwitchToLife}
            className="font-mono-system text-xs text-[#111111] hover:opacity-70 transition-opacity inline-flex items-center gap-1 whitespace-nowrap"
          >
            <span>LIFE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle section index"
            className="lg:hidden p-1.5 text-[#111111] hover:bg-black/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Compact Index Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-[57px] z-20 bg-[#F5F5F2] border-b border-black/15 px-6 py-6 shadow-sm"
          >
            <div className="font-mono-system text-[11px] text-[#747474] mb-4 tracking-widest">
              SYSTEM INDEX
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SYSTEM_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left font-mono-system text-xs py-1.5 transition-colors ${
                    activeSection === sec.id ? 'text-[#111111] font-medium' : 'text-[#747474]'
                  }`}
                >
                  {sec.num} {sec.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout Grid: Fixed Left Index + Right Editorial Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Desktop Fixed Left Index */}
        <aside className="hidden lg:block lg:col-span-3 pt-16">
          <div className="sticky top-28 space-y-8">
            <div className="space-y-1">
              <div className="font-mono-system text-[11px] tracking-widest text-[#747474]">
                MODE 01 / SYSTEM
              </div>
              <div className="text-xs text-[#747474]">
                {isZh ? '以结构化、理性的方式读我。' : 'A structured way to read me.'}
              </div>
            </div>

            <nav aria-label="System Archive Index" className="space-y-2.5">
              {SYSTEM_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left font-mono-system text-xs tracking-wider flex items-center gap-3 py-1 transition-opacity duration-200 ${
                      isActive
                        ? 'text-[#111111] opacity-100 font-medium'
                        : 'text-[#747474] opacity-45 hover:opacity-80'
                    }`}
                  >
                    <span>{sec.num}</span>
                    <span className="truncate">{sec.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-8 border-t border-black/10 space-y-2">
              <button
                type="button"
                onClick={onSwitchToLife}
                className="font-mono-system text-xs text-[#747474] hover:text-[#111111] transition-colors flex items-center gap-1"
              >
                <span>{isZh ? '切换至 LIFE 个人空间' : 'SWITCH TO LIFE MODE'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={onReturnToOpening}
                className="font-mono-system text-[11px] text-[#747474]/70 hover:text-[#111111] transition-colors block"
              >
                ← {isZh ? '返回初始问答' : 'OPENING QUESTION'}
              </button>
            </div>
          </div>
        </aside>

        {/* Right Primary Content Column */}
        <main className="lg:col-span-9 pb-32">
          {/* SYSTEM HERO */}
          <section className="min-h-[78vh] flex flex-col justify-between pt-16 pb-20 border-b border-black/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="font-mono-system text-xs tracking-widest text-[#747474] flex flex-wrap items-center gap-2">
                <span>{profile.name}</span>
                <span>·</span>
                <span>{profile.englishName}</span>
                <span>·</span>
                <span>{profile.institutionTag}</span>
              </div>

              {isZh ? (
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl lg:text-[60px] font-semibold tracking-tight leading-[1.12] text-[#111111] max-w-3xl">
                    围绕数据、智能与交互，
                    <br />
                    构建真实可用的系统。
                  </h1>
                  <p className="font-mono-system text-sm text-[#747474]">
                    I build systems around data, intelligence and interaction.
                  </p>
                </div>
              ) : (
                <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-semibold tracking-tight leading-[1.06] text-[#111111] max-w-3xl">
                  I build systems around
                  <br />
                  data, intelligence
                  <br />
                  and interaction.
                </h1>
              )}

              <div className="pt-4 space-y-2">
                <div className="font-mono-system text-xs sm:text-sm tracking-wider text-[#111111] font-medium">
                  {profile.systemTrajectory}
                </div>
                <div className="font-mono-system text-xs text-[#747474]">
                  {profile.location} · {profile.email}
                </div>
              </div>

              {/* Technical Stack Overview Strip */}
              <div className="pt-6 border-t border-black/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div>
                  <span className="font-mono-system text-[10px] tracking-widest text-[#747474] block mb-1">
                    {isZh ? '编程与数据工程 / STACK' : 'PROGRAMMING & DATA'}
                  </span>
                  <p className="text-[#111111]/85 leading-relaxed">
                    {profile.skillsSummary.programming}
                  </p>
                </div>
                <div>
                  <span className="font-mono-system text-[10px] tracking-widest text-[#747474] block mb-1">
                    {isZh ? '机器学习与量化 / AI & QUANT' : 'ML, NLP & ECONOMETRICS'}
                  </span>
                  <p className="text-[#111111]/85 leading-relaxed">
                    {profile.skillsSummary.mlAndNlp}
                  </p>
                </div>
                <div>
                  <span className="font-mono-system text-[10px] tracking-widest text-[#747474] block mb-1">
                    {isZh ? '语言能力 / LANGUAGES' : 'LANGUAGES'}
                  </span>
                  <p className="text-[#111111]/85 leading-relaxed">
                    {profile.skillsSummary.languages}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="pt-14 flex items-center justify-between">
              <button
                type="button"
                onClick={() => scrollToSection('sys-education')}
                className="font-mono-system text-xs tracking-widest text-[#747474] hover:text-[#111111] transition-colors"
              >
                {isZh ? '向下滚动阅读 ↓ / SCROLL TO READ' : 'SCROLL TO READ ↓'}
              </button>

              <div className="font-mono-system text-xs text-[#747474] hidden sm:block">
                HUMAN × MACHINE
              </div>
            </div>
          </section>

          {/* 01 / EDUCATION */}
          <section id="sys-education" className="py-24 border-b border-black/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-baseline justify-between mb-12">
                <h2 className="font-mono-system text-xs tracking-[0.2em] text-[#747474]">
                  {isZh ? '01 / EDUCATION · 教育经历' : '01 / EDUCATION'}
                </h2>
                <span className="font-mono-system text-xs text-[#747474]">
                  YEAR | INSTITUTION | SELECTED COURSEWORK
                </span>
              </div>

              <div className="divide-y divide-black/10">
                {education.entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
                  >
                    <div className="md:col-span-3 space-y-2">
                      <div className="font-mono-system text-sm font-medium text-[#111111]">
                        {entry.year}
                      </div>
                      <div className="font-mono-system text-xs text-[#747474]">
                        {entry.location}
                      </div>
                      {entry.gpaOrRank && (
                        <div className="font-mono-system text-xs text-[#111111] font-medium pt-1">
                          {entry.gpaOrRank}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-5 space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight text-[#111111]">
                        {entry.institution}
                      </h3>
                      <div className="text-sm font-medium text-[#111111]/85">
                        {entry.degree}
                      </div>
                      <div className="text-xs text-[#747474]">{entry.major}</div>
                      <div className="pt-3 font-mono-system text-[11px] text-[#747474]">
                        {entry.focusAreas.join(' · ')}
                      </div>
                    </div>

                    <div className="md:col-span-4 space-y-3">
                      <div className="font-mono-system text-[11px] tracking-widest text-[#747474]">
                        {isZh ? '精选核心课程 / SELECTED COURSEWORK' : 'SELECTED COURSEWORK'}
                      </div>
                      <ul className="space-y-1.5 text-sm text-[#111111]/90">
                        {entry.selectedCoursework.map((course) => (
                          <li key={course} className="leading-snug">
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education Narrative Trajectory */}
              <div className="mt-12 pt-8 border-t border-black/10">
                <div className="font-mono-system text-[11px] tracking-widest text-[#747474] mb-6">
                  {isZh
                    ? '专业演进逻辑 / DISCIPLINARY TRAJECTORY'
                    : 'DISCIPLINARY TRAJECTORY'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
                  {education.migrationSteps.map((item) => (
                    <div key={item.step} className="space-y-1.5 border-l border-black/15 pl-3">
                      <div className="font-mono-system text-[11px] text-[#747474]">
                        {item.step}
                      </div>
                      <div className="text-sm font-semibold text-[#111111]">
                        {item.domain}
                      </div>
                      <p className="text-xs text-[#747474] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* 02 / EXPERIENCE */}
          <section id="sys-experience" className="py-24 border-b border-black/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-baseline justify-between mb-12">
                <h2 className="font-mono-system text-xs tracking-[0.2em] text-[#747474]">
                  {isZh ? '02 / EXPERIENCE · 实习经历' : '02 / EXPERIENCE'}
                </h2>
                <span className="font-mono-system text-xs text-[#747474]">
                  CONTEXT → WHAT I DID → IMPACT
                </span>
              </div>

              <div className="divide-y divide-black/10">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
                  >
                    {/* Left Sticky Column */}
                    <div className="md:col-span-4 md:sticky md:top-28 space-y-1.5">
                      <div className="font-mono-system text-xs text-[#747474]">
                        {exp.year} · {exp.location}
                      </div>
                      <h3 className="text-base font-semibold tracking-tight text-[#111111]">
                        {exp.company}
                      </h3>
                      <div className="text-sm text-[#111111]/80">{exp.role}</div>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-8 space-y-6">
                      <div>
                        <div className="font-mono-system text-[11px] tracking-widest text-[#747474] mb-1.5">
                          {isZh ? '业务背景 / CONTEXT' : 'CONTEXT'}
                        </div>
                        <p className="text-base text-[#111111]/90 leading-relaxed">
                          {exp.context}
                        </p>
                      </div>

                      <div>
                        <div className="font-mono-system text-[11px] tracking-widest text-[#747474] mb-2">
                          {isZh ? '核心工作 / WHAT I DID' : 'WHAT I DID'}
                        </div>
                        <ul className="space-y-2.5 text-sm text-[#111111]/85 leading-relaxed">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-baseline gap-2.5">
                              <span className="font-mono-system text-xs text-[#747474]">—</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Real Metrics Highlights */}
                      {exp.metrics && exp.metrics.length > 0 && (
                        <div className="pt-4 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {exp.metrics.map((m, idx) => (
                            <div key={idx} className="border-l-2 border-[#111111] pl-4 space-y-1">
                              <div className="font-mono-system text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
                                {m.value}
                              </div>
                              <div className="font-mono-system text-xs font-medium text-[#111111]">
                                {m.label}
                              </div>
                              <div className="text-xs text-[#747474]">{m.context}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 03 / PROJECTS */}
          <section id="sys-projects" className="py-24 border-b border-black/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
                <h2 className="font-mono-system text-xs tracking-[0.2em] text-[#747474]">
                  {isZh ? '03 / PROJECTS · 独立产品与量化研究项目' : '03 / PROJECTS'}
                </h2>
                <span className="font-mono-system text-xs text-[#747474]">
                  {isZh
                    ? '点击文件夹标签切换 Vibe Coding 项目 · 支持在线编辑描述'
                    : 'CLICK FOLDER TABS FOR VIBE CODING DOSSIERS · INLINE EDITABLE'}
                </span>
              </div>

              {/* Part A: Mosby's Files Style Tactile Folder Archive for Vibe Coding Projects */}
              <div className="mb-20">
                <MosbyArchiveShowcase
                  projects={projects.filter((p) =>
                    [
                      'ai-music-record-store',
                      'finger-touch-piano',
                      'medication-companion',
                    ].includes(p.slug)
                  )}
                  mode="system"
                  isZh={isZh}
                  onOpenProject={onOpenProject}
                />
              </div>

              {/* Part B: Quantitative, Econometric & Data Science Research Projects */}
              <div className="mb-10 pt-6 border-t border-black/15 flex items-baseline justify-between">
                <h3 className="font-mono-system text-xs tracking-[0.18em] text-[#747474] uppercase">
                  {isZh
                    ? 'QUANTITATIVE, NLP & DATA SCIENCE ARCHIVE // 量化、NLP 与数据科学实证项目'
                    : 'QUANTITATIVE, NLP & DATA SCIENCE ARCHIVE'}
                </h3>
                <span className="font-mono-system text-[11px] text-[#747474]">
                  05 RESEARCH & ENGINEERING FILES
                </span>
              </div>

              <div className="space-y-20">
                {projects
                  .filter(
                    (p) =>
                      ![
                        'ai-music-record-store',
                        'finger-touch-piano',
                        'medication-companion',
                      ].includes(p.slug)
                  )
                  .map((project) => (
                  <article
                    key={project.id}
                    className="group border-t border-black/15 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="font-mono-system text-xs text-[#747474] flex flex-wrap items-center gap-2">
                          <span>{project.code}</span>
                          <span>·</span>
                          <span className="text-[#111111] font-medium">
                            {project.crossDomainLabel}
                          </span>
                          <span>·</span>
                          <span>{project.year}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111]">
                          {project.title}
                        </h3>

                        <p className="text-base text-[#111111]/90 leading-relaxed">
                          {project.oneLine}
                        </p>

                        <div className="pt-2 space-y-3 text-sm text-[#111111]/80">
                          <div>
                            <span className="font-mono-system text-[11px] text-[#747474] block">
                              {isZh ? '核心痛点 / PROBLEM' : 'PROBLEM'}
                            </span>
                            {project.problem}
                          </div>
                          <div>
                            <span className="font-mono-system text-[11px] text-[#747474] block">
                              {isZh ? '系统构建与实证方法 / HOW IT WAS BUILT' : 'HOW WAS IT BUILT?'}
                            </span>
                            {project.primaryNarrative}
                          </div>
                        </div>

                        <div className="pt-2 space-y-1.5">
                          <span className="font-mono-system text-[11px] text-[#747474] block">
                            {isZh ? '量化成果 / KEY RESULTS' : 'KEY RESULTS'}
                          </span>
                          {project.results.map((r, i) => (
                            <div
                              key={i}
                              className="text-sm font-medium text-[#111111] flex items-baseline gap-2"
                            >
                              <span className="font-mono-system text-xs text-[#747474]">·</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-black/10">
                        <div className="font-mono-system text-xs text-[#747474]">
                          {project.stack.join(' · ')}
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                          <button
                            type="button"
                            onClick={() => onOpenProject(project.slug)}
                            className="font-mono-system text-xs font-medium text-[#111111] border-b border-[#111111] pb-0.5 hover:opacity-70 transition-opacity inline-flex items-center gap-1 whitespace-nowrap"
                          >
                            <span>
                              {isZh ? '阅读完整 CASE STUDY (01–10)' : 'VIEW CASE STUDY'}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          {project.liveUrl && project.liveUrl.startsWith('http') && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono-system text-xs text-[#747474] hover:text-[#111111] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                            >
                              <span>LIVE DEMO</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono-system text-xs text-[#747474] hover:text-[#111111] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                          >
                            <span>GITHUB</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div
                        onClick={() => onOpenProject(project.slug)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            onOpenProject(project.slug);
                          }
                        }}
                        className="cursor-pointer overflow-hidden border border-black/12 bg-[#EBEBE6] relative group"
                      >
                        <ResilientImage
                          src={project.cover}
                          alt={project.title}
                          className="w-full aspect-video group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="p-4 bg-[#F5F5F2] border-t border-black/10 space-y-2">
                          <div className="font-mono-system text-[10px] text-[#747474] uppercase">
                            {project.status}
                          </div>
                          <ul className="space-y-1 text-xs text-[#111111]/85">
                            {project.highlights.map((h, idx) => (
                              <li key={idx} className="truncate">
                                • {h}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-2 flex items-center justify-between font-mono-system text-[11px] text-[#111111]">
                            <span>{isZh ? '展开技术架构与评估' : 'OPEN CASE STUDY'}</span>
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 04 / COMPETITIONS (Archive / Scoreboard layout) */}
          <section id="sys-competitions" className="py-24 border-b border-black/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-baseline justify-between mb-12">
                <h2 className="font-mono-system text-xs tracking-[0.2em] text-[#747474]">
                  {isZh ? '04 / COMPETITIONS · 比赛与获奖记录' : '04 / COMPETITIONS'}
                </h2>
                <span className="font-mono-system text-xs text-[#747474]">
                  ARCHIVE / SCOREBOARD
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {competitions.map((comp) => (
                  <div
                    key={comp.id}
                    className="border-t-2 border-[#111111] pt-5 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between font-mono-system text-xs text-[#747474]">
                        <span>{comp.year}</span>
                        <span>{comp.index}</span>
                      </div>

                      <h3 className="text-lg font-semibold tracking-tight text-[#111111] leading-snug">
                        {comp.name}
                      </h3>
                      <div className="font-mono-system text-xs text-[#747474]">
                        {comp.organizer}
                      </div>

                      <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed pt-1">
                        {comp.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/10 font-mono-system text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#747474]">TEAM</span>
                        <span className="text-[#111111]">{comp.teamSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#747474]">ROLE</span>
                        <span className="text-[#111111] text-right">{comp.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#747474]">RESULT</span>
                        <span className="text-[#111111] font-semibold">{comp.result}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#747474]">RANK</span>
                        <span className="text-[#111111]">{comp.ranking}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 05 / VISUAL COMMUNICATION */}
          <section id="sys-visual" className="py-24 border-b border-black/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                <h2 className="font-mono-system text-xs tracking-[0.2em] text-[#747474]">
                  {isZh
                    ? '05 / VISUAL COMMUNICATION · 深度报告与策略视觉传达'
                    : '05 / VISUAL COMMUNICATION'}
                </h2>
                <span className="font-mono-system text-xs text-[#747474]">
                  70+ PAGE RESEARCH DECK · STRATEGY SLIDES · DATA VISUALIZATION
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-medium text-[#111111] mb-12">
                {isZh
                  ? '将复杂的空天通信技术、临床统计检验与 ESG 矩阵转化为直观决策图谱。'
                  : 'Making complex ideas visible.'}
              </p>

              <div className="space-y-12">
                {visualWorks.map((deck, idx) => (
                  <div
                    key={deck.id}
                    className={`border border-black/15 bg-[#EBEBE6]/60 p-6 sm:p-8 transition-colors hover:border-black/40 ${
                      idx % 2 === 1 ? 'md:ml-12' : 'md:mr-12'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono-system text-xs text-[#747474]">
                      <span>{deck.code}</span>
                      <span>
                        {deck.year} · {deck.slideCount}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-semibold text-[#111111]">
                      {deck.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#111111]/80 max-w-2xl leading-relaxed">
                      {deck.summary}
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {deck.slidesPreview.map((slide) => (
                        <div
                          key={slide.slideNumber}
                          className="bg-[#F5F5F2] border border-black/10 p-4 flex flex-col justify-between aspect-[16/10]"
                        >
                          <div className="font-mono-system text-[10px] text-[#747474]">
                            SLIDE {slide.slideNumber}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#111111]">
                              {slide.heading}
                            </div>
                            <p className="mt-1 text-[11px] text-[#747474] leading-snug line-clamp-2">
                              {slide.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                      <span className="font-mono-system text-xs text-[#747474]">
                        {deck.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedDeck(deck)}
                        className="font-mono-system text-xs font-medium text-[#111111] hover:opacity-70 transition-opacity whitespace-nowrap"
                      >
                        {isZh ? '查看报告结构预览 →' : 'INSPECT SLIDE DECK →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 06 / MEDIA + EDITORIAL */}
          <section id="sys-media" className="py-24 border-b border-black/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12">
                <h2 className="font-mono-system text-xs tracking-[0.2em] text-[#747474]">
                  {isZh ? '06 / MEDIA + EDITORIAL · 新媒体与内容传播' : '06 / MEDIA + EDITORIAL'}
                </h2>
                <span className="font-mono-system text-xs text-[#747474]">
                  COMMUNICATION × AUDIENCE × CREATION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {mediaWorks.map((item) => (
                  <article
                    key={item.id}
                    className="border-t border-black/15 pt-6 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-baseline justify-between font-mono-system text-xs text-[#747474]">
                        <span>{item.code}</span>
                        <span>{item.year}</span>
                      </div>

                      <h3 className="text-xl font-semibold tracking-tight text-[#111111]">
                        {item.title}
                      </h3>

                      <div className="grid grid-cols-2 gap-4 py-3 border-y border-black/10 font-mono-system text-xs">
                        <div>
                          <div className="text-[#747474] text-[10px]">ROLE</div>
                          <div className="text-[#111111] mt-0.5">{item.role}</div>
                        </div>
                        {item.metricHighlight && (
                          <div>
                            <div className="text-[#747474] text-[10px]">VERIFIED IMPACT</div>
                            <div className="text-[#111111] font-semibold mt-0.5">
                              {item.metricHighlight.value} · {item.metricHighlight.unit}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="overflow-hidden border border-black/10 aspect-[16/9]">
                        <ResilientImage
                          src={item.cover}
                          alt={item.title}
                          className="w-full h-full"
                        />
                      </div>

                      <p className="text-sm text-[#111111]/85 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-mono-system text-xs text-[#747474]">
                        {item.platform}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedMediaCase(item)}
                        className="font-mono-system text-xs font-medium text-[#111111] hover:opacity-70 transition-opacity whitespace-nowrap"
                      >
                        {isZh ? '查看传播复盘 →' : 'READ CASE STUDY →'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 07 / AI + COMPUTING (I BUILD / I THINK) */}
          <section id="sys-ai" className="py-24 border-b border-black/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-baseline justify-between mb-12">
                <h2 className="font-mono-system text-xs tracking-[0.2em] text-[#747474]">
                  {isZh ? '07 / AI + COMPUTING · 我所构建与思考的' : '07 / AI + COMPUTING'}
                </h2>
                <span className="font-mono-system text-xs text-[#747474]">
                  I BUILD × I THINK
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* I BUILD */}
                <div className="space-y-6">
                  <div className="border-b border-black/15 pb-4">
                    <h3 className="font-mono-system text-sm font-medium text-[#111111]">
                      I BUILD
                    </h3>
                    <p className="text-xs text-[#747474] mt-1">
                      {isZh ? 'what I make · 我构建的算法与数据系统' : 'what I make.'}
                    </p>
                  </div>

                  <div className="divide-y divide-black/10">
                    {projects.map((p) => (
                      <div key={p.id} className="py-5 space-y-2">
                        <div className="font-mono-system text-[11px] text-[#747474]">
                          {p.crossDomainLabel}
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="text-base font-semibold text-[#111111]">
                            {p.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onOpenProject(p.slug)}
                            className="font-mono-system text-xs text-[#111111] hover:opacity-70 shrink-0"
                          >
                            SPEC →
                          </button>
                        </div>
                        <p className="text-xs text-[#747474] leading-relaxed">
                          {p.technicalStory}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* I THINK */}
                <div className="space-y-6">
                  <div className="border-b border-black/15 pb-4">
                    <h3 className="font-mono-system text-sm font-medium text-[#111111]">
                      I THINK
                    </h3>
                    <p className="text-xs text-[#747474] mt-1">
                      {isZh ? 'what I think about · 研究手记与方法论思考' : 'what I think about.'}
                    </p>
                  </div>

                  <div className="divide-y divide-black/10">
                    {aiWriting.map((w) => (
                      <div key={w.id} className="py-5 space-y-2">
                        <div className="font-mono-system text-[11px] text-[#747474]">
                          {w.date} · {w.category} · {w.readTime}
                        </div>
                        <h4 className="text-base font-semibold text-[#111111]">
                          {w.title}
                        </h4>
                        <p className="text-xs text-[#747474] leading-relaxed">
                          {w.excerpt}
                        </p>
                        <button
                          type="button"
                          onClick={() => onOpenWriting(w.slug)}
                          className="font-mono-system text-xs text-[#111111] pt-1 hover:opacity-70 inline-block"
                        >
                          {isZh ? '阅读全文 →' : 'READ NOTE →'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 08 / CONTACT */}
          <section id="sys-contact" className="pt-24">
            <div className="font-mono-system text-xs tracking-[0.2em] text-[#747474] mb-8">
              {isZh
                ? '08 / CONTACT & DUAL-READING · 联系与阅读视角切换'
                : '08 / CONTACT & DUAL-READING SWITCH'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end justify-between">
              <div className="md:col-span-7 space-y-4">
                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#111111]">
                  {isZh
                    ? '同一个人，两种不同的阅读方式。'
                    : 'Same person. Different ways of reading.'}
                </h2>
                <p className="text-sm text-[#747474] max-w-xl leading-relaxed">
                  {isZh
                    ? '你当前正在浏览结构化的 SYSTEM 数字档案。点击右侧进入 LIFE 模式，从城市记忆、35mm 摄影、BIE 别的编辑部故事与志愿实践的温度读我。'
                    : 'You are currently viewing the structured SYSTEM archive. Switch to LIFE to read through places, photography, essays, and personal memories.'}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-6 font-mono-system text-xs">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[#111111] underline underline-offset-4 hover:opacity-70"
                  >
                    {profile.email}
                  </a>
                  <span className="text-[#747474]">{profile.phone}</span>
                  <span className="text-[#747474]">{profile.location}</span>
                </div>
              </div>

              <div className="md:col-span-5 flex md:justify-end">
                <button
                  type="button"
                  onClick={onSwitchToLife}
                  className="px-6 py-4 bg-[#111111] text-[#F5F5F2] font-mono-system text-xs tracking-widest hover:bg-[#111111]/85 transition-colors inline-flex items-center gap-3 whitespace-nowrap"
                >
                  <span>{isZh ? '进入 02 — LIFE 模式' : 'ENTER 02 — LIFE MODE'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Modal: Visual Communication Slide Deck Inspector */}
      <AnimatePresence>
        {selectedDeck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6"
            onClick={() => setSelectedDeck(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F5F5F2] text-[#111111] border border-black/20 max-w-3xl w-full p-6 sm:p-10 space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
                <span className="font-mono-system text-xs text-[#747474]">
                  {selectedDeck.code} · {selectedDeck.slideCount}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDeck(null)}
                  className="font-mono-system text-xs text-[#111111] hover:opacity-70"
                >
                  {isZh ? '关闭 [✕]' : 'CLOSE [✕]'}
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#111111]">
                  {selectedDeck.title}
                </h3>
                <p className="mt-2 text-sm text-[#747474]">
                  {selectedDeck.keyTakeaway}
                </p>
              </div>

              <div className="space-y-4">
                {selectedDeck.slidesPreview.map((slide) => (
                  <div
                    key={slide.slideNumber}
                    className="p-6 bg-[#EBEBE6] border border-black/10 space-y-2"
                  >
                    <div className="font-mono-system text-xs text-[#747474]">
                      SLIDE {slide.slideNumber}
                    </div>
                    <div className="text-base font-semibold text-[#111111]">
                      {slide.heading}
                    </div>
                    <p className="text-sm text-[#111111]/80 leading-relaxed">
                      {slide.caption}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Media Editorial Case Study */}
      <AnimatePresence>
        {selectedMediaCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6"
            onClick={() => setSelectedMediaCase(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F5F5F2] text-[#111111] border border-black/20 max-w-2xl w-full p-6 sm:p-10 space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
                <span className="font-mono-system text-xs text-[#747474]">
                  {selectedMediaCase.code} · MEDIA CASE STUDY
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedMediaCase(null)}
                  className="font-mono-system text-xs text-[#111111] hover:opacity-70"
                >
                  {isZh ? '关闭 [✕]' : 'CLOSE [✕]'}
                </button>
              </div>

              <h3 className="text-2xl font-semibold text-[#111111]">
                {selectedMediaCase.title}
              </h3>

              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <span className="font-mono-system text-xs text-[#747474] block">
                    {isZh ? '项目概览 / SUMMARY' : 'EDITORIAL SUMMARY'}
                  </span>
                  {selectedMediaCase.summary}
                </div>
                <div>
                  <span className="font-mono-system text-xs text-[#747474] block">
                    {isZh ? '目标受众 / TARGET AUDIENCE' : 'TARGET AUDIENCE'}
                  </span>
                  {selectedMediaCase.targetAudience}
                </div>
                <div>
                  <span className="font-mono-system text-xs text-[#747474] block">
                    {isZh ? '创作与运营过程 / CREATIVE PROCESS' : 'CREATIVE PROCESS'}
                  </span>
                  {selectedMediaCase.creativeProcess}
                </div>
                <div>
                  <span className="font-mono-system text-xs text-[#747474] block">
                    {isZh ? '背后故事 (与 LIFE 模式共享)' : 'PERSONAL STORY (SHARED WITH LIFE MODE)'}
                  </span>
                  {selectedMediaCase.lifeStory}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
