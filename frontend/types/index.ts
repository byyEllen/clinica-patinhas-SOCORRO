export interface User {
  id: string;
  email: string;
  nome: string;
}

export interface Pet {
  id?: string;
  _id?: string;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  donoId: string;
  donoNome: string;
  donoTelefone: string;
}

export interface Consulta {
  id?: string;
  _id?: string;
  petId: string;
  petNome: string;
  donoNome: string;
  donoTelefone: string;
  veterinario: string;
  motivo: string;
  data: string;
  hora: string;
}

export interface Vacina {
  id?: string;
  _id?: string;
  nome: string;
  descricao: string;
  precoFilhote: number;
  precoAdulto: number;
  idadeMinima: number;
}

export interface CarteiraSaude {
  petId: string;
  vacinasAplicadas: string[];
  proximasVacinas: string[];
}