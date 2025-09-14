// Global type definitions for the portfolio website

export interface Project {
  id: string;
  title: string;
  description: string;
  logo: string;
  image: string | null;
  categories: string[];
  tags: string[];
  links: Array<{
    label: string;
    url: string;
  }>;
  details: {
    overview: string;
    technologies: string[];
    features: string[];
    challenges: string[];
    solutions: string[];
  };
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface HeroContent {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  ctas: Array<{
    id: string;
    label: string;
    action: 'scroll' | 'download' | 'external';
    target: string;
    primary: boolean;
    icon: string;
  }>;
}

export interface AboutContent {
  education: string;
  description: string;
  skills: string;
  contactMessage: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
  count: number;
}

export interface NavigationContent {
  sections: string[];
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  gallery: GalleryContent;
  social: SocialLink[];
  navigation: NavigationContent;
  projectCategories: ProjectCategory[];
}

// Component Props Interfaces
export interface NavBarProps {
  onNavigate: (sectionId: string) => void;
}

export interface ProjectFilterProps {
  categories: ProjectCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export interface LoadingSpinnerProps {
  size?: 'normal' | 'large';
  text?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Gallery Types
export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  camera?: string;
  settings?: string;
  aspectRatio?: number; // width/height for masonry layout
}

export interface GalleryContent {
  photos: Photo[];
}

// Utility Types
export type SubmitStatus = 'idle' | 'success' | 'error';
export type SectionId = 'about' | 'journey' | 'projects' | 'gallery' | 'connect';

// Service Worker Types
export interface CacheConfig {
  name: string;
  version: string;
  staticAssets: string[];
  dynamicAssets: string[];
}

export interface SyncEvent {
  tag: string;
  data?: any;
}

// Analytics and Performance Types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  cacheHitRate: number;
}

export interface SEOMetrics {
  title: string;
  description: string;
  keywords: string[];
  structuredData: object;
}