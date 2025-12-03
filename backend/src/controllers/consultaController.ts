import { Request, Response } from 'express';
import prisma from '../config/database';

export const getAllConsultas = async (req: Request, res: Response) => {
  try {
    const consultas = await prisma.consulta.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(consultas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas', error });
  }
};

export const createConsulta = async (req: Request, res: Response) => {
  try {
    const consulta = await prisma.consulta.create({
      data: req.body
    });
    res.status(201).json(consulta);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar consulta', error });
  }
};

export const updateConsulta = async (req: Request, res: Response) => {
  try {
    const consulta = await prisma.consulta.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(consulta);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar consulta', error });
  }
};

export const deleteConsulta = async (req: Request, res: Response) => {
  try {
    await prisma.consulta.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Consulta deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar consulta', error });
  }
};