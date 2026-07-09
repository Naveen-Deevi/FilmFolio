"use server";

import prisma from "@/lib/db";
import { getDbUser } from "./user";
import { revalidatePath } from "next/cache";

export async function getCollections() {
  const dbUser = await getDbUser();
  if (!dbUser) return [];

  return prisma.collection.findMany({
    where: { userId: dbUser.id },
    include: {
      savedItems: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createCollection(name: string) {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  const collection = await prisma.collection.create({
    data: {
      userId: dbUser.id,
      name,
    },
  });

  revalidatePath("/");
  return collection;
}

export async function saveItemToCollection(
  collectionId: bigint,
  itemType: "user" | "equipment",
  targetUserId?: string,
  targetEquipId?: bigint
) {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  // Verify collection belongs to user
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
  });

  if (!collection || collection.userId !== dbUser.id) {
    throw new Error("Collection not found or unauthorized");
  }

  // Check if item is already in collection to prevent duplicates
  const existingItem = await prisma.savedItem.findFirst({
    where: {
      collectionId,
      itemType,
      targetUserId: targetUserId || null,
      targetEquipId: targetEquipId || null,
    },
  });

  if (existingItem) {
    throw new Error("Item already saved in this collection");
  }

  const savedItem = await prisma.savedItem.create({
    data: {
      collectionId,
      itemType,
      targetUserId: targetUserId || null,
      targetEquipId: targetEquipId || null,
    },
  });

  revalidatePath("/");
  return savedItem;
}

export async function getCollectionWithItems(collectionId: bigint) {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  return prisma.collection.findFirst({
    where: {
      id: collectionId,
      userId: dbUser.id,
    },
    include: {
      savedItems: {
        include: {
          targetUser: {
            include: {
              professions: { include: { profession: true } },
            },
          },
          targetEquip: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });
}

export async function checkIsFavorited(itemType: "user" | "equipment", targetUserId?: string, targetEquipId?: bigint) {
  const dbUser = await getDbUser();
  if (!dbUser) return false;

  const favCollection = await prisma.collection.findFirst({
    where: { userId: dbUser.id, name: "Favorites" }
  });

  if (!favCollection) return false;

  const existingItem = await prisma.savedItem.findFirst({
    where: {
      collectionId: favCollection.id,
      itemType,
      targetUserId: targetUserId || null,
      targetEquipId: targetEquipId || null,
    },
  });

  return !!existingItem;
}

export async function toggleFavorite(itemType: "user" | "equipment", targetUserId?: string, targetEquipId?: bigint) {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  // Find or create Favorites collection
  let favCollection = await prisma.collection.findFirst({
    where: { userId: dbUser.id, name: "Favorites" }
  });

  if (!favCollection) {
    favCollection = await prisma.collection.create({
      data: {
        userId: dbUser.id,
        name: "Favorites"
      }
    });
  }

  // Check if item is already in favorites
  const existingItem = await prisma.savedItem.findFirst({
    where: {
      collectionId: favCollection.id,
      itemType,
      targetUserId: targetUserId || null,
      targetEquipId: targetEquipId || null,
    },
  });

  let isFavorited = false;
  if (existingItem) {
    await prisma.savedItem.delete({ where: { id: existingItem.id } });
    isFavorited = false;
  } else {
    await prisma.savedItem.create({
      data: {
        collectionId: favCollection.id,
        itemType,
        targetUserId: targetUserId || null,
        targetEquipId: targetEquipId || null,
      },
    });
    isFavorited = true;
  }

  revalidatePath("/");
  return isFavorited;
}
