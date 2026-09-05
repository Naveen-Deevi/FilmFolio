"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_PROJECTS, MOCK_EQUIPMENT } from "@/lib/mockData";

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("My Projects");

  const TABS = ["My Projects", "Applications", "My Gear", "Settings"];

  return (
    <>
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-6xl mx-auto relative min-h-screen">
        {/* Background Decorative */}
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-primary)] opacity-5 blur-[150px] -z-10 pointer-events-none" />

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--color-text-main)] mb-2">My Dashboard</h1>
            <p className="font-sans text-lg text-[var(--color-text-secondary)]">Manage your portfolio, applications, and gear.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/post-project">
              <button className="bg-black text-white px-5 py-2.5 rounded-full font-sans text-sm font-bold hover:opacity-80 transition-opacity flex items-center gap-2">
                <span>+</span> Post Project
              </button>
            </Link>
            <Link href="/dashboard/list-gear">
              <button className="bg-white text-black border border-black/10 px-5 py-2.5 rounded-full font-sans text-sm font-bold hover:bg-black/5 transition-colors flex items-center gap-2 shadow-sm">
                <span>+</span> List Gear
              </button>
            </Link>
          </div>
        </div>

        {/* Liquid Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto no-scrollbar p-1 bg-black/5 rounded-full w-max">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-sans text-sm font-bold transition-all ${
                activeTab === tab 
                  ? "bg-white text-black shadow-sm" 
                  : "text-[var(--color-text-secondary)] hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="level-1-glass rounded-[2rem] p-8 min-h-[400px]">
          
          {activeTab === "My Projects" && (
            <div>
              <h2 className="font-display text-3xl mb-6">Posted Projects</h2>
              <div className="flex flex-col gap-4">
                {MOCK_PROJECTS.slice(0,2).map(project => (
                  <div key={project.id} className="flex justify-between items-center p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/10">
                        <img src={project.posterUrl} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-lg">{project.title}</h4>
                        <p className="font-sans text-sm opacity-70">{project.stage} • 3 Applications</p>
                      </div>
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <button className="font-sans text-sm font-bold opacity-60 hover:opacity-100 px-4 py-2 bg-white rounded-full border border-black/10">Manage</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Applications" && (
            <div>
              <h2 className="font-display text-3xl mb-6">My Applications</h2>
              <div className="text-[var(--color-text-secondary)] font-sans flex flex-col items-center justify-center h-48 text-center bg-black/5 rounded-xl border border-black/5 border-dashed">
                <p>You haven't applied to any roles yet.</p>
                <Link href="/projects" className="mt-4 text-black font-bold underline hover:no-underline">Browse Open Roles</Link>
              </div>
            </div>
          )}

          {activeTab === "My Gear" && (
            <div>
              <h2 className="font-display text-3xl mb-6">Listed Equipment</h2>
              <div className="flex flex-col gap-4">
                {MOCK_EQUIPMENT.slice(0,1).map(item => (
                  <div key={item.id} className="flex justify-between items-center p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 rounded-lg overflow-hidden bg-black/10">
                        <img src={item.imageUrl} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-lg">{item.title}</h4>
                        <p className="font-sans text-sm opacity-70">${item.pricePerDay}/day • {item.location}</p>
                      </div>
                    </div>
                    <Link href={`/marketplace/${item.id}`}>
                      <button className="font-sans text-sm font-bold opacity-60 hover:opacity-100 px-4 py-2 bg-white rounded-full border border-black/10">View</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Settings" && (
            <div>
              <h2 className="font-display text-3xl mb-6">Profile Settings</h2>
              <form className="max-w-xl flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-sm font-bold ml-2">Display Name</label>
                  <input type="text" defaultValue="Alex Rivera" className="input-glass px-4 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-sm font-bold ml-2">Location</label>
                  <input type="text" defaultValue="Los Angeles, CA" className="input-glass px-4 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-sm font-bold ml-2">Bio</label>
                  <textarea rows={4} className="input-glass px-4 py-3" defaultValue="Award-winning filmmaker..." />
                </div>
                <button className="btn-primary w-max mt-4 px-8 py-3 rounded-full text-sm font-bold">Save Changes</button>
              </form>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
