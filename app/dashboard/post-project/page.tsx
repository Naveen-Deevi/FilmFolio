"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { MOCK_PROJECTS } from "@/lib/mockData";

export default function PostProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    stage: "Development",
    rolesOpen: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject = {
      id: Date.now(),
      title: formData.title,
      posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=800&fit=crop",
      genre: formData.genre,
      stage: formData.stage,
      rolesOpen: formData.rolesOpen.split(",").map(r => r.trim()).filter(Boolean),
      author: "Alex Rivera" // Logged in user mock
    };
    
    MOCK_PROJECTS.unshift(newProject);
    router.push("/dashboard");
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 pt-32 pb-24">
        <div className="absolute top-[30%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-primary)] opacity-5 blur-[150px] -z-10 pointer-events-none" />
        
        <div className="w-full max-w-2xl mb-6">
          <button onClick={() => router.back()} className="font-sans text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
            ← Back to Dashboard
          </button>
        </div>

        <div className="level-1-glass w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl mb-2 text-[var(--color-text-main)]">Post a Project</h1>
            <p className="font-sans text-[var(--color-text-secondary)]">List your upcoming film and find the perfect crew.</p>
          </div>
          
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-bold ml-4">Project Title</label>
              <input 
                required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Echoes of Eternity" className="input-glass w-full py-3 px-6" 
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-sans text-sm font-bold ml-4">Genre</label>
                <input 
                  required type="text" value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})}
                  placeholder="Sci-Fi / Drama" className="input-glass w-full py-3 px-6" 
                />
              </div>
              
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-sans text-sm font-bold ml-4">Current Stage</label>
                <select 
                  className="input-glass w-full py-3 px-6 appearance-none bg-transparent"
                  value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value})}
                >
                  <option value="Development">Development</option>
                  <option value="Pre-production">Pre-production</option>
                  <option value="Production">Production</option>
                  <option value="Post-production">Post-production</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-bold ml-4">Open Roles (comma separated)</label>
              <input 
                type="text" value={formData.rolesOpen} onChange={e => setFormData({...formData, rolesOpen: e.target.value})}
                placeholder="Cinematographer, Editor" className="input-glass w-full py-3 px-6" 
              />
            </div>
            
            <button type="submit" className="btn-primary w-full mt-6 py-4 text-sm tracking-widest">
              Publish Project
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
