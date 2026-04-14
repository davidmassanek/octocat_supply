import { useTheme } from '../../context/ThemeContext';

interface ChatMessageItemProps {
  senderName: string;
  content: string;
  createdAt: string;
  isOwn: boolean;
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString + 'Z');
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function ChatMessageItem({ senderName, content, createdAt, isOwn }: ChatMessageItemProps) {
  const { darkMode } = useTheme();

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 ${
          isOwn
            ? 'bg-primary text-white'
            : darkMode
              ? 'bg-gray-700 text-light'
              : 'bg-gray-200 text-gray-800'
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-semibold text-primary mb-1">{senderName}</p>
        )}
        <p className="text-sm">{content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-white/70' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {formatRelativeTime(createdAt)}
        </p>
      </div>
    </div>
  );
}
