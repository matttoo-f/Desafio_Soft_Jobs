import pool from '../database/db_config.js';
import bcrypt from 'bcryptjs';
import format from 'pg-format'; 

const createUser = async ({ email, password, rol, lenguage }) => {
    const hashedPassword = bcrypt.hashSync(password, 10); // 
    const formatQuery = format('INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%L, %L, %L, %L) RETURNING *', email, hashedPassword, rol, lenguage);
    try {
        const response = await pool.query(formatQuery);

        console.log("Usuario agregado con éxito");
        return response.rows[0]
    } catch (error) {
        console.log(error);
    }
};

const byEmail = async (email) => {
    const formatQuery = format ('SELECT * FROM usuarios WHERE email = %L', email)
    try {
        const response = await pool.query(formatQuery)
        return response.rows[0]
    } catch (error) {
        console.log('Error: ',error)
        throw error;
    }
}

const traerUsuario = async (email)=> {
    const formatQuery = format ('SELECT * FROM usuarios WHERE email = %L', email)
    try {
        const response = await pool.query(formatQuery);
        return response.rows[0]
    } catch (error) {
        console.log('Error al traer usuario', error)
        throw error;
    }
}

export { 
    createUser ,
    byEmail,
    traerUsuario

}; 
