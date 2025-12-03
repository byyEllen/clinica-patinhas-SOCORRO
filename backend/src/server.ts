import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import petRoutes from './routes/petRoutes';
import consultaRoutes from './routes/consultaRoutes';
import vacinaRoutes from './routes/vacinaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Conectar ao banco de dados
connectDatabase();

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/vacinas', vacinaRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: '🐾 API Clínica Veterinária rodando com PostgreSQL + Prisma!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});