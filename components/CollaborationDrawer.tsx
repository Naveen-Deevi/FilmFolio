"use client";

import React, { useState } from "react";

interface CollaborationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaborationDrawer({ isOpen, onClose }: CollaborationDrawerProps) {
  const [activeTab, setActiveTab] = useState("message");

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-[120] md:hidden" onClick={onClose} />
      )}

      {/* Drawer Container */}
      <div 
        className="fixed top-4 right-4 bottom-4 w-[400px] max-w-[calc(100vw-32px)] z-[130] level-1-glass rounded-[2rem] p-6 flex flex-col"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(120%)',
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display text-3xl">Get In Touch</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.05)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.1)] transition-colors">
            ✕
          </button>
        </div>

        {/* Liquid Tube Tabs */}
        <div className="flex bg-[rgba(0,0,0,0.05)] rounded-full p-1 relative mb-8">
          {/* Active pill background - simplified for react without complex refs */}
          <div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[var(--color-surface)] rounded-full shadow-sm transition-transform duration-300 ease-out"
            style={{ transform: activeTab === 'message' ? 'translateX(0)' : 'translateX(100%)' }}
          />
          
          <button 
            className={`flex-1 py-2 text-sm font-sans font-semibold z-10 rounded-full transition-colors ${activeTab === 'message' ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-secondary)]'}`}
            onClick={() => setActiveTab('message')}
          >
            Message
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-sans font-semibold z-10 rounded-full transition-colors ${activeTab === 'project' ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-secondary)]'}`}
            onClick={() => setActiveTab('project')}
          >
            Invite to Project
          </button>
        </div>

        {/* Form Content */}
        <div className="flex flex-col gap-4 flex-1">
          <input 
            type="text" 
            placeholder="Subject" 
            className="input-glass w-full py-3 px-6 font-sans text-sm"
          />
          <textarea 
            placeholder="Type your message here..." 
            className="input-glass w-full py-4 px-6 font-sans text-sm flex-1 resize-none"
          ></textarea>
        </div>

        <button className="btn-primary w-full mt-6">
          Send Message
        </button>
      </div>
    </>
  );
}
