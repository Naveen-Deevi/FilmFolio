"use client";

import React from "react";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navigation({ hasPublished = false }: { hasPublished?: boolean }) {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  return (
    <>
      <style>{`
        .px-margin-mobile { padding-left: 16px; padding-right: 16px; }
        @media (min-width: 768px) {
          .md\\:px-margin-desktop { padding-left: 48px; padding-right: 48px; }
        }
        .py-sm { padding-top: 16px; padding-bottom: 16px; }
        .gap-lg { gap: 40px; }
        .gap-sm { gap: 16px; }
        .font-headline-lg { font-family: var(--font-bebas-neue, 'Bebas Neue'); font-size: 40px; line-height: 1.1; letter-spacing: 0.03em; }
        .text-headline-lg { font-size: 40px; }
        .font-title-md { font-family: var(--font-hanken-grotesk, 'Hanken Grotesk'); font-size: 20px; line-height: 1.4; font-weight: 600; }
        .px-md { padding-left: 24px; padding-right: 24px; }
        .py-xs { padding-top: 8px; padding-bottom: 8px; }
        .px-xl { padding-left: 64px; padding-right: 64px; }
        .py-md { padding-top: 24px; padding-bottom: 24px; }
        
        .liquid-glass {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(32px) saturate(150%);
            -webkit-backdrop-filter: blur(32px) saturate(150%);
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
        }
      `}</style>

      <header className="fixed top-0 w-full z-50 px-margin-mobile md:px-margin-desktop py-sm">
        <nav className="max-w-7xl mx-auto liquid-glass rounded-full px-6 flex justify-between items-center transition-all duration-300 h-[96px]">
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="font-headline-lg text-headline-lg text-primary tracking-wider cursor-pointer">FilmFolio</span>
            </Link>
          </div>
          <ul className="hidden md:flex items-center text-on-surface-variant gap-lg font-title-md">
            <Link href="/discover">
              <li className={`hover:text-primary transition-colors cursor-pointer ${isActive("/discover") ? "border-b-2 border-primary font-bold" : ""}`}>Discover</li>
            </Link>
            <Link href="/marketplace">
              <li className={`hover:text-primary transition-colors cursor-pointer ${isActive("/marketplace") ? "border-b-2 border-primary font-bold" : ""}`}>Marketplace</li>
            </Link>
            <Link href="/projects">
              <li className={`hover:text-primary transition-colors cursor-pointer ${isActive("/projects") ? "border-b-2 border-primary font-bold" : ""}`}>Projects</li>
            </Link>
            <Link href="/messages">
              <li className={`hover:text-primary transition-colors cursor-pointer ${isActive("/messages") ? "border-b-2 border-primary font-bold" : ""}`}>Messages</li>
            </Link>
            <Link href="/about">
              <li className={`hover:text-primary transition-colors cursor-pointer ${isActive("/about") ? "border-b-2 border-primary font-bold" : ""}`}>About Us</li>
            </Link>
          </ul>
          <div className="flex items-center gap-sm">
            {isLoaded && !isSignedIn && (
              <>
                <Link href="/sign-in">
                  <button className="hidden sm:block text-primary px-md py-xs hover:opacity-80 transition-opacity font-title-md">Login</button>
                </Link>
                <Link href="/sign-up">
                  <button className="liquid-glass text-primary font-title-md px-xl py-md rounded-full hover:scale-105 active:scale-95 transition-all h-[52px] flex items-center justify-center shadow-xl border-primary/20">Get Started</button>
                </Link>
              </>
            )}
            {isLoaded && isSignedIn && (
              <>
                {!hasPublished && (
                  <Link href="/create-profile">
                    <button className="hidden sm:flex liquid-glass text-primary font-title-md px-md py-xs rounded-full hover:scale-105 active:scale-95 transition-all mr-2 shadow-sm border-primary/20 items-center h-[42px] text-[16px]">
                      Publish Portfolio
                    </button>
                  </Link>
                )}
                <UserButton />
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
