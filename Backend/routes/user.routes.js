import { Router } from 'express';
import { createNewUser, getUser } from '../controllers/userController.js'; 
import { validateParametersUser } from '../middlewares/validateParamsUser.js';
import {validateToken} from '../middlewares/validateToken.js'

const router = Router();

router.post('/usuarios',validateParametersUser, createNewUser);
router.get('/usuarios',validateToken,getUser)

export default router;
