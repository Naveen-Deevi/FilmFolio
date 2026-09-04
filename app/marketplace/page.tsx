"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MOCK_EQUIPMENT } from "@/lib/mockData";
import Image from "next/image";

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All Gear");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load for async feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const processedEquipment = useMemo(() => {
    let result = [...MOCK_EQUIPMENT];

    // Filter by Category
    if (activeCategory !== "All Gear") {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "rating":
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      default:
        // "recommended" - Keep original order
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl mb-6 text-[var(--color-text-main)]">
          GEAR <span className="text-[var(--color-primary)]">MARKETPLACE</span>
        </h1>
        <p className="font-sans text-xl text-[var(--color-text-secondary)]">
          Rent top-tier cinema equipment directly from working professionals.
        </p>
      </div>

      {/* Controls Container (Search & Sort) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-96 group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-[var(--color-primary)] transition-colors">search</span>
          <input 
            type="text" 
            placeholder="Search gear or location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-black/10 bg-white/50 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all font-sans"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="font-sans text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Sort by</span>
          <div className="relative">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-full border border-black/10 bg-white/50 backdrop-blur-md font-sans text-sm font-bold text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer shadow-sm hover:bg-white transition-all"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black/50">expand_more</span>
          </div>
        </div>
      </div>

      {/* Filters (Categories) */}
      <div className="flex gap-3 mb-8 flex-wrap justify-center md:justify-start">
        {["All Gear", "Camera", "Lenses", "Lighting", "Audio", "Stabilization"].map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full border font-sans text-sm font-bold transition-all duration-300 ${
              activeCategory === cat 
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20 scale-105" 
                : "border-black/10 text-[var(--color-text-secondary)] hover:bg-black/5 hover:border-black/20 hover:text-[var(--color-text-main)] bg-white/50 backdrop-blur-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-6 font-sans text-sm text-[var(--color-text-secondary)] bg-white/40 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full border border-black/5">
        Showing <span className="font-bold text-[var(--color-text-main)]">{processedEquipment.length}</span> of <span className="font-bold text-[var(--color-text-main)]">{MOCK_EQUIPMENT.length}</span> results
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full aspect-[4/3] rounded-[1.5rem] bg-black/5 animate-pulse"></div>
              <div className="px-2 space-y-2 mt-2">
                <div className="h-5 bg-black/5 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-black/5 rounded w-1/2 animate-pulse"></div>
                <div className="h-8 bg-black/5 rounded-full w-1/3 mt-4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processedEquipment.length > 0 ? processedEquipment.map((item) => (
            <a href={`/marketplace/${item.id}`} key={item.id} className="flex flex-col group cursor-pointer border border-white/40 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 transition-all duration-500 bg-white/60 backdrop-blur-xl hover:-translate-y-1">
              
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-black/5 p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <Image src={item.imageUrl} alt={item.title} width={600} height={450} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full font-mono font-bold shadow-xl flex items-center gap-1 border border-white/10 z-10 whitespace-nowrap">
                  ${item.pricePerDay.toLocaleString()} <span className="text-xs opacity-70 font-sans font-normal tracking-wide">/day</span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col gap-2 flex-grow">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-title-md font-bold text-[var(--color-text-main)] text-xl leading-tight line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">{item.title}</h3>
                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 text-xs font-sans font-bold bg-[#FFD700]/10 text-[#B8860B] border border-[#FFD700]/20 px-2.5 py-1 rounded-full shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {Number(item.rating).toFixed(1)}
                  </div>
                </div>
                
                <div className="mt-auto pt-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-sm font-sans font-medium text-[var(--color-text-secondary)] bg-black/5 w-fit px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[16px] opacity-70">category</span>
                    {item.category}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-sans text-[var(--color-text-secondary)] opacity-80 pl-1 mt-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {item.location}
                  </div>
                </div>
              </div>
            </a>
          )) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-white/40 backdrop-blur-md rounded-[3rem] border border-dashed border-black/10 shadow-sm">
              <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-[var(--color-text-secondary)]">search_off</span>
              </div>
              <h3 className="font-title-md font-bold text-2xl text-[var(--color-text-main)] mb-2">No gear found</h3>
              <p className="font-sans text-[var(--color-text-secondary)] max-w-md text-lg">
                We couldn't find any equipment matching your current filters and search query. Try adjusting your criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All Gear");
                }}
                className="mt-8 px-8 py-3 rounded-full bg-black text-white hover:bg-[var(--color-primary)] font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
