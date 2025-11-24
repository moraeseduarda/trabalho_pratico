import mongoose from 'mongoose';

const bibliotecaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    googleBookId: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    autores: [{
        type: String
    }],
    capa: String,
    descricao: String,
    status: {
        type: String,
        enum: ['quero_ler', 'lendo', 'lido'],
        default: 'quero_ler'
    },
    favorito: {
        type: Boolean,
        default: false
    },
    avaliacao: {
        type: Number,
        min: 0,
        max: 5
    }
}, {
    timestamps: true
});

// Índice composto para evitar duplicatas
bibliotecaSchema.index({ usuario: 1, googleBookId: 1 }, { unique: true });

export default mongoose.model('Biblioteca', bibliotecaSchema);