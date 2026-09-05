"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { MOCK_PROJECTS } from "@/lib/mockData";

export default function ProjectsPage() {
  const [activeStage, setActiveStage] = useState("All Stages");
  
  const filteredProjects = MOCK_PROJECTS.filter(project => 
    activeStage === "All Stages" ? true : project.stage === activeStage
  );

  return (
    <>
      <Navigation />
      
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
            <a href={`/projects/${project.id}`} key={project.id} className="flex flex-col gap-3 group cursor-pointer">
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative bg-[var(--color-surface-variant)] flex items-center justify-center">
                <span className="material-symbols-outlined text-[48px] text-[var(--color-text-secondary)] opacity-20 absolute">movie</span>
                <img 
                  src={project.posterUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10" 
                  style={{ color: 'transparent' }}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=800&fit=crop";
                    e.currentTarget.onerror = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display text-2xl mb-1">{project.title}</h3>
                  <p className="font-sans text-xs opacity-80">{project.genre} • {project.stage}</p>
                </div>
              </div>
              
              <div className="px-1">
                <p className="text-sm font-sans text-[var(--color-text-secondary)] mb-2">By {project.author}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.rolesOpen.map(role => (
                    <span key={role} className="text-[10px] font-mono bg-black/5 px-2 py-1 rounded">Looking for: {role}</span>
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
