import { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../../api/config';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ChatSidebar from './ChatSidebar';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';

interface ChatMessage {
  messageId: number;
  senderName: string;
  senderEmail: string;
  content: string;
  createdAt: string;
}

const fetchMessages = async (): Promise<ChatMessage[]> => {
  const { data } = await axios.get(`${api.baseURL}${api.endpoints.chatMessages}`);
  return data;
};

export default function Chat() {
  const { isLoggedIn, userEmail } = useAuth();
  const { darkMode } = useTheme();
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);

  const { data: messages = [], isLoading, error } = useQuery('chatMessages', fetchMessages, {
    refetchInterval: 5000,
  });

  const sendMessage = useMutation(
    async (content: string) => {
      const senderName = userEmail?.split('@')[0] || 'Anonymous';
      const { data } = await axios.post(`${api.baseURL}${api.endpoints.chatMessages}`, {
        senderName,
        senderEmail: userEmail,
        content,
      });
      return data;
    },
    {
      onMutate: () => setIsSending(true),
      onSettled: () => {
        setIsSending(false);
        queryClient.invalidateQueries('chatMessages');
      },
    },
  );

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-dark' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)]">
        <div className={`flex h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-colors duration-300`}>
          <ChatSidebar />

          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h1 className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                Hot Cats in Your Area
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {messages.length} messages &middot; yes, they're real cats
              </p>
            </div>

            {/* Messages */}
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading messages...</p>
              </div>
            ) : error ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-red-500">Failed to load messages.</p>
              </div>
            ) : (
              <ChatMessageList messages={messages} currentUserEmail={userEmail} />
            )}

            {/* Input */}
            <ChatInput
              isLoggedIn={isLoggedIn}
              onSend={(content) => sendMessage.mutate(content)}
              isSending={isSending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
