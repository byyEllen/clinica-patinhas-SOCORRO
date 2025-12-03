import { Router } from 'express';
import { getAllPets, getPetById, createPet, updatePet, deletePet } from '../controllers/petController';

const router = Router();

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Listar todos os pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
router.get('/', getAllPets);

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Buscar pet por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet encontrado
 *       404:
 *         description: Pet não encontrado
 */
router.get('/:id', getPetById);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Criar novo pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 */
router.post('/', createPet);

/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     summary: Atualizar pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Pet atualizado
 *       404:
 *         description: Pet não encontrado
 */
router.put('/:id', updatePet);

/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Deletar pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet deletado
 *       404:
 *         description: Pet não encontrado
 */
router.delete('/:id', deletePet);

export default router;