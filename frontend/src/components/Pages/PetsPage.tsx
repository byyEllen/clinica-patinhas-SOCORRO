import React, { useState, useEffect, useContext } from 'react';
import { Search, Plus, Edit2, Save, X } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { petApi } from '../../services/api';
import { Pet } from '../../../types';

interface PetsPageProps {
  onBack: () => void;
  userId: string;
}

export const PetsPage: React.FC<PetsPageProps> = ({ onBack, userId }) => {
  const { theme } = useContext(ThemeContext);
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Pet>>({ donoId: userId });

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const data = await petApi.getAll();
      setPets(data);
    } catch (error) {
      console.error('Erro ao carregar pets:', error);
    }
  };

  const filteredPets = pets.filter(p => 
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.donoNome.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      const dataToSave = { ...formData, donoId: userId };
      if (editingId) {
        await petApi.update(editingId, dataToSave);
      } else {
        await petApi.create(dataToSave);
      }
      await loadPets();
      setShowForm(false);
      setShowConfirm(true);
      setEditingId(null);
      setFormData({ donoId: userId });
      setTimeout(() => setShowConfirm(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar pet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Pacientes</h1>
          <button onClick={onBack} className="text-blue-600 hover:underline">← Voltar</button>
        </div>

        {showConfirm && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">✅ Paciente atualizado com sucesso!</div>
        )}

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Pesquisar por nome do pet ou dono..." value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
          </div>
          <button onClick={() => { setShowForm(true); setFormData({ donoId: userId }); setEditingId(null); }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
            <Plus size={20} /> Adicionar Pet
          </button>
        </div>

        {showForm && (
          <div className={`mb-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{editingId ? 'Editar Pet' : 'Novo Pet'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Nome do pet" value={formData.nome || ''} onChange={(e) => setFormData({...formData, nome: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input placeholder="Espécie" value={formData.especie || ''} onChange={(e) => setFormData({...formData, especie: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input placeholder="Raça" value={formData.raca || ''} onChange={(e) => setFormData({...formData, raca: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input type="number" placeholder="Idade (anos)" value={formData.idade || ''} onChange={(e) => setFormData({...formData, idade: parseInt(e.target.value)})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input placeholder="Nome do dono" value={formData.donoNome || ''} onChange={(e) => setFormData({...formData, donoNome: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input placeholder="Telefone do dono" value={formData.donoTelefone || ''} onChange={(e) => setFormData({...formData, donoTelefone: e.target.value})} className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleSave} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"><Save size={16} /> {loading ? 'Salvando...' : 'Salvar'}</button>
              <button onClick={() => { setShowForm(false); setFormData({ donoId: userId }); }} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"><X size={16} /> Cancelar</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredPets.map(pet => (
            <div key={pet.id || pet._id} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{pet.nome}</h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{pet.especie} - {pet.raca} - {pet.idade} anos</p>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><strong>Dono:</strong> {pet.donoNome} | <strong>Tel:</strong> {pet.donoTelefone}</p>
                </div>
                <button onClick={() => { setEditingId(pet.id || pet._id || ''); setFormData(pet); setShowForm(true); }} className="text-blue-600 hover:text-blue-700"><Edit2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

