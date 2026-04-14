import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { previewMessages } from './chatData';

export default function ChatPreview() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="py-16 max-w-7xl mx-auto">
      <h2
        className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} text-center mb-4 transition-colors duration-300`}
      >
        Hungry Cats in Your Area
      </h2>
      <p
        className={`text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}
      >
        They're real. They're local. They're talking about our products. No clickbait, we purromise.
      </p>

      <div className="flex flex-col md:flex-row items-stretch gap-8 max-w-5xl mx-auto px-4">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="/cats/spicy_cats.png"
            alt="Hot cats in your area"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right column: chat + heatmap */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Chat widget */}
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden transition-colors duration-300`}
          >
            {/* Mini chat header */}
            <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center gap-2`}>
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-sm font-medium ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                6 hungry cats nearby
              </span>
            </div>

            {/* Preview messages */}
            <div className="p-4 space-y-3">
              {previewMessages.map((msg, i) => (
                <div key={i} className="flex justify-start">
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="text-xs font-semibold text-primary mb-0.5">{msg.sender}</p>
                    <p className={`text-sm ${darkMode ? 'text-light' : 'text-gray-800'}`}>{msg.content}</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => navigate('/chat')}
                className="w-full bg-primary hover:bg-accent text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Meet the Cats
              </button>
            </div>
          </div>

          {/* Fake heatmap */}
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 transition-colors duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                Cat Activity Heatmap
              </h3>
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Live</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              {[
                3,1,0,0,1,2,4,5,3,2,1,0,
                2,1,0,1,2,3,5,4,4,3,1,1,
                1,0,0,0,1,2,3,5,5,4,2,1,
                0,0,1,0,0,1,4,5,3,3,2,0,
                1,0,0,1,1,3,5,4,2,1,0,0,
              ].map((intensity, i) => {
                const colors = [
                  darkMode ? 'bg-gray-700' : 'bg-gray-100',
                  'bg-green-200',
                  'bg-green-300',
                  'bg-green-400',
                  'bg-primary/80',
                  'bg-primary',
                ];
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${colors[intensity]}`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>6am</span>
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>12pm</span>
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>6pm</span>
            </div>
            <p className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Peak activity: 5-7pm (dinner time, obviously)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
