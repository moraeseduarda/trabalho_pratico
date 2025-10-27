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
        res.status(500).json({message: 'Erro interno do servidor.'});
    }
};

const authUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if (user && (await user.matchPassword(password))) {
        res.json({
            // id
            nome: user.nome,
            email: user.email,
            // token
        });
    } else {
        res.status(401).json({message: 'Email ou senha inválidos.'});
    }
};

export {registraUser, authUser};