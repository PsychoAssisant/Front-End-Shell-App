"use client";

import { useState } from "react";
import PromptInput from "./components/PromptInput";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSendPrompt = (prompt: string) => {
    console.log("Request: ", prompt);
    setIsLoading(true);
    setTimeout(() => {
      console.log("Answer from PsychoAssistant: processed");
      setIsLoading(false);
    }, 1500);
  };
  return (
    <main className="flex flex-col min-h-screen items-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Form Preview</h1>
      <div className="flex-grow w-full max-w-lg bg-white shagow-lg rounded-t-lg p-6 mb-0 border-x border-t">
        <p className="text-gray-500">Chatting history...</p>
      </div>
      <div className="w-full max-w-lg shadow-lg rounded-b-lg">
        <PromptInput onSend={handleSendPrompt} isDisabled={isLoading} />
      </div>
    </main>
  );
}
