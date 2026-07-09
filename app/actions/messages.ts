"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// Ensure the current Clerk user exists in our DB
async function getDbUser() {
  const { userId } = await auth();
  if (!userId) return null;
  
  return prisma.user.findUnique({
    where: { clerkId: userId }
  });
}

// Fetch all conversations for the current user
export async function getConversations() {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  const conversations = await prisma.conversation.findMany({
    where: {
      members: {
        some: { userId: dbUser.id }
      }
    },
    include: {
      members: {
        include: {
          user: true
        }
      },
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return conversations.map(conv => {
    const otherMember = conv.members.find(m => m.userId !== dbUser.id)?.user;
    return {
      id: conv.id.toString(),
      name: otherMember?.fullName || 'Unknown User',
      avatarUrl: otherMember?.profilePhotoUrl || 'https://via.placeholder.com/150',
      lastMessage: conv.messages[0]?.content || 'Started a conversation',
      lastMessageTime: conv.messages[0]?.createdAt?.toISOString() || conv.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: conv.messages[0]?.createdAt || conv.createdAt
    };
  }).sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime());
}

// Fetch all messages for a specific conversation
export async function getMessages(conversationIdStr: string) {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  const conversationId = BigInt(conversationIdStr);

  // Validate user is part of conversation
  const isMember = await prisma.conversationMember.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId: dbUser.id
      }
    }
  });

  if (!isMember) throw new Error("Unauthorized access to conversation");

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
    include: {
      sender: true
    }
  });

  return messages.map(msg => ({
    id: msg.id.toString(),
    text: msg.content,
    sender: (msg.senderId === dbUser.id ? 'me' : 'them') as 'me' | 'them',
    senderName: msg.sender?.fullName,
    time: (msg.createdAt || new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));
}

// Send a new message to a conversation
export async function sendMessage(conversationIdStr: string, content: string) {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  const conversationId = BigInt(conversationIdStr);

  // Validate user is part of conversation
  const isMember = await prisma.conversationMember.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId: dbUser.id
      }
    }
  });

  if (!isMember) throw new Error("Unauthorized to send message");

  const newMsg = await prisma.message.create({
    data: {
      conversationId,
      senderId: dbUser.id,
      content
    }
  });

  revalidatePath('/messages');
  
  return {
    id: newMsg.id.toString(),
    text: newMsg.content,
    sender: 'me',
    time: newMsg.createdAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

// Optional: Start a new conversation
export async function startConversation(targetUserId: string) {
  const dbUser = await getDbUser();
  if (!dbUser) throw new Error("Unauthorized");

  // Check if conversation already exists between these two
  const existingConvs = await prisma.conversation.findMany({
    where: {
      AND: [
        { members: { some: { userId: dbUser.id } } },
        { members: { some: { userId: targetUserId } } }
      ]
    }
  });

  if (existingConvs.length > 0) {
    return existingConvs[0].id.toString();
  }

  // Create new
  const newConv = await prisma.conversation.create({
    data: {
      contextType: 'general',
      members: {
        create: [
          { userId: dbUser.id },
          { userId: targetUserId }
        ]
      }
    }
  });

  revalidatePath('/messages');
  return newConv.id.toString();
}
