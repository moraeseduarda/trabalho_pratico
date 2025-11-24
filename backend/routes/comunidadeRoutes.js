import express from "express";
import protegeRota from "../middleware/protegeRota.js";
import { listaComunidades, getComunidadePorId, entrarComunidade, listaPostsDaComunidade, getPostPorId, criarPostNaComunidade } from "../controllers/ComunidadesController.js";

const router = express.Router();

// GET /api/comunidades
router.get("/", listaComunidades);

// GET /api/comunidades/:id
router.get('/:id', getComunidadePorId);

// POST /api/comunidades/:id/entrar  (protegido)
router.post('/:id/entrar', protegeRota, entrarComunidade);

// GET /api/comunidades/:id/posts
router.get('/:id/posts', listaPostsDaComunidade);

// POST /api/comunidades/:id/posts  (protegido)
router.post('/:id/posts', protegeRota, criarPostNaComunidade);

// GET /api/comunidades/:id/posts/:postId
router.get('/:id/posts/:postId', getPostPorId);

export default router;