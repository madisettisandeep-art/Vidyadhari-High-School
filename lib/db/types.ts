export type LeadStatus = 'NEW' | 'CONTACTED' | 'FOLLOW-UP' | 'CAMPUS VISIT' | 'QUALIFIED' | 'CONVERTED' | 'LOST';

export interface AdmissionEnquiry {
  id: string; // e.g. VHS-ENQ-2026-001
  parentName: string;
  phone: string;
  email: string;
  studentName: string;
  currentClass: string;
  classSeeking: string;
  previousSchool?: string;
  preferredContactTime: string;
  preferredVisitDate?: string;
  notes?: string;
  adminNotes?: string;
  status: LeadStatus;
  createdAt: string;
  source: 'WEBSITE_HERO' | 'ADMISSION_PAGE' | 'WHATSAPP_FUNNEL' | 'AI_ASSISTANT';
}

export interface CampusVisitBooking {
  id: string; // e.g. VHS-VST-2026-001
  parentName: string;
  phone: string;
  email: string;
  studentName: string;
  classSeeking: string;
  visitDate: string;
  visitTimeSlot: string;
  message?: string;
  adminNotes?: string;
  status: 'New' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Follow-up Required';
  createdAt: string;
}

export interface CampusLocation {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  verified: boolean;
  statusLabel: string;
  hotspots?: { x: number; y: number; label: string; info: string }[];
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  subject: string;
  qualification: string;
  experience: string;
  bio: string;
  photoUrl: string;
  isVerifiedPlaceholder: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'ACADEMICS' | 'SPORTS' | 'CULTURAL' | 'COMPETITIONS';
  year: string;
  description: string;
  badge: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Classrooms' | 'Students' | 'Events' | 'Sports' | 'Science' | 'Arts' | 'Celebrations';
  imageUrl: string;
  caption: string;
}

export interface DayTimelineItem {
  id: string;
  time: string;
  phase: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SchoolSettings {
  schoolName: string;
  tagline: string;
  establishedPlaceholder: string;
  locationAddress: string;
  phone: string;
  admissionsPhone: string;
  emailPlaceholder: string;
  academicYear: string;
  admissionsOpen: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  heroSupportingLine: string;
  announcementBanner: string;
  instagramUrl: string;
  googleMapsEmbedUrl: string;
}
