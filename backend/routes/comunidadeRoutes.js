import express from "express";
import Comunidade from "../models/Comunidade.js"

const router = express.Router();

// Retorna lista de comunidades
// Montado em server.js com app.use('/api/comunidades', comunidadeRoutes)
// portanto a rota correta para o frontend é GET /api/comunidades
router.get("/", async (req, res) => {
    try {
        const comunidades = await Comunidade.find();
        res.json(comunidades);
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar comunidades"});
    }

});

export default router;