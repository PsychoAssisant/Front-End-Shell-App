import React from "react";
import { ChatMessage, MessageRole } from "../types/chat";

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const getMessageStyles = (role: MessageRole) => {
  if (role == "user") {
    return "self-end ";
  } else {
    return "self-start ";
  }
};

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${getMessageStyles(message.role)}`}
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
