"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { updateOnboarding } from "@/app/actions/user";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState({
    fullName: "",
    location: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || ""
      }));
    }
  }, [isLoaded, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateOnboarding(formData.fullName, formData.location);
      router.push("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative px-4 pt-16">
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-primary)] opacity-10 blur-[150px] -z-10 pointer-events-none" />
      
      <div className="level-1-glass w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl mb-2 text-[var(--color-text-main)]">Welcome to FilmFolio!</h1>
          <p className="font-sans text-[var(--color-text-secondary)]">Let's get the basics down before you start networking.</p>
        </div>
        
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-sans text-sm font-bold text-[var(--color-text-main)] ml-4">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              placeholder="e.g. Christopher Nolan" 
              className="input-glass w-full py-3 px-6 font-sans" 
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-sans text-sm font-bold text-[var(--color-text-main)] ml-4">Current Location</label>
            <input 
              type="text" 
              required
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              placeholder="e.g. London, UK" 
              className="input-glass w-full py-3 px-6 font-sans" 
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full mt-4 py-4 text-sm tracking-widest disabled:opacity-50 disabled:hover:scale-100">
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
