import React from "react";
import Link from "next/link";
import { getCollections } from "@/app/actions/collections";
import { getDbUser } from "@/app/actions/user";

export default async function CollectionsPage() {
  const currentUser = await getDbUser();
  if (!currentUser) return null;

  const collections = await getCollections();

  return (
    <>
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto relative">
        <h1 className="font-display text-5xl mb-10 text-[var(--color-text-main)]">My Saved Collections</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.length === 0 ? (
            <div className="col-span-full py-16 text-center text-[var(--color-text-secondary)] font-sans italic bg-black/5 rounded-3xl">
              You haven't created any collections yet. Browse Discover or Marketplace to save items!
            </div>
          ) : (
            collections.map((col) => (
              <Link href={`/dashboard/collections/${col.id}`} key={col.id.toString()}>
                <div className="level-1-glass p-8 rounded-3xl hover:-translate-y-1 transition-transform cursor-pointer border border-transparent hover:border-[var(--color-primary)]">
                  <h3 className="font-title-md text-2xl mb-2 text-[var(--color-primary)]">{col.name}</h3>
                  <p className="font-sans text-sm text-[var(--color-text-secondary)] font-bold">
                    {col.savedItems.length} {col.savedItems.length === 1 ? 'item' : 'items'} saved
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </>
  );
}
