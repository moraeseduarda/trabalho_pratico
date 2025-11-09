import mongoose from 'mongoose';

const avaliacaoSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        livro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Livro",
            required: true,
        },
        nota: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comentario: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        dataAvaliacao: {
            type: Date,
            default: Date.now,
        },
  },
  {
    timestamps: true,
  }
);

avaliacaoSchema.index({usuario: 1, livro: 1}, {unique: true});

const Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);

export default Avaliacao;