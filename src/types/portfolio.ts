export type Language = 'zh' | 'en';
export type ReadingMode = 'entry' | 'system' | 'life';

export interface ProfileData {
  name: string;
  englishName: string;
  systemHeroHeadline: string;
  systemTrajectory: string;
  institutionTag: string;
  lifeLandingHeadline: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  skillsSummary: {
    programming: string;
    mlAndNlp: string;
    languages: string;
  };
}

export interface EducationEntryData {
  id: string;
  year: string;
  institution: string;
  degree: string;
  major: string;
  gpaOrRank?: string;
  location: string;
  selectedCoursework: string[];
  focusAreas: string[];
  narrativeStep: string;
}

export interface ExperienceMetric {
  value: string;
  label: string;
  context: string;
}

export interface ExperienceEntryData {
  id: string;
  year: string;
  company: string;
  role: string;
  location: string;
  context: string;
  responsibilities: string[];
  results: string[];
  metrics?: ExperienceMetric[];
}

export interface CaseStudySection {
  overview: string;
  problem: string;
  idea: string;
  userExperience: string;
  myRole: string;
  architecture: string;
  technology: string[];
  result: string;
  evaluation: string;
  reflection: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  code: string;
  title: string;
  year: string;
  crossDomainLabel: string;
  categories: ('AI' | 'Interactive' | 'Systems' | 'Vibe Coding')[];
  status: string;
  featured: boolean;
  oneLine: string;
  problem: string;
  idea: string;
  role: string;
  stack: string[];
  results: string[];
  highlights: string[];
  cover: string;
  screenshots?: string[];
  videoPoster?: string;
  liveUrl: string;
  githubUrl: string;
  technicalStory: string;
  personalStory: string;
  caseStudy: CaseStudySection;
}

export interface CompetitionData {
  id: string;
  index: string;
  year: string;
  name: string;
  organizer: string;
  teamSize: string;
  role: string;
  result: string;
  ranking: string;
  description: string;
}

export interface VisualWorkData {
  id: string;
  code: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  slideCount: string;
  keyTakeaway: string;
  slidesPreview: {
    slideNumber: string;
    heading: string;
    caption: string;
  }[];
}

export interface MediaWorkData {
  id: string;
  slug: string;
  code: string;
  title: string;
  platform: string;
  year: string;
  role: string;
  metricHighlight?: {
    value: string;
    unit: string;
  };
  cover: string;
  summary: string;
  lifeStory: string;
  creativeProcess: string;
  targetAudience: string;
  originalUrl: string;
}

export interface WritingEntryData {
  id: string;
  slug: string;
  index: string;
  title: string;
  year: string;
  date: string;
  category: string;
  place?: string;
  excerpt: string;
  readTime: string;
  content: string[];
}

export interface PhotoEntryData {
  id: string;
  title: string;
  place: 'Tokyo' | 'Hong Kong' | 'Shanghai';
  placeDisplay: string;
  coordinates: string;
  date: string;
  year: number;
  image: string;
  aspectRatio: '4:3' | '3:4' | '16:9';
  rotationDeg: number;
  caption: string;
  cameraNote: string;
}

export interface PlaceChapterData {
  id: string;
  name: 'Tokyo' | 'Hong Kong' | 'Shanghai';
  displayName: string;
  coordinates: string;
  period: string;
  chapterNote: string;
  memoryFragment: string;
}

export interface VolunteerEntryData {
  id: string;
  title: string;
  organization: string;
  location: string;
  dates: string;
  whatICaredAbout: string;
  description: string;
}

export interface LifeMomentData {
  id: string;
  label: string;
  location: string;
  date: string;
  image: string;
  note: string;
}
