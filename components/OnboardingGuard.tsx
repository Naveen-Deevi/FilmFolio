"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function OnboardingGuard({ hasLocation }: { hasLocation: boolean }) {
  const { isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && !hasLocation) {
      // If user is logged in but doesn't have a location, enforce onboarding
      if (pathname !== "/onboarding" && !pathname.startsWith("/sign-in") && !pathname.startsWith("/sign-up")) {
        router.push("/onboarding");
      }
    }
  }, [isLoaded, isSignedIn, hasLocation, pathname, router]);

  return null;
}
