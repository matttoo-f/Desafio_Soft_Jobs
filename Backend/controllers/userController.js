import { byEmail, createUser } from '../model/user.model.js';

const createNewUser = async (req, res) => {
  try {
      const { email, password, rol, lenguage } = req.body; // Desestructura directamente del body
      const user = { email, password, rol, lenguage }; // Crea el objeto user con los datos necesarios

      // Validar si usuario existe
      const userExist = await byEmail(email);
      if (userExist) {
          return res.status(400).json({ error: 'Ya existe un usuario registrado con este email.' });
      }

      // Crear nuevo usuario
      const newUser = await createUser(user);
      res.status(201).json({ user: newUser });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al crear el usuario' });
  }
};
const getUser = async (req, res) => {
    try {
        // Obtener el email desde el token decodificado
        const { email } = req.user;
    
        // Consultar usuario por email en la base de datos
        const user = await getUserByEmail(email);
    
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    
        // Devolver datos del usuario
        res.json(user);
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
}

export { createNewUser, getUser }; // Exportación nombrada
