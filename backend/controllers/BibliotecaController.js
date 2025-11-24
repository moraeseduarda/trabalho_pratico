import Biblioteca from '../models/Biblioteca.js';

const adicionarLivro = async (req, res) => {
    try {
        const {googleBookId, titulo, autores, capa, descricao, status } = req.body;

        // Verificar se já existe
        const existe = await Biblioteca.findOne({
            usuario: req.userId,
            googleBookId
        });

        if (existe) {
            return res.status(400).json({ message: 'Livro já está na biblioteca.' });
        }

        const livro = await Biblioteca.create({
            usuario: req.userId,
            googleBookId,
            titulo,
            autores,
            capa,
            descricao,
            status
        });

        res.status(201).json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar livro' });
    }
};

const getLivrosUsuario = async (req, res) => {
    try {
        const livros = await Biblioteca.find({ usuario: req.userId })
            .sort({ createdAt: -1 });
        res.json(livros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar livros' });
    }
};

const atualizarStatusLivro = async (req, res) => {
    try {
        const { status, favorito, avaliação } = req.body;

        const livro = await Biblioteca.findOneAndUpdate(
            { _id: req.params.id, usuario: req.userId },
            { status, favorito, avaliação },
            { new: true }
        );

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado na biblioteca.' });
        }

        res.json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar livro' });
    }
};

export { adicionarLivro, getLivrosUsuario, atualizarStatusLivro };