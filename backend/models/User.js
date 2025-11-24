import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    // Mongo cria campo id automaticamente
    {
        nome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            // Uso da biblioteca validator para fazer verificação de e-mail (formatação válida)
            // Formatação válida: usuário, símbolo (@) e domínio 
            validate: {
                validator: validator.isEmail,
                message: 'Por favor, insira um email válido'
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            // Ao buscar usuário, o campo password não vem junto (mais seguro)
            select: false,
            // Verificação de senha, regex e no mínimo uma letra maiúscula, minúscula e um número
            validate: {
                validator: function(v) {
                    return validator.matches(v, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/);
                },
                message: 'A senha deve conter ao menos uma letra maiúscula, uma minúscula e um número'
            }
        },
        dataNascimento: {
            type: Date
        },
        sobre: {
            type: String,
            maxlength: 500
        },
        generosFavoritos: [{
            type: String
        }],
        idiomaPreferencia: {
            type: String
        },
        metaAnual: {
            type: Number,
        },
        fotoPerfil: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
    }
);

// Implementando um hashing de senha para segurança como biblioteca bycryptjs
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
    next();
}); 

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;