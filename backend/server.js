require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors({
  origin: 'https://localhost:5173',
  credentials: true
}));

app.use(express.json())

// Rotas serão importadas aqui

// Exemplo: 'userRoutes.js' em 'backend/routes'
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes)

// Rota de teste
app.get('/api/status', (req, res) => {
  res.json({
    message: 'Backend está rodando',
    database: mongoose.STATES[mongoose.connection.readyState]
  });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Banco de dados conectado com sucesso');

    // Inicializando o servidor apenas após conexão com o banco de dados
    app.listen(PORT, () => {
      console.log(`Servidor Express rodando na porta ${PORT}`);
    });
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB', err.message);

  // Encerra a aplicação se a conexão com banco falhar
  process.exit(1)
})