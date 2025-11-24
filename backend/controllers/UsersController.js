import User from '../models/User.js'
import geradorToken from '../middleware/geradorToken.js';

const registraUser = async (req, res) => {
    const { nome, email, password } = req.body;

    try {
        const userExiste = await User.findOne({email});
        
        if (userExiste) {
            return res.status(400).json({message: 'Usuário já registrado com esse e-mail.'});
        }

        const user = await User.create({
            nome,
            email,
            password,
        });

        if (user) {
            geradorToken(res, user._id);

            // Erro 201: created -> successful response
            res.status(201).json({
                nome: user.nome,
                email: user.email,
            });
        } else {
            res.status(400).json({message: 'Dados do usuário inválidos.'});
        }
    } catch (error) {
        console.log(error);

        if (error.name === 'ValidationError') {
        // Pega todas as mensagens de validação
        const mensagens = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: mensagens.join(', ') });
    }

        res.status(500).json({message: 'Erro interno do servidor.', erro: error.message});
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password');

    if (!user) {
        return res.status(400).json({message: 'Usuário não encontrado'})
    }

    const senhaConfere = await user.matchPassword(password);

    if (senhaConfere) {
        geradorToken(res, user._id);

        return res.json({
        nome: user.nome,
        email: user.email,
        });

    } else {
        res.status(400).json({ message: 'Email ou senha inválidos.' });
    }
};

const logoutUser = (_req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        expires: new Date(0)
    });
    
    res.status(200).json({message: "Logout realizado com sucesso"});
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar perfil.', error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { nome, username, email, dataNascimento, sobre, generosFavoritos, idiomaPreferencia, metaAnual } = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email já cadastrado.' });
            }
        }

        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({ message: 'Username já cadastrado.' });
            }
        }

        if (nome) user.nome = nome;
        if (username) user.username = username;
        if (email) user.email = email;
        if (dataNascimento) user.dataNascimento = dataNascimento;
        if (sobre !== undefined) user.sobre = sobre;
        if (generosFavoritos) user.generosFavoritos = generosFavoritos;
        if (idiomaPreferencia) user.idiomaPreferencia = idiomaPreferencia;
        if (metaAnual) user.metaAnual = metaAnual;

        await user.save();

        res.json({
            message: 'Perfil atualizado com sucesso',
            user: {
            id: user._id,
            nome: user.nome,
            username: user.username,
            email: user.email,
            dataNascimento: user.dataNascimento,
            sobre: user.sobre,
            generosFavoritos: user.generosFavoritos,
            idiomaPreferencia: user.idiomaPreferencia,
            metaAnual: user.metaAnual
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar perfil.', error: error.message });
    }
};

export {registraUser, authUser, logoutUser, getUserProfile, updateUserProfile};
