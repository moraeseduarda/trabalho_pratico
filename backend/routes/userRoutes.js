import express from 'express';
import { registraUser, authUser } from '../controllers/UsersController.js';

const router = express.Router();

// Cadastro
router.post('/signup', registraUser);

// Login
router.post('/login', authUser);

export default router