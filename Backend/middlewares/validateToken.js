import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    // Obtener el token del header de la solicitud
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        // Verificar el token con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar el usuario decodificado al objeto de solicitud para usarlo en rutas protegidas
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(401).json({ error: 'Acceso denegado. Token inválido.' });
    }
};

export { validateToken };
