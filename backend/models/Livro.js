import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        autor: {
            type: String,
            required: true,
        },
        imagemCapa: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Livro = mongoose.model('Livro', livroSchema);

export default Livro;