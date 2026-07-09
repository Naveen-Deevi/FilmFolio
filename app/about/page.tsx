"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
  useEffect(() => {
    // Smooth reveal on scroll interaction
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Global Liquid Background Gradient Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary-container blur-[120px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-[40%] -right-[5%] w-[50%] h-[50%] rounded-full bg-secondary-container blur-[100px] mix-blend-multiply"></div>
      </div>

      <main className="pt-[140px]">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing text-center">
          <h1 className="font-display-lg md:text-[72px] sm:text-[56px] text-[42px] leading-tight text-on-surface uppercase mb-md">
            About <span className="text-primary">FilmFolio</span>
          </h1>
          <p className="font-body-lg md:text-[24px] text-[18px] leading-relaxed text-on-surface-variant">
            FilmFolio was built to bring filmmakers, creatives, and industry professionals together on one platform. Our goal is to make discovering talent, showcasing work, and collaborating on film projects simpler than ever.
          </p>
        </section>

        {/* Our Story */}
        <section className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="liquid-glass rounded-2xl p-xl shadow-xl relative overflow-hidden">
            <h2 className="font-headline-lg text-headline-lg mb-sm text-on-surface">Our Story</h2>
            <h3 className="font-title-md text-primary mb-md text-[24px]">Every Great Film Starts with the Right People.</h3>
            <div className="font-body-md text-on-surface-variant text-[18px] space-y-4">
              <p>
                The filmmaking industry thrives on collaboration, yet finding the right people, showcasing creative work, and discovering opportunities often happens across multiple disconnected platforms.
              </p>
              <p>
                FilmFolio was created to solve this challenge by bringing portfolios, collaboration, communication, and equipment discovery into one professional ecosystem designed specifically for filmmakers.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-label-sm font-label-sm mb-sm tracking-widest uppercase border border-primary/20">The Mission</span>
            <h2 className="font-display-lg md:text-[48px] sm:text-[36px] text-[32px] leading-tight text-on-surface uppercase mb-md">Our Mission</h2>
            <p className="font-body-lg md:text-[20px] text-[18px] leading-relaxed text-on-surface-variant">
              Our mission is to empower filmmakers by providing a platform where creativity meets opportunity. Whether you're an aspiring actor, an experienced cinematographer, a director building a crew, or an equipment owner supporting productions, FilmFolio helps you connect with the people and resources that bring stories to life.
            </p>
          </div>
        </section>

        {/* What We Offer (Four Cards) */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="text-center mb-gutter">
            <h2 className="font-display-lg md:text-[48px] sm:text-[36px] text-[32px] leading-tight text-on-surface uppercase">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="liquid-glass p-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-md border border-primary/30">
                <span className="material-symbols-outlined text-primary">account_box</span>
              </div>
              <h3 className="font-headline-lg text-[28px] mb-sm">Professional Portfolios</h3>
              <p className="font-body-md text-on-surface-variant text-[18px]">
                Showcase your experience, projects, showreels, and achievements through a professional portfolio tailored for the film industry.
              </p>
            </div>
            
            <div className="liquid-glass p-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-md border border-primary/30">
                <span className="material-symbols-outlined text-primary">groups</span>
              </div>
              <h3 className="font-headline-lg text-[28px] mb-sm">Collaboration</h3>
              <p className="font-body-md text-on-surface-variant text-[18px]">
                Find talented actors, crew members, and creative professionals to build your next production team.
              </p>
            </div>

            <div className="liquid-glass p-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-md border border-primary/30">
                <span className="material-symbols-outlined text-primary">videocam</span>
              </div>
              <h3 className="font-headline-lg text-[28px] mb-sm">Equipment Marketplace</h3>
              <p className="font-body-md text-on-surface-variant text-[18px]">
                Discover filmmaking equipment from the community or list your own gear to support other creators.
              </p>
            </div>

            <div className="liquid-glass p-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-md border border-primary/30">
                <span className="material-symbols-outlined text-primary">forum</span>
              </div>
              <h3 className="font-headline-lg text-[28px] mb-sm">Professional Networking</h3>
              <p className="font-body-md text-on-surface-variant text-[18px]">
                Build meaningful industry connections, communicate directly with collaborators, and discover new opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Why FilmFolio & Vision */}
        <section className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            <div>
              <h2 className="font-display-lg text-[40px] leading-tight text-on-surface uppercase mb-sm">Why FilmFolio?</h2>
              <h3 className="font-title-md text-primary mb-xs">Built for the Film Industry</h3>
              <p className="font-body-md text-on-surface-variant text-[18px]">
                General networking platforms weren't designed for filmmakers. FilmFolio focuses on the unique needs of the filmmaking community by combining portfolios, project collaboration, equipment discovery, and professional networking into one dedicated platform.
              </p>
            </div>
            <div>
              <h2 className="font-display-lg text-[40px] leading-tight text-on-surface uppercase mb-sm">Our Vision</h2>
              <p className="font-body-md text-on-surface-variant text-[18px] mt-[36px]">
                We envision a future where every filmmaker—regardless of experience or location—has equal access to opportunities, meaningful collaborations, and the resources needed to tell great stories.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="bg-inverse-surface rounded-2xl p-xl shadow-2xl relative overflow-hidden text-center">
            <h2 className="font-display-lg md:text-[48px] text-[36px] leading-tight text-inverse-on-surface uppercase mb-md">Join the Community</h2>
            <p className="font-body-lg text-[18px] leading-relaxed text-inverse-on-surface/80 mb-lg max-w-2xl mx-auto">
              Whether you're taking your first steps into filmmaking or have years of industry experience, FilmFolio is built to help you showcase your talent, grow your network, and collaborate on meaningful projects.
            </p>
            <Link href="/sign-up">
              <button className="glossy-primary text-on-primary-fixed font-title-md text-title-md px-xl py-md rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl flex items-center justify-center mx-auto h-[52px]">
                Get Started
                <span className="material-symbols-outlined ml-2">bolt</span>
              </button>
            </Link>
          </div>
        </section>

        {/* Founders Footer */}
        <section className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop pb-xl pt-lg border-t border-primary/20 text-center">
          <p className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase mb-sm">Built By</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
            <a href="https://www.linkedin.com/in/deevi-venkata-sai-naveen-109a23373/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:bg-white/40 p-2 rounded-lg transition-colors">
              <span className="font-title-md text-[16px] text-on-surface group-hover:text-primary transition-colors">Deevi Venkata Sai Naveen</span>
              <span className="material-symbols-outlined text-[16px] text-primary">link</span>
            </a>
            <span className="hidden sm:block text-primary/30">•</span>
            <a href="https://www.linkedin.com/in/chegu-neha-satya-890b48329/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:bg-white/40 p-2 rounded-lg transition-colors">
              <span className="font-title-md text-[16px] text-on-surface group-hover:text-primary transition-colors">Chegu Neha Satya</span>
              <span className="material-symbols-outlined text-[16px] text-primary">link</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
