"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ChatMessage } from "./types/chat";
import PromptInput from "./components/PromptInput";
import ChatHistory from "./components/ChatHistory";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const handleSendPrompt = (prompt: string) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: prompt,
    };
    setHistory((prev) => [...prev, userMessage]);
    setTimeout(() => {
      const paMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: `Otrzymano zapytanie: "${prompt}"`,
      };
      setHistory((prev) => [...prev, paMessage]);
      setIsLoading(false);
    }, 1500);
  };
  return (
    <main className="flex flex-col min-h-screen items-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">PsychoAssistant</h1>
      <div className="flex-grow w-full max-w-lg bg-white shadow-inner overflow-hidden border-x border-t">
        <ChatHistory messages={history}>{}</ChatHistory>
      </div>
      <div className="w-full max-w-lg shadow-lg border-x border-b">
        <PromptInput
          onSend={handleSendPrompt}
          isDisabled={isLoading}
        ></PromptInput>
      </div>
    </main>
  );
}
