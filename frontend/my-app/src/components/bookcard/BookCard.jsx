import { useState, useEffect } from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';

function BookCard({ livro, googleBookId, bibliotecaId, favoritoInicial = false, onLivroAdicionado, onFavoritoChange, mostrarStatus = false }) {
  const [isFavorite, setIsFavorite] = useState(favoritoInicial);
  const [isAdding, setIsAdding] = useState(false);
  const [localBibliotecaId, setLocalBibliotecaId] = useState(bibliotecaId);

  const URL_BACKEND = 
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  useEffect(() => {
    setIsFavorite(favoritoInicial);
    setLocalBibliotecaId(bibliotecaId);
  }, [favoritoInicial, bibliotecaId]);

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
        setLocalBibliotecaId(data._id);
        if (onLivroAdicionado) {
          onLivroAdicionado(data);
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
    if (!localBibliotecaId) {
      alert('Adicione o livro à biblioteca primeiro!');
      return;
    }

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
        
        {/* Mostra status OU botão de adicionar */}
        {mostrarStatus ? (
          <StatusBadge status={livro?.status} />
        ) : (
          <button 
            className="add-btn"
            onClick={handleAddToLibrary}
            disabled={isAdding || localBibliotecaId}
          >
            {localBibliotecaId ? 'Na Biblioteca' : (isAdding ? 'Adicionando...' : 'Adicionar ao Perfil')}
          </button>
        )}
      </div>
    </div>
  );
}

export default BookCard;