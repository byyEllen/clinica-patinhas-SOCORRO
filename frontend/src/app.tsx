import React, { useState } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { ThemeToggle } from './components/Layout/ThemeToggle';
import { LoginPage } from './components/Auth/LoginPage';
import { MainMenu } from './components/Pages/MainMenu';
import { PetsPage } from './components/Pages/PetsPage';
import { ConsultasPage } from './components/Pages/ConsultasPage';
import { VacinasPage } from './components/Pages/VacinasPage';
import { authApi } from './services/api';
import type { User } from '../types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('menu');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    setCurrentPage('menu');
  };

  if (!user) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeToggle />
        <LoginPage onLogin={setUser} />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeToggle />
      <div className="fixed top-4 left-4 z-50">
        <button onClick={handleLogout} className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg hover:scale-105 transition`}>
          Sair
        </button>
      </div>
      {currentPage === 'menu' && <MainMenu onNavigate={setCurrentPage} />}
      {currentPage === 'pets' && <PetsPage onBack={() => setCurrentPage('menu')} userId={user.id} />}
      {currentPage === 'consultas' && <ConsultasPage onBack={() => setCurrentPage('menu')} />}
      {currentPage === 'vacinas' && <VacinasPage onBack={() => setCurrentPage('menu')} />}
    </ThemeContext.Provider>
  );
};

export default App;