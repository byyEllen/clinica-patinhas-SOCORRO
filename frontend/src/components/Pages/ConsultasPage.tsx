import React, { useState, useEffect, useContext } from 'react';
import { Search, Calendar, Edit2, Save, X } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { consultaApi } from '../../services/api';
import { Consulta } from '../../../types';

interface ConsultasPageProps {
  onBack: () => void;
}

export const ConsultasPage: React.FC<ConsultasPageProps> = ({ onBack }) => {
  const { theme } = useContext(ThemeContext);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Consulta>>({});

  useEffect(() => {
    loadConsultas();
  }, []);

  const loadConsultas = async () => {
    try {
      const data = await consultaApi.getAll();
      setConsultas(data);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  const filteredConsultas = consultas.filter(c => 
    c.petNome.toLowerCase().includes(search.toLowerCase()) ||
    c.donoNome.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingId) {
        await consultaApi.update(editingId, formData);
      } else {
        await consultaApi.create(formData);
      }
      await loadConsultas();
      setShowForm(false);
      setEditingId(null);
      setFormData({});
    } catch (error) {
      console.error('Erro ao salvar consulta:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Consultas e Agendamentos</h1>
          <button onClick={onBack} className="text-blue-600 hover:underline">← Voltar</button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Pesquisar consulta..." value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
          </div>
          <button onClick={() => { setShowForm(true); setFormData({}); setEditingId(null); }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"><Calendar size={20} /> Nova Consulta</button>
        </div>

        {showForm && (
          <div className={`mb-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{editingId ? 'Editar Consulta' : 'Nova Consulta'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Nome do pet" value={formData.petNome || ''} onChange={(e) => setFormData({...formData, petNome: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input placeholder="Nome do dono" value={formData.donoNome || ''} onChange={(e) => setFormData({...formData, donoNome: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input placeholder="Telefone" value={formData.donoTelefone || ''} onChange={(e) => setFormData({...formData, donoTelefone: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input placeholder="Veterinário" value={formData.veterinario || ''} onChange={(e) => setFormData({...formData, veterinario: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input type="date" value={formData.data || ''} onChange={(e) => setFormData({...formData, data: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input type="time" value={formData.hora || ''} onChange={(e) => setFormData({...formData, hora: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input placeholder="Motivo da consulta" value={formData.motivo || ''} onChange={(e) => setFormData({...formData, motivo: e.target.value})} className={`px-4 py-2 rounded border md:col-span-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleSave} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"><Save size={16} /> {loading ? 'Salvando...' : 'Salvar'}</button>
              <button onClick={() => { setShowForm(false); setFormData({}); }} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"><X size={16} /> Cancelar</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredConsultas.map(c => (
            <div key={c.id || c._id} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{c.petNome}</h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Dono: {c.donoNome} | Tel: {c.donoTelefone}</p>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Veterinário: {c.veterinario}</p>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><strong>Motivo:</strong> {c.motivo}</p>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>📅 {c.data} às {c.hora}</p>
                </div>
                <button onClick={() => { setEditingId(c.id || c._id || ''); setFormData(c); setShowForm(true); }} className="text-blue-600 hover:text-blue-700"><Edit2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};