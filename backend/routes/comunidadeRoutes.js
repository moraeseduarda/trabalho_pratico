import express from "express";
import protegeRota from "../middleware/protegeRota.js";
import { listaComunidades, entrarComunidade } from "../controllers/ComunidadesController.js";

const router = express.Router();

// GET /api/comunidades
router.get("/", listaComunidades);

// POST /api/comunidades/:id/entrar (protegido)
router.post('/:id/entrar', protegeRota, entrarComunidade);

export default router;