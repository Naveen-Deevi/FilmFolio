"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { MOCK_EQUIPMENT } from "@/lib/mockData";

export default function MarketplaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const item = MOCK_EQUIPMENT.find(p => p.id === id);

  if (!item) {
    return (
      <>
        <Navigation />
        <div className="pt-32 text-center text-xl font-sans">Equipment not found.</div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto relative">
        <button onClick={() => router.back()} className="mb-8 font-sans text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-2 transition-all">
          ← Back to Marketplace
        </button>

        <div className="level-1-glass rounded-[3rem] p-10 md:p-12 flex flex-col md:flex-row gap-12 relative overflow-hidden">
          <div className="w-full md:w-1/2 z-10 flex flex-col gap-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-black/5">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 z-10 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm tracking-widest text-[var(--color-primary)]">{item.category}</span>
              <span className="font-sans font-bold flex items-center gap-1 text-sm bg-black/5 px-2 py-1 rounded">
                <span className="text-[var(--color-primary)]">★</span> {item.rating}
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl mb-4 text-[var(--color-text-main)] leading-tight">{item.title}</h1>
            
            <div className="flex items-end gap-2 mb-8">
              <span className="font-mono text-4xl font-bold">${item.pricePerDay}</span>
              <span className="font-sans text-sm opacity-60 mb-1">/ day</span>
            </div>
            
            <p className="font-sans text-lg text-[var(--color-text-secondary)] mb-8">
              Professional-grade {item.category.toLowerCase()} equipment available for rent in {item.location}. Maintained in perfect working condition.
            </p>
            
            <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/40 border border-white/50">
              <div className="w-12 h-12 rounded-full bg-black/10 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.owner)}&background=random`} alt="Owner" className="w-full h-full object-cover"/>
              </div>
              <div>
                <p className="font-sans text-xs opacity-60 font-bold uppercase tracking-wider">Owned By</p>
                <p className="font-sans font-bold text-lg">{item.owner}</p>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <button className="btn-primary w-full py-4 text-sm tracking-widest shadow-lg">
                Request Rental
              </button>
              <button 
                onClick={() => router.push("/messages")}
                className="w-full py-4 rounded-full font-sans text-sm font-bold border border-black/20 hover:bg-black/5 transition-colors"
              >
                Message Owner
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
