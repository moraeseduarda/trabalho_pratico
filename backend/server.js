import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser'

const app = express();

const PORT = process.env.PORT || 5000;


// Middlewares

// Lê os cookies enviados pelo navegador
app.use(cookieParser());

// Permite requisições do frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Permite json
app.use(express.json());

// Rotas serão importadas aqui

// Rota teste
app.get('/', (req, res) => {
    res.send('API está rodando');
});

// Rota usuários
app.use('/api/users', userRoutes);


// Rota de depuração
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

