// Função verificadora do token entre rotas 
import jwt from "jsonwebtoken";

// Estutura middleware padrão express.js
const protegeRota = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(400).json({message: "Token não encontrado"});
    }

    // Decodificar o token
    try {
        // Sucesso
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodificado.id;
        next();
    } catch (error) {
        return res.status(400).json({message: "Token inválido"});
    }
};

export default protegeRota;