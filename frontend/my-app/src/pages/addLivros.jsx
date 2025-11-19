import Header from '../components/header/header';
import BookCard from '../components/bookcard/BookCard';
import '../styles/addlivros.css';

function AddLivros({ setIsAuthenticated }) {
  // 12 livros vazios para exemplo (3 linhas x 4 colunas)
  const livrosVazios = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div>
      <Header setIsAuthenticated={setIsAuthenticated} />
      
      <div className="livros-page">
        {/* Cabeçalho */}
        <div className="page-header">
          <h1>Books</h1>
        </div>

        {/* Grid de livros */}
        <div className="books-grid">
          {livrosVazios.map((numero) => (
            <BookCard key={numero} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddLivros;