/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MatrixRain } from './components/MatrixRain';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CodeStudio } from './components/CodeStudio';
import { Features } from './components/Features';
import { LanguagesGrid } from './components/LanguagesGrid';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { EnterSystemModal } from './components/EnterSystemModal';

export default function App() {
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false);

  const handleOpenSystem = () => {
    const studioEl = document.getElementById('studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsSystemModalOpen(true);
    }
  };

  const handleCloseSystem = () => {
    setIsSystemModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#e2fee6] font-mono selection:bg-[#00FF66] selection:text-black overflow-x-hidden">
      {/* 1. Matrix Digital Rain Canvas Background */}
      <MatrixRain opacity={0.85} speedMultiplier={1} />

      {/* Foreground Content (relative z-10) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <Navbar onOpenSystem={handleOpenSystem} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 2. Hero Section */}
          <Hero onOpenSystem={handleOpenSystem} />

          {/* 3. Interactive Code Evaluation & Comic Studio */}
          <CodeStudio />

          {/* 4. Features Section */}
          <Features />

          {/* 5. Programming Languages Section */}
          <LanguagesGrid />

          {/* 6. How It Works Section */}
          <HowItWorks />

          {/* About Section */}
          <AboutSection />

          {/* 7. Final Section */}
          <CallToAction onOpenSystem={handleOpenSystem} />
        </main>

        {/* 8. Footer */}
        <Footer onOpenSystem={handleOpenSystem} />
      </div>

      {/* Interactive Matrix Access Modal */}
      <EnterSystemModal
        isOpen={isSystemModalOpen}
        onClose={handleCloseSystem}
      />
    </div>
  );
}
