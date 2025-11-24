import { useState, useEffect } from 'react';

function BookCard({ livro, googleBookId, bibliotecaId, favoritoInicial = false, onFavoritoChange }) {
  const [isFavorite, setIsFavorite] = useState(favoritoInicial);
  const [isAdding, setIsAdding] = useState(false);

  const URL_BACKEND = 
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  // Atualiza o estado quando a prop muda
  useEffect(() => {
    setIsFavorite(favoritoInicial);
  }, [favoritoInicial]);

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
          status: 'quero_ler'
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Livro adicionado à biblioteca!');
        // Opcional: callback para atualizar lista
        if (onFavoritoChange) {
          onFavoritoChange(data);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erro ao adicionar livro.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao adicionar livro.');
    } finally {
      setIsAdding(false);
    }
  };

  const toggleFavorite = async () => {
    // Se o livro ainda não está na biblioteca, não pode favoritar
    if (!bibliotecaId) {
      alert('Adicione o livro à biblioteca primeiro!');
      return;
    }

    const novoFavorito = !isFavorite;
    
    // Atualiza o estado local otimisticamente
    setIsFavorite(novoFavorito);

    try {
      const response = await fetch(`${URL_BACKEND}/api/users/biblioteca/${bibliotecaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          favorito: novoFavorito
        })
      });

      if (!response.ok) {
        // Se falhar, reverte o estado
        setIsFavorite(!novoFavorito);
        alert('Erro ao atualizar favorito.');
      } else {
        const data = await response.json();
        if (onFavoritoChange) {
          onFavoritoChange(data);
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      // Reverte em caso de erro
      setIsFavorite(!novoFavorito);
      alert('Erro ao atualizar favorito.');
    }
  };

  return (
    <div className="book-card">
      <div className="book-image">
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          title={bibliotecaId ? (isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos') : 'Adicione à biblioteca primeiro'}
        >
          {isFavorite ? '♥' : '♡'}
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
        <h3>{livro?.title || 'Título não disponível'}</h3>
        <p className="author">{livro?.authors?.join(', ') || 'Autor desconhecido'}</p>
        
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