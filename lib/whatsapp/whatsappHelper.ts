export const WHATSAPP_PHONE_NUMBER = "919100901966"; // +91 91009 01966

export type WhatsAppIntent =
  | 'GREETING'
  | 'ADMISSION_ENQUIRY'
  | 'CAMPUS_VISIT'
  | 'CLASS_INFORMATION'
  | 'LOCATION_DIRECTIONS'
  | 'HUMAN_HANDOFF';

export interface WhatsAppFlowOption {
  id: WhatsAppIntent;
  title: string;
  subtitle: string;
  defaultMessage: string;
  iconName: string;
}

export const WHATSAPP_FLOW_OPTIONS: WhatsAppFlowOption[] = [
  {
    id: 'ADMISSION_ENQUIRY',
    title: 'Admissions for 2026–2027',
    subtitle: 'Check class seats, documents & fee structure',
    defaultMessage: 'Hello Vidyadhari High School Admissions, I would like to inquire about admissions for the 2026–2027 academic year for my child.',
    iconName: 'GraduationCap'
  },
  {
    id: 'CAMPUS_VISIT',
    title: 'Schedule a Campus Visit',
    subtitle: 'Walk through classrooms & meet counselors',
    defaultMessage: 'Namaste! I would like to schedule an in-person campus walkthrough and visit the school facilities at Bhimaram.',
    iconName: 'CalendarCheck'
  },
  {
    id: 'LOCATION_DIRECTIONS',
    title: 'Location & Visiting Hours',
    subtitle: 'Bhimaram Rural, Telangana 506015',
    defaultMessage: 'Hello Vidyadhari team, please share the location coordinates, bus routes, and best time to visit the school.',
    iconName: 'MapPin'
  },
  {
    id: 'HUMAN_HANDOFF',
    title: 'Speak with Admissions Counselor',
    subtitle: 'Direct one-on-one parent assistance',
    defaultMessage: 'Hello, I have a specific question and would like to speak directly with the admissions officer.',
    iconName: 'UserCheck'
  }
];

export function buildWhatsAppUrl(message: string, customPhone = WHATSAPP_PHONE_NUMBER): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${customPhone}?text=${encoded}`;
}
