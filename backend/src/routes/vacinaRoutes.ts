import { Router } from 'express';
import { getAllVacinas, getCarteiraSaude } from '../controllers/vacinaController';

const router = Router();

/**
 * @swagger
 * /api/vacinas:
 *   get:
 *     summary: Listar todas as vacinas
 *     tags: [Vacinas]
 *     responses:
 *       200:
 *         description: Lista de vacinas
 */
router.get('/', getAllVacinas);

/**
 * @swagger
 * /api/vacinas/carteira/{petId}:
 *   get:
 *     summary: Buscar carteira de vacinação do pet
 *     tags: [Vacinas]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carteira de saúde do pet
 */
router.get('/carteira/:petId', getCarteiraSaude);

export default router;