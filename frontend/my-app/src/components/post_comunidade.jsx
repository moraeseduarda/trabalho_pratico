import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import styles from '../styles/post_comunidade.module.css';

export default function PostComunidade() {
  const { id, postId } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const URL_BACKEND =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000'
      : 'https://trabalho-pratico-fgqh.onrender.com';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}/posts/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          console.error('Post não encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar post:', err);
      }
    };

    fetchPost();
  }, [id, postId]);

  return (
    <div className={"main"}>
      
      {/* SubHeader com informações da comunidade e post */}
      <header className={styles.header}>
        <div className={styles.conteudoHeader}>
          <button className={styles.botaoVoltar} onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>

          <div className={styles.infoComunidade}>
            <h1>{post ? post.comunidade?.nome || 'Comunidade' : 'Comunidade'}</h1>
            <p>Post #{postId}</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.cardPost}>
          <div className={styles.postHeader}>
            <div>
              <div>
                <span className={styles.nomeAutor}>{post ? (post.autor?.nome || post.autor) : 'Usuário'}</span>
              </div>
            </div>
          </div>

          <h1 className={styles.tituloPost}>{post ? post.titulo : ''}</h1>
          <div className={styles.conteudoPost}>{post ? post.conteudo : ''}</div>
        </div>
      </main>
    </div>
  );
}
