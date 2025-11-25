import { useState, useEffect } from 'react';
import BookCard from '../components/bookcard/BookCard';
import '../styles/bibliotecaUser.css';

function BibliotecaUser() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  const URL_BACKEND =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000'
      : 'https://trabalho-pratico-fgqh.onrender.com';

  useEffect(() => {
    carregarBiblioteca();
  }, []);

  const carregarBiblioteca = async () => {
    try {
      const resposta = await fetch(`${URL_BACKEND}/api/users/biblioteca`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!resposta.ok) {
        throw new Error('Erro ao buscar biblioteca');
      }

      const dados = await resposta.json();
      
      console.log("Dados recebidos do backend:", dados);

      const livrosFormatados = Array.isArray(dados)
        ? dados
            .map((item) => {
              if (!item) return null;

              return {
                id: item._id,
                titulo: item.titulo,
                autores: item.autores,
                capa: item.capa,
                imagemCapa: item.imagemCapa,
                googleBookId: item.googleBookId,
                status: item.status, 
              };
            })
            .filter(Boolean)
        : [];

      console.log("Livros formatados:", livrosFormatados);
      setLivros(livrosFormatados);
    } catch (error) {
      console.error("Erro:", error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="biblioteca-page">
      <div className="page-header">
        <h1>Minha Biblioteca</h1>
      </div>

      {carregando && <p className="loading-msg">Carregando...</p>}
      {erro && <p className="error-msg">Ocorreu um erro ao carregar a biblioteca.</p>}

      {!carregando && !erro && (
        <div className="books-grid">
          {livros.length > 0 ? (
            livros.map((livro) => (
              <BookCard 
                key={livro.id} 
                livro={livro} 
                mostrarStatus={true}  // Mostra o StatusBadge
              />
            ))
          ) : (
            <p className="empty-msg">Nada para ver aqui.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BibliotecaUser;