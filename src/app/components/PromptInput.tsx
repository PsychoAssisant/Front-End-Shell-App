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
    <div>
      <form className="" onSubmit={handleSubmit}>
        <input
          className="flex-frow p-3"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isDisabled}
          placeholder="Ask PsychoAssistant"
        />
        {prompt.trim() && (
          <button type="submit" disabled={isDisabled}>
            Send
          </button>
        )}
      </form>
    </div>
  );
};

export default PromptInput;
