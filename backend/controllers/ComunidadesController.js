import Comunidade from '../models/Comunidade.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

// Lista todas as comunidades
const listaComunidades = async (req, res) => {
    try {
        const comunidades = await Comunidade.find();
        res.json(comunidades);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar comunidades' });
    }
};

// Retorna uma comunidade por id
const getComunidadePorId = async (req, res) => {
    const comunidadeId = req.params.id;
    try {
        const comunidade = await Comunidade.findById(comunidadeId)
            .populate('membros', 'nome email')
            .populate('admin', 'nome email')
            .populate('solicitacoesPendentes', 'nome email');

        if (!comunidade) return res.status(404).json({ message: 'Comunidade não encontrada' });
        return res.json(comunidade);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar comunidade' });
    }
};

// Cria uma nova comunidade
const criarComunidade = async (req, res) => {
    const userId = req.userId;
    const { nome, descricao } = req.body;

    try {
        // Verifica se já existe uma comunidade com esse nome
        const existe = await Comunidade.findOne({ nome });
        if (existe) {
            return res.status(400).json({ message: 'Já existe uma comunidade com este nome' });
        }

        const novaComunidade = await Comunidade.create({
            nome,
            descricao,
            admin: [userId], // Usuário que criou é o admin
            membros: [userId] // Admin automaticamente é membro
        });

        // Adiciona a comunidade ao array de comunidades do usuário
        await User.findByIdAndUpdate(userId, {
            $addToSet: { comunidades: novaComunidade._id }
        });

        const populated = await Comunidade.findById(novaComunidade._id)
            .populate('admin', 'nome email')
            .populate('membros', 'nome email');

        return res.status(201).json(populated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar comunidade' });
    }
}

// Lista posts de uma comunidade
const listaPostsDaComunidade = async (req, res) => {
    const comunidadeId = req.params.id;
    try {
        const posts = await Post.find({ comunidade: comunidadeId }).populate('autor', 'nome email').sort({ createdAt: -1 });
        return res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar posts' });
    }
};

// Retorna post por id (dentro da comunidade)
const getPostPorId = async (req, res) => {
    const { id, postId } = req.params;
    try {
        const post = await Post.findOne({ _id: postId, comunidade: id })
            .populate('autor', 'nome email')
            .populate('comunidade', 'nome');
        if (!post) return res.status(404).json({ message: 'Post não encontrado' });
        return res.json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar post' });
    }
};

// Cria um post em uma comunidade (usuário autenticado)
const criarPostNaComunidade = async (req, res) => {
    const userId = req.userId;
    const comunidadeId = req.params.id;
    const { titulo, conteudo } = req.body;

    try {
        const comunidade = await Comunidade.findById(comunidadeId);
        if (!comunidade) return res.status(404).json({ message: 'Comunidade não encontrada' });

        const novoPost = await Post.create({
            comunidade: comunidadeId,
            autor: userId,
            titulo,
            conteudo,
        });

        const populated = await Post.findById(novoPost._id).populate('autor', 'nome email');

        return res.status(201).json(populated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar post' });
    }
};

// Usuário solicita entrada em uma comunidade (colocar middleware deve setar req.userId?)
const solicitarEntrada = async (req, res) => {
    const userId = req.userId;
    const comunidadeId = req.params.id;

    try {
        const comunidade = await Comunidade.findById(comunidadeId);
        if (!comunidade) {
            return res.status(404).json({ message: 'Comunidade não encontrada' });
        }

        // Verifica se já é membro
        if (comunidade.membros.includes(userId)) {
            return res.status(400).json({ message: 'Você já é membro desta comunidade' });
        }

        // Verifica se já solicitou entrada
        if (comunidade.solicitacoesPendentes.includes(userId)) {
            return res.status(400).json({ message: 'Solicitação já enviada' });
        }

        // Adiciona à lista de solicitações pendentes
        await Comunidade.findByIdAndUpdate(comunidadeId, {
            $addToSet: { solicitacoesPendentes: userId }
        });

        return res.status(200).json({ message: 'Solicitação enviada! Aguarde aprovação do admin.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao solicitar entrada' });
    }
};

// Aprovar solicitação (só admin pode)
const aprovarSolicitacao = async (req, res) => {
    const adminId = req.userId;
    const { comunidadeId, usuarioId } = req.params;

    try {
        const comunidade = await Comunidade.findById(comunidadeId);
        if (!comunidade) {
            return res.status(404).json({ message: 'Comunidade não encontrada' });
        }

        // Verifica se o usuário é admin
        if (!comunidade.admin.includes(adminId)) {
            return res.status(403).json({ message: 'Apenas admins podem aprovar solicitações' });
        }

        // Verifica se a solicitação existe
        if (!comunidade.solicitacoesPendentes.includes(usuarioId)) {
            return res.status(400).json({ message: 'Solicitação não encontrada' });
        }

        // Remove da lista de solicitações pendentes e adiciona aos membros
        await Comunidade.findByIdAndUpdate(comunidadeId, {
            $pull: { solicitacoesPendentes: usuarioId },
            $addToSet: { membros: usuarioId }
        });

        // Adiciona comunidade ao array do usuário
        await User.findByIdAndUpdate(usuarioId, {
            $addToSet: { comunidades: comunidadeId }
        });

        return res.status(200).json({ message: 'Solicitação aprovada com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao aprovar solicitação' });
    }
};

// Rejeitar solicitação (só admin pode)
const rejeitarSolicitacao = async (req, res) => {
    const adminId = req.userId;
    const { comunidadeId, usuarioId } = req.params;

    try {
        const comunidade = await Comunidade.findById(comunidadeId);
        if (!comunidade) {
            return res.status(404).json({ message: 'Comunidade não encontrada' });
        }

        // Verifica se o usuário é admin
        if (!comunidade.admin.includes(adminId)) {
            return res.status(403).json({ message: 'Apenas admins podem rejeitar solicitações' });
        }

        //Verifica se a solicitação existe
        if (!comunidade.solicitacoesPendentes.includes(usuarioId)) {
            return res.status(400).json({ message: 'Nenhuma solicitação pendente deste usuário' });
        }

        // Remove da lista de solicitações pendentes
        await Comunidade.findByIdAndUpdate(comunidadeId, {
            $pull: { solicitacoesPendentes: usuarioId }
        });

        return res.status(200).json({ message: 'Solicitação rejeitada' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao rejeitar solicitação' });
    }
}

export {
    listaComunidades,
    getComunidadePorId,
    criarComunidade,
    solicitarEntrada,
    aprovarSolicitacao,
    rejeitarSolicitacao,
    listaPostsDaComunidade,
    getPostPorId,
    criarPostNaComunidade
};