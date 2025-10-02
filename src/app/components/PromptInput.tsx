import React, { useState } from "react";

interface PromptInputProps {
  onSend: (prompt: string) => void;
  isDisabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSend, isDisabled }) => {
  const [prompt, setPrompt] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPrompt = prompt.trimEnd();

    if (trimmedPrompt) {
      onSend(trimmedPrompt);
      setPrompt("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 border-gray-200">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isDisabled}
        placeholder="Ask PsychoAssistant"
        className="flex-grow p-3 border rounded-l-md focus:outile-none focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isDisabled || !prompt.trim()}
        className="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:bg:gray-400"
      >
        Send
      </button>
    </form>
  );
};

export default PromptInput;
