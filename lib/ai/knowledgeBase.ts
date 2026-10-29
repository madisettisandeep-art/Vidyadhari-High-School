export interface AIAnswer {
  reply: string;
  suggestedActions?: { label: string; action: 'visit' | 'apply' | 'whatsapp' | 'call' }[];
}

export const VERIFIED_SCHOOL_KNOWLEDGE = {
  name: "Vidyadhari High School",
  location: "Vidyadhari Colony, Bhimaram Rural, Telangana 506015, India (Warangal / Hanamkonda region)",
  phone: "+91 91009 01966",
  visitingHours: "Monday to Saturday, 9:00 AM to 4:00 PM",
  curriculumOverview: "Holistic student-centric education combining rigorous academic concepts, interactive science explorations, cultural arts (including regional Telangana heritage), and outdoor physical education.",
  levels: "Primary School, Middle School, and High School",
  admissionProcess: [
    "1. Submit an online Admission Enquiry form or schedule a Campus Visit on this portal.",
    "2. Visit the campus at Bhimaram for an interactive parent-student walkthrough.",
    "3. Meet the academic coordinator to discuss student background and grade-level alignment.",
    "4. Complete formal documentation (Birth Certificate/Transfer Certificate, Academic Progress records, and Identity proof) and secure admission confirmation."
  ]
};

export function queryVidyadhariAI(userQuery: string): AIAnswer {
  const q = userQuery.toLowerCase().trim();

  // Location / Address
  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('map') || q.includes('bhimaram') || q.includes('hanamkonda') || q.includes('warangal')) {
    return {
      reply: `Vidyadhari High School is located at Vidyadhari Colony, Bhimaram Rural, Telangana 506015, India in the Warangal/Hanamkonda area. You can find interactive map directions in our Location section or call us at +91 91009 01966.`,
      suggestedActions: [
        { label: "Get Driving Directions", action: "visit" },
        { label: "Chat on WhatsApp", action: "whatsapp" }
      ]
    };
  }

  // Admissions & How to apply
  if (q.includes('apply') || q.includes('admission') || q.includes('enquiry') || q.includes('enroll') || q.includes('seat') || q.includes('registration')) {
    return {
      reply: `Admissions for the 2026–2027 Academic Year are open for Primary, Middle, and High School classes. You can initiate your enquiry directly online in 2 minutes through our multi-step Admissions Funnel or schedule a personalized Campus Walkthrough.`,
      suggestedActions: [
        { label: "Start Admission Enquiry", action: "apply" },
        { label: "Book Campus Visit", action: "visit" }
      ]
    };
  }

  // Campus visit
  if (q.includes('visit') || q.includes('walkthrough') || q.includes('tour') || q.includes('timing') || q.includes('hours') || q.includes('open')) {
    return {
      reply: `Prospective parents and students are warmly welcome to visit our campus from Monday through Saturday between 9:00 AM and 4:00 PM. We recommend booking a visit slot online so our academic counselor can reserve focused time for your family.`,
      suggestedActions: [
        { label: "Reserve Visit Slot", action: "visit" },
        { label: "Call Admissions Office", action: "call" }
      ]
    };
  }

  // Classes / Grades available
  if (q.includes('class') || q.includes('grade') || q.includes('levels') || q.includes('primary') || q.includes('high school') || q.includes('nursery') || q.includes('kindergarten')) {
    return {
      reply: `Vidyadhari High School offers comprehensive schooling spanning Primary School, Middle School, and High School levels. For specific grade-level availability and seat vacancy in the current term, our admissions coordinator is available at +91 91009 01966.`,
      suggestedActions: [
        { label: "Inquire for Specific Grade", action: "apply" },
        { label: "WhatsApp Admissions", action: "whatsapp" }
      ]
    };
  }

  // Documents required
  if (q.includes('document') || q.includes('certificate') || q.includes('transfer') || q.includes('tc') || q.includes('marksheet') || q.includes('requirement')) {
    return {
      reply: `Standard documentation required for admission typically includes: (1) Student Birth Certificate, (2) Previous School Transfer Certificate (TC) & Progress Report Card, (3) Recent passport-size photographs, and (4) Parent/Guardian Identity proof (Aadhaar). Our admissions desk will guide you through each requirement.`,
      suggestedActions: [
        { label: "Book Document Review", action: "visit" }
      ]
    };
  }

  // Contact / Phone
  if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('reach')) {
    return {
      reply: `You can reach the Vidyadhari High School administration directly at +91 91009 01966 or visit the admissions office at Vidyadhari Colony, Bhimaram Rural. We are also instantly accessible on WhatsApp.`,
      suggestedActions: [
        { label: "Direct Phone Call", action: "call" },
        { label: "Open WhatsApp Chat", action: "whatsapp" }
      ]
    };
  }

  // Strict anti-hallucination fallback
  return {
    reply: `I don't have verified information about that specific query in the official Vidyadhari school records yet. Please connect directly with our admissions coordinator at +91 91009 01966 or drop us a WhatsApp message, and our faculty team will be happy to assist you immediately.`,
    suggestedActions: [
      { label: "Connect on WhatsApp", action: "whatsapp" },
      { label: "Call +91 91009 01966", action: "call" }
    ]
  };
}
