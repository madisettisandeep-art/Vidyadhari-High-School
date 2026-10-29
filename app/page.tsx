import { getStore } from '@/lib/db/store';
import CinematicHeroWrapper from '@/components/cinematic/CinematicHeroWrapper';
import ChooseJourney from '@/components/sections/ChooseJourney';
import WhyVidyadhari from '@/components/sections/WhyVidyadhari';
import CampusExperience from '@/components/campus/CampusExperience';
import AcademicsSection from '@/components/sections/AcademicsSection';
import ScienceSection from '@/components/sections/ScienceSection';
import DayTimeline from '@/components/sections/DayTimeline';
import SportsAndArts from '@/components/sections/SportsAndArts';
import VoicesAndAchievements from '@/components/sections/VoicesAndAchievements';
import GallerySection from '@/components/gallery/GallerySection';
import AdmissionsFunnel from '@/components/admissions/AdmissionsFunnel';
import CampusVisitModal from '@/components/admissions/CampusVisitModal';
import ContactAndLocation from '@/components/contact/ContactAndLocation';

export const revalidate = 0; // Fresh CMS data on each reload

export default function HomePage() {
  const store = getStore();

  return (
    <div className="w-full bg-transparent text-slate-800">
      {/* 01 & 02: Cinematic Video Hero Section (Undisturbed) */}
      <CinematicHeroWrapper />

      {/* Main Content Area Below Hero With Fixed Campus Background */}
      <div className="relative w-full bg-transparent">
        {/* Fixed Background Image visible throughout the application below hero */}
        <div
          className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: `url('/images/vidyadhari-campus-bg.jpg')` }}
        />
        {/* Soft, light translucent veil ensuring text readability while keeping the background vividly visible */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-white/20 backdrop-blur-[0.5px]" />

        {/* 03: Choose Your Journey */}
        <ChooseJourney />

        {/* 04: Why Vidyadhari */}
        <WhyVidyadhari />

        {/* 05: Interactive Campus (9 Destinations) */}
        <CampusExperience locations={store.locations} />

        {/* 06: Learning Beyond The Textbook (Academics) */}
        <AcademicsSection />

        {/* 07: Science & Innovation (Dark Cinematic) */}
        <ScienceSection />

        {/* 08: A Day at Vidyadhari Timeline */}
        <DayTimeline timeline={store.dayTimeline} />

        {/* 09 & 10: Sports, Physical Education & Arts & Culture */}
        <SportsAndArts />

        {/* 11 & 12: Voices of Vidyadhari & Achievements Wall & Faculty */}
        <VoicesAndAchievements
          achievements={store.achievements}
          faculty={store.faculty}
        />

        {/* 13: Life @ Vidyadhari Gallery & Instagram */}
        <GallerySection items={store.gallery} />

        {/* 14: Admissions Funnel (Multi-Step Wizard) */}
        <AdmissionsFunnel />

        {/* 15: Book a Campus Walkthrough */}
        <CampusVisitModal />

        {/* 16: Campus Location, Directions & Phone */}
        <ContactAndLocation />
      </div>
    </div>
  );
}
