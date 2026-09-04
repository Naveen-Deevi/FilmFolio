import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="liquid-glass border-t border-primary/10 mt-auto">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {/* Brand Column */}
          <div className="space-y-md">
            <span className="font-headline-lg text-headline-lg text-primary tracking-wider block">FilmFolio</span>
            <p className="font-body-md text-on-surface-variant text-[18px] leading-relaxed">
              The premium ecosystem for cinematic production management. Empowering creators with elite tools and talent.
            </p>
          </div>
          
          {/* Platform Links */}
          <div className="flex flex-col gap-sm">
            <h6 className="font-title-md text-title-md text-on-surface mb-xs">Platform</h6>
            <nav className="flex flex-col gap-xs">
              <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors py-1" href="/discover">Crew Catalog</Link>
              <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors py-1" href="/marketplace">Marketplace</Link>
              <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors py-1" href="/projects">Showcase</Link>
              <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors py-1" href="/">Global Ops</Link>
            </nav>
          </div>
          

          {/* Connect & Social */}
          <div className="flex flex-col gap-md">
            <h6 className="font-title-md text-title-md text-on-surface">Connect</h6>
            <div className="flex gap-md text-primary">
              <a className="p-2 -m-2 hover:scale-110 transition-transform flex items-center justify-center" href="#">
                <span className="material-symbols-outlined text-[28px]">public</span>
              </a>
              <a className="p-2 -m-2 hover:scale-110 transition-transform flex items-center justify-center" href="#">
                <span className="material-symbols-outlined text-[28px]">video_stable</span>
              </a>
              <a className="p-2 -m-2 hover:scale-110 transition-transform flex items-center justify-center" href="#">
                <span className="material-symbols-outlined text-[28px]">camera</span>
              </a>
            </div>
            <div className="pt-md border-t border-primary/10">
              <p className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">
                © 2026 FilmFolio. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
