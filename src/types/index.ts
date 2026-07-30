export * from './database';

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  college?: string;
  content: string;
  rating: number;
  category: 'student' | 'faculty' | 'industry' | 'winner';
  initials: string;
}

export interface Speaker {
  name: string;
  title: string;
  company: string;
  topic: string;
  tag: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  type: string;
  duration: string;
  venue: string;
}
