import axios from 'axios';
import { User, Pet, Consulta, Vacina, CarteiraSaude } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, senha: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', { email, senha });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (email: string, senha: string, nome: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', { email, senha, nome });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export const petApi = {
  getAll: async (): Promise<Pet[]> => {
    const response = await api.get('/pets');
    return response.data.map((pet: any) => ({
      ...pet,
      id: pet._id || pet.id
    }));
  },

  getById: async (id: string): Promise<Pet> => {
    const response = await api.get(`/pets/${id}`);
    return { ...response.data, id: response.data._id || response.data.id };
  },

  create: async (pet: Partial<Pet>): Promise<Pet> => {
    const response = await api.post('/pets', pet);
    return { ...response.data, id: response.data._id || response.data.id };
  },

  update: async (id: string, pet: Partial<Pet>): Promise<Pet> => {
    const response = await api.put(`/pets/${id}`, pet);
    return { ...response.data, id: response.data._id || response.data.id };
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/pets/${id}`);
  }
};

export const consultaApi = {
  getAll: async (): Promise<Consulta[]> => {
    const response = await api.get('/consultas');
    return response.data.map((consulta: any) => ({
      ...consulta,
      id: consulta._id || consulta.id
    }));
  },

  create: async (consulta: Partial<Consulta>): Promise<Consulta> => {
    const response = await api.post('/consultas', consulta);
    return { ...response.data, id: response.data._id || response.data.id };
  },

  update: async (id: string, consulta: Partial<Consulta>): Promise<Consulta> => {
    const response = await api.put(`/consultas/${id}`, consulta);
    return { ...response.data, id: response.data._id || response.data.id };
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/consultas/${id}`);
  }
};

export const vacinaApi = {
  getAll: async (): Promise<Vacina[]> => {
    const response = await api.get('/vacinas');
    return response.data.map((vacina: any) => ({
      ...vacina,
      id: vacina._id || vacina.id
    }));
  },

  getCarteiraSaude: async (petId: string): Promise<CarteiraSaude> => {
    const response = await api.get(`/vacinas/carteira/${petId}`);
    return response.data;
  }
};

export default api;
