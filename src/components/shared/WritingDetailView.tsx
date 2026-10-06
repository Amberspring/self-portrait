import React from 'react';
import { getWritingBySlug } from '../../content/selectors';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

interface WritingDetailViewProps {
  slug: string;
  originMode: 'system' | 'life';
  onBack: () => void;
  onSwitchMode: (mode: 'system' | 'life') => void;
}

export const WritingDetailView: React.FC<WritingDetailViewProps> = ({
  slug,
  originMode,
  onBack,
  onSwitchMode,
}) => {
  const { lang, setLang } = useLanguage();
  const isZh = lang === 'zh';
  const article = getWritingBySlug(slug, lang);
  const isLife = originMode === 'life';

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F5F2] text-[#111111] flex flex-col items-center justify-center p-8">
        <p className="font-mono-system text-sm text-[#747474]">
          {isZh ? '未找到该文章' : 'ESSAY NOT FOUND'}
        </p>
        <button
          onClick={onBack}
          className="mt-4 font-mono-system text-xs underline underline-offset-4"
        >
          ← {isZh ? '返回' : 'RETURN'}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isLife
          ? 'bg-[#0B0A09] text-[#F2EFE9]'
          : 'bg-[#F5F5F2] text-[#111111]'
      }`}
    >
      <header
        className={`sticky top-0 z-30 backdrop-blur-md border-b px-6 md:px-12 py-4 flex items-center justify-between ${
          isLife
            ? 'bg-[#0B0A09]/85 border-white/10'
            : 'bg-[#F5F5F2]/90 border-black/10'
        }`}
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono-system text-xs tracking-wider hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            {isZh
              ? `返回 ${originMode.toUpperCase()}`
              : `BACK TO ${originMode.toUpperCase()}`}
          </span>
        </button>

        <div className="font-mono-system text-xs opacity-60 hidden sm:block">
          {article.index} / {article.category.toUpperCase()}
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 font-mono-system text-xs">
            <button
              type="button"
              onClick={() => setLang('zh')}
              className={`px-1.5 py-0.5 ${
                isZh ? 'font-semibold underline underline-offset-4' : 'opacity-50'
              }`}
            >
              中
            </button>
            <span className="opacity-40">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 ${
                !isZh ? 'font-semibold underline underline-offset-4' : 'opacity-50'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => onSwitchMode(isLife ? 'system' : 'life')}
            className="font-mono-system text-xs opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            {isZh
              ? `切换至 ${isLife ? 'SYSTEM' : 'LIFE'} ↗`
              : `READ IN ${isLife ? 'SYSTEM' : 'LIFE'} ↗`}
          </button>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <div className="font-mono-system text-xs tracking-widest opacity-60 flex items-center gap-2">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.category}</span>
          {article.place && (
            <>
              <span>·</span>
              <span>{article.place}</span>
            </>
          )}
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h1
          className={`mt-6 text-3xl sm:text-5xl leading-tight ${
            isLife
              ? 'font-serif-life italic font-normal tracking-wide'
              : 'font-sans-system font-semibold tracking-tight'
          }`}
        >
          {article.title}
        </h1>

        <div className="mt-12 space-y-6 text-base sm:text-lg leading-relaxed opacity-90">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};
