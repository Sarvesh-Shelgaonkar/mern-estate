import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleDarkMode = () => {
    setIsClicked(true);
    setIsDarkMode(!isDarkMode);

    // Reset click animation after 300ms
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <div className="relative group">
      {/* Toggle Switch Container */}
      <button
        onClick={toggleDarkMode}
        className={`relative w-16 h-8 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-600 to-blue-600 focus:ring-blue-300"
            : "bg-gradient-to-r from-yellow-400 to-orange-500 focus:ring-yellow-300"
        } shadow-lg hover:shadow-xl`}
        aria-label="Toggle dark mode"
      >
        {/* Moving Circle */}
        <div
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
            isDarkMode ? "translate-x-8" : "translate-x-0"
          }`}
        >
          {/* Sun Icon */}
          <FaSun
            className={`w-4 h-4 text-yellow-500 absolute transition-all duration-300 ${
              isDarkMode
                ? "opacity-0 rotate-180 scale-0"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />

          {/* Moon Icon */}
          <FaMoon
            className={`w-4 h-4 text-blue-600 absolute transition-all duration-300 ${
              isDarkMode
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-180 scale-0"
            }`}
          />
        </div>

        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          {/* Left Sun Icon */}
          <FaSun
            className={`w-3 h-3 text-white transition-all duration-300 ${
              isDarkMode ? "opacity-30" : "opacity-100"
            }`}
          />

          {/* Right Moon Icon */}
          <FaMoon
            className={`w-3 h-3 text-white transition-all duration-300 ${
              isDarkMode ? "opacity-100" : "opacity-30"
            }`}
          />
        </div>
      </button>

      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
      </div>

      {/* Glow Effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isDarkMode
            ? "shadow-blue-500/50 shadow-lg"
            : "shadow-yellow-500/50 shadow-lg"
        } opacity-0 group-hover:opacity-100`}
      ></div>
    </div>
  );
};

export default DarkModeToggle;
