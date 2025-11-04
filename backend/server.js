import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

const app = express();
const routes = express.Router();

const PORT = process.env.PORT || 5000;

routes.get('/', (req, res) => {
    res.send('API está rodando');
});

app.use(cors({
    origin: 'https://localhost:5173',
    credentials: true
}));

app.use(express.json());

// Rotas serão importadas aqui

// Exemplo: 'userRoutes.js' em 'backend/routes'
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes)

app.use('/api/users', userRoutes);

app.use('/api', routes);

// Rota de teste
app.get('/api/status', (req, res) => {
    res.json({
        message: 'Backend está rodando',
        database: mongoose.STATES[mongoose.connection.readyState]
    });
});

const inicializaServidor = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor Express rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB', error.message);
        process.exit(1);
    }
}

inicializaServidor();

