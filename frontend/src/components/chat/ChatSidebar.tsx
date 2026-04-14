import { useTheme } from '../../context/ThemeContext';
import { nearbyCats } from './chatData';

const statusColors = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  offline: 'bg-gray-400',
};

export default function ChatSidebar() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={`hidden md:block w-64 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 overflow-y-auto`}
      >
        <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Hot & Nearby
        </h3>
        <div className="space-y-3">
          {nearbyCats.map((cat) => (
            <div key={cat.email} className="flex items-center gap-3">
              <div className="relative">
                <span className="text-2xl">{cat.emoji}</span>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${darkMode ? 'border-gray-800' : 'border-white'} ${statusColors[cat.status]}`} />
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                  {cat.name}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {cat.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile horizontal scroll */}
      <div className={`md:hidden border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-3`}>
        <div className="flex gap-4 overflow-x-auto pb-1">
          {nearbyCats.map((cat) => (
            <div key={cat.email} className="flex flex-col items-center flex-shrink-0">
              <div className="relative">
                <span className="text-2xl">{cat.emoji}</span>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${darkMode ? 'border-gray-800' : 'border-white'} ${statusColors[cat.status]}`} />
              </div>
              <p className={`text-xs mt-1 truncate max-w-[60px] ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                {cat.name.split(' ')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
