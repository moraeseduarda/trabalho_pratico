import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 5000;

// Configuração para __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const origensPermitidas = [
    'https://trabalho-pratico-z409.onrender.com', // frontend deploy
    'http://localhost:5173' // frontend dev
]

// Middlewares

// Lê os cookies enviados pelo navegador
app.use(cookieParser());

// Permite requisições do frontend
app.use(cors({
    origin: origensPermitidas,
    credentials: true
}));

// Permite json
app.use(express.json());

// Rota usuários
app.use('/api/users', userRoutes);


// Rota de depuração
app.get('/api/status', (req, res) => {
    res.json({
        message: 'Backend está rodando',
        database: mongoose.STATES[mongoose.connection.readyState]
    });
});

// Serve frontend build
app.use(express.static(path.join(__dirname, 'frontend/my-app/dist')));

// Fallback: qualquer rota que não seja /api/* vai para index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/my-app/dist/index.html'));
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

