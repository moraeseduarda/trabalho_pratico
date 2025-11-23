import express from 'express';
import { registraUser, authUser, getUserProfile } from '../controllers/UsersController.js';
import protegeRota from '../middleware/protegeRota.js';

const router = express.Router();

// Cadastro
router.post('/signup', registraUser);

// Login
router.post('/login', authUser);

// Buscar perfil (protegida)
router.get('/profile', protegeRota, getUserProfile);

// Atualizar perfil (protegida)
router.put('/profile', protegeRota, updateUserProfile);

// Rota protegida
router.get('/home', protegeRota, (req, res) => {
    res.json({
        message: 'Bem vindo a home',
        userId: req.userId, // Passar infos do usuário para usar depois em features personalizadas
    });
});

export default router