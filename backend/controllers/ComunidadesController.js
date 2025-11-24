import Comunidade from '../models/Comunidade.js';
import User from '../models/User.js';

// Lista todas as comunidades
const listaComunidades = async (req, res) => {
    try {
        const comunidades = await Comunidade.find();
        res.json(comunidades);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar comunidades' });
    }
};

// Usuário entra em uma comunidade (colocar middleware deve setar req.userId?)
const entrarComunidade = async (req, res) => {
    const userId = req.userId;
    const comunidadeId = req.params.id;

    try {
        const comunidade = await Comunidade.findById(comunidadeId);
        if (!comunidade) {
            return res.status(404).json({ message: 'Comunidade não encontrada' });
        }

        // Adiciona usuário aos membros da comunidade (sem duplicatas)
        await Comunidade.findByIdAndUpdate(comunidadeId, {
            $addToSet: { membros: userId }
        });

        // Adiciona comunidade ao array de comunidades do usuário
        await User.findByIdAndUpdate(userId, {
            $addToSet: { comunidades: comunidadeId }
        });

        return res.status(200).json({ message: 'Entrou na comunidade com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao entrar na comunidade' });
    }
};

export { listaComunidades, entrarComunidade };
