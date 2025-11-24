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
    }
);

const Comunidade = mongoose.model('Comunidade', comunidadeSchema);

export default Comunidade;