"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getCollections, createCollection, saveItemToCollection } from "@/app/actions/collections";

interface Collection {
  id: bigint;
  name: string;
}

interface SaveItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: "user" | "equipment";
  targetUserId?: string;
  targetEquipId?: bigint;
}

export default function SaveItemModal({
  isOpen,
  onClose,
  itemType,
  targetUserId,
  targetEquipId,
}: SaveItemModalProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadCollections();
      setError("");
      setSuccess("");
    }
  }, [isOpen]);

  const loadCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    setLoading(true);
    try {
      const created = await createCollection(newCollectionName.trim());
      setCollections([created, ...collections]);
      setNewCollectionName("");
    } catch (err: any) {
      setError(err.message || "Failed to create collection");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCollection = async (collectionId: bigint) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await saveItemToCollection(collectionId, itemType, targetUserId, targetEquipId);
      setSuccess("Saved successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to save item. It might already be in this collection.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="level-1-glass w-[90%] sm:w-[400px] md:w-[448px] rounded-[2rem] p-8 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--color-text-secondary)] hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2 className="font-title-md text-2xl mb-6 text-[var(--color-on-surface)]">Save to Collection</h2>

        {error && <div className="mb-4 text-red-500 text-sm font-sans">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm font-sans">{success}</div>}

        <div className="mb-6">
          <h3 className="font-sans text-sm font-bold text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">
            Create New Collection
          </h3>
          <form onSubmit={handleCreateCollection} className="flex gap-2">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g., Favorite Directors"
              className="input-glass flex-1 py-3 px-4 font-sans text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newCollectionName.trim()}
              className="btn-primary py-2 px-6"
            >
              Add
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-sans text-sm font-bold text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">
            Save to Existing
          </h3>
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto no-scrollbar">
            {collections.length === 0 ? (
              <p className="text-sm text-[var(--color-text-secondary)] font-sans italic">
                No collections yet.
              </p>
            ) : (
              collections.map((col) => (
                <button
                  key={col.id.toString()}
                  onClick={() => handleSaveToCollection(col.id)}
                  disabled={loading}
                  className="group w-full text-left py-3 px-4 rounded-xl hover:bg-black/5 transition-colors font-sans text-[var(--color-text-main)] border border-transparent hover:border-black/20 flex justify-between items-center"
                >
                  {col.name}
                  <span className="material-symbols-outlined text-[var(--color-on-surface)] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    add
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
