"use client";

import React, { useState } from "react";
import { MOCK_EQUIPMENT } from "@/lib/mockData";
import Image from "next/image";

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All Gear");

  const filteredEquipment = MOCK_EQUIPMENT.filter(item => 
    activeCategory === "All Gear" ? true : item.category === activeCategory
  );

  return (
    <>
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="font-display text-7xl md:text-8xl mb-6 text-[var(--color-text-main)]">
            GEAR <span className="text-[var(--color-primary)]">MARKETPLACE</span>
          </h1>
          <p className="font-sans text-xl text-[var(--color-text-secondary)]">
            Rent top-tier cinema equipment directly from working professionals.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-12 flex-wrap justify-center">
          {["All Gear", "Camera", "Lenses", "Lighting", "Audio", "Stabilization"].map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border font-sans text-sm transition-colors ${
                activeCategory === cat 
                  ? "bg-black text-white border-black" 
                  : "border-black/10 hover:bg-[rgba(0,0,0,0.05)] text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEquipment.length > 0 ? filteredEquipment.map((item) => (
            <a href={`/marketplace/${item.id}`} key={item.id} className="flex flex-col gap-3 group cursor-pointer">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/5">
                <Image src={item.imageUrl} alt={item.title} width={600} height={338} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="px-1 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-sans font-bold text-[var(--color-text-main)] text-lg leading-tight truncate max-w-[80%]">{item.title}</h3>
                  <div className="flex items-center gap-1 text-sm font-sans font-bold">
                    <span className="text-[var(--color-primary)]">★</span>
                    {item.rating}
                  </div>
                </div>
                <p className="text-sm font-sans text-[var(--color-text-secondary)]">{item.category} • {item.location}</p>
                <div className="mt-2 font-mono text-[var(--color-text-main)]">
                  <span className="font-bold text-lg">${item.pricePerDay}</span>
                  <span className="text-xs opacity-60"> / day</span>
                </div>
              </div>
            </a>
          )) : (
            <div className="col-span-full text-center py-20 text-[var(--color-text-secondary)] font-sans">
              No equipment found in this category.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
