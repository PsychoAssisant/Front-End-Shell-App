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
    <div>
      {messages.map((message) => (
        <div key="message.id" className={` ${getMessageStyles(message.role)}`}>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
