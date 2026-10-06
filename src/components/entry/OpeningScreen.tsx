import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLanguage } from '../../context/LanguageContext';
import { IMG_TOKYO, IMG_HK } from '../../content/portfolioData';

interface OpeningScreenProps {
  onSelectMode: (mode: 'system' | 'life') => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onSelectMode }) => {
  const { lang, setLang } = useLanguage();
  const isZh = lang === 'zh';
  const prefersReducedMotion = useReducedMotion();

  const questionText = isZh
    ? '你想以何种方式阅读我？'
    : 'How would you like to read me?';

  const [typedLength, setTypedLength] = useState(
    prefersReducedMotion ? questionText.length : 0
  );
  const [showChoices, setShowChoices] = useState(prefersReducedMotion);
  const [hoveredPortal, setHoveredPortal] = useState<'system' | 'life' | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 42, y: 118 });
  const [transitioningTo, setTransitioningTo] = useState<'system' | 'life' | null>(null);

  // Reset or complete typing when language changes
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedLength(questionText.length);
      setShowChoices(true);
      return;
    }
    if (showChoices) {
      setTypedLength(questionText.length);
    }
  }, [lang, questionText.length, prefersReducedMotion, showChoices]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedLength(questionText.length);
      setShowChoices(true);
      return;
    }

    if (typedLength < questionText.length) {
      const currentChar = questionText[typedLength];
      const delay = currentChar === ' ' ? 95 : isZh ? 90 : 55;
      const timer = setTimeout(() => {
        setTypedLength((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const choiceTimer = setTimeout(() => {
        setShowChoices(true);
      }, 350);
      return () => clearTimeout(choiceTimer);
    }
  }, [typedLength, questionText, prefersReducedMotion, isZh]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = Math.round((e.clientX / window.innerWidth) * 200);
    const y = Math.round((e.clientY / window.innerHeight) * 200);
    setMouseCoords({ x, y });
  };

  const triggerModeSelect = (mode: 'system' | 'life') => {
    if (prefersReducedMotion) {
      onSelectMode(mode);
      return;
    }
    setTransitioningTo(mode);
    setTimeout(() => {
      onSelectMode(mode);
    }, 620);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#070707] text-[#F5F5F2] flex flex-col justify-center items-center overflow-hidden select-none px-6"
    >
      {/* Top-right quiet Language Switcher */}
      <div className="absolute top-8 right-6 md:right-12 z-20 flex items-center gap-2 font-mono-system text-xs tracking-widest">
        <button
          type="button"
          onClick={() => setLang('zh')}
          className={`px-2 py-1 transition-colors ${
            isZh ? 'text-[#F5F5F2] font-medium underline underline-offset-4' : 'text-white/40 hover:text-white/80'
          }`}
        >
          中
        </button>
        <span className="text-white/25">/</span>
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`px-2 py-1 transition-colors ${
            !isZh ? 'text-[#F5F5F2] font-medium underline underline-offset-4' : 'text-white/40 hover:text-white/80'
          }`}
        >
          EN
        </button>
      </div>

      {/* Subtle Ambient Hover Preview Layer: SYSTEM */}
      <AnimatePresence>
        {(hoveredPortal === 'system' || transitioningTo === 'system') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: transitioningTo === 'system' ? 1 : 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(245,245,242,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,245,242,0.06) 1px, transparent 1px)',
                backgroundSize: '72px 72px',
              }}
            />
            <div className="absolute top-12 left-12 right-12 h-px bg-white/10" />
            <div className="absolute bottom-12 left-12 right-12 h-px bg-white/10" />
            <div className="absolute top-12 bottom-12 left-12 w-px bg-white/10" />
            <div className="absolute top-12 bottom-12 right-12 w-px bg-white/10" />

            <div className="absolute top-16 left-16 font-mono-system text-[11px] tracking-widest text-white/40 space-y-1">
              <div>SYS_01</div>
              <div>PROFILE // 杨蕊嘉 FLORA YEUNG</div>
              <div>X {String(mouseCoords.x).padStart(3, '0')}</div>
              <div>Y {String(mouseCoords.y).padStart(3, '0')}</div>
            </div>

            <div className="absolute bottom-16 right-16 font-mono-system text-[11px] tracking-widest text-white/40 text-right space-y-1">
              <div>HKU CS × TONGJI MATH FINANCE</div>
              <div>INDEX_READY</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Ambient Hover Preview Layer: LIFE */}
      <AnimatePresence>
        {(hoveredPortal === 'life' || transitioningTo === 'life') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: transitioningTo === 'life' ? 1 : 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full blur-[130px] transition-transform duration-700"
              style={{
                background:
                  'radial-gradient(circle, rgba(217,119,54,0.26) 0%, rgba(154,52,18,0.12) 50%, transparent 75%)',
                transform: `translate(${(mouseCoords.x - 100) * -0.4}px, ${(mouseCoords.y - 100) * -0.4}px)`,
              }}
            />
            <div
              className="absolute -bottom-40 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] transition-transform duration-700"
              style={{
                background:
                  'radial-gradient(circle, rgba(56,118,142,0.20) 0%, rgba(28,45,66,0.08) 55%, transparent 75%)',
                transform: `translate(${(mouseCoords.x - 100) * 0.3}px, ${(mouseCoords.y - 100) * 0.3}px)`,
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
              animate={{ opacity: 0.28, scale: 1, rotate: -2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block absolute top-[18%] right-[14%] w-56 aspect-[4/3] overflow-hidden"
            >
              <img
                src={IMG_TOKYO}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[20%] contrast-110"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
              animate={{ opacity: 0.22, scale: 1, rotate: 2.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="hidden md:block absolute bottom-[16%] left-[12%] w-44 aspect-[3/4] overflow-hidden"
            >
              <img
                src={IMG_HK}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[15%]"
              />
            </motion.div>

            <div className="film-grain absolute inset-0" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Transition Overlay Curtain */}
      <AnimatePresence>
        {transitioningTo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${
              transitioningTo === 'system' ? 'bg-[#F5F5F2] text-[#111111]' : 'bg-[#0B0A09] text-[#F2EFE9]'
            }`}
          >
            {transitioningTo === 'system' ? (
              <div className="font-mono-system text-xs tracking-[0.25em] uppercase">
                {isZh ? '正在载入 SYSTEM 结构化档案...' : 'INITIALIZING SYSTEM ARCHIVE...'}
              </div>
            ) : (
              <div className="font-serif-life italic text-2xl tracking-wide text-[#F2EFE9]/90">
                {isZh ? '正在进入 LIFE 个人空间...' : 'Entering personal archive...'}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-start md:items-center">
        <div className="font-mono-system text-xs tracking-[0.22em] text-white/40 mb-4">
          How would you like to read me?
        </div>

        <h1
          className={`text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#F5F5F2] mb-16 md:mb-24 transition-all duration-300 ${
            hoveredPortal === 'life' ? 'font-serif-life italic font-normal' : 'font-sans-system font-medium'
          }`}
        >
          <span>{questionText.slice(0, typedLength)}</span>
          {!prefersReducedMotion && typedLength < questionText.length && (
            <span className="inline-block w-[2px] h-[1em] bg-[#F5F5F2]/80 ml-1 align-middle animate-pulse" />
          )}
        </h1>

        {/* Two Spatial Entry Portals */}
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 transition-opacity duration-700 ${
            showChoices ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* 01 — SYSTEM Portal */}
          <button
            type="button"
            onClick={() => triggerModeSelect('system')}
            onMouseEnter={() => setHoveredPortal('system')}
            onMouseLeave={() => setHoveredPortal(null)}
            onFocus={() => setHoveredPortal('system')}
            onBlur={() => setHoveredPortal(null)}
            className="group text-left border-t border-white/15 pt-6 pb-4 transition-colors duration-300 hover:border-white/70 focus-visible:outline-none focus-visible:border-white"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono-system text-xs tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
                01 — SYSTEM
              </span>
              <span className="font-mono-system text-[11px] text-white/30 group-hover:text-white/80 group-hover:translate-x-1 transition-all">
                {isZh ? '进入 ↗' : 'ENTER ↗'}
              </span>
            </div>

            <div className="mt-4 font-sans-system text-xl sm:text-2xl font-medium text-[#F5F5F2] tracking-tight">
              {isZh ? '以结构化、理性的方式读我。' : 'A structured way to read me.'}
            </div>
            <div className="mt-1 font-mono-system text-xs text-white/40">
              A structured way to read me.
            </div>

            <p className="mt-4 font-mono-system text-xs text-white/45 leading-relaxed">
              {isZh
                ? '教育经历 · 实习经历 · 量化与 AI 项目 · 竞赛获奖 · 视觉传达 · 新媒体 · AI + 计算'
                : 'Education · Experience · Projects · Competitions · Visual Communication · AI + Computing'}
            </p>
          </button>

          {/* 02 — LIFE Portal */}
          <button
            type="button"
            onClick={() => triggerModeSelect('life')}
            onMouseEnter={() => setHoveredPortal('life')}
            onMouseLeave={() => setHoveredPortal(null)}
            onFocus={() => setHoveredPortal('life')}
            onBlur={() => setHoveredPortal(null)}
            className="group text-left border-t border-white/15 pt-6 pb-4 transition-colors duration-300 hover:border-[#D97736]/80 focus-visible:outline-none focus-visible:border-[#D97736]"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono-system text-xs tracking-[0.2em] text-white/50 group-hover:text-[#D97736] transition-colors">
                02 — LIFE
              </span>
              <span className="font-mono-system text-[11px] text-white/30 group-hover:text-[#D97736] group-hover:translate-x-1 transition-all">
                {isZh ? '进入 ↗' : 'ENTER ↗'}
              </span>
            </div>

            <div className="mt-4 font-serif-life italic text-2xl sm:text-3xl text-[#F5F5F2] tracking-wide group-hover:text-[#F2EFE9]">
              {isZh ? '以更私人、感性的方式读我。' : 'A more personal way to read me.'}
            </div>
            <div className="mt-1 font-mono-system text-xs text-white/40">
              A more personal way to read me.
            </div>

            <p className="mt-4 font-sans-system text-xs text-white/45 leading-relaxed">
              {isZh
                ? '日常切片 · 城市章节 · 摄影 · 文字 · BIE 别的编辑部 · 社会实践与志愿 · 档案'
                : 'Places · Photography · Words · Media · Creative Projects · Volunteering · Archive'}
            </p>
          </button>
        </div>
      </div>

      {/* Quiet bottom thesis statement */}
      <AnimatePresence>
        {showChoices && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="absolute bottom-8 left-6 right-6 flex flex-wrap justify-between items-center gap-4 max-w-4xl mx-auto font-mono-system text-[11px] tracking-widest text-white/60"
          >
            <span>杨蕊嘉 FLORA YEUNG · HKU / TONGJI</span>
            <span>
              {isZh
                ? '同一个人，两种不同的阅读方式 · SAME PERSON. DIFFERENT WAYS OF READING.'
                : 'SAME PERSON. DIFFERENT WAYS OF READING.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
