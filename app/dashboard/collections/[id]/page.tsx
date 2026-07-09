import React from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { getCollectionWithItems } from "@/app/actions/collections";
import PortfolioCard from "@/components/PortfolioCard";

export default async function CollectionDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const collectionId = BigInt(params.id);
  const collection = await getCollectionWithItems(collectionId);

  if (!collection) {
    return (
      <>
        <Navigation />
        <div className="pt-32 text-center text-xl font-sans">Collection not found.</div>
      </>
    );
  }

  const profiles = collection.savedItems
    .filter((item) => item.itemType === "user" && item.targetUser)
    .map((item) => {
      const u = item.targetUser!;
      return {
        id: u.id,
        name: u.fullName,
        avatarUrl: u.profilePhotoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop",
        professions: u.professions?.map((p: any) => p.profession.name) || [],
        location: u.location || "Unknown",
        projectCount: 0 // Mocked for now, can be aggregated if needed
      };
    });

  const equipment = collection.savedItems
    .filter((item) => item.itemType === "equipment" && item.targetEquip)
    .map((item) => item.targetEquip!);

  return (
    <>
      <Navigation />
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto relative">
        <Link href="/dashboard/collections" className="mb-8 font-sans text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-2 transition-all w-fit">
          ← Back to Collections
        </Link>
        <h1 className="font-display text-5xl mb-10 text-[var(--color-text-main)]">{collection.name}</h1>

        {profiles.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-3xl mb-6 text-[var(--color-primary)]">Saved Profiles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {profiles.map((profile) => (
                <Link href={`/creators/${profile.id}`} key={profile.id} className="block transition-transform hover:-translate-y-1">
                  <PortfolioCard {...profile} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {equipment.length > 0 && (
          <div>
            <h2 className="font-display text-3xl mb-6 text-[var(--color-primary)]">Saved Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipment.map((item) => (
                <Link href={`/marketplace/${item.id}`} key={item.id.toString()}>
                  <div className="level-1-glass rounded-2xl overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                    <div className="aspect-video w-full bg-black/5">
                      <img src={item.imageUrl || ""} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-title-md text-xl mb-2">{item.title}</h3>
                      <p className="font-sans font-bold text-lg text-[var(--color-primary)] mt-auto">
                        ${Number(item.rentalPrice || 0)}/day
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {profiles.length === 0 && equipment.length === 0 && (
          <div className="py-16 text-center text-[var(--color-text-secondary)] font-sans italic bg-black/5 rounded-3xl">
            This collection is empty.
          </div>
        )}
      </main>
    </>
  );
}
