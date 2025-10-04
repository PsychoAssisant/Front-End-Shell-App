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
    <main>
      <h1>PsychoAssistant</h1>
      <div>
        <ChatHistory messages={history}>{}</ChatHistory>
      </div>
      <div>
        <PromptInput
          onSend={handleSendPrompt}
          isDisabled={isLoading}
        ></PromptInput>
      </div>
    </main>
  );
}
