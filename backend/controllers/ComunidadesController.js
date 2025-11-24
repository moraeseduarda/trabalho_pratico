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
        const comunidade = await Comunidade.findById(comunidadeId).populate('membros');
        if (!comunidade) return res.status(404).json({ message: 'Comunidade não encontrada' });
        return res.json(comunidade);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar comunidade' });
    }
};

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

export { listaComunidades, getComunidadePorId, entrarComunidade, listaPostsDaComunidade, getPostPorId, criarPostNaComunidade };
