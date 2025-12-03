import { Router } from 'express';
import { getAllConsultas, createConsulta, updateConsulta, deleteConsulta } from '../controllers/consultaController';

const router = Router();

/**
 * @swagger
 * /api/consultas:
 *   get:
 *     summary: Listar todas as consultas
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de consultas
 */
router.get('/', getAllConsultas);

/**
 * @swagger
 * /api/consultas:
 *   post:
 *     summary: Criar nova consulta
 *     tags: [Consultas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consulta'
 *     responses:
 *       201:
 *         description: Consulta criada
 */
router.post('/', createConsulta);

/**
 * @swagger
 * /api/consultas/{id}:
 *   put:
 *     summary: Atualizar consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta atualizada
 */
router.put('/:id', updateConsulta);

/**
 * @swagger
 * /api/consultas/{id}:
 *   delete:
 *     summary: Deletar consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta deletada
 */
router.delete('/:id', deleteConsulta);

export default router;