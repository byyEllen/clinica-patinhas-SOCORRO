import { Request, Response } from 'express';
import prisma from '../config/database';

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await prisma.pet.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pets', error });
  }
};

export const getPetById = async (req: Request, res: Response) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: req.params.id }
    });
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }
    
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pet', error });
  }
};

export const createPet = async (req: Request, res: Response) => {
  try {
    const pet = await prisma.pet.create({
      data: req.body
    });
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pet', error });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  try {
    const pet = await prisma.pet.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pet', error });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  try {
    await prisma.pet.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Pet deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pet', error });
  }
};