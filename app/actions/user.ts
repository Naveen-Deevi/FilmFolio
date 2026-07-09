"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getDbUser() {
  const { userId } = await auth();
  if (!userId) return null;
  
  return prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      professions: { include: { profession: true } },
      socialLinks: true,
      portfolioItems: true
    }
  });
}

export async function updateOnboarding(fullName: string, location: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");
  
  const email = clerkUser.emailAddresses[0]?.emailAddress;

  await prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      fullName,
      location,
      isVerified: true, // simple way to mark onboarding complete
    },
    create: {
      clerkId: clerkUser.id,
      email: email || `${clerkUser.id}@example.com`,
      username: clerkUser.username || email?.split("@")[0] || clerkUser.id,
      fullName,
      location,
      profilePhotoUrl: clerkUser.imageUrl,
      isVerified: true,
    }
  });
  
  revalidatePath("/");
}

export async function publishPortfolio(data: {
  fullName: string,
  location: string,
  avatarUrl: string,
  socialLink: string,
  showreelLink: string,
  professions: string
}) {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  // Update base user
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      fullName: data.fullName,
      location: data.location,
      profilePhotoUrl: data.avatarUrl || dbUser.profilePhotoUrl,
    }
  });

  // Handle Professions
  if (data.professions) {
    const profs = data.professions.split(",").map(p => p.trim()).filter(Boolean);
    // Clear existing
    await prisma.userProfession.deleteMany({ where: { userId: dbUser.id } });
    
    for (const p of profs) {
      // Upsert profession to make sure it exists
      const professionRecord = await prisma.profession.upsert({
        where: { name: p },
        create: { name: p },
        update: {}
      });
      // Link to user
      await prisma.userProfession.create({
        data: {
          userId: dbUser.id,
          professionId: professionRecord.id
        }
      });
    }
  }

  // Handle Social Links
  if (data.socialLink) {
    await prisma.userSocialLink.deleteMany({ where: { userId: dbUser.id } });
    await prisma.userSocialLink.create({
      data: {
        userId: dbUser.id,
        url: data.socialLink,
        platform: "General"
      }
    });
  }

  // Handle Showreel
  if (data.showreelLink) {
    await prisma.portfolioItem.deleteMany({ where: { userId: dbUser.id, mediaType: "showreel" } });
    await prisma.portfolioItem.create({
      data: {
        userId: dbUser.id,
        mediaType: "showreel",
        externalLink: data.showreelLink,
        title: "Main Showreel"
      }
    });
  }

  revalidatePath("/");
  revalidatePath(`/creators/${dbUser.id}`);
}

export async function getDiscoverUsers(query: string = "") {
  return prisma.user.findMany({
    where: {
      // Only show users who have completed onboarding
      location: { not: null },
      OR: [
        { fullName: { contains: query, mode: 'insensitive' } },
        {
          professions: {
            some: {
              profession: {
                name: { contains: query, mode: 'insensitive' }
              }
            }
          }
        }
      ]
    },
    include: {
      professions: { include: { profession: true } },
      projectsOwned: true
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getCreator(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      professions: { include: { profession: true } },
      projectsOwned: true,
      socialLinks: true,
      portfolioItems: {
        where: { mediaType: "showreel" },
        take: 1
      }
    }
  });
}
