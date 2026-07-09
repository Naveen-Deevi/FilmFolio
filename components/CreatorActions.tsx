"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SendMessageButton from "./SendMessageButton";
import SaveItemModal from "./SaveItemModal";
import { checkIsFavorited, toggleFavorite } from "@/app/actions/collections";

interface CreatorActionsProps {
  isOwner: boolean;
  userId: string;
}

export default function CreatorActions({ isOwner, userId }: CreatorActionsProps) {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    if (!isOwner) {
      checkIsFavorited("user", userId).then(setIsFavorited).catch(console.error);
    }
  }, [isOwner, userId]);

  const handleFavorite = async () => {
    // Optimistic update
    const previousState = isFavorited;
    setIsFavorited(!previousState);
    
    try {
      // Process in background
      const newState = await toggleFavorite("user", userId);
      // Ensure sync with server state in case of mismatch
      setIsFavorited(newState);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // Revert on error
      setIsFavorited(previousState);
    }
  };

  if (isOwner) {
    return (
      <Link href="/create-profile" className="btn-primary w-full text-center block mt-4 py-4 text-sm tracking-widest bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10">
        Edit Profile
      </Link>
    );
  }

  return (
    <>
      <SendMessageButton userId={userId} />
      <div className="flex gap-3 mt-3">
        <button 
          onClick={handleFavorite}
          className={`flex-1 py-3 px-4 rounded-full border ${isFavorited ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-black/20 text-[var(--color-on-surface)] hover:bg-black/5'} font-title-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}
        >
          <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${isFavorited ? 'scale-110' : 'scale-100'}`} style={isFavorited ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
          Favorite
        </button>
        <button 
          onClick={() => setIsSaveModalOpen(true)}
          className="flex-1 py-3 px-4 rounded-full border border-black/20 text-[var(--color-on-surface)] font-title-md hover:bg-black/5 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-xl">bookmark_add</span>
          Save
        </button>
      </div>

      <SaveItemModal 
        isOpen={isSaveModalOpen} 
        onClose={() => setIsSaveModalOpen(false)} 
        itemType="user" 
        targetUserId={userId} 
      />
    </>
  );
}
