import User from '../models/User.js'

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
            res.status(201).json({
                // id
                nome: user.nome,
                email: user.email,
                // token
            });
        } else {
            res.status(400).json({message: 'Dados do usuário inválidos.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Erro interno do servidor.', erro: error.message});
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login recebido:", email, password);

    const user = await User.findOne({email}).select('+password');
    console.log("Usuário encontrado:", user);

    if (!user) {
        return res.status(400).json({message: 'Usuário não encontrado'})
    }

    const senhaConfere = await user.matchPassword(password);
    console.log("Senha confere?", senhaConfere);

    if (senhaConfere) {
        res.json({
        nome: user.nome,
        email: user.email,
        });
    } else {
        res.status(400).json({ message: 'Email ou senha inválidos.' });
    }
};

export {registraUser, authUser};