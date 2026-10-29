import fs from 'fs';
import path from 'path';
import {
  AdmissionEnquiry,
  CampusVisitBooking,
  CampusLocation,
  FacultyMember,
  AchievementItem,
  GalleryItem,
  DayTimelineItem,
  SchoolSettings
} from './types';

// Default Verified & CMS Placeholder Data
const defaultSettings: SchoolSettings = {
  schoolName: "Vidyadhari High School",
  tagline: "Your Future Begins Here",
  establishedPlaceholder: "[School-provided information]",
  locationAddress: "Vidyadhari Colony, Bhimaram Rural, Telangana 506015, India",
  phone: "+91 91009 01966",
  admissionsPhone: "+91 91009 01966",
  emailPlaceholder: "admissions@vidyadharischool.com [Pending school mailbox verification]",
  academicYear: "2026 – 2027",
  admissionsOpen: true,
  heroHeadline: "WHERE CURIOUS MINDS GROW",
  heroSubheadline: "Vidyadhari High School",
  heroSupportingLine: "Your Future Begins Here.",
  announcementBanner: "Admissions Open for Academic Year 2026–2027. Book your personalized campus walkthrough today.",
  instagramUrl: "https://www.instagram.com/vidyadhari_school/",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.195048590623!2d79.544773!3d18.016259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334ff7f41f715b%3A0x6a2c2ef72f1cf1d2!2sVidyadhari%20High%20School!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

const defaultLocations: CampusLocation[] = [
  {
    id: "loc-1",
    number: "01",
    name: "Campus Welcome & Main Gates",
    tagline: "The threshold of discipline and discovery",
    description: "The grand entrance of Vidyadhari High School provides a secure, welcoming environment monitored round-the-clock, framing the tree-lined campus walkways.",
    features: ["Secure check-in point", "Student welcome foyer", "Tree-lined walkways"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Primary Campus Entrance",
    hotspots: [
      { x: 35, y: 48, label: "Security & Visitor Check-in", info: "24/7 guarded security desk and visitor logging." },
      { x: 65, y: 55, label: "Campus Walkway", info: "Paved avenues leading to academic blocks." }
    ]
  },
  {
    id: "loc-2",
    number: "02",
    name: "Interactive Classrooms",
    tagline: "Spaces engineered for focus and collaboration",
    description: "Well-ventilated, naturally lit learning spaces designed with ergonomic seating and modern visual presentation aids to promote student engagement.",
    features: ["Natural ventilation", "Ergonomic desks", "Visual teaching aids"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Academic Spaces",
    hotspots: [
      { x: 45, y: 40, label: "Active Learning Zone", info: "Arranged for interactive group discussions and teacher mentorship." }
    ]
  },
  {
    id: "loc-3",
    number: "03",
    name: "Science & Discovery Hub",
    tagline: "Where curiosity transforms into scientific method",
    description: "Dedicated space for hands-on experimentation, analytical demonstrations, and student project investigations.",
    features: ["Experimentation apparatus", "Safety-first protocols", "STEM project benches"],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Experimentation Wing",
    hotspots: [
      { x: 50, y: 52, label: "Practical Demonstration Table", info: "Equipped for physics, chemistry, and biology demonstrations." }
    ]
  },
  {
    id: "loc-4",
    number: "04",
    name: "Sports & Athletics Arena",
    tagline: "Building stamina, resilience and team spirit",
    description: "Dedicated outdoor play grounds encouraging daily physical education, athletic training, and house sporting leagues.",
    features: ["Running track & turf", "Cricket/Kho-Kho practice pitch", "Supervised fitness sessions"],
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Outdoor Recreation Grounds",
    hotspots: [
      { x: 58, y: 62, label: "Multi-Sport Ground", info: "Outdoor field for daily drills and intramural sports." }
    ]
  },
  {
    id: "loc-5",
    number: "05",
    name: "Arts & Cultural Studio",
    tagline: "Nurturing creative expression and cultural roots",
    description: "Multi-purpose activity space for Bathukamma festivities, folk dances, musical recitals, drama, and fine arts rehearsals.",
    features: ["Acoustic rehearsal room", "Fine art display panels", "Stage performance arena"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Creative Arts Wing"
  },
  {
    id: "loc-6",
    number: "06",
    name: "Knowledge Resource & Reading Zone",
    tagline: "Quiet sanctuary for deep study and imagination",
    description: "Curated collection of reference encyclopedias, literature, and periodicals promoting sustained reading habits from early childhood.",
    features: ["Silent reading zone", "Reference section", "Lending library"],
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Learning Center"
  },
  {
    id: "loc-7",
    number: "07",
    name: "Assembly & Community Courtyard",
    tagline: "The heartbeat of school pride and unity",
    description: "Central gathering arena where daily morning assemblies, national commemorations, and student recognitions occur under the open sky.",
    features: ["Podium & public address system", "Morning pledge assembly", "Annual day staging"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Central Courtyard"
  },
  {
    id: "loc-8",
    number: "08",
    name: "Student Innovation & Maker Corner",
    tagline: "Hands-on model building and problem solving",
    description: "Collaborative station for science exhibitions, robotics models, craft creations, and regional competition preparations.",
    features: ["Project toolkits", "Display showcase", "Peer teamwork desks"],
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Applied Learning"
  },
  {
    id: "loc-9",
    number: "09",
    name: "Admissions & Counseling Suite",
    tagline: "Personalized guidance for prospective families",
    description: "Comfortable, confidential counseling lounge where parents meet faculty coordinators, review curriculum details, and finalize enrollment steps.",
    features: ["Parent hospitality lounge", "Individual counseling desks", "Instant digital enquiry processing"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    statusLabel: "Visitor Welcome Wing"
  }
];

const defaultDayTimeline: DayTimelineItem[] = [
  {
    id: "day-1",
    time: "08:30 AM",
    phase: "ARRIVAL & UNITY",
    title: "Morning Assembly & Cultural Invocation",
    description: "Students assemble for the school prayer, national anthem, news brief, and morning motivational address.",
    iconName: "Sun"
  },
  {
    id: "day-2",
    time: "09:00 AM",
    phase: "CORE LEARNING",
    title: "Academic Focus & Concept Mastery",
    description: "Engaging classroom instruction focusing on foundational mathematics, languages, and sciences with interactive teacher demonstrations.",
    iconName: "BookOpen"
  },
  {
    id: "day-3",
    time: "11:00 AM",
    phase: "ENQUIRY & PRACTICE",
    title: "Applied Experiments & Problem Solving",
    description: "Hands-on laboratory work, language laboratory reading, and guided mathematical problem worksheets.",
    iconName: "FlaskConical"
  },
  {
    id: "day-4",
    time: "12:45 PM",
    phase: "NOURISHMENT & RECHARGE",
    title: "Wholesome Lunch & Community Socialization",
    description: "Supervised lunch hour where students share meals, build lifelong friendships, and take a refreshing walk in the campus courtyard.",
    iconName: "Coffee"
  },
  {
    id: "day-5",
    time: "01:30 PM",
    phase: "EXPRESSION & SKILLS",
    title: "Arts, Cultural Practice & Co-Curriculars",
    description: "Fine arts, vocal music, traditional Telangana cultural dance practices (e.g. Bathukamma), and communicative drama.",
    iconName: "Palette"
  },
  {
    id: "day-6",
    time: "02:45 PM",
    phase: "ENERGY & LEADERSHIP",
    title: "Physical Education & Team Sports",
    description: "Supervised outdoor drills, cricket nets, kho-kho matches, and track exercises building stamina and sportsmanship.",
    iconName: "Trophy"
  },
  {
    id: "day-7",
    time: "03:45 PM",
    phase: "SYNTHESIS & DISMISSAL",
    title: "Daily Reflection, Diary Note & Departure",
    description: "Review of daily learning milestones, assignment alignment in student handbooks, and safe, orderly departure via school gates.",
    iconName: "Sparkles"
  }
];

const defaultAchievements: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Regional Science & Innovation Exhibition",
    category: "ACADEMICS",
    year: "2025–26",
    description: "Vidyadhari students presented working prototypes addressing local environmental solutions and clean energy models.",
    badge: "Regional Merit Recognition",
    verified: true
  },
  {
    id: "ach-2",
    title: "Inter-School Athletic Championship",
    category: "SPORTS",
    year: "2025",
    description: "Podium finishes in 100m sprint, relay championships, and district kho-kho tournament.",
    badge: "District Runners-Up",
    verified: true
  },
  {
    id: "ach-3",
    title: "Telangana Cultural Heritage & Bathukamma Showcase",
    category: "CULTURAL",
    year: "2024–25",
    description: "Acclaimed school-wide cultural presentation celebrating Telangana folklore, floral rangoli, and traditional songs.",
    badge: "Special Cultural Honour",
    verified: true
  },
  {
    id: "ach-4",
    title: "National Talent & Mathematics Olympiad",
    category: "COMPETITIONS",
    year: "2025",
    description: "Commendable percentile standings achieved by Vidyadhari high school students in state-level scholastic aptitude tests.",
    badge: "Certificate of Distinction",
    verified: true
  }
];

const defaultGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Sunlit Campus Architecture & Tree-Lined Walkways",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=85",
    caption: "Lush green tree-canopied pathways framing Vidyadhari High School in Bhimaram."
  },
  {
    id: "gal-2",
    title: "Interactive Classroom & Collaborative Discussion",
    category: "Classrooms",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85",
    caption: "Engaging, sunlit classroom environments where students voice their ideas."
  },
  {
    id: "gal-3",
    title: "Athletics Sprint Championships & Field Day",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=85",
    caption: "Celebrating determination, teamwork, and athletic stamina on the green turf."
  },
  {
    id: "gal-4",
    title: "Telangana Bathukamma Cultural Festivities",
    category: "Celebrations",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=85",
    caption: "Vibrant community celebrations honoring rich Telangana cultural traditions."
  },
  {
    id: "gal-5",
    title: "Hands-on Science Explorations & Chemical Reactions",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=85",
    caption: "Guided laboratory experiments developing critical analytical thinking."
  },
  {
    id: "gal-6",
    title: "Fine Arts & Visual Sketching Studio",
    category: "Arts",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=85",
    caption: "Fostering creative confidence through painting, pottery, and sketching."
  },
  {
    id: "gal-7",
    title: "Sunlit School Library & Reading Sanctuary",
    category: "Classrooms",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=85",
    caption: "Tranquil reading spaces inspiring literary curiosity and deep focus."
  },
  {
    id: "gal-8",
    title: "Robotics & Innovation Working Prototypes",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=85",
    caption: "Students constructing applied electronic circuits and robotics prototypes."
  },
  {
    id: "gal-9",
    title: "Inter-House Cricket League Championship",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=85",
    caption: "Competitive cricket matches fostering discipline and athletic coordination."
  },
  {
    id: "gal-10",
    title: "Morning Assembly & National Pledge",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=85",
    caption: "Students beginning each school day with unified discipline and patriotic values."
  },
  {
    id: "gal-11",
    title: "Theatrical Drama & Public Speaking Assembly",
    category: "Arts",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=85",
    caption: "Oratorical performances building poise and vocal confidence."
  },
  {
    id: "gal-12",
    title: "Annual Science Fair Project Demonstrations",
    category: "Celebrations",
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=85",
    caption: "Young inventors presenting environmental models to parents and guests."
  }
];

const defaultFaculty: FacultyMember[] = [
  {
    id: "fac-1",
    name: "[Faculty Profile — Leadership]",
    role: "Principal / Academic Director",
    subject: "Academic Administration & Mentorship",
    qualification: "[M.Sc, B.Ed / Verified Qualifications to be uploaded]",
    experience: "[School-provided experience details]",
    bio: "Guiding Vidyadhari High School with a deep focus on student character, intellectual rigor, and holistic values.",
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    isVerifiedPlaceholder: true
  },
  {
    id: "fac-2",
    name: "[Faculty Profile — Science]",
    role: "Senior Science Coordinator",
    subject: "Physical & Biological Sciences",
    qualification: "[Verified B.Sc / M.Sc, B.Ed pending CMS upload]",
    experience: "[School-provided details]",
    bio: "Cultivating scientific inquiry, analytical problem solving, and hands-on laboratory discipline.",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    isVerifiedPlaceholder: true
  },
  {
    id: "fac-3",
    name: "[Faculty Profile — Mathematics]",
    role: "Mathematics Coordinator",
    subject: "Pure & Applied Mathematics",
    qualification: "[Verified Qualifications pending upload]",
    experience: "[School-provided details]",
    bio: "Transforming mathematics into a logical, intuitive journey that builds reasoning and confidence.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    isVerifiedPlaceholder: true
  },
  {
    id: "fac-4",
    name: "[Faculty Profile — Languages]",
    role: "Head of Languages",
    subject: "English & Regional Telugu Literature",
    qualification: "[Verified Qualifications pending upload]",
    experience: "[School-provided details]",
    bio: "Instilling articulate communication, expressive rhetoric, and a deep appreciation for rich regional literature.",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    isVerifiedPlaceholder: true
  }
];

const defaultEnquiries: AdmissionEnquiry[] = [
  {
    id: "VHS-ENQ-2026-101",
    parentName: "K. Ramesh Rao",
    phone: "+91 98490 12345",
    email: "ramesh.k@example.com",
    studentName: "Aditya Rao",
    currentClass: "Class 7",
    classSeeking: "Class 8",
    previousSchool: "Warangal Public School",
    preferredContactTime: "Evening (4 PM - 7 PM)",
    preferredVisitDate: "2026-09-12",
    notes: "Interested in science laboratory activities and sports coaching.",
    adminNotes: "Parent contacted by Admissions Desk. Walkthrough scheduled.",
    status: "CAMPUS VISIT",
    createdAt: "2026-09-07T10:30:00.000Z",
    source: "WEBSITE_HERO"
  },
  {
    id: "VHS-ENQ-2026-102",
    parentName: "S. Sunitha Reddy",
    phone: "+91 94401 98765",
    email: "sunitha.reddy@example.com",
    studentName: "Ananya Reddy",
    currentClass: "Class 4",
    classSeeking: "Class 5",
    previousSchool: "Bhimaram Model School",
    preferredContactTime: "Morning (9 AM - 12 PM)",
    preferredVisitDate: "2026-09-15",
    notes: "Inquiring regarding school bus route in Vidyadhari Colony and extracurriculars.",
    adminNotes: "Follow-up message sent via WhatsApp.",
    status: "NEW",
    createdAt: "2026-09-08T09:15:00.000Z",
    source: "ADMISSION_PAGE"
  }
];

const defaultVisits: CampusVisitBooking[] = [
  {
    id: "VHS-VST-2026-001",
    parentName: "K. Ramesh Rao",
    phone: "+91 98490 12345",
    email: "ramesh.k@example.com",
    studentName: "Aditya Rao",
    classSeeking: "Class 8",
    visitDate: "2026-09-12",
    visitTimeSlot: "10:30 AM – 11:30 AM",
    message: "Would like to see the science rooms and playground.",
    adminNotes: "Confirmed with Vice Principal.",
    status: "Confirmed",
    createdAt: "2026-09-07T10:35:00.000Z"
  }
];

// Persistent File Store Helper
interface StoreData {
  settings: SchoolSettings;
  locations: CampusLocation[];
  dayTimeline: DayTimelineItem[];
  achievements: AchievementItem[];
  gallery: GalleryItem[];
  faculty: FacultyMember[];
  enquiries: AdmissionEnquiry[];
  visits: CampusVisitBooking[];
}

const DATA_FILE = path.join(process.cwd(), '.data', 'store.json');

function ensureDataFile(): StoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading store.json, reinitializing default:", err);
  }

  const initialData: StoreData = {
    settings: defaultSettings,
    locations: defaultLocations,
    dayTimeline: defaultDayTimeline,
    achievements: defaultAchievements,
    gallery: defaultGallery,
    faculty: defaultFaculty,
    enquiries: defaultEnquiries,
    visits: defaultVisits,
  };

  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  } catch (err) {
    console.error("Failed to write initial store.json:", err);
  }

  return initialData;
}

function saveData(data: StoreData) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Failed to save store.json:", err);
  }
}

// In-Memory Cached Accessors with File-Persistence
let memoryStore: StoreData | null = null;

export function getStore(): StoreData {
  if (!memoryStore) {
    memoryStore = ensureDataFile();
  }
  return memoryStore;
}

export function updateSettings(newSettings: Partial<SchoolSettings>): SchoolSettings {
  const store = getStore();
  store.settings = { ...store.settings, ...newSettings };
  saveData(store);
  return store.settings;
}

export function addEnquiry(enquiry: Omit<AdmissionEnquiry, 'id' | 'createdAt' | 'status'>): AdmissionEnquiry {
  const store = getStore();
  const counter = store.enquiries.length + 103;
  const newEnquiry: AdmissionEnquiry = {
    ...enquiry,
    id: `VHS-ENQ-2026-${counter}`,
    status: 'NEW',
    createdAt: new Date().toISOString()
  };
  store.enquiries.unshift(newEnquiry);
  saveData(store);
  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: AdmissionEnquiry['status'], adminNotes?: string): AdmissionEnquiry | null {
  const store = getStore();
  const target = store.enquiries.find(e => e.id === id);
  if (!target) return null;
  target.status = status;
  if (adminNotes !== undefined) {
    target.adminNotes = adminNotes;
  }
  saveData(store);
  return target;
}

export function addCampusVisit(visit: Omit<CampusVisitBooking, 'id' | 'createdAt' | 'status'>): CampusVisitBooking {
  const store = getStore();
  const counter = String(store.visits.length + 2).padStart(3, '0');
  const newVisit: CampusVisitBooking = {
    ...visit,
    id: `VHS-VST-2026-${counter}`,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  store.visits.unshift(newVisit);
  saveData(store);
  return newVisit;
}

export function updateVisitStatus(id: string, status: CampusVisitBooking['status'], adminNotes?: string): CampusVisitBooking | null {
  const store = getStore();
  const target = store.visits.find(v => v.id === id);
  if (!target) return null;
  target.status = status;
  if (adminNotes !== undefined) {
    target.adminNotes = adminNotes;
  }
  saveData(store);
  return target;
}

export function updateCMSItem<K extends keyof Pick<StoreData, 'locations' | 'achievements' | 'gallery' | 'faculty' | 'dayTimeline'>>(
  key: K,
  items: StoreData[K]
): StoreData[K] {
  const store = getStore();
  store[key] = items;
  saveData(store);
  return store[key];
}
