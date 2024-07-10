import 'dotenv/config';
import { byEmail } from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findError } from '../utils/utils.js';

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Llamado a la base de datos para buscar el usuario por email
        const user = await byEmail(email);

        // Confirmar si usuario existe
        if (!user) {
            return sendErrorResponse(res, 'auth_01');
        }

        // Confirmar si la contraseña es válida
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return sendErrorResponse(res, 'auth_02');
        }

        // Crear y retornar token JWT
        const token = createToken(email);
        res.status(200).json({
            message: `Bienvenido, ${email} ha iniciado sesión`,
            code: 200,
            token,
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const createToken = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expira en 1 hora, ajusta según tus necesidades
    });
    return token;
};

const sendErrorResponse = (res, errorCode) => {
    const errorFound = findError(errorCode);
    res.status(errorFound[0].status).json({ error: errorFound[0].message });
};

export { loginUser };
