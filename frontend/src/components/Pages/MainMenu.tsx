import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface MainMenuProps {
  onNavigate: (page: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-8`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>🐾 Clínica Veterinária PetCare</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <button onClick={() => onNavigate('pets')} className={`p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition transform hover:scale-105`}>
            <div className="text-6xl mb-4">🐕</div>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Pacientes</h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Gerenciar pets cadastrados</p>
          </button>
          
          <button onClick={() => onNavigate('consultas')} className={`p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition transform hover:scale-105`}>
            <div className="text-6xl mb-4">📅</div>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Consultas</h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Agendar e gerenciar consultas</p>
          </button>
          
          <button onClick={() => onNavigate('vacinas')} className={`p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition transform hover:scale-105`}>
            <div className="text-6xl mb-4">💉</div>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Carteira de Vacinação</h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Acompanhar vacinas dos pets</p>
          </button>
        </div>
      </div>
    </div>
  );
};
