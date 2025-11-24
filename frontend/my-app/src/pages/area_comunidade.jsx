import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import styles from "../styles/tela_comunidade.module.css"
import ModalPostagem from "../components/ModalPostagem";

export default function TelaComunidade() {
    const { id } = useParams(); // id da comunidade
    const navigate = useNavigate();
    const [comunidade, setComunidade] = useState(null);

    const URL_BACKEND =
        import.meta.env.MODE === 'development'
            ? 'http://localhost:5000'
            : 'https://trabalho-pratico-fgqh.onrender.com';

    useEffect(() => {
        const fetchComunidade = async () => {
            try {
                const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setComunidade(data);
                } else {
                    console.error('Comunidade não encontrada');
                }
            } catch (err) {
                console.error('Erro ao buscar comunidade:', err);
            }
        };

        fetchComunidade();
    }, [id]);

    // Busca posts reais da comunidade
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}/posts`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                } else {
                    console.error('Erro ao buscar posts');
                }
            } catch (err) {
                console.error('Erro ao buscar posts:', err);
            }
        };

        fetchPosts();
    }, [id]);

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

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}/posts`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post),
            });

            if (res.ok) {
                const criado = await res.json();
                // atualiza lista local, colocando o novo post no topo
                setPosts(prev => [criado, ...prev]);
                setPost({ titulo: '', conteudo: '' });
                setShowPost(false);
                alert('Publicação criada com sucesso');
            } else if (res.status === 401) {
                alert('Você precisa estar logado para postar');
            } else {
                const err = await res.json();
                alert(err.message || 'Erro ao criar publicação');
            }
        } catch (error) {
            console.error(error);
            alert('Erro de rede ao criar publicação');
        }
    };

    const handleEntrarPost = (postId) => {
       navigate(`/comunidade/${id}/post/${postId}`);
    };

    return (
        <div className="main">
            <div className="secao">
                <div>
                    <h1 className="titulo">{comunidade ? comunidade.nome : 'Comunidade'}</h1>
                    <p>{comunidade ? comunidade.descricao : ''}</p>
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
                <div key={post._id || post.id} className={styles.cardPost}
                    onClick={() => handleEntrarPost(post._id || post.id)}
                >

                <div className={styles.postHeader}>
                    <div>
                        <div>
                            <span className={styles.nomeAutor}>{post.autor ? (post.autor.nome || post.autor) : 'Usuário'}</span>
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