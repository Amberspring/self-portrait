import { portfolioDataByLang } from './portfolioData';
import {
  originalProjectsZh,
  originalProjectsEn,
  originalVisualWorksZh,
  originalVisualWorksEn,
  originalMediaWorksZh,
  originalMediaWorksEn,
  originalWritingsZh,
  originalWritingsEn,
  originalVolunteeringZh,
  originalVolunteeringEn,
  originalMomentsZh,
  originalMomentsEn,
} from './originalProductsData';
import { Language, ProjectData, WritingEntryData } from '../types/portfolio';

/**
 * Shared Content Selectors — Same person, different ways of reading.
 * Merges the original PRD creative/product works (Medication Companion, Finger Touch Piano,
 * AI Music Record Store, etc.) with all newly added resume experiences and quantitative projects.
 */

function getMergedProjects(lang: Language): ProjectData[] {
  const original = lang === 'zh' ? originalProjectsZh : originalProjectsEn;
  const resumeProjects = portfolioDataByLang[lang].projects;
  return [...original, ...resumeProjects];
}

function getMergedWritings(lang: Language): WritingEntryData[] {
  const resumeWritings = portfolioDataByLang[lang].writings;
  const originalWritings = lang === 'zh' ? originalWritingsZh : originalWritingsEn;
  return [...resumeWritings, ...originalWritings];
}

export function getProfile(lang: Language) {
  return portfolioDataByLang[lang].profile;
}

export function getEducation(lang: Language) {
  return {
    entries: portfolioDataByLang[lang].education,
    migrationSteps: portfolioDataByLang[lang].educationMigrationSteps,
  };
}

export function getExperiences(lang: Language) {
  return portfolioDataByLang[lang].experiences;
}

export function getFeaturedProjects(lang: Language): ProjectData[] {
  return getMergedProjects(lang).filter((p) => p.featured);
}

export function getSystemProjects(lang: Language) {
  return getMergedProjects(lang).map((p) => ({
    ...p,
    primaryNarrative: p.technicalStory,
    focusQuestion: lang === 'zh' ? '系统构建与量化方法' : 'How was it built?',
  }));
}

export function getLifeProjects(lang: Language) {
  return getMergedProjects(lang).map((p) => ({
    ...p,
    primaryNarrative: p.personalStory,
    focusQuestion: lang === 'zh' ? '为什么做这个项目？' : 'Why did I make it?',
  }));
}

export function getProjectBySlug(slug: string, lang: Language): ProjectData | undefined {
  return getMergedProjects(lang).find((p) => p.slug === slug);
}

export function getCompetitions(lang: Language) {
  return portfolioDataByLang[lang].competitions;
}

export function getFeaturedWorks(lang: Language) {
  const resumeDecks = portfolioDataByLang[lang].visualWorks;
  const originalDecks = lang === 'zh' ? originalVisualWorksZh : originalVisualWorksEn;
  return [...resumeDecks, ...originalDecks];
}

export function getMediaHighlights(lang: Language) {
  const resumeMedia = portfolioDataByLang[lang].mediaWorks;
  const originalMedia = lang === 'zh' ? originalMediaWorksZh : originalMediaWorksEn;
  return [...resumeMedia, ...originalMedia];
}

export function getAllWriting(lang: Language): WritingEntryData[] {
  return getMergedWritings(lang);
}

export function getAIThinkingWriting(lang: Language) {
  return getMergedWritings(lang);
}

export function getWritingBySlug(slug: string, lang: Language): WritingEntryData | undefined {
  return getMergedWritings(lang).find((w) => w.slug === slug);
}

export function getPhotographyByPlace(
  lang: Language,
  place?: 'Tokyo' | 'Hong Kong' | 'Shanghai'
) {
  const photos = portfolioDataByLang[lang].photography;
  if (!place) return photos;
  return photos.filter((photo) => photo.place === place);
}

export function getPlacesWithConnections(lang: Language) {
  const data = portfolioDataByLang[lang];
  const allWritings = getMergedWritings(lang);
  const allMoments = getLifeMoments(lang);
  return data.places.map((place) => ({
    ...place,
    photos: data.photography.filter((p) => p.place === place.name),
    writings: allWritings.filter((w) => w.place === place.name),
    moments: allMoments.filter((m) => m.location === place.name),
  }));
}

export function getVolunteering(lang: Language) {
  const resumeVol = portfolioDataByLang[lang].volunteering;
  const origVol = lang === 'zh' ? originalVolunteeringZh : originalVolunteeringEn;
  return [...origVol, ...resumeVol];
}

export function getLifeMoments(lang: Language) {
  const resumeMoments = portfolioDataByLang[lang].lifeMoments;
  const origMoments = lang === 'zh' ? originalMomentsZh : originalMomentsEn;
  return [...resumeMoments, ...origMoments];
}
