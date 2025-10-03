import React from "react";
import { ChatMessage, MessageRole } from "../types/chat";

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const getMessageStyles = (role: MessageRole) => {
  if (role == "user") {
    return "self-end bg-blue-500 text-white rounded-bl-xl";
  } else {
    return "self-start bg-gray-200 text-gray-800 rounded-br-xl";
  }
};

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4 p-6 overflow-y-auto h-full">
      {messages.map((message) => (
        <div
          key="message.id"
          className={`max-w-xs md:max-w-md p-3 rounded-t-xl shadow ${getMessageStyles(
            message.role
          )}`}
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
