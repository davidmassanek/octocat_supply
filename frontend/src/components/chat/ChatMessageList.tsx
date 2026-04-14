import { useEffect, useRef } from 'react';
import ChatMessageItem from './ChatMessageItem';

interface Message {
  messageId: number;
  senderName: string;
  senderEmail: string;
  content: string;
  createdAt: string;
}

interface ChatMessageListProps {
  messages: Message[];
  currentUserEmail: string | null;
}

export default function ChatMessageList({ messages, currentUserEmail }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <ChatMessageItem
          key={msg.messageId}
          senderName={msg.senderName}
          content={msg.content}
          createdAt={msg.createdAt}
          isOwn={currentUserEmail !== null && msg.senderEmail === currentUserEmail}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
