import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import petRoutes from './routes/petRoutes';
import consultaRoutes from './routes/consultaRoutes';
import vacinaRoutes from './routes/vacinaRoutes';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
connectDatabase();

setupSwagger(app);


app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/vacinas', vacinaRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: '🐾 API Clínica Veterinária rodando!',
    docs: '/api-docs'  // ← ADICIONE
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 CORS enabled for: ${CORS_ORIGIN}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});