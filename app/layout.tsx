import type { Metadata } from "next";
import { Bebas_Neue, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "FilmFolio",
  description: "The professional network for filmmakers",
};

import { getDbUser } from "@/app/actions/user";
import OnboardingGuard from "@/components/OnboardingGuard";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dbUser = await getDbUser();
  const hasLocation = !!dbUser?.location;
  const hasPublished = !!dbUser && (
    dbUser.professions.length > 0 || 
    dbUser.socialLinks.length > 0 || 
    dbUser.portfolioItems.length > 0
  );

  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${bebasNeue.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      >
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,20..48&display=swap" rel="stylesheet" />
        </head>
        <body className="min-h-full flex flex-col font-sans">
          <OnboardingGuard hasLocation={hasLocation} />
          <Navigation hasPublished={hasPublished} />
          
          {children}
          
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
