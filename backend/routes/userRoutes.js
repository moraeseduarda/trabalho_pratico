import express from 'express';
import { registraUser, authUser, pegaUserAtual, getUserProfile, updateUserProfile, logoutUser } from '../controllers/UsersController.js';
import { adicionarLivro, getLivrosUsuario, atualizarStatusLivro } from '../controllers/BibliotecaController.js';
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

// Retorna o perfil do usuário autenticado
router.get('/me', protegeRota, pegaUserAtual);

// Rota logout
router.post('/logout', logoutUser);

// Adicionar livro à biblioteca
router.post('/biblioteca', protegeRota, adicionarLivro);

// Listar livros da biblioteca
router.get('/biblioteca', protegeRota, getLivrosUsuario);

// Atualizar status do livro
router.put('/biblioteca/:id', protegeRota, atualizarStatusLivro);

export default router;