// components/ChatConditional.jsx
// Opt-in chat widget: set NEXT_PUBLIC_CHAT_ENABLED=true in .env.local to enable
"use client";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("./Chat"), { ssr: false });

export default function ChatConditional() {
	if (process.env.NEXT_PUBLIC_CHAT_ENABLED !== "true") return null;
	return <Chat />;
}
