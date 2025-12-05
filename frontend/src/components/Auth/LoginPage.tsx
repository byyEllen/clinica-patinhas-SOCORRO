import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { authApi } from '../../services/api';
import { User } from '../../../types';


interface LoginPageProps {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { theme } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = isLogin 
        ? await authApi.login(email, senha)
        : await authApi.register(email, senha, nome);
      onLogin(response.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar operação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold text-center mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>🐾 Clínica Veterinária</h1>
        <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{isLogin ? 'Entre com sua conta' : 'Crie sua conta'}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`} required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`} required />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50">
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        
        <p className={`text-center mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline font-semibold">{isLogin ? 'Cadastre-se' : 'Faça login'}</button>
        </p>
      </div>
    </div>
  );
};
