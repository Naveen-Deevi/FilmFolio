import React from "react";
import Link from "next/link";
import { getCreator, getDbUser } from "@/app/actions/user";
import CreatorActions from "@/components/CreatorActions";

export default async function CreatorDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const profile = await getCreator(params.id);
  const currentUser = await getDbUser();

  if (!profile) {
    return (
      <>
        <div className="pt-32 text-center text-xl font-sans">Creator not found.</div>
      </>
    );
  }

  const isOwner = currentUser?.id === profile.id;
  const showreel = profile.portfolioItems?.[0]?.externalLink;
  const isYoutube = showreel?.includes("youtube.com") || showreel?.includes("youtu.be");
  const isVimeo = showreel?.includes("vimeo.com");

  return (
    <>
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto relative">
        <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-primary)] opacity-5 blur-[150px] -z-10 pointer-events-none" />
        
        <Link href="/" className="mb-8 font-sans text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-2 transition-all w-fit">
          ← Back to Discover
        </Link>

        <div className="level-1-glass rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 relative overflow-hidden">
          <div className="w-full md:w-1/3 z-10">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl mb-4">
              <img 
                src={profile.profilePhotoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop"} 
                alt={profile.fullName} 
                className="w-full h-full object-cover" 
              />
            </div>
            <CreatorActions isOwner={isOwner} userId={profile.id} />
          </div>
          
          <div className="w-full md:w-2/3 z-10">
            <h1 className="font-display text-5xl md:text-7xl mb-2 text-[var(--color-text-main)]">{profile.fullName}</h1>
            
            <div className="flex items-center gap-3 mb-6 opacity-70">
              <span className="font-sans text-sm font-bold flex items-center gap-1">
                📍 {profile.location || "Unknown Location"}
              </span>
              <span>•</span>
              <span className="font-sans text-sm font-bold">
                {profile.projectsOwned?.length || 0} Projects
              </span>
            </div>

            <div className="flex gap-2 mb-8 flex-wrap">
              {profile.professions?.map((prof, i) => (
                <span key={i} className="px-4 py-1.5 bg-black/5 text-black border border-black/10 font-mono text-xs font-bold rounded-full">
                  {prof.profession.name}
                </span>
              ))}
            </div>

            <div className="mb-10">
              <h3 className="font-display text-3xl mb-4">About Me</h3>
              <p className="font-sans text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {profile.bio || `Filmmaker based in ${profile.location}. Always looking for the next great story to tell.`}
              </p>
              {profile.socialLinks && profile.socialLinks.length > 0 && (
                <a href={profile.socialLinks[0].url} target="_blank" rel="noreferrer" className="block mt-4 text-[var(--color-primary)] font-bold hover:underline">
                  Visit Social Profile
                </a>
              )}
            </div>

            {showreel && (
              <div>
                <h3 className="font-display text-3xl mb-6 flex items-center gap-2">
                  Showreel
                </h3>
                <div className="w-full aspect-video rounded-2xl bg-black/5 flex items-center justify-center border border-black/5 shadow-inner overflow-hidden">
                  {isYoutube ? (
                    <iframe 
                      className="w-full h-full" 
                      src={`https://www.youtube.com/embed/${showreel.split('v=')[1]?.split('&')[0] || showreel.split('/').pop()}`} 
                      allowFullScreen
                    ></iframe>
                  ) : isVimeo ? (
                    <iframe 
                      className="w-full h-full" 
                      src={`https://player.vimeo.com/video/${showreel.split('/').pop()}`} 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <a href={showreel} target="_blank" rel="noreferrer" className="font-mono text-sm uppercase tracking-widest hover:underline opacity-80">
                      View External Showreel
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
