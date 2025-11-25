import { useState, useEffect } from 'react';
import styles from "../../styles/profile_form.module.css";

function StatusBookCard({ livro, googleBookId, bibliotecaId, favoritoInicial = false, statusInicial = '', onLivroAdicionado, onFavoritoChange }) {
  const [isFavorite, setIsFavorite] = useState(favoritoInicial);
  const [isAdding, setIsAdding] = useState(false);
  const [localBibliotecaId, setLocalBibliotecaId] = useState(bibliotecaId);
  const [statusAtual, setStatusAtual] = useState(false);

  const URL_BACKEND = 
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://trabalho-pratico-fgqh.onrender.com";

  // Atualiza o estado quando as props mudam
  useEffect(() => {
    setIsFavorite(favoritoInicial);
    setLocalBibliotecaId(bibliotecaId);
    if (statusInicial) setStatusAtual(statusInicial)
  }, [favoritoInicial, bibliotecaId, statusInicial]);

  const handleAddToLibrary = async (novoStatus) => {
    if (!novoStatus) return;

    setIsAdding(true);
    
    // Backup para reverter em caso de erro
    const statusAnterior = statusAtual;
    
    setStatusAtual(novoStatus);

    const nomesAmigaveis = {
      quero_ler: "Quero Ler",
      lendo: "Lendo",
      lido: "Lido"
    };

    try {
      if (localBibliotecaId) {
        // Já está na biblioteca - atualiza
        const response = await fetch(`${URL_BACKEND}/api/users/biblioteca/${localBibliotecaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: novoStatus }) // Atualiza só o status
        });

        if (!response.ok) throw new Error('Erro ao atualizar status');
        
        alert(`Status modificado para: ${nomesAmigaveis[novoStatus]}`);

      } else {
        // ão está na biblioteca: adiciona
        const response = await fetch(`${URL_BACKEND}/api/users/biblioteca`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ 
            googleBookId,
            titulo: livro.title,
            autores: livro.authors,
            capa: livro.imageLinks?.thumbnail,
            descricao: livro.description,
            status: novoStatus // Usa o status escolhido no select
          })
        });

        if (response.ok) {
          const data = await response.json();
          setLocalBibliotecaId(data._id); // Salva o ID retornado
          
          alert(`Livro adicionado à biblioteca como: ${nomesAmigaveis[novoStatus]}`);

          if (onLivroAdicionado) onLivroAdicionado(data);
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao adicionar livro.');
          setStatusAtual(statusAnterior); // Reverte visualmente
          setLocalBibliotecaId(null);
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão.');
      setStatusAtual(statusAnterior); // Reverte visualmente
    } finally {
      setIsAdding(false);
    }
  };

  const toggleFavorite = async () => {
    // Use localBibliotecaId em vez de bibliotecaId
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
          title={localBibliotecaId ? (isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos') : 'Adicione à biblioteca primeiro'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
        {livro?.imageLinks?.thumbnail && (
          <img 
            src={livro.imageLinks.thumbnail} 
            alt={livro.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>


      <div className="book-info">
        <h3>{livro?.title || 'Título não disponível'}</h3>
        <p className="author">{livro?.authors?.join(', ') || 'Autor desconhecido'}</p>

        <select
          value={statusAtual || ""}
          onChange={(e) => handleAddToLibrary(e.target.value)}
          className={styles.select}
          disabled={isAdding}
        >
          <option value="" disabled>
            {localBibliotecaId ? 'Alterar Status' : 'Adicionar à Biblioteca'}
          </option>

          <option value="quero_ler">Quero Ler</option>
          <option value="lendo">Lendo</option>
          <option value="lido">Lido</option>
        </select>
      </div>
    </div>
  );
}

export default StatusBookCard;