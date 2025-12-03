import { Router } from 'express';
import { getAllPets, getPetById, createPet, updatePet, deletePet } from '../controllers/petController';

const router = Router();

router.get('/', getAllPets);
router.get('/:id', getPetById);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;