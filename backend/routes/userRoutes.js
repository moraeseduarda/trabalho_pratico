import express from 'express';
import { registraUser, authUser } from '../controllers/UsersController.js';

const router = express.Router();

router.post('/', registraUser);

router.post('/login', authUser);

export default router