import mongoose from "mongoose";

const comunidadeSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: true,
        },
        descricao: {
            type: String,
            required: true,
        }
        ,
        membros: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default: []
        }
    }
);

const Comunidade = mongoose.model('Comunidade', comunidadeSchema);

export default Comunidade;