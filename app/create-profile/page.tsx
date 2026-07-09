"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { getDbUser, publishPortfolio } from "@/app/actions/user";

export default function CreateProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    avatarUrl: "",
    location: "",
    professions: "",
    socialLink: "",
    showreelLink: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getDbUser();
        if (user) {
          setFormData(prev => ({
            ...prev,
            fullName: user.fullName || "",
            location: user.location || "",
            avatarUrl: user.profilePhotoUrl || "",
            professions: user.professions?.map((p: any) => p.profession.name).join(", ") || "",
            socialLink: user.socialLinks?.[0]?.url || "",
            showreelLink: user.portfolioItems?.find((p: any) => p.mediaType === "showreel")?.externalLink || ""
          }));
        }
      } catch (err) {
        console.error("Failed to load user", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await publishPortfolio(formData);
      router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center font-sans">Loading profile...</div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full flex items-center justify-center relative px-4">
        <div className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-primary)] opacity-5 blur-[150px] -z-10 pointer-events-none" />
        
        <div className="level-1-glass w-full max-w-2xl rounded-[3rem] p-10 mt-24 mb-16 shadow-2xl relative">
          <div className="text-center mb-10">
            <h1 className="font-display text-5xl mb-2 text-[var(--color-text-main)]">Publish Portfolio</h1>
            <p className="font-sans text-[var(--color-text-secondary)]">Enhance your professional portfolio to stand out.</p>
          </div>
          
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-bold text-[var(--color-text-main)] ml-4">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                placeholder="Christopher Nolan" 
                className="input-glass w-full py-3 px-6 font-sans" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-bold text-[var(--color-text-main)] ml-4">Avatar Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const uploadData = new FormData();
                  uploadData.append('file', file);
                  
                  try {
                    const res = await fetch('/api/upload', {
                      method: 'POST',
                      body: uploadData,
                    });
                    const data = await res.json();
                    if (data.url) {
                      setFormData(prev => ({...prev, avatarUrl: data.url}));
                    }
                  } catch (err) {
                    console.error("Upload failed", err);
                  }
                }}
                className="input-glass w-full py-3 px-6 font-sans file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary)] file:text-white hover:file:opacity-90" 
              />
              {formData.avatarUrl && <p className="text-xs ml-4 text-green-600">Image uploaded/available!</p>}
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-sans text-sm font-bold text-[var(--color-text-main)] ml-4">Location</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="London, UK" 
                  className="input-glass w-full py-3 px-6 font-sans" 
                />
              </div>
              
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-sans text-sm font-bold text-[var(--color-text-main)] ml-4">Professions (comma separated)</label>
                <input 
                  type="text" 
                  required
                  value={formData.professions}
                  onChange={e => setFormData({...formData, professions: e.target.value})}
                  placeholder="Director, Screenwriter" 
                  className="input-glass w-full py-3 px-6 font-sans" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-bold text-[var(--color-text-main)] ml-4">Social Media Link</label>
              <input 
                type="url" 
                value={formData.socialLink}
                onChange={e => setFormData({...formData, socialLink: e.target.value})}
                placeholder="https://instagram.com/yourhandle" 
                className="input-glass w-full py-3 px-6 font-sans" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-bold text-[var(--color-text-main)] ml-4">Showreel / Drive Link</label>
              <input 
                type="url" 
                value={formData.showreelLink}
                onChange={e => setFormData({...formData, showreelLink: e.target.value})}
                placeholder="https://vimeo.com/... or Google Drive link" 
                className="input-glass w-full py-3 px-6 font-sans" 
              />
            </div>
            
            <button type="submit" disabled={saving} className="btn-primary w-full mt-6 py-4 text-sm tracking-widest disabled:opacity-50">
              {saving ? "Publishing..." : "Publish Portfolio"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
