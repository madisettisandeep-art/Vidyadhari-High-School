import type { Metadata } from "next";
import "./globals.css";
import PublicLayoutWrapper from "@/components/navigation/PublicLayoutWrapper";

export const metadata: Metadata = {
  title: "Vidyadhari High School | Bhimaram, Telangana | Your Future Begins Here",
  description: "Official digital campus of Vidyadhari High School, Bhimaram Rural, Telangana. Your Future Begins Here. Discover holistic academics, interactive science inquiry, cultural values, athletics, and admissions for 2026–2027.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  keywords: [
    "Vidyadhari High School",
    "Vidyadhari High School Bhimaram",
    "schools in Hanamkonda",
    "schools in Warangal",
    "best high schools in Telangana",
    "Vidyadhari Colony school",
    "admission enquiry 2026",
    "Vidyadhari digital campus"
  ],
  authors: [{ name: "Vidyadhari High School Administration" }],
  openGraph: {
    title: "Vidyadhari High School — Cinematic Digital Campus",
    description: "You're not just visiting a website. You're entering Vidyadhari. Explore the campus, discover student life, and book an admissions walkthrough.",
    url: "http://vidyadharischool.com/",
    siteName: "Vidyadhari High School",
    images: [
      {
        url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Vidyadhari High School Campus"
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidyadhari High School | Bhimaram, Telangana",
    description: "Where Curious Minds Grow. Experience the interactive digital campus and book a visit.",
    images: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization", "LocalBusiness"],
    "name": "Vidyadhari High School",
    "description": "A premier modern, student-focused institution in Bhimaram Rural, Telangana, fostering academic rigor, creative confidence, and holistic character.",
    "url": "http://vidyadharischool.com/",
    "telephone": "+919100901966",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vidyadhari Colony, Bhimaram Rural",
      "addressLocality": "Hanamkonda / Warangal",
      "addressRegion": "Telangana",
      "postalCode": "506015",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.016259",
      "longitude": "79.544773"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "16:30"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/vidyadhari_school/"
    ]
  };

  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-transparent text-slate-800 selection:bg-[#00A3E0] selection:text-white">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
