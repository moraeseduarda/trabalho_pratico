import express from "express";
import protegeRota from "../middleware/protegeRota.js";
import { 
    listaComunidades, 
    getComunidadePorId, 
    criarComunidade,
    solicitarEntrada, 
    aprovarSolicitacao,
    rejeitarSolicitacao,
    listaPostsDaComunidade, 
    getPostPorId, 
    criarPostNaComunidade 
} from "../controllers/ComunidadesController.js";

const router = express.Router();

// GET /api/comunidades
router.get("/", listaComunidades);

// POST /api/comunidades - Criar comunidade (protegido)
router.post("/", protegeRota, criarComunidade);

// GET /api/comunidades/:id - Buscar por ID
router.get('/:id', getComunidadePorId);

// POST /api/comunidades/:id/solicitar - Solicitar entrada (protegido)
router.post('/:id/solicitar', protegeRota, solicitarEntrada);

// POST /api/comunidades/:comunidadeId/aprovar/:usuarioId - Aprovar solicitação (protegido)
router.post('/:comunidadeId/aprovar/:usuarioId', protegeRota, aprovarSolicitacao);

// POST /api/comunidades/:comunidadeId/rejeitar/:usuarioId - Rejeitar solicitação (protegido)
router.post('/:comunidadeId/rejeitar/:usuarioId', protegeRota, rejeitarSolicitacao);

// GET /api/comunidades/:id/posts - Listar posts
router.get('/:id/posts', listaPostsDaComunidade);

// POST /api/comunidades/:id/posts - Criar post (protegido)
router.post('/:id/posts', protegeRota, criarPostNaComunidade);

// GET /api/comunidades/:id/posts/:postId - Buscar post específico
router.get('/:id/posts/:postId', getPostPorId);

export default router;