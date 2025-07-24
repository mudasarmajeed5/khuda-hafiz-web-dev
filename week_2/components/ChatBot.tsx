"use client";
import Script from "next/script";

export default function ChatBot() {
  return (
    <>
      {typeof window !== "undefined" && (
        <>
          <Script
            id="dialogflow-messenger"
            src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js"
            strategy="afterInteractive"
            onError={(e) => {
              console.error("Dialogflow script failed to load:", e);
            }}
          />

          {/* @ts-ignore */}
          <df-messenger
            intent="WELCOME"
            chat-title="Khudahafiz.co | HelpBot"
            agent-id="22a10928-9ca4-4800-8c58-cc5680a17a8d"
            language-code="en"
            chat-icon=" https://unpkg.com/lucide-static/icons/bot.svg"
          />
        </>
      )}
    </>
  );
}
