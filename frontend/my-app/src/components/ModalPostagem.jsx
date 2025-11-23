import styles from '../styles/ModalPostagem.module.css';
import { X } from 'lucide-react';


export default function ModalPostagem({ showPost, setShowPost, post, setPost, handlePost }) {
if (!showPost) return null;

  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.titulo}>Nova Publicação</h2>
          <button className={styles.botaoFechar} onClick={() => setShowPost(false)}>
            <X />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handlePost}>

			{/* Titulo */}
          <div className={styles.grupoFormulario}>
            <label className={styles.label}>Título</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Digite o título..."
              value={post.titulo}
			  onChange={(e) => setPost({ ...post, titulo: e.target.value })}
              required
            />
          </div>

			{/* Conteúdo */}
          <div className={styles.grupoFormulario}>
            <label className={styles.label}>Conteúdo</label>
            <textarea
              className={styles.textarea}
              rows="6"
              placeholder="Escreva sua publicação..."
              value={post.conteudo}
			  onChange={(e) => setPost({ ...post, conteudo: e.target.value })}
              required
            />
          </div>

			{/* Botões */}
          <div className={styles.botoes}>
            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={() => setShowPost(false)}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.botaoSubmit}>
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}