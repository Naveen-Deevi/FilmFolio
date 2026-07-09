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
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-2">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role (e.g. Director, Crew)..."
            className="liquid-glass w-full py-4 px-6 rounded-full outline-none text-[var(--color-text-main)] font-sans border border-primary/20 focus:border-primary transition-colors"
          />
          <button type="submit" className="liquid-glass px-8 py-4 rounded-full text-primary hover:bg-primary/10 transition-colors font-title-md border border-primary/20">
            Search
          </button>
        </form>
      </div>

      <CollaborationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
