function BookCard({ livro }) {
  return (
    <div className="book-card">
      <div className="book-image">
        <button className="favorite-btn">♡</button>
        {livro?.imageLinks?.thumbnail && (
          <img 
            src={livro.imageLinks.thumbnail} 
            alt={livro.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>


      <div className="book-info">
        <h3>{livro?.title || 'Book name'}</h3> {/* Caso não tenha título, mostra um padrão */}
        <p className="author">{livro?.authors?.[0] || 'Author'}</p>  {/* Mesma coisa para autor */}
        
        <button className="add-btn">
          Adicionar ao Perfil
        </button>
      </div>
    </div>
  );
}

export default BookCard;