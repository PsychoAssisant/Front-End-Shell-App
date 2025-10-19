"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ChatMessage } from "./types/chat";
import PromptInput from "./components/PromptInput";
import ChatHistory from "./components/ChatHistory";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const handleSendPrompt = async (prompt: string) => {
    if (isLoading) return; // Zabezpieczenie przed podwójnym wysłaniem

    setIsLoading(true);

    // 1. Dodaj wiadomość użytkownika do historii (natychmiast)
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: prompt,
    };
    // Używamy funkcji aktualizującej stan (prev), aby zawsze bazować na najnowszej historii
    setHistory((prev) => [...prev, userMessage]);

    try {
      // 2. WYSŁANIE ZAPYTANIA DO ROUTE HANDLERA (/api/chat)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }), // Wysyłamy prompt
      });

      // 3. Sprawdź, czy serwer odpowiedział poprawnie (status 2xx)
      if (!response.ok) {
        // Jeśli jest błąd, pobierz JSON z błędem z Route Handlera
        const errorData = await response.json();
        // Rzucamy błąd, aby przejść do bloku catch
        throw new Error(errorData.error || `Błąd HTTP: ${response.status}`);
      }

      // 4. Pobierz dane z backendu (zawierające message)
      const data = await response.json();
      const aiResponseText = data.message; // Zakładamy, że Route Handler zwraca pole 'message'

      // 5. Dodaj odpowiedź asystenta do historii
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: aiResponseText,
      };
      setHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Błąd komunikacji z backendem:", error);
      // Opcjonalnie: Dodaj wiadomość o błędzie systemowym do historii czatu
      setHistory((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: `Wystąpił błąd: Nie udało się połączyć z usługą LLM. Sprawdź konsolę lub upewnij się, że Docker działa na porcie 3001.`,
        } as ChatMessage,
      ]);
    } finally {
      // 6. Zwalniamy blokadę formularza po zakończeniu operacji
      setIsLoading(false);
    }
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
