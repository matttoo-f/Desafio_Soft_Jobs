import 'dotenv/config';  // Cargar variables de entorno
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';  // Importar rutas
import loginRouter from '../Backend/routes/login.routes.js'
import morgan from 'morgan';

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());

app.use('/', userRoutes);
app.use('/', loginRouter);


app.use(morgan('dev'));

app.listen(PORT || 3000, () => {
  console.log(`SERVIDOR ENCENDIDO en puerto ${PORT || 3000}`);
});
