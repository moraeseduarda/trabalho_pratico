import express from 'express';
import { registraUser, authUser, pegaUserAtual } from '../controllers/UsersController.js';
import protegeRota from '../middleware/protegeRota.js';
import { logoutUser } from '../controllers/UsersController.js';

const router = express.Router();

// Cadastro
router.post('/signup', registraUser);

// Login
router.post('/login', authUser);

// Rota protegida
router.get('/home', protegeRota, (req, res) => {
    res.json({
        message: 'Bem vindo a home',
        userId: req.userId, // Passar infos do usuário para usar depois em features personalizadas
    });
});

// Retorna o perfil do usuário autenticado
router.get('/me', protegeRota, pegaUserAtual);

// Rota logout
router.post('/logout', logoutUser);

export default router