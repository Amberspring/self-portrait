import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getProfile,
  getLifeMoments,
  getPlacesWithConnections,
  getPhotographyByPlace,
  getAllWriting,
  getMediaHighlights,
  getLifeProjects,
  getVolunteering,
} from '../../content/selectors';
import { useLanguage } from '../../context/LanguageContext';
import { PhotoEntryData } from '../../types/portfolio';
import { ResilientImage } from '../shared/ResilientImage';
import { LifeDisturbanceField } from './LifeDisturbanceField';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface LifeViewProps {
  onSwitchToSystem: () => void;
  onReturnToOpening: () => void;
  onOpenProject: (slug: string) => void;
  onOpenWriting: (slug: string) => void;
}

export const LifeView: React.FC<LifeViewProps> = ({
  onSwitchToSystem,
  onReturnToOpening,
  onOpenProject,
  onOpenWriting,
}) => {
  const { lang, setLang } = useLanguage();
  const isZh = lang === 'zh';

  const profile = getProfile(lang);
  const moments = getLifeMoments(lang);
  const places = getPlacesWithConnections(lang);
  const photos = getPhotographyByPlace(lang);
  const writings = getAllWriting(lang);
  const media = getMediaHighlights(lang);
  const lifeProjects = getLifeProjects(lang);
  const volunteering = getVolunteering(lang);

  const LIFE_SECTIONS = isZh
    ? [
        { id: 'life-me', num: '01', label: 'ME / 日常切片' },
        { id: 'life-places', num: '02', label: 'PLACES / 城市章节' },
        { id: 'life-photography', num: '03', label: 'PHOTOGRAPHY / 摄影' },
        { id: 'life-words', num: '04', label: 'WORDS / 随笔与思考' },
        { id: 'life-media', num: '05', label: 'MEDIA / BIE 别的与社群' },
        { id: 'life-projects', num: '06', label: 'PROJECTS / 为什么做它' },
        { id: 'life-volunteer', num: '07', label: 'VOLUNTEER / 我所在意的' },
        { id: 'life-archive', num: '08', label: 'ARCHIVE / 切换视角' },
      ]
    : [
        { id: 'life-me', num: '01', label: 'ME' },
        { id: 'life-places', num: '02', label: 'PLACES' },
        { id: 'life-photography', num: '03', label: 'PHOTOGRAPHY' },
        { id: 'life-words', num: '04', label: 'WORDS' },
        { id: 'life-media', num: '05', label: 'MEDIA' },
        { id: 'life-projects', num: '06', label: 'PROJECTS' },
        { id: 'life-volunteer', num: '07', label: 'VOLUNTEER' },
        { id: 'life-archive', num: '08', label: 'ARCHIVE' },
      ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoEntryData | null>(null);
  const [activePlaceFilter, setActivePlaceFilter] = useState<'ALL' | 'Hong Kong' | 'Shanghai' | 'Tokyo'>('ALL');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredPhotos =
    activePlaceFilter === 'ALL'
      ? photos
      : photos.filter((p) => p.place === activePlaceFilter);

  const placeFilterLabels: Record<'ALL' | 'Hong Kong' | 'Shanghai' | 'Tokyo', string> = {
    ALL: isZh ? '全部 / ALL' : 'ALL',
    'Hong Kong': isZh ? '香港 / HK' : 'HONG KONG',
    Shanghai: isZh ? '上海 / SH' : 'SHANGHAI',
    Tokyo: isZh ? '东京 / TYO' : 'TOKYO',
  };

  return (
    <div className="relative min-h-screen bg-[#0B0A09] text-[#F2EFE9] font-sans-system selection:bg-[#D97736] selection:text-[#0B0A09] overflow-x-hidden">
      {/* Background Layers: Chemical Film Exposure + Grain + Disturbance Field */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute top-[-10%] right-[-5%] w-[620px] h-[620px] rounded-full blur-[150px] opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(217,119,54,0.28) 0%, rgba(124,45,18,0.10) 55%, transparent 75%)',
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-8%] w-[580px] h-[580px] rounded-full blur-[150px] opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(56,118,142,0.22) 0%, rgba(20,30,48,0.08) 60%, transparent 75%)',
          }}
        />
        <div className="film-grain absolute inset-0" />
      </div>

      <LifeDisturbanceField />

      {/* Top Bar Contract: 3 Zones (Wordmark | Index Links | Language & SYSTEM Switch) */}
      <header className="sticky top-0 z-30 bg-[#0B0A09]/80 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Zone 1: Single wordmark */}
        <button
          type="button"
          onClick={onReturnToOpening}
          className="font-serif-life italic text-xl tracking-wide text-[#F2EFE9] hover:opacity-75 transition-opacity whitespace-nowrap"
        >
          {isZh ? '杨蕊嘉 · Flora Yeung' : 'Flora Yeung'}
        </button>

        {/* Zone 2: Clean Index Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 font-mono-system text-xs text-[#9E9689]">
          {LIFE_SECTIONS.slice(0, 6).map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className="hover:text-[#F2EFE9] transition-colors whitespace-nowrap"
            >
              {sec.num} {sec.label.split(' / ')[0]}
            </button>
          ))}
        </nav>

        {/* Zone 3: Language Switcher & SYSTEM ↗ Switch */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 font-mono-system text-xs">
            <button
              type="button"
              onClick={() => setLang('zh')}
              className={`px-1.5 py-0.5 transition-colors whitespace-nowrap ${
                isZh
                  ? 'text-[#F2EFE9] font-semibold underline underline-offset-4'
                  : 'text-[#9E9689] hover:text-[#F2EFE9]'
              }`}
            >
              中
            </button>
            <span className="text-[#9E9689]/40">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 transition-colors whitespace-nowrap ${
                !isZh
                  ? 'text-[#F2EFE9] font-semibold underline underline-offset-4'
                  : 'text-[#9E9689] hover:text-[#F2EFE9]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={onSwitchToSystem}
            className="font-mono-system text-xs text-[#F2EFE9] hover:text-[#D97736] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
          >
            <span>SYSTEM</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle LIFE index"
            className="lg:hidden p-1.5 text-[#F2EFE9] hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden fixed inset-x-0 top-[61px] z-20 bg-[#141210] border-b border-white/15 px-6 py-6"
          >
            <div className="font-mono-system text-[11px] text-[#9E9689] mb-4 tracking-widest">
              LIFE INDEX
            </div>
            <div className="grid grid-cols-2 gap-3">
              {LIFE_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="text-left font-mono-system text-xs text-[#F2EFE9]/80 hover:text-[#D97736] py-1.5"
                >
                  {sec.num} {sec.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Spatial Container */}
      <main className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-12 pb-32">
        {/* LIFE Open Spatial Landing */}
        <section className="pt-16 md:pt-24 pb-24 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689]">
                MODE 02 / LIFE · PERSONAL DIGITAL ARCHIVE
              </div>

              <h1 className="font-serif-life italic text-5xl sm:text-7xl lg:text-[78px] leading-[1.04] text-[#F2EFE9] tracking-wide">
                Things I&apos;ve seen,
                <br />
                made, kept,
                <br />
                and cared about.
              </h1>

              {isZh && (
                <div className="text-2xl sm:text-3xl font-light text-[#F2EFE9]/90 tracking-tight">
                  我所见的、所造的、所留存与真正在意的。
                </div>
              )}

              <p className="text-sm sm:text-base text-[#9E9689] max-w-xl leading-relaxed pt-2">
                {isZh
                  ? '在结构化的模型、高频数据与代码之外，这里存放着我在香港、上海与旅途中的影像切片、在「BIE 别的」编辑部的写作记忆、项目背后的个人初衷，以及我所投入的女性社群与公益志愿现场。'
                  : 'An open space of cities, 35mm frames, essays, and projects read through their human and personal origins.'}
              </p>
            </motion.div>

            {/* Right Spatial Index Block */}
            <div className="lg:col-span-5 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
              <div className="font-mono-system text-[11px] tracking-widest text-[#9E9689] mb-4">
                INDEX
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                {LIFE_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className="text-left font-mono-system text-xs text-[#F2EFE9]/75 hover:text-[#D97736] transition-colors flex items-baseline gap-2.5 py-0.5"
                  >
                    <span className="text-[#9E9689]">{sec.num}</span>
                    <span className="truncate">{sec.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 01 / ME (OFFLINE Moments) */}
        <section id="life-me" className="py-24 border-b border-white/10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-16">
            <div>
              <span className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689] block">
                01 / ME · OFFLINE
              </span>
              <h2 className="mt-2 font-serif-life italic text-3xl sm:text-5xl text-[#F2EFE9]">
                {isZh ? '屏幕之外的日常切片' : 'Days away from the terminal'}
              </h2>
            </div>
            <span className="font-mono-system text-xs text-[#9E9689]">
              HONG KONG · SHANGHAI · FIELD NOTES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {moments.map((moment, idx) => {
              const colSpan =
                idx === 0
                  ? 'md:col-span-5'
                  : idx === 1
                  ? 'md:col-span-4 md:mt-16'
                  : 'md:col-span-3 md:mt-6';
              return (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`${colSpan} space-y-4`}
                >
                  <div className="overflow-hidden border border-white/10 bg-[#141210]">
                    <ResilientImage
                      src={moment.image}
                      alt={moment.label}
                      className="w-full aspect-[4/3] hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <div className="font-mono-system text-[11px] text-[#9E9689] flex items-center justify-between">
                    <span>{moment.location.toUpperCase()}</span>
                    <span>{moment.date}</span>
                  </div>
                  <div className="font-serif-life italic text-2xl text-[#F2EFE9]">
                    {moment.label}
                  </div>
                  <p className="text-xs text-[#9E9689] leading-relaxed">
                    {moment.note}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 02 / PLACES (Cities as Chapters) */}
        <section id="life-places" className="py-24 border-b border-white/10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-16">
            <div>
              <span className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689] block">
                02 / PLACES
              </span>
              <h2 className="mt-2 font-serif-life italic text-3xl sm:text-5xl text-[#F2EFE9]">
                {isZh ? '作为人生章节的城市' : 'Cities as chapters'}
              </h2>
            </div>
            <span className="font-mono-system text-xs text-[#9E9689]">
              GEOGRAPHY AS NARRATIVE DEVICE
            </span>
          </div>

          <div className="space-y-24">
            {places.map((place, idx) => (
              <div
                key={place.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div
                  className={`lg:col-span-5 space-y-4 ${
                    idx % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="font-mono-system text-xs tracking-widest text-[#D97736]">
                    {place.period} / {place.coordinates}
                  </div>
                  <h3 className="font-serif-life text-4xl sm:text-6xl text-[#F2EFE9] tracking-wide">
                    {place.displayName}
                  </h3>
                  <div className="font-mono-system text-[11px] text-[#9E9689] tracking-wider">
                    {place.chapterNote}
                  </div>
                  <p className="text-sm sm:text-base text-[#F2EFE9]/80 leading-relaxed pt-2">
                    {place.memoryFragment}
                  </p>

                  {place.writings.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <span className="font-mono-system text-[10px] text-[#9E9689] block mb-1">
                        {isZh ? '关联城市文章 / CONNECTED WRITING' : 'CONNECTED WRITING IN THIS CITY'}
                      </span>
                      {place.writings.map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => onOpenWriting(w.slug)}
                          className="font-serif-life italic text-lg text-[#D97736] hover:underline text-left"
                        >
                          “{w.title}” →
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`lg:col-span-7 ${
                    idx % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  {place.photos.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedPhoto(photo);
                        }
                      }}
                      className="group cursor-pointer overflow-hidden border border-white/15 bg-[#141210] p-3 sm:p-5 transition-colors hover:border-white/40"
                    >
                      <ResilientImage
                        src={photo.image}
                        alt={photo.title}
                        className="w-full max-h-[440px] object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      />
                      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 font-mono-system text-xs text-[#9E9689]">
                        <span>
                          {photo.placeDisplay} · {photo.date} · {photo.coordinates}
                        </span>
                        <span className="text-[#F2EFE9] group-hover:text-[#D97736] transition-colors">
                          {isZh ? '放大检视 [+]' : 'EXPAND FRAME [+]'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 / PHOTOGRAPHY — WHERE I'VE LOOKED */}
        <section id="life-photography" className="py-24 border-b border-white/10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <span className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689] block">
                03 / PHOTOGRAPHY · WHERE I&apos;VE LOOKED
              </span>
              <h2 className="mt-2 font-serif-life italic text-3xl sm:text-5xl text-[#F2EFE9]">
                {isZh ? '我曾注视过的坐标与光影' : 'Frames organized by coordinates & time'}
              </h2>
            </div>

            <div className="flex items-center gap-2 border border-white/15 p-1 bg-[#141210]">
              {(['ALL', 'Hong Kong', 'Shanghai', 'Tokyo'] as const).map((place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => setActivePlaceFilter(place)}
                  className={`px-3 py-1.5 font-mono-system text-xs transition-colors whitespace-nowrap ${
                    activePlaceFilter === place
                      ? 'bg-[#F2EFE9] text-[#0B0A09] font-medium'
                      : 'text-[#9E9689] hover:text-[#F2EFE9]'
                  }`}
                >
                  {placeFilterLabels[place]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {filteredPhotos.map((photo) => (
              <motion.figure
                key={photo.id}
                layout
                onClick={() => setSelectedPhoto(photo)}
                style={{ rotate: `${photo.rotationDeg}deg` }}
                whileHover={{ rotate: 0, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer bg-[#141210] border border-white/12 p-4 space-y-4 shadow-lg"
              >
                <div className="overflow-hidden">
                  <ResilientImage
                    src={photo.image}
                    alt={photo.title}
                    className={`w-full ${
                      photo.aspectRatio === '3:4' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                    }`}
                  />
                </div>
                <figcaption className="space-y-1.5">
                  <div className="font-mono-system text-[11px] text-[#9E9689] flex justify-between">
                    <span>{photo.placeDisplay}</span>
                    <span>{photo.date}</span>
                  </div>
                  <div className="font-serif-life italic text-2xl text-[#F2EFE9]">
                    {photo.title}
                  </div>
                  <p className="text-xs text-[#9E9689] leading-relaxed">
                    {photo.caption}
                  </p>
                  <div className="pt-1 font-mono-system text-[10px] text-[#9E9689]/70">
                    {photo.cameraNote}
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* 04 / WORDS — Editorial Archive */}
        <section id="life-words" className="py-24 border-b border-white/10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12">
            <div>
              <span className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689] block">
                04 / WORDS
              </span>
              <h2 className="mt-2 font-serif-life italic text-3xl sm:text-5xl text-[#F2EFE9]">
                {isZh ? '随笔、研究手记与双城记' : 'Essays, field notes & reflections'}
              </h2>
            </div>
            <span className="font-mono-system text-xs text-[#9E9689]">
              2025 — 2026 ARCHIVE
            </span>
          </div>

          <div className="divide-y divide-white/10">
            {writings.map((item) => (
              <article
                key={item.id}
                onClick={() => onOpenWriting(item.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onOpenWriting(item.slug);
                  }
                }}
                className="group py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline cursor-pointer"
              >
                <div className="md:col-span-2 font-mono-system text-xs text-[#9E9689]">
                  {item.index} / {item.date}
                </div>
                <div className="md:col-span-7 space-y-2">
                  <h3 className="font-serif-life italic text-2xl sm:text-3xl text-[#F2EFE9] group-hover:text-[#D97736] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9E9689] leading-relaxed max-w-xl">
                    {item.excerpt}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right font-mono-system text-xs text-[#9E9689] group-hover:text-[#F2EFE9] transition-colors">
                  {item.category} · {isZh ? '阅读 →' : 'READ →'}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 05 / MEDIA (Shared data with SYSTEM, emphasizing Story & Creative Process) */}
        <section id="life-media" className="py-24 border-b border-white/10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12">
            <div>
              <span className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689] block">
                05 / MEDIA · STORY & CREATIVE PROCESS
              </span>
              <h2 className="mt-2 font-serif-life italic text-3xl sm:text-5xl text-[#F2EFE9]">
                {isZh ? '「BIE 别的」编辑部与社群背后的故事' : 'Behind the editorial features'}
              </h2>
            </div>
            <span className="font-mono-system text-xs text-[#9E9689]">
              SAME WORK · PERSONAL LENS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {media.map((m) => (
              <div
                key={m.id}
                className="bg-[#141210] border border-white/10 p-6 sm:p-8 space-y-6"
              >
                <div className="overflow-hidden aspect-video border border-white/10">
                  <ResilientImage
                    src={m.cover}
                    alt={m.title}
                    className="w-full h-full"
                  />
                </div>
                <div className="font-mono-system text-xs text-[#9E9689]">
                  {m.platform} · {m.year}
                </div>
                <h3 className="font-serif-life italic text-2xl sm:text-3xl text-[#F2EFE9]">
                  {m.title}
                </h3>
                <blockquote className="border-l-2 border-[#D97736] pl-4 text-sm text-[#F2EFE9]/90 italic leading-relaxed">
                  “{m.lifeStory}”
                </blockquote>
                <p className="text-xs text-[#9E9689] leading-relaxed">
                  {isZh ? '创作过程：' : 'Process: '}
                  {m.creativeProcess}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 06 / PROJECTS — Personal Origins (Why did I make it?) */}
        <section id="life-projects" className="py-24 border-b border-white/10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12">
            <div>
              <span className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689] block">
                06 / PROJECTS · PERSONAL ORIGINS
              </span>
              <h2 className="mt-2 font-serif-life italic text-3xl sm:text-5xl text-[#F2EFE9]">
                {isZh ? '我为什么做这些项目？ / Why did I make it?' : 'Why did I make it?'}
              </h2>
            </div>
            <span className="font-mono-system text-xs text-[#9E9689]">
              SHARED PROJECTS · PERSONAL STORY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lifeProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#141210] border border-white/10 p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="overflow-hidden aspect-video border border-white/10">
                    <ResilientImage
                      src={proj.cover}
                      alt={proj.title}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="font-mono-system text-[11px] text-[#D97736]">
                    {proj.crossDomainLabel}
                  </div>
                  <h3 className="font-serif-life italic text-2xl sm:text-3xl text-[#F2EFE9]">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-[#F2EFE9]/85 leading-relaxed">
                    “{proj.primaryNarrative}”
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono-system text-xs">
                  <button
                    type="button"
                    onClick={() => onOpenProject(proj.slug)}
                    className="text-[#F2EFE9] hover:text-[#D97736] transition-colors"
                  >
                    {isZh ? '阅读完整 CASE STUDY →' : 'CASE STUDY →'}
                  </button>
                  <div className="flex items-center gap-4">
                    {proj.liveUrl && proj.liveUrl.startsWith('http') && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9E9689] hover:text-[#F2EFE9] inline-flex items-center gap-1"
                      >
                        <span>LIVE DEMO</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    <span className="text-[#9E9689]">{proj.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 07 / VOLUNTEER — What I cared about */}
        <section id="life-volunteer" className="py-24 border-b border-white/10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12">
            <div>
              <span className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689] block">
                07 / VOLUNTEER & LEADERSHIP
              </span>
              <h2 className="mt-2 font-serif-life italic text-3xl sm:text-5xl text-[#F2EFE9]">
                {isZh ? '我所真正在意的 · What I cared about' : 'What I cared about'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {volunteering.map((vol) => (
              <div
                key={vol.id}
                className="border-t border-white/15 pt-6 space-y-4"
              >
                <div className="font-mono-system text-xs text-[#9E9689]">
                  {vol.dates} · {vol.location}
                </div>
                <h3 className="font-serif-life italic text-2xl text-[#F2EFE9]">
                  {vol.title}
                </h3>
                <div className="text-sm text-[#D97736] leading-relaxed">
                  “{vol.whatICaredAbout}”
                </div>
                <p className="text-xs sm:text-sm text-[#9E9689] leading-relaxed">
                  {vol.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 08 / ARCHIVE & MODE SWITCH */}
        <section id="life-archive" className="pt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end justify-between">
            <div className="md:col-span-7 space-y-4">
              <div className="font-mono-system text-xs tracking-[0.2em] text-[#9E9689]">
                08 / DUAL-READING ARCHIVE
              </div>
              <h2 className="font-serif-life italic text-4xl sm:text-5xl text-[#F2EFE9]">
                {isZh
                  ? '同一个人，两种不同的阅读方式。'
                  : 'Same person. Different ways of reading.'}
              </h2>
              <p className="text-sm text-[#9E9689] max-w-xl leading-relaxed">
                {isZh
                  ? '切换到 SYSTEM 模式，阅读杨蕊嘉在港大与同济的学术训练、滴滴/意略明/民生证券实习指标，以及 LLM 计量与高频订单簿项目的完整工程拆解。'
                  : `Switch to SYSTEM to read the structured engineering, coursework, and quantitative archive of ${profile.name}.`}
              </p>
            </div>

            <div className="md:col-span-5 flex md:justify-end">
              <button
                type="button"
                onClick={onSwitchToSystem}
                className="px-6 py-4 bg-[#F2EFE9] text-[#0B0A09] font-mono-system text-xs tracking-widest hover:bg-[#D97736] hover:text-[#F2EFE9] transition-colors inline-flex items-center gap-3 whitespace-nowrap"
              >
                <span>{isZh ? '阅读 01 — SYSTEM 模式' : 'READ 01 — SYSTEM MODE'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal for Photography */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#141210] border border-white/15 p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between font-mono-system text-xs text-[#9E9689]">
                <span>
                  {selectedPhoto.placeDisplay} · {selectedPhoto.coordinates} · {selectedPhoto.date}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="text-[#F2EFE9] hover:text-[#D97736]"
                >
                  {isZh ? '关闭 [ESC / ✕]' : 'CLOSE [ESC / ✕]'}
                </button>
              </div>

              <div className="overflow-hidden max-h-[65vh] flex items-center justify-center bg-black">
                <ResilientImage
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-serif-life italic text-2xl text-[#F2EFE9]">
                  {selectedPhoto.title}
                </h3>
                <span className="font-mono-system text-xs text-[#9E9689]">
                  {selectedPhoto.cameraNote}
                </span>
              </div>
              <p className="text-sm text-[#9E9689]">{selectedPhoto.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
