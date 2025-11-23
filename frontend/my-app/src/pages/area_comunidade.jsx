import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import styles from "../styles/tela_comunidade.module.css"
import ModalPostagem from "../components/ModalPostagem";

export default function TelaComunidade() {
    const { id } = useParams(); // id da comunidade
    const navigate = useNavigate();

    const [posts, setPosts] = useState([
        {
        id: 1,
        autor: 'João Silva',
        titulo: 'Qual o melhor livro de Machado de Assis para iniciantes?',
        conteudo: 'Estou começando a ler os clássicos brasileiros e queria uma recomendação de qual obra do Machado seria ideal para começar. Pensei em Dom Casmurro, mas ouvi dizer que Memórias Póstumas é melhor...',
        },
        {
        id: 2,
        autor: 'Maria Santos',
        titulo: 'Discussão: A importância de Clarice Lispector na literatura brasileira',
        conteudo: 'Gostaria de abrir uma discussão sobre a relevância de Clarice Lispector. Para mim, ela revolucionou a forma de escrever em português. O que vocês acham?',
        },
        {
        id: 3,
        autor: 'Pedro Costa',
        titulo: 'Acabei de ler Grande Sertão: Veredas',
        conteudo: 'Que experiência incrível! A narrativa do Guimarães Rosa é hipnotizante. Alguém mais se sentiu assim? Vamos conversar sobre esse clássico!',
        }
    ]);

    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState({ titulo: '', conteudo: '' });

    const handlePost = (e) => {
        console.log(e, "Fazer a função handlePost aqui")
    };

    const handleEntrarPost = (postId) => {
       navigate(`/comunidade/${id}/post/${postId}`);
    };

    return (
        <div className="main">
            <div className="secao">
                <div>
                    <h1 className="titulo">Ficção Científica & Cyberpunk</h1>
                    <p>Para amantes de distopias e robôs.</p>
                </div>
            </div>


            {/* Botão nova publicação */}
            <div className={styles.secaoNovoPost}>
                <button 
                    className={styles.botaoNovoPost} 
                    onClick={() => setShowPost(true)}
                >
                    <Plus className={styles.iconeNovoPost} />
                    <span className={styles.textoNovoPost}>
                        Adicionar sua publicação
                    </span>
                </button>
            </div>


            {/* Modal */}
            <ModalPostagem
                showPost={showPost}
                setShowPost={setShowPost}
                post={post}
                setPost={setPost}
                handlePost={handlePost}
            />

            {/* Renderizando a lista de posts */}
            <div className={styles.listaPosts}>
            {posts.map((post) => (
                <div key={post.id} className={styles.cardPost}
                    onClick={() => handleEntrarPost(post.id)}
                >

                <div className={styles.postHeader}>
                    <div>
                        <div>
                            <span className={styles.nomeAutor}>{post.autor}</span>
                        </div>
                    </div>
                </div>

                    <h3 className={styles.postTitulo}>{post.titulo}</h3>
                    <p className={styles.postConteudo}>{post.conteudo}</p>
                </div>
            ))}
            </div>
        </div>
    );
}