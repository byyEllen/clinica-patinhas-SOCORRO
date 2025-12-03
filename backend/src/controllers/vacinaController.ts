import { Request, Response } from 'express';
import prisma from '../config/database';

export const getAllVacinas = async (req: Request, res: Response) => {
  try {
    const vacinas = await prisma.vacina.findMany();
    res.json(vacinas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vacinas', error });
  }
};

export const getCarteiraSaude = async (req: Request, res: Response) => {
  try {
    let carteira = await prisma.carteiraSaude.findUnique({
      where: { petId: req.params.petId },
      include: {
        vacinasAplicadas: true,
        proximasVacinas: true
      }
    });
    
    if (!carteira) {
      carteira = await prisma.carteiraSaude.create({
        data: {
          petId: req.params.petId
        },
        include: {
          vacinasAplicadas: true,
          proximasVacinas: true
        }
      });
    }
    
    // Formata para o formato esperado pelo frontend
    const formatted = {
      petId: carteira.petId,
      vacinasAplicadas: carteira.vacinasAplicadas.map((v: any) => v.id),
      proximasVacinas: carteira.proximasVacinas.map((v: any) => v.id)
    };
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carteira de saúde', error });
  }
};