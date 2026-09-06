"use client";

import React, { useState } from "react";
import { MOCK_PROJECTS } from "@/lib/mockData";

function getGenreGradient(genre: string) {
  switch (genre.toLowerCase()) {
    case 'documentary': return 'from-amber-700 to-amber-900';
    case 'sci-fi': return 'from-cyan-700 to-blue-900';
    case 'drama': return 'from-purple-700 to-indigo-900';
    case 'mystery': return 'from-slate-700 to-slate-900';
    case 'action': return 'from-red-700 to-red-900';
    case 'fantasy': return 'from-emerald-700 to-teal-900';
    case 'thriller': return 'from-stone-700 to-stone-900';
    case 'romance': return 'from-rose-700 to-pink-900';
    case 'comedy': return 'from-yellow-600 to-orange-800';
    case 'horror': return 'from-red-950 to-black';
    default: return 'from-gray-700 to-gray-900';
  }
}

export default function ProjectsPage() {
  const [activeStage, setActiveStage] = useState("All Stages");
  
  const filteredProjects = MOCK_PROJECTS.filter(project => 
    activeStage === "All Stages" ? true : project.stage === activeStage
  );

  return (
    <>
      
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="font-display text-7xl md:text-8xl mb-6 text-[var(--color-text-main)]">
            FILM <span className="text-[var(--color-primary)]">PROJECTS</span>
          </h1>
          <p className="font-sans text-xl text-[var(--color-text-secondary)]">
            Discover ongoing productions, join exciting crews, and pitch your own ideas.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-12 flex-wrap justify-center">
          {["All Stages", "Development", "Pre-production", "Production", "Post-production"].map(stage => (
            <button 
              key={stage} 
              onClick={() => setActiveStage(stage)}
              className={`px-6 py-2 rounded-full border font-sans text-sm transition-colors ${
                activeStage === stage 
                  ? "bg-black text-white border-black" 
                  : "border-black/10 hover:bg-[rgba(0,0,0,0.05)] text-black"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.length > 0 ? filteredProjects.map((project) => (
            <a href={`/projects/${project.id}`} key={project.id} className="flex flex-col group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-md transition-shadow">
              <div className={`w-full aspect-[4/5] relative bg-gradient-to-br ${getGenreGradient(project.genre)} flex items-center justify-center`}>
                {project.posterUrl ? (
                  <img src={project.posterUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0 z-10" />
                ) : (
                  <span className="material-symbols-outlined text-[80px] text-white/20">movie_creation</span>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-30">
                  <h3 className="font-display text-2xl mb-1">{project.title}</h3>
                  <p className="font-sans text-xs opacity-80">{project.genre} • {project.stage}</p>
                </div>
              </div>
              
              <div className="p-4 bg-white flex flex-col gap-3">
                <p className="text-sm font-sans text-black/60">By {project.author}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.rolesOpen.map(role => (
                    <span key={role} className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                      Looking for: {role}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          )) : (
            <div className="col-span-full text-center py-20 text-[var(--color-text-secondary)] font-sans">
              No projects found in this stage.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
