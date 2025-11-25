import User from '../models/User.js'
import geradorToken from '../middleware/geradorToken.js';

const registraUser = async (req, res) => {
    const { nome, email, password } = req.body;

    try {
        const userExiste = await User.findOne({email});
        
        if (userExiste) {
            return res.status(400).json({message: 'Usuário já registrado com esse e-mail.'});
        }

        // Ao registrar um novo usuário, iniciar o array de comunidades vazio
        // (não permitir que o cliente injete ids de comunidades no momento do signup)
        const user = await User.create({
            nome,
            email,
            password,
            comunidades: [],
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


const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .select('-password')
            .populate('comunidades');
        
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ message: 'Erro ao buscar perfil' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { 
            nome, 
            email, 
            dataNascimento, 
            sobre, 
            generosFavoritos, 
            idiomaPreferencia, 
            metaAnual,
            fotoPerfil,
            senhaAtual,
            novaSenha
        } = req.body;

        const user = await User.findById(req.userId).select('+password');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email já cadastrado.' });
            }
        }

        // Lógica para alterar senha
        if (novaSenha) {
            if (!senhaAtual) {
                return res.status(400).json({ message: 'Senha atual é obrigatória para alterar a senha' });
            }

            // Verifica se a senha atual está correta
            const senhaCorreta = await user.matchPassword(senhaAtual);
            if (!senhaCorreta) {
                return res.status(400).json({ message: 'Senha atual incorreta' });
            }

            // Valida nova senha
            if (novaSenha.length < 6) {
                return res.status(400).json({ message: 'Nova senha deve ter no mínimo 6 caracteres' });
            }

            user.password = novaSenha; // O pre-save hook vai criptografar
        }

        // Atualizar outros campos
        if (nome) user.nome = nome;
        if (email) user.email = email;
        if (dataNascimento) user.dataNascimento = dataNascimento;
        if (sobre !== undefined) user.sobre = sobre;
        if (generosFavoritos) user.generosFavoritos = generosFavoritos;
        if (idiomaPreferencia) user.idiomaPreferencia = idiomaPreferencia;
        if (metaAnual) user.metaAnual = metaAnual;
        if (fotoPerfil !== undefined) user.fotoPerfil = fotoPerfil;

        await user.save();

        res.json({
            message: novaSenha ? 'Perfil e senha atualizados com sucesso' : 'Perfil atualizado com sucesso',
            user: {
                _id: user._id,
                nome: user.nome,
                email: user.email,
                fotoPerfil: user.fotoPerfil,
                dataNascimento: user.dataNascimento,
                sobre: user.sobre,
                generosFavoritos: user.generosFavoritos,
                idiomaPreferencia: user.idiomaPreferencia,
                metaAnual: user.metaAnual
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ message: 'Erro ao atualizar perfil' });
    }
};

// Retorna dados do usuário autenticado (inclui comunidades)
const pegaUserAtual = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('comunidades');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retorna campos públicos
        return res.json({
            nome: user.nome,
            email: user.email,
            comunidades: user.comunidades
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
};

const logoutUser = (_req, res) => {
    const isProduction = process.env.NODE_ENV === "production";

    // Limpa o cookie com as mesmas flags usadas na criação
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: isProduction,
        sameSite: "none",
        path: '/'
    });

    res.status(200).json({message: "Logout realizado com sucesso"});
};

export {registraUser, authUser, logoutUser, pegaUserAtual, getUserProfile, updateUserProfile};
