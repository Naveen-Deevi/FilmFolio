"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startConversation } from "@/app/actions/messages";

export default function SendMessageButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMessage = async () => {
    setLoading(true);
    try {
      await startConversation(userId);
      router.push("/messages");
    } catch (err) {
      console.error(err);
      alert("Failed to start conversation. Ensure you are logged in.");
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleMessage}
      disabled={loading}
      className="btn-primary w-full mt-6 py-4 text-sm tracking-widest shadow-lg disabled:opacity-50"
    >
      {loading ? "Connecting..." : "Send Message"}
    </button>
  );
}
