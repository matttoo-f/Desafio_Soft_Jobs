import { Router } from "express";
import { loginUser } from "../controllers/loginController.js";
import {validateParamsLogin} from '../middlewares/validateParamsLogin.js'
const router = Router()

router.post('/login', validateParamsLogin, loginUser)


export default router