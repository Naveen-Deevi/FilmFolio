"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_PROJECTS } from "@/lib/mockData";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const project = MOCK_PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <>
        <div className="pt-32 text-center text-xl font-sans">Project not found.</div>
      </>
    );
  }

  return (
    <>
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto relative">
        <button onClick={() => router.back()} className="mb-8 font-sans text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-2 transition-all">
          ← Back to Projects
        </button>

        <div className="level-1-glass rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 relative overflow-hidden">
          <div className="w-full md:w-2/5 z-10">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative bg-black/5">
              <img src={project.posterUrl} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-sans text-xs font-bold shadow-sm">
                {project.stage}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5 z-10">
            <div className="mb-2 font-mono text-sm tracking-widest text-[var(--color-primary)]">{project.genre}</div>
            <h1 className="font-display text-5xl md:text-7xl mb-4 text-[var(--color-text-main)] leading-none">{project.title}</h1>
            
            <p className="font-sans text-lg text-[var(--color-text-secondary)] mb-8">
              A visionary new project currently in {project.stage}. We are assembling a world-class crew to bring this story to life.
            </p>
            
            <div className="flex items-center gap-4 mb-10 p-4 rounded-2xl bg-white/40 border border-white/50">
              <div className="w-12 h-12 rounded-full bg-black/10 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(project.author)}&background=random`} alt="Author" className="w-full h-full object-cover"/>
              </div>
              <div>
                <p className="font-sans text-xs opacity-60 font-bold uppercase tracking-wider">Produced By</p>
                <p className="font-sans font-bold text-lg">{project.author}</p>
              </div>
            </div>

            <h3 className="font-display text-3xl mb-4">Open Roles</h3>
            <div className="flex flex-col gap-3 mb-10">
              {project.rolesOpen.map((role, i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/30 border border-white/60 hover:bg-white/60 transition-colors">
                  <span className="font-sans font-bold text-lg">{role}</span>
                  <button className="bg-black text-white px-5 py-2 rounded-full font-sans text-xs font-bold hover:scale-105 transition-transform">Apply</button>
                </div>
              ))}
              {project.rolesOpen.length === 0 && (
                <div className="opacity-50 italic text-sm">No open roles currently.</div>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
