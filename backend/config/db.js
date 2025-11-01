import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.log('Erro ao conectar ao MongoDB', error.message);
        throw new Error('Falha na conexão com o Banco de Dados.');
    }
};

export default connectDB;