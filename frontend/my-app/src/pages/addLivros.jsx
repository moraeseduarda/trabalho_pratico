import { useState, useEffect } from 'react';
import BookCard from '../components/bookcard/BookCard';
import '../styles/addlivros.css';

function AddLivros() {
  const [livros, setLivros] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [biblioteca, setBiblioteca] = useState([]);

  const URL_BACKEND = 
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  // Buscar livros populares e biblioteca ao carregar
  useEffect(() => {
    buscarLivros('bestsellers');
    carregarBiblioteca();
  }, []);

  // ADICIONE ESSA FUNÇÃO
  const carregarBiblioteca = async () => {
    try {
      const response = await fetch(`${URL_BACKEND}/api/users/biblioteca`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setBiblioteca(data);
      }
    } catch (error) {
      console.error('Erro ao carregar biblioteca:', error);
    }
  };

  const buscarLivros = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12&langRestrict=pt`
      );
      const data = await response.json();
      setLivros(data.items || []);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      buscarLivros(searchTerm);
    }
  };

  const handleLivroAdicionado = (novoLivro) => {
    setBiblioteca([...biblioteca, novoLivro]);
  };

  const handleFavoritoChange = (livroAtualizado) => {
    setBiblioteca(biblioteca.map(l => 
      l._id === livroAtualizado._id ? livroAtualizado : l
    ));
  };

  const encontrarNaBiblioteca = (googleBookId) => {
    return biblioteca.find(l => l.googleBookId === googleBookId);
  };

  return (
    <div className="livros-page">
      {/* Cabeçalho com busca */}
      <div className="page-header">
        <h1>Livros</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar livros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Buscar</button>
        </form>
      </div>

      {/* Grid de livros */}
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <div className="books-grid">
          {livros.map((item) => {
            const livroNaBiblioteca = encontrarNaBiblioteca(item.id);
            
            return (
              <BookCard 
                key={item.id} 
                livro={item.volumeInfo}
                googleBookId={item.id}
                bibliotecaId={livroNaBiblioteca?._id}
                favoritoInicial={livroNaBiblioteca?.favorito || false}
                onLivroAdicionado={handleLivroAdicionado}
                onFavoritoChange={handleFavoritoChange}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AddLivros;