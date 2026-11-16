export interface Project {
  id: string;
  num: string;
  title: string;
  statusText: string;
  statusCategory: string;
  statusIndicatorColor?: string;
  tags: string[];
  description: string;
  repoUrl?: string;
  clientLabel?: string;
  isSlider?: boolean;
  terminalCommand?: string;
  terminalLines?: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  client?: string;
  role: string;
  badge: string;
  bullets: string[];
  skills?: string[];
}

export interface SecondaryExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  badge: string;
  detail: string;
  skills: string[];
}

export interface StackCategory {
  title: string;
  badge: string;
  skills: {
    name: string;
    tags: string[];
    detail: string;
  }[];
}

export interface MethodologyStep {
  step: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster: string;
  ratio: 'vertical' | 'landscape' | 'square';
  tag: string;
  title: string;
  titleEs: string;
  desc?: string;
  descEs?: string;
  meta: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ScenarioSpec {
  name: string;
  duration: number;
  assertion: string;
}

export interface ScenarioSuite {
  id: 'e2e' | 'api' | 'a11y' | 'cicd' | 'perf';
  pillLabel: string;
  title: string;
  specFile: string;
  omniboxUrl: string;
  statusBadge: string;
  engineBadge: string;
  totalSpecs: number;
  specs: ScenarioSpec[];
  asciiType: 'PASSED' | 'API' | 'A11Y' | 'PIPELINE' | 'PERF';
  summaryItems: string[];
}
