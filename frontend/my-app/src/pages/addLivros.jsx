import { useState, useEffect } from 'react';
import BookCard from '../components/bookcard/BookCard';
import '../styles/addlivros.css';

function AddLivros() {
  const [livros, setLivros] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarLivros('bestsellers');
  }, []);

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

  return (
    <div>
      <div className="livros-page">
        {/* Cabeçalho */}
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
            {livros.map((item) => (
              <BookCard 
                key={item.id}
                livro={item.volumeInfo}
                googleBookId={item.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddLivros;