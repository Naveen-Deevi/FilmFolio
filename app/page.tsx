"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Smooth reveal on scroll interaction
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 
        Tailwind v4 class hack to ensure these classes are in the bundle for the observer:
        opacity-100 translate-y-0 opacity-0 translate-y-10 transition-all duration-1000
      */}
      {/* Global Liquid Background Gradient Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary-container blur-[120px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-[40%] -right-[5%] w-[50%] h-[50%] rounded-full bg-secondary-container blur-[100px] mix-blend-multiply"></div>
      </div>

      <main className="pt-[140px]">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[70vh] flex items-end">
            <img 
              alt="Filmmaking Hero" 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLuu-XAz48w4_dUxx-pXOWwjPzTvLYqD97ctZSBjLfN4xMNCM-FJWREUA-w09MGLB0RcyWHWonZ7QF1Q18yastB_NjQ0bQohZ5f_JWW7fO3PkYz_wU6MpQsh3bSrOoV7TNQtbqbwBKBUnDFsA9y_XY6fyzD3wehrwhq4NWTx3R-X8CObnktk4ksWRCkVZeBhu73t-15ZOoq76izwIqEynnJRq-aY8YbGx65BcABkoTQzhMy8o0gIlWBJzrhR" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative z-10 p-md md:p-xl w-full max-w-4xl">
              <span className="inline-block px-3 py-1 bg-primary text-on-primary-fixed rounded-full text-label-sm font-label-sm mb-sm tracking-widest uppercase">The Industry Standard</span>
              <h1 className="font-display-lg md:text-[72px] sm:text-[56px] text-[42px] leading-tight text-white mb-md uppercase tracking-tight text-glow">Everything You Need to <span className="text-primary-container">Bring Your Film</span> to Life</h1>
              <p className="font-body-lg md:text-[20px] text-[18px] leading-relaxed text-white/90 max-w-2xl mb-lg">Access elite talent, top-tier equipment, and high-performance workflows designed for the modern filmmaker. From pre-production to premiere.</p>
              <div className="flex flex-wrap gap-md">
                <Link href="/discover">
                  <button className="glossy-primary text-on-primary-fixed font-title-md text-title-md px-xl py-md rounded-full hover:scale-105 transition-transform w-full md:w-auto h-[52px] flex items-center justify-center">Explore The Catalog</button>
                </Link>
                <Link href="/sign-up">
                  <button className="liquid-glass text-white font-title-md text-title-md px-xl py-md rounded-full border-white/40 hover:bg-white/10 transition-colors w-full md:w-auto h-[52px] flex items-center justify-center">How it works</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Services Bento Grid */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div onClick={() => router.push('/discover')} className="group relative liquid-glass p-lg rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between h-80">
              <div className="relative z-10">
                <h3 className="font-headline-lg text-headline-lg mb-xs">Hire Elite Crew</h3>
                <p className="font-body-md text-on-surface-variant text-[18px]">Connect with vetted directors and cinematographers globally.</p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-primary font-bold">
                Learn More <span className="material-symbols-outlined">arrow_forward</span>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <span className="material-symbols-outlined text-[100px] text-primary">groups</span>
              </div>
            </div>
            
            <div onClick={() => router.push('/marketplace')} className="group relative liquid-glass p-lg rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between h-80">
              <div className="relative z-10">
                <h3 className="font-headline-lg text-headline-lg mb-xs">Rent Gear</h3>
                <p className="font-body-md text-on-surface-variant text-[18px]">ARRI, RED, and Sony cameras at your fingertips.</p>
              </div>
              <div className="absolute bottom-6 right-6 opacity-40 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-4xl">videocam</span>
              </div>
            </div>
            
            <div onClick={() => router.push('/projects')} className="group relative bg-primary-container p-lg rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between h-80">
              <div className="relative z-10">
                <h3 className="font-headline-lg text-headline-lg text-on-primary-container mb-xs">Portfolio</h3>
                <p className="font-body-md text-on-primary-container/80 text-[18px]">Showcase your cinematic masterpieces to the world.</p>
              </div>
              <div className="absolute bottom-6 right-6 text-on-primary-container">
                <span className="material-symbols-outlined text-4xl" data-weight="fill">movie</span>
              </div>
            </div>
            
            <div className="group relative liquid-glass p-lg rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between h-80">
              <div className="relative z-10">
                <h3 className="font-headline-lg text-headline-lg mb-xs">Global Ops</h3>
                <p className="font-body-md text-on-surface-variant text-[18px]">Streamlined production management for any scale.</p>
              </div>
              <div className="absolute bottom-6 right-6 opacity-40 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">public</span>
              </div>
            </div>
          </div>
        </section>

        {/* Talent Categories */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="text-center max-w-2xl mx-auto mb-gutter">
            <h2 className="font-display-lg md:text-[48px] sm:text-[36px] text-[32px] leading-tight text-on-surface uppercase">Browse Talent</h2>
            <p className="font-body-md text-on-surface-variant text-[18px]">Filter by expertise and location to find the perfect match for your production.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter">
            <div onClick={() => router.push('/discover?q=Director')} className="liquid-glass p-md rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-container-high transition-colors h-48 border-b-4 border-b-transparent hover:border-b-primary">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-sm group-hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container transition-colors text-3xl">directions_car</span>
              </div>
              <span className="font-title-md text-title-md">Directors</span>
            </div>
            <div onClick={() => router.push('/discover?q=Cinematography')} className="liquid-glass p-md rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-container-high transition-colors h-48 border-b-4 border-b-transparent hover:border-b-primary">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-sm group-hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container transition-colors text-3xl">photo_camera</span>
              </div>
              <span className="font-title-md text-title-md">Cinematography</span>
            </div>
            <div onClick={() => router.push('/discover?q=Editor')} className="liquid-glass p-md rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-container-high transition-colors h-48 border-b-4 border-b-transparent hover:border-b-primary">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-sm group-hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container transition-colors text-3xl">edit_note</span>
              </div>
              <span className="font-title-md text-title-md">Editors</span>
            </div>
            <div onClick={() => router.push('/discover?q=Production')} className="liquid-glass p-md rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-container-high transition-colors h-48 border-b-4 border-b-transparent hover:border-b-primary">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-sm group-hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container transition-colors text-3xl">palette</span>
              </div>
              <span className="font-title-md text-title-md">Production Design</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/discover">
              <button className="text-primary font-bold flex items-center gap-xs hover:underline transition-all">View All Talent <span className="material-symbols-outlined">trending_flat</span></button>
            </Link>
          </div>
        </section>

        {/* Featured Creatives */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="text-center mb-gutter">
            <h2 className="font-display-lg md:text-[48px] sm:text-[36px] text-[32px] leading-tight uppercase">Featured Creatives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="liquid-glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform flex flex-col h-full">
              <img alt="Elena Vance" className="h-64 w-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMI_--4rXsgWsFJ5XNoN3PsPc_wgk9VJMIkJlBy8rIhBDQ_8tWCNrFBIKxx3MFdFGvwRg9gHzHvZ6-0LdU4Zaj5l7P_rawNn-xFLb66FpKoWFW4pulBPezxcGUbjZMie3JwSDXpJgj6q1iQt8t322vGXYkyLOJYJpsbdkvC9eGpzP9PTRGVCDs3DKrK21NCTzjjRtDaHp4WpxOsKCsbtualsMVVcsEXoGByqLGnP84X8aZdfs7uLDMlw" />
              <div className="p-md text-center flex-1 flex flex-col justify-center border-t border-white/20">
                <h5 className="font-title-md text-title-md mb-xs">Elena Vance</h5>
                <p className="font-body-md text-primary font-bold mb-xs">Director • London</p>
                <p className="font-body-md text-on-surface-variant text-sm px-sm line-clamp-2">Award-winning high-concept sci-fi director.</p>
              </div>
            </div>
            <div className="liquid-glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform flex flex-col h-full">
              <img alt="Marcus Thorne" className="h-64 w-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMYdQ36IBkjFrz026VAeFaDta3HncCdmjpBrirrFrvrG3YR7kD8sdi5xZjkXPOOS1qupk8afDfE3evHasYKuKH7LLM5Mke3KNEfPln-s2AbdeC8lj7X1zTLVXxAPZe5EslIuZ_xZbL5Qr0XLsc0yrnNQxEsxYG2D8CRssFW_s_LOubprHtQIfAm5EbXq2lz8GaXRupFcP4KINdKUMvlTSbbkouRVBISeNoc_7hnovUDLAK9JEWUoFITg" />
              <div className="p-md text-center flex-1 flex flex-col justify-center border-t border-white/20">
                <h5 className="font-title-md text-title-md mb-xs">Marcus Thorne</h5>
                <p className="font-body-md text-primary font-bold mb-xs">DP • New York</p>
                <p className="font-body-md text-on-surface-variant text-sm px-sm line-clamp-2">Commercial DP for premium global brands.</p>
              </div>
            </div>
            <div className="liquid-glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform flex flex-col h-full">
              <img alt="Sophie Chen" className="h-64 w-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL9fXz7NsN_hJigWRAyRBQDS4mlLhnMDeRR_EgklOV6RF1pc_Sz7FxFgAMefb44rH2ZrZtZ8ACGwgwvtmYYPbLM9P2XRQjBAOqplGmHqYS3jcVnQcNQ3HHRjYHDz8xAqNEdBaFOsqJOVxMmCH4sDWX3dBjZI0uBsYugQ0q5q0yVwQtdY-mc1JsiWSmOmaWzP2DjGZGL1qlsy9azwyxnxPqgZMf6jSOrhsmrFkPnqYnfCDrnwDIBbNvPg" />
              <div className="p-md text-center flex-1 flex flex-col justify-center border-t border-white/20">
                <h5 className="font-title-md text-title-md mb-xs">Sophie Chen</h5>
                <p className="font-body-md text-primary font-bold mb-xs">Designer • Tokyo</p>
                <p className="font-body-md text-on-surface-variant text-sm px-sm line-clamp-2">World-builder for international feature films.</p>
              </div>
            </div>
            <div className="liquid-glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform flex flex-col h-full">
              <img alt="David Miller" className="h-64 w-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALFTqZ0OFnYq_3-C20IGVppX1WXLWNb5muaBOe68DBNXiXpdQqnq9LdbAQuNjWKwHASRQJ04D07sjcChAc-zb_71QPiVoZcrzn3_HqLd3i5fqEUdnVPcOSxJOfHUgdUwt8wuJas96NgI0Fh0woFw6MqxViqxtzO6FQH8uPTagHCYmy39AeGymxI0yEBDoHTeRxpou4z8GLzqJa3K7Frwo1qH2EcZn_-vksq31BnKmvFL5F97iahR0zmA" />
              <div className="p-md text-center flex-1 flex flex-col justify-center border-t border-white/20">
                <h5 className="font-title-md text-title-md mb-xs">David Miller</h5>
                <p className="font-body-md text-primary font-bold mb-xs">Editor • LA</p>
                <p className="font-body-md text-on-surface-variant text-sm px-sm line-clamp-2">Master of rhythm in high-octane action cinema.</p>
              </div>
            </div>
          </div>
        </section>



        {/* Stats & CTA */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop section-spacing">
          <div className="liquid-glass rounded-2xl p-xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter w-full mb-xl">
              <div>
                <div className="font-display-lg text-[64px] text-primary">50k+</div>
                <div className="font-label-sm text-label-sm tracking-widest uppercase">Verified Crew</div>
              </div>
              <div>
                <div className="font-display-lg text-[64px] text-primary">120</div>
                <div className="font-label-sm text-label-sm tracking-widest uppercase">Rental Houses</div>
              </div>
              <div>
                <div className="font-display-lg text-[64px] text-primary">850</div>
                <div className="font-label-sm text-label-sm tracking-widest uppercase">Productions</div>
              </div>
              <div>
                <div className="font-display-lg text-[64px] text-primary">12k</div>
                <div className="font-label-sm text-label-sm tracking-widest uppercase">Global Awards</div>
              </div>
            </div>
            <div className="max-w-2xl pt-lg border-t border-primary/20">
              <h2 className="font-display-lg md:text-[48px] sm:text-[36px] text-[32px] leading-tight mb-md uppercase">Ready to start your next masterpiece?</h2>
              <p className="font-body-lg md:text-[20px] text-[18px] leading-relaxed text-on-surface/90 mb-lg">Join the world's most innovative network of film professionals.</p>
              <Link href="/sign-up">
                <button className="glossy-primary text-on-primary-fixed font-title-md text-title-md px-xl py-md rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl group w-full md:w-auto h-[52px] flex items-center justify-center mx-auto">
                  Start Creating Now
                  <span className="material-symbols-outlined ml-2 group-hover:translate-x-2 transition-transform">bolt</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
