import React from 'react';
import { getProjectBySlug } from '../../content/selectors';
import { useLanguage } from '../../context/LanguageContext';
import { ResilientImage } from '../shared/ResilientImage';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface ProjectCaseStudyViewProps {
  slug: string;
  originMode: 'system' | 'life';
  onBack: () => void;
  onSwitchMode: (mode: 'system' | 'life') => void;
}

export const ProjectCaseStudyView: React.FC<ProjectCaseStudyViewProps> = ({
  slug,
  originMode,
  onBack,
  onSwitchMode,
}) => {
  const { lang, setLang } = useLanguage();
  const isZh = lang === 'zh';
  const project = getProjectBySlug(slug, lang);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F5F2] text-[#111111] flex flex-col items-center justify-center p-8">
        <p className="font-mono-system text-sm text-[#747474]">
          {isZh ? '未找到该项目档案' : 'PROJECT ARCHIVE NOT FOUND'}
        </p>
        <button
          onClick={onBack}
          className="mt-4 font-mono-system text-xs underline underline-offset-4"
        >
          ← {isZh ? '返回作品集' : 'RETURN TO PORTFOLIO'}
        </button>
      </div>
    );
  }

  const cs = project.caseStudy;

  const caseStudySteps = isZh
    ? [
        { num: '01', title: '项目概览 / Overview', body: cs.overview },
        { num: '02', title: '核心问题 / Problem', body: cs.problem },
        { num: '03', title: '解决思路 / Idea', body: cs.idea },
        { num: '04', title: '交付与交互 / Experience', body: cs.userExperience },
        { num: '05', title: '我的角色 / My Role', body: cs.myRole },
        { num: '06', title: '系统架构 / Architecture', body: cs.architecture },
        { num: '07', title: '核心技术栈 / Technology', body: cs.technology.join(' · ') },
        { num: '08', title: '量化成果 / Result', body: cs.result },
        { num: '09', title: '检验与评估 / Evaluation', body: cs.evaluation },
        { num: '10', title: '复盘思考 / Reflection', body: cs.reflection },
      ]
    : [
        { num: '01', title: 'Overview', body: cs.overview },
        { num: '02', title: 'Problem', body: cs.problem },
        { num: '03', title: 'Idea', body: cs.idea },
        { num: '04', title: 'User Experience', body: cs.userExperience },
        { num: '05', title: 'My Role', body: cs.myRole },
        { num: '06', title: 'Architecture', body: cs.architecture },
        { num: '07', title: 'Technology', body: cs.technology.join(' · ') },
        { num: '08', title: 'Result', body: cs.result },
        { num: '09', title: 'Evaluation', body: cs.evaluation },
        { num: '10', title: 'Reflection', body: cs.reflection },
      ];

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#111111] font-sans-system selection:bg-[#111111] selection:text-[#F5F5F2]">
      {/* Clean 3-Zone Top Bar */}
      <header className="sticky top-0 z-30 bg-[#F5F5F2]/90 backdrop-blur-md border-b border-black/10 px-6 md:px-12 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono-system text-xs tracking-wider text-[#111111] hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            {isZh
              ? `返回 ${originMode.toUpperCase()}`
              : `BACK TO ${originMode.toUpperCase()}`}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6 font-mono-system text-xs text-[#747474]">
          <span>{project.code}</span>
          <span>·</span>
          <span>{project.crossDomainLabel}</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 font-mono-system text-xs">
            <button
              type="button"
              onClick={() => setLang('zh')}
              className={`px-1.5 py-0.5 ${
                isZh ? 'text-[#111111] font-semibold underline underline-offset-4' : 'text-[#747474]'
              }`}
            >
              中
            </button>
            <span className="text-[#747474]">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 ${
                !isZh ? 'text-[#111111] font-semibold underline underline-offset-4' : 'text-[#747474]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => onSwitchMode(originMode === 'system' ? 'life' : 'system')}
            className="font-mono-system text-xs text-[#747474] hover:text-[#111111] transition-colors whitespace-nowrap"
          >
            {isZh
              ? `切换至 ${originMode === 'system' ? 'LIFE' : 'SYSTEM'} ↗`
              : `READ IN ${originMode === 'system' ? 'LIFE' : 'SYSTEM'} ↗`}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header Metadata */}
        <div className="font-mono-system text-xs tracking-widest text-[#747474] flex flex-wrap items-center gap-2">
          <span>{project.code}</span>
          <span>/</span>
          <span>{project.crossDomainLabel}</span>
          <span>/</span>
          <span>{project.status}</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111] max-w-3xl">
          {project.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#111111]/80 max-w-2xl leading-relaxed">
          {project.oneLine}
        </p>

        {/* Key Quantitative Results Banner */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.results.map((res, idx) => (
            <div
              key={idx}
              className="border-l-2 border-[#111111] pl-4 py-1 text-sm text-[#111111]/90 leading-relaxed"
            >
              {res}
            </div>
          ))}
        </div>

        {/* Cover Visual */}
        <div className="mt-12 overflow-hidden border border-black/10 bg-[#EBEBE6]">
          <ResilientImage
            src={project.cover}
            alt={project.title}
            className="w-full aspect-video"
          />
        </div>

        {/* Dual Perspective Comparison: SYSTEM vs LIFE Story */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-black/10">
          <div>
            <div className="font-mono-system text-xs tracking-widest text-[#747474] uppercase">
              {isZh
                ? 'SYSTEM 视角 // 系统构建与量化方法'
                : 'SYSTEM LENS // HOW WAS IT BUILT?'}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#111111]/90">
              {project.technicalStory}
            </p>
          </div>
          <div className="md:border-l md:border-black/10 md:pl-8">
            <div className="font-mono-system text-xs tracking-widest text-[#747474] uppercase">
              {isZh
                ? 'LIFE 视角 // 为什么做这个项目？'
                : 'LIFE LENS // WHY DID I MAKE IT?'}
            </div>
            <p className="mt-3 font-serif-life italic text-xl leading-relaxed text-[#111111]">
              “{project.personalStory}”
            </p>
          </div>
        </div>

        {/* 10-Section Structured Case Study */}
        <div className="mt-16 divide-y divide-black/10">
          {caseStudySteps.map((step) => (
            <div
              key={step.num}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="font-mono-system text-xs text-[#747474]">{step.num}</span>
                <h2 className="text-base font-semibold tracking-tight text-[#111111]">
                  {step.title}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base leading-relaxed text-[#111111]/85 max-w-[68ch]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-black/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono-system text-xs text-[#747474] block">
              {isZh ? '独立项目与代码归档' : 'STANDALONE REPOSITORY & ARCHIVE'}
            </span>
            <span className="text-lg font-medium text-[#111111]">
              {project.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {project.liveUrl && project.liveUrl.startsWith('http') && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#111111] text-[#F5F5F2] font-mono-system text-xs tracking-wider hover:bg-[#111111]/85 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>{isZh ? '访问独立网站 / LIVE WEBSITE' : 'LIVE WEBSITE'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-black/20 text-[#111111] font-mono-system text-xs tracking-wider hover:border-[#111111] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 border border-black/20 text-[#747474] hover:text-[#111111] font-mono-system text-xs tracking-wider transition-colors inline-flex items-center gap-2 whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isZh ? '返回列表' : 'BACK'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
