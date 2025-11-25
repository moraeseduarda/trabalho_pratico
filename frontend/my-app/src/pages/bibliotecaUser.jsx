import { useState, useEffect } from 'react';
import BookCard from '../components/bookcard/BookCard';
import '../styles/bibliotecaUser.css';

function BibliotecaUser() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState('todos'); // Novo estado para o filtro

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

      const livrosFormatados = Array.isArray(dados)
        ? dados
            .map((item) => {
              if (!item) return null;

              return {
                _id: item._id,
                id: item._id,
                titulo: item.titulo,
                autores: item.autores,
                capa: item.capa,
                imagemCapa: item.imagemCapa,
                googleBookId: item.googleBookId,
                status: item.status,
                favorito: item.favorito
              };
            })
            .filter(Boolean)
        : [];

      setLivros(livrosFormatados);
    } catch (error) {
      console.error("Erro:", error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  };

  const handleFavoritoChange = (livroAtualizado) => {
    setLivros((prevLivros) => 
      prevLivros.map((livro) => {
        // Encontra o livro que foi alterado e atualiza o status de favorito
        if (livro._id === livroAtualizado._id) {
            return { ...livro, favorito: livroAtualizado.favorito };
        }
        return livro;
      })
    );
  };

  // Filtra os livros baseado no filtro ativo
  const livrosFiltrados = filtroAtivo === 'todos'
    ? livros
    : livros.filter(livro => livro.status === filtroAtivo);

  return (
    <div className="biblioteca-page">
      <div className="page-header">
        <h1>Minha Biblioteca</h1>
      </div>

      {/* Botões de Filtro */}
      <div className="filtros-container">
        <button
          className={`filtro-btn ${filtroAtivo === 'todos' ? 'active' : ''}`}
          onClick={() => setFiltroAtivo('todos')}
        >
          📚 Todos
        </button>
        <button
          className={`filtro-btn ${filtroAtivo === 'lendo' ? 'active' : ''}`}
          onClick={() => setFiltroAtivo('lendo')}
        >
          📖 Lendo
        </button>
        <button
          className={`filtro-btn ${filtroAtivo === 'quero_ler' ? 'active' : ''}`}
          onClick={() => setFiltroAtivo('quero_ler')}
        >
          🔖 Quero Ler
        </button>
        <button
          className={`filtro-btn ${filtroAtivo === 'lido' ? 'active' : ''}`}
          onClick={() => setFiltroAtivo('lido')}
        >
          ✅ Lido
        </button>
      </div>

      {carregando && <p className="loading-msg">Carregando...</p>}
      {erro && <p className="error-msg">Ocorreu um erro ao carregar a biblioteca.</p>}

      {!carregando && !erro && (
        <div className="books-grid">
          {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro) => (
              <BookCard
                key={livro.id}
                livro={livro}
                onFavoritoChange={handleFavoritoChange}
              />
            ))
          ) : (
            <p className="empty-msg">Nenhum livro nesta categoria.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BibliotecaUser;