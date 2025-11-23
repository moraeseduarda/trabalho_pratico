// Função verificadora do token entre rotas 
import jwt from "jsonwebtoken";

// Estutura middleware padrão express.js
const protegeRota = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        // 401 Unauthorized: Não autenticado
        return res.status(401).json({message: "Token não encontrado"});
    }

    // Decodificar o token
    try {
        // Sucesso
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodificado.id;
        next();
    } catch (error) {
        return res.status(401).json({message: "Token inválido"});
    }
};

export default protegeRota;