"use client";

import { useState } from "react";
import { ChatMessage } from "./types/chat";
import PromptInput from "./components/PromptInput";
import ChatHistory from "./components/ChatHistory";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const handleSendPrompt = async (prompt: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: prompt,
    };

    setHistory((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.error || `Błąd HTTP: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseText = data.message;

      const aiMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: aiResponseText,
      };
      setHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: `Wystąpił błąd: Nie udało się połączyć z usługą LLM. Sprawdź konsolę lub upewnij się, że Docker działa na porcie 3001.`,
        } as ChatMessage,
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex flex-col h-screen max-h-screen items-center">
      <h1 className="text-4xl font-bold py-4">PsychoAssistant</h1>
      <div className="grow w-full max-w-xl mx-auto overflow-y-auto">
        <ChatHistory messages={history}>{}</ChatHistory>
      </div>
      <div className="flex items-centerw-full max-w-xl mx-auto border border-gray-100 shadow-2xl p-4 rounded-2xl m-4">
        <PromptInput
          onSend={handleSendPrompt}
          isDisabled={isLoading}
        ></PromptInput>
      </div>
      <div className="m-2">
        <p>PsychoAssistant can make mistakes. Please verify its answers. </p>
      </div>
    </main>
  );
}
