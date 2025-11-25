import { useState } from 'react';
import BookCard from '../components/bookcard/BookCard';
import '../styles/bibliotecaUser.css'; 

function BibliotecaUser({ setIsAuthenticated }) {
  // Estado para controlar qual aba está selecionada
  const [abaAtiva, setAbaAtiva] = useState('lendo');

  // Dados fictícios (MOCK) - Simula o que virá do backend depois
  // Cada livro tem um 'status' que usaremos para filtrar
  const meusLivros = [
    { id: 1, title: 'Clean Code', authors: ['Robert C. Martin'], status: 'lendo' },
    { id: 2, title: 'The Pragmatic Programmer', authors: ['Andrew Hunt'], status: 'quero-ler' },
    { id: 3, title: 'JavaScript: The Good Parts', authors: ['Douglas Crockford'], status: 'lido' },
    { id: 4, title: 'You Don\'t Know JS', authors: ['Kyle Simpson'], status: 'lendo' },
    { id: 5, title: 'Design Patterns', authors: ['Erich Gamma'], status: 'quero-ler' },
  ];

  // Filtra os livros baseado na aba ativa
  const livrosFiltrados = meusLivros.filter(livro => livro.status === abaAtiva);

  return (
    <div>
      
      <div className="biblioteca-page">
        <div className="page-header">
          <h1>Minha Biblioteca</h1>
        </div>

        {/* Botões das Abas */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${abaAtiva === 'lendo' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('lendo')}
          >
            📖 Lendo
          </button>
          
          <button 
            className={`tab-btn ${abaAtiva === 'quero-ler' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('quero-ler')}
          >
            🔖 Quero Ler
          </button>
          
          <button 
            className={`tab-btn ${abaAtiva === 'lido' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('lido')}
          >
            ✅ Lidos
          </button>
        </div>

        {/* Grid de Livros */}
        <div className="books-grid">
          {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro) => (
              <BookCard key={livro.id} livro={livro} />
            ))
          ) : (
            <p className="empty-msg">Nenhum livro nesta lista ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BibliotecaUser;