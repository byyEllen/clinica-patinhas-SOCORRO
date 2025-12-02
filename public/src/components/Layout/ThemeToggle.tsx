import React, { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={toggleTheme} className="fixed top-4 right-4 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:scale-110 transition-transform z-50" aria-label="Toggle theme">
      {theme === 'light' ? <Moon className="text-gray-800" size={24} /> : <Sun className="text-yellow-400" size={24} />}
    </button>
  );
};