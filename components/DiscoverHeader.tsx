"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CollaborationDrawer from "@/components/CollaborationDrawer";

export default function DiscoverHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(currentQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/discover?q=${encodeURIComponent(search.trim())}`);
    } else {
      router.push(`/discover`);
    }
  };

  return (
    <>
      <div className="mb-16 text-center max-w-3xl mx-auto relative">
        <h1 className="font-display text-7xl md:text-8xl mb-6 text-[var(--color-text-main)]">
          DISCOVER <span className="text-primary">TALENT</span>
        </h1>
        <p className="font-sans text-xl text-[var(--color-text-secondary)] mb-8">
          Connect with top filmmakers, crew, and talent. The professional network built for the cinema industry.
        </p>
        
        <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto mb-8 px-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-grow w-full" style={{ minWidth: '200px' }}>
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-[var(--color-primary)] transition-colors">search</span>
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, role (e.g. Director)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-black/10 bg-white/50 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all font-sans text-lg text-[var(--color-text-main)]"
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-black text-white hover:bg-[var(--color-primary)] transition-all font-bold text-sm shadow-md shrink-0 whitespace-nowrap">
              Search
            </button>
          </div>
        </form>

        <div className="flex gap-4 flex-wrap justify-center">
          {["All Talent", "Director", "Cinematography", "Editor", "Production"].map(cat => {
            // Check if current query exactly matches the category, or if it's "All Talent" and query is empty
            const isActive = 
              (cat === "All Talent" && !currentQuery) || 
              (currentQuery.toLowerCase() === cat.toLowerCase());
            
            return (
              <button 
                key={cat} 
                onClick={() => {
                  if (cat === "All Talent") {
                    router.push('/discover');
                  } else {
                    router.push(`/discover?q=${cat}`);
                  }
                }}
                className={`px-6 py-2 rounded-full border font-sans text-sm transition-colors ${
                  isActive 
                    ? "bg-black text-white border-black" 
                    : "border-black/10 hover:bg-[rgba(0,0,0,0.05)] text-[var(--color-text-main)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <CollaborationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
