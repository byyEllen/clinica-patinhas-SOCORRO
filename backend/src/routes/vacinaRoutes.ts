import { Router } from 'express';
import { getAllVacinas, getCarteiraSaude } from '../controllers/vacinaController';

const router = Router();

router.get('/', getAllVacinas);
router.get('/carteira/:petId', getCarteiraSaude);

export default router;