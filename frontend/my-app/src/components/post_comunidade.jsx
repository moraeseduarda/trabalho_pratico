import { useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import styles from '../styles/post_comunidade.module.css';

export default function PostComunidade() {
  const { id, postId } = useParams();

  const [post] = useState({
    id: 1,
    autor: 'João Silva',
    titulo: 'Qual o melhor livro de Machado de Assis para iniciantes?',
    conteudo: 'Estou começando a ler os clássicos brasileiros e queria uma recomendação de qual obra do Machado seria ideal para começar. Pensei em Dom Casmurro, mas ouvi dizer que Memórias Póstumas é melhor.\n\nAlguém que já leu ambos poderia me ajudar? Também aceito outras sugestões de obras do autor que sejam mais acessíveis para quem está começando.'
  });

  return (
    <div className={"main"}>
      
      {/* SubHeader com informações da comunidade e post */}
      <header className={styles.header}>
        <div className={styles.conteudoHeader}>
          <button className={styles.botaoVoltar}>
            <ArrowLeft />
          </button>

          <div className={styles.infoComunidade}>
            <h1>Comunidade nome</h1>
            <p>Post #{postId}</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.cardPost}>
          <div className={styles.postHeader}>
            <div>
              <div>
                <span className={styles.nomeAutor}>{post.autor}</span>
              </div>
            </div>
          </div>

          <h1 className={styles.tituloPost}>{post.titulo}</h1>
          <div className={styles.conteudoPost}>{post.conteudo}</div>
        </div>
      </main>
    </div>
  );
}
