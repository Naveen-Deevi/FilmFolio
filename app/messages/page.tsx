"use client";

import React, { useState, useEffect, useRef } from "react";
import { getConversations, getMessages, sendMessage } from "@/app/actions/messages";
import { useUser } from "@clerk/nextjs";

type ConversationType = {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
};

type MessageType = {
  id: string;
  text: string;
  sender: 'me' | 'them';
  senderName?: string;
  time: string;
};

export default function MessagesPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Fetch initial conversations
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      loadConversations();
    } else if (isLoaded && !isSignedIn) {
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  // Polling for conversations and messages
  useEffect(() => {
    if (!isSignedIn) return;
    
    const interval = setInterval(() => {
      loadConversations(false);
      if (activeChatId) {
        loadMessages(activeChatId, false);
      }
    }, 5000); // Poll every 5 seconds
    
    return () => clearInterval(interval);
  }, [activeChatId, isSignedIn]);

  const loadConversations = async (showLoading = true) => {
    try {
      if (showLoading && !conversations.length) setIsLoading(true);
      const data = await getConversations();
      setConversations(data);
      if (data.length > 0 && !activeChatId && showLoading) {
        setActiveChatId(data[0].id);
        loadMessages(data[0].id);
      }
    } catch (err) {
      console.error("Error loading conversations", err);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  const loadMessages = async (chatId: string, scroll = true) => {
    try {
      const data = await getMessages(chatId);
      setMessages(data);
      if (scroll) {
        setTimeout(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
              top: messagesContainerRef.current.scrollHeight,
              behavior: "smooth"
            });
          }
        }, 100);
      }
    } catch (err) {
      console.error("Error loading messages", err);
    }
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    setMessages([]);
    loadMessages(chatId);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeChatId) return;
    
    const text = input;
    setInput("");
    
    // Optimistic update
    const tempMsg: MessageType = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setMessages(prev => [...prev, tempMsg]);
    
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 50);

    try {
      const newMsg = await sendMessage(activeChatId, text);
      // Replace optimistic msg with real msg (optional, but polling handles it)
      setMessages(prev => prev.map(m => m.id === tempMsg.id ? newMsg as MessageType : m));
    } catch (err) {
      console.error("Failed to send message", err);
      // Revert optimistic update on error
      setMessages(prev => prev.filter(m => m.id !== tempMsg.id));
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <>
        <main className="w-full pt-32 pb-8 px-4 flex justify-center h-screen items-center">
          <p className="font-sans animate-pulse">Loading messages...</p>
        </main>
      </>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        <main className="w-full pt-32 pb-8 px-4 flex justify-center h-screen items-center text-center">
          <div>
            <h2 className="font-display text-3xl mb-4">Please log in</h2>
            <p className="font-sans text-[var(--color-text-secondary)]">You need to be signed in to view your messages.</p>
          </div>
        </main>
      </>
    );
  }

  const activeChat = conversations.find(c => c.id === activeChatId);

  return (
    <>
      <main className="w-full pt-32 pb-8 px-4 sm:px-8 max-w-[1400px] mx-auto h-[95vh] flex flex-col relative">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-primary)] opacity-5 blur-[150px] -z-10 pointer-events-none" />

        <div className="level-1-glass w-full flex-1 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 border-r border-black/5 bg-white/30 flex flex-col">
            <div className="p-6 border-b border-black/5">
              <h2 className="font-display text-3xl">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {conversations.length === 0 ? (
                <div className="p-6 text-center opacity-50 font-sans text-sm">No conversations yet.</div>
              ) : (
                conversations.map((chat) => (
                  <div 
                    key={chat.id} 
                    onClick={() => handleChatSelect(chat.id)}
                    className={`p-4 flex items-center gap-4 cursor-pointer transition-colors border-b border-black/5 ${
                      activeChatId === chat.id ? "bg-black/5" : "hover:bg-white/50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-black/10 flex-shrink-0">
                      <img src={chat.avatarUrl} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-sans font-bold truncate pr-2">{chat.name}</h4>
                        <span className="text-[10px] opacity-50 font-mono">
                          {new Date(chat.lastMessageTime).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-sans text-xs opacity-70 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="w-full md:w-2/3 flex flex-col bg-white/20">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-black/5 bg-white/30 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-black/10">
                    <img src={activeChat.avatarUrl} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold">{activeChat.name}</h3>
                    <p className="font-sans text-xs opacity-60">Connected</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-6 flex flex-col gap-4"
                >
                  {messages.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center font-sans text-sm opacity-50">
                      Say hello to {activeChat.name}!
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={msg.id || i} className={`flex flex-col max-w-[70%] ${msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'}`}>
                        <div className={`p-4 rounded-2xl font-sans text-sm shadow-sm ${
                          msg.sender === 'me' 
                            ? 'bg-black text-white rounded-br-sm' 
                            : 'bg-white border border-black/5 rounded-bl-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[10px] opacity-40 font-mono mt-1 px-1">{msg.time}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white/40 border-t border-black/5">
                  <form onSubmit={handleSend} className="relative">
                    <input 
                      type="text" 
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Type a message..." 
                      className="w-full bg-white border border-black/10 rounded-full h-[50px] pl-6 pr-14 font-sans text-[14px] outline-none focus:border-[var(--color-primary)] transition-all shadow-sm"
                    />
                    <button type="submit" disabled={!input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 w-[34px] h-[34px] bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100">
                      ↑
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center font-sans text-lg opacity-50">
                Select a conversation to start messaging
              </div>
            )}
          </div>
          
        </div>
      </main>
    </>
  );
}
