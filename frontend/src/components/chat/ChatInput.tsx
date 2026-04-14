import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface ChatInputProps {
  isLoggedIn: boolean;
  onSend: (content: string) => void;
  isSending: boolean;
}

export default function ChatInput({ isLoggedIn, onSend, isSending }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { darkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;
    onSend(message.trim());
    setMessage('');
  };

  if (!isLoggedIn) {
    return (
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
        <Link
          to="/login"
          className="text-primary hover:text-accent font-medium transition-colors"
        >
          Log in to chat with hot cats near you
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex gap-2`}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something purrsuasive..."
        maxLength={500}
        className={`flex-1 rounded-lg px-4 py-2 text-sm ${
          darkMode
            ? 'bg-gray-700 text-light placeholder-gray-400'
            : 'bg-gray-100 text-gray-800 placeholder-gray-500'
        } focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
      />
      <button
        type="submit"
        disabled={!message.trim() || isSending}
        className="bg-primary hover:bg-accent disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Send
      </button>
    </form>
  );
}
