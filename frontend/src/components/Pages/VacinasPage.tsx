import React, { useState, useEffect, useContext } from 'react';
import { X } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { petApi, vacinaApi } from '../../services/api';
import { Pet, Vacina } from '../../../types';

interface VacinasPageProps {
  onBack: () => void;
}

export const VacinasPage: React.FC<VacinasPageProps> = ({ onBack }) => {
  const { theme } = useContext(ThemeContext);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [carteira, setCarteira] = useState<any>(null);
  const [selectedVacina, setSelectedVacina] = useState<Vacina | null>(null);

  useEffect(() => {
    petApi.getAll().then(setPets);
    vacinaApi.getAll().then(setVacinas);
  }, []);

  useEffect(() => {
    if (selectedPet) {
      vacinaApi.getCarteiraSaude(selectedPet.id || selectedPet._id || '').then(setCarteira);
    }
  }, [selectedPet]);

  const vacinasAplicadas = vacinas.filter(v => carteira?.vacinasAplicadas.includes(v.id || v._id));
  const vacinasPendentes = vacinas.filter(v => carteira?.proximasVacinas.includes(v.id || v._id));

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>💉 Carteira de Vacinação</h1>
          <button onClick={onBack} className="text-blue-600 hover:underline">← Voltar</button>
        </div>

        <div className={`mb-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <label className={`block mb-2 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Selecione o Pet:</label>
          <select value={selectedPet?.id || selectedPet?._id || ''} onChange={(e) => setSelectedPet(pets.find(p => (p.id || p._id) === e.target.value) || null)} className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
            <option value="">-- Escolha um pet --</option>
            {pets.map(p => (
              <option key={p.id || p._id} value={p.id || p._id}>{p.nome} ({p.donoNome})</option>
            ))}
          </select>
        </div>

        {selectedPet && carteira && (
          <>
            <div className={`mb-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{selectedPet.nome}</h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{selectedPet.especie} - {selectedPet.raca} - {selectedPet.idade} anos</p>
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Dono: {selectedPet.donoNome}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
                <h3 className={`text-xl font-bold mb-4 text-green-600 flex items-center gap-2`}>✅ Vacinas em Dia</h3>
                {vacinasAplicadas.length === 0 ? (
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Nenhuma vacina aplicada ainda</p>
                ) : (
                  <div className="space-y-3">
                    {vacinasAplicadas.map(v => (
                      <div key={v.id || v._id} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'} border ${theme === 'dark' ? 'border-gray-600' : 'border-green-200'}`}>
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{v.nome}</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{v.descricao}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
                <h3 className={`text-xl font-bold mb-4 text-orange-600 flex items-center gap-2`}>⚠️ Vacinas Pendentes</h3>
                {vacinasPendentes.length === 0 ? (
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Todas as vacinas estão em dia! 🎉</p>
                ) : (
                  <div className="space-y-3">
                    {vacinasPendentes.map(v => (
                      <div key={v.id || v._id} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'} border ${theme === 'dark' ? 'border-gray-600' : 'border-orange-200'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{v.nome}</h4>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{v.descricao}</p>
                          </div>
                          <button onClick={() => setSelectedVacina(v)} className="text-blue-600 hover:text-blue-700 text-sm font-semibold">+ Info</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {selectedVacina && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{selectedVacina.nome}</h3>
                <button onClick={() => setSelectedVacina(null)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
              </div>
              
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{selectedVacina.descricao}</p>
              
              <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>💰 Preços:</h4>
                <div className="space-y-2">
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}><strong>Filhote:</strong> R$ {selectedVacina.precoFilhote.toFixed(2)}</p>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}><strong>Adulto:</strong> R$ {selectedVacina.precoAdulto.toFixed(2)}</p>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><strong>ℹ️ Idade mínima:</strong> {selectedVacina.idadeMinima} semanas</p>
              </div>
              
              <button onClick={() => setSelectedVacina(null)} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

