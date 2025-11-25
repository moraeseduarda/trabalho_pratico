import { useState, useEffect } from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';

function BookCard({ livro, bibliotecaId, favoritoInicial, onFavoritoChange}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [localBibliotecaId, setLocalBibliotecaId] = useState(bibliotecaId || livro?._id);

  const URL_BACKEND =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  useEffect(() => {
      let statusFinal = false;

      if (typeof favoritoInicial !== 'undefined') {
        statusFinal = favoritoInicial;
      } else if (livro && typeof livro.favorito !== 'undefined') {
        statusFinal = livro.favorito;
      }

      setIsFavorite(statusFinal);

      if (bibliotecaId) {
        setLocalBibliotecaId(bibliotecaId);
      } else if (livro?._id) {
        setLocalBibliotecaId(livro._id);
      }

    }, [favoritoInicial, bibliotecaId, livro]); 

  // --- LÓGICA DE EXIBIÇÃO ---
  const titulo = livro?.title || livro?.titulo || 'Título não disponível';
  
  let autor = 'Autor desconhecido';
  if (livro?.autores && Array.isArray(livro.autores)) {
    autor = livro.autores.join(', ');
  } else if (livro?.authors && Array.isArray(livro.authors)) {
    autor = livro.authors.join(', ');
  } else if (livro?.autor) {
    autor = livro.autor;
  }
  
  const imagem = livro?.capa || livro?.imagemCapa || livro?.imageLinks?.thumbnail || '';

  const toggleFavorite = async () => {
    const novoFavorito = !isFavorite;
    setIsFavorite(novoFavorito);

    try {
      const response = await fetch(`${URL_BACKEND}/api/users/biblioteca/${localBibliotecaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ favorito: novoFavorito })
      });

      if (!response.ok) {
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
          title={localBibliotecaId ? (isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos') : 'Adicione à biblioteca primeiro'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
        
        {imagem ? (
          <img 
            src={imagem} 
            alt={titulo}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px'
          }}>
            Sem imagem
          </div>
        )}
      </div>

      <div className="book-info">
        <h3>{titulo}</h3>
        <p className="author">{autor}</p>
          <StatusBadge status={livro?.status} />
      </div>
    </div>
  );
}

export default BookCard;