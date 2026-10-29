'use client';

import CinematicHero from './CinematicHero';

export default function CinematicHeroWrapper() {
  const handleEnterCampus = () => {
    const campusElement = document.getElementById('campus');
    if (campusElement) {
      campusElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <CinematicHero onEnterCampus={handleEnterCampus} />;
}
