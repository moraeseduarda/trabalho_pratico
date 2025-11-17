import Livro from '../models/Livro.js'

const registraLivro = async (req, res) => {
    const { titulo, autor, imagemCapa, nota } = req.body;

    try {
        const livroExiste = await Livro.findById({ id });

        if (livroExiste) {
            return res.status(400).jspn({message: 'Já existe um usuário com esse ID.'});
        }

        const livro = await Livro.create({
            titulo,
            autor,
            imagemCapa,
            nota,
        });

        if (livro) {
            res.status(201).json({
                titulo,
                autor,
                imagemCapa,
                nota,
            });
        } else {
            res.status(400).json({message: 'Dados do livro inválidos.'});
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erro interno do sevidor.', erro: error.message});
    }
};

const pegaLivroPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livro.findById({ id });

        if (livro) {
            return res.status(200).json(livro);
        } else {
            res.status(404).json({msg: 'Livro não encontrado.'});
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erro interno do sevidor.', erro: error.message});
    }
};

export { registraLivro, pegaLivroPorId };