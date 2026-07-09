import React from "react";

interface PortfolioCardProps {
  name: string;
  avatarUrl: string;
  professions: string[];
  location: string;
  projectCount: number;
}

export default function PortfolioCard({
  name,
  avatarUrl,
  professions,
  projectCount,
}: PortfolioCardProps) {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      {/* Main Image Container */}
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[rgba(0,0,0,0.02)] relative">
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Metadata Row */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <span className="font-sans text-[14px] font-semibold text-[var(--color-text-main)] truncate max-w-[120px]">
            {name}
          </span>
          {professions[0] && (
            <span className="bg-[rgba(0,0,0,0.05)] text-[var(--color-text-secondary)] font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
              {professions[0].substring(0, 3)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity text-[13px] font-sans font-medium">
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
            <span>{projectCount * 12}</span>
          </div>
          <div className="flex items-center gap-1 ml-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
            <span>{projectCount * 105}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
