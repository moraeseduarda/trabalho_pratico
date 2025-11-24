import { useState } from 'react';

function BookCard({ livro, googleBookId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const URL_BACKEND = 
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  const handleAddToLibrary = async () => {
    setIsAdding(true);
    try {
      const response = await fetch(`${URL_BACKEND}/api/users/biblioteca`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          googleBookId,
          titulo: livro.title,
          autores: livro.authors,
          capa: livro.imageLinks?.thumbnail,
          descricao: livro.description,
          status: 'quero_ler'  // ou 'lendo', 'lido'
        })
      });

      if (response.ok) {
        alert('Livro adicionado à biblioteca!');
      } else {
        alert('Erro ao adicionar livro.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao adicionar livro.');
    } finally {
      setIsAdding(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="book-card">
      <div className="book-image">
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥' : '♡'}
          {/* ♡ */}
        </button>
        {livro?.imageLinks?.thumbnail ? (
          <img 
            src={livro.imageLinks.thumbnail} 
            alt={livro.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="no-image" style={{ color: 'white', alignSelf: 'center' }}>Sem imagem</div>
        )}
      </div>


      <div className="book-info">
        <h3>{livro?.title || 'Título não disponível'}</h3> {/* Caso não tenha título, mostra um padrão */}
        <p className="author">{livro?.authors?.join(', ') || 'Autor desconhecido'}</p>  {/* Mesma coisa para autor */}
        
        <button 
          className="add-btn"
          onClick={handleAddToLibrary}
          disabled={isAdding}
        >
          {isAdding ? 'Adicionando...' : 'Adicionar ao Perfil'}
        </button>
      </div>
    </div>
  );
}

export default BookCard;