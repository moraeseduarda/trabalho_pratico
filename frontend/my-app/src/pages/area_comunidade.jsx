import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Settings } from "lucide-react";
import styles from "../styles/tela_comunidade.module.css"
import ModalPostagem from "../components/ModalPostagem";

export default function TelaComunidade() {
    const { id } = useParams(); // id da comunidade
    const navigate = useNavigate();
    const [comunidade, setComunidade] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showPost, setShowPost] = useState(false);
    const [novoPost, setNovoPost] = useState({ titulo: '', conteudo: '' });
    const [usuarioAtual, setUsuarioAtual] = useState(null);

    const URL_BACKEND =
        import.meta.env.MODE === 'development'
            ? 'http://localhost:5000'
            : 'https://trabalho-pratico-fgqh.onrender.com';

    // Buscar usuário atual
    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const res = await fetch(`${URL_BACKEND}/api/users/profile`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsuarioAtual(data);
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchUsuario();
    }, []);

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

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}/posts`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoPost),
            });

            if (res.ok) {
                const criado = await res.json();
                // atualiza lista local, colocando o novo post no topo
                setPosts(prev => [criado, ...prev]);
                setNovoPost({ titulo: '', conteudo: '' });
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

    // Verifica se usuário é admin
    const ehAdmin = usuarioAtual && comunidade?.admin?.some(
        admin => admin._id === usuarioAtual._id
    );

    return (
        <div className="main">
            <div className="secao" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ marginLeft: '7.2rem' }}>
                    <h1 className="titulo">{comunidade ? comunidade.nome : 'Comunidade'}</h1>
                    <p>{comunidade ? comunidade.descricao : ''}</p>
                </div>
                
                {/* Botão Gerenciar (só aparece para admin) */}
                {ehAdmin && (
                    <button 
                        className={styles.botaoGerenciar}
                        onClick={() => navigate(`/comunidade/${id}/gerenciar`)}
                    >
                        <Settings size={20} />
                        Gerenciar
                    </button>
                )}
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
                post={novoPost}
                setPost={setNovoPost}
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
                                    <span className={styles.nomeAutor}>
                                        {post.autor ? (post.autor.nome || post.autor) : 'Usuário'}
                                    </span>
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