"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_EQUIPMENT } from "@/lib/mockData";

export default function ListGearPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "Camera",
    location: "",
    pricePerDay: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGear = {
      id: Date.now(),
      title: formData.title,
      imageUrl: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600&h=400&fit=crop",
      category: formData.category,
      location: formData.location,
      pricePerDay: parseInt(formData.pricePerDay),
      owner: "You",
      rating: "5.0"
    };
    
    MOCK_EQUIPMENT.unshift(newGear);
    router.push("/dashboard");
  };

  return (
    <>
      <main className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 pt-32 pb-24">
        <div className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-primary)] opacity-5 blur-[150px] -z-10 pointer-events-none" />
        
        <div className="w-full max-w-2xl mb-6">
          <button onClick={() => router.back()} className="font-sans text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
            ← Back to Dashboard
          </button>
        </div>

        <div className="level-1-glass w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl mb-2 text-[var(--color-text-main)]">List Equipment</h1>
            <p className="font-sans text-[var(--color-text-secondary)]">Rent out your gear safely to other professionals.</p>
          </div>
          
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-bold ml-4">Equipment Name</label>
              <input 
                required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. ARRI Alexa Mini LF" className="input-glass w-full py-3 px-6" 
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-sans text-sm font-bold ml-4">Category</label>
                <select 
                  className="input-glass w-full py-3 px-6 appearance-none bg-transparent"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Camera">Camera</option>
                  <option value="Lenses">Lenses</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Audio">Audio</option>
                  <option value="Stabilization">Stabilization</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-sans text-sm font-bold ml-4">Price Per Day ($)</label>
                <input 
                  required type="number" value={formData.pricePerDay} onChange={e => setFormData({...formData, pricePerDay: e.target.value})}
                  placeholder="850" className="input-glass w-full py-3 px-6" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-bold ml-4">Location</label>
              <input 
                required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="Los Angeles, CA" className="input-glass w-full py-3 px-6" 
              />
            </div>
            
            <button type="submit" className="btn-primary w-full mt-6 py-4 text-sm tracking-widest">
              Publish Listing
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
