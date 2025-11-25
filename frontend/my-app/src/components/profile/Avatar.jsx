import styles from '../../styles/avatar.module.css';

export default function Avatar({ nome, fotoPerfil, size = 'medium' }) {
  const inicial = nome?.charAt(0).toUpperCase() || 'U';
  const temImagem = fotoPerfil && fotoPerfil.trim() !== '';

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {temImagem ? (
        <img
          src={fotoPerfil}
          alt={nome}
          onError={(e) => {
            // Se a imagem falhar, remove e mostra fallback
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      
      {/* Fallback com inicial */}
      <div 
        className={styles.fallback}
        style={{ display: temImagem ? 'none' : 'flex' }}
      >
        {inicial}
      </div>
    </div>
  );
}