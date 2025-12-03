import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword
      }
    });

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      user: { id: user.id, nome: user.nome, email: user.email },
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isValidPassword = await bcrypt.compare(senha, user.senha);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '7d' }
    );

    res.json({ 
      user: { id: user.id, nome: user.nome, email: user.email },
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};