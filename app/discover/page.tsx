import React, { Suspense } from "react";
import Link from "next/link";
import PortfolioCard from "@/components/PortfolioCard";
import DiscoverHeader from "@/components/DiscoverHeader";
import { getDiscoverUsers } from "@/app/actions/user";

export default async function Dashboard(props: { searchParams: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const q = searchParams.q?.toLowerCase() || "";
  
  const users = await getDiscoverUsers(q);

  const mappedPortfolios = users.map(u => ({
    id: u.id,
    name: u.fullName,
    avatarUrl: u.profilePhotoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop",
    professions: u.professions.map(p => p.profession.name),
    location: u.location || "Unknown",
    projectCount: u.projectsOwned.length
  }));

  return (
    <>
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto relative transition-all duration-500 ease-out">
        {/* Decorative Meshes */}
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-primary)] opacity-5 blur-[140px] -z-10 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white opacity-40 blur-[100px] -z-10 pointer-events-none" />

        {/* Header Section (Client Component for Drawer state) */}
        <Suspense fallback={<div className="h-64" />}>
          <DiscoverHeader />
        </Suspense>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 mt-16">
          {mappedPortfolios.length > 0 ? mappedPortfolios.map((portfolio) => (
            <Link href={`/creators/${portfolio.id}`} key={portfolio.id} className="block transition-transform hover:-translate-y-1">
              <PortfolioCard {...portfolio} />
            </Link>
          )) : (
            <div className="col-span-full text-center py-20 text-[var(--color-text-secondary)] font-sans">
              No profiles found {q ? `matching "${q}"` : "yet"}.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
