import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import styles from "../styles/comunidades.module.css";
import ModalCriarComunidade from "../components/ModalCriarComunidade";

export default function Comunidades() {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [comunidadesDoUsuario, setComunidadesDoUsuario] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [novaComunidade, setNovaComunidade] = useState({ nome: '', descricao: '' });

    const URL_BACKEND =
        import.meta.env.MODE === 'development'
        ? 'http://localhost:5000'
        : 'https://trabalho-pratico-fgqh.onrender.com';

    useEffect(() => {
        fetchComunidades();
        fetchUsuario();
    }, []);

    const fetchComunidades = async () => {
        try {
            const res = await fetch(`${URL_BACKEND}/api/comunidades`);
            const data = await res.json();
            setCards(data);
        } catch (error) {
            console.error("Erro ao buscar comunidades:", error);
        }
    };

    const fetchUsuario = async () => {
        try {
            const res = await fetch(`${URL_BACKEND}/api/users/me`, { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                const ids = data.comunidades ? data.comunidades.map(c => c._id || c) : [];
                setComunidadesDoUsuario(ids);
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    };

    const handleCriarComunidade = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${URL_BACKEND}/api/comunidades`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(novaComunidade)
            });

            if (res.ok) {
                const data = await res.json();
                alert('Comunidade criada com sucesso!');
                setCards([data, ...cards]);
                setComunidadesDoUsuario([...comunidadesDoUsuario, data._id]);
                setShowModal(false);
                setNovaComunidade({ nome: '', descricao: '' });
            } else {
                const error = await res.json();
                alert(error.message || 'Erro ao criar comunidade');
            }
        } catch (error) {
            console.error('Erro ao criar comunidade:', error);
            alert('Erro ao criar comunidade');
        }
    };

    const handleSolicitarEntrada = async (id) => {
        try {
            const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}/solicitar`, {
                method: 'POST',
                credentials: 'include'
            });

            if (res.ok) {
                alert('Solicitação enviada! Aguarde aprovação do admin.');
            } else {
                const error = await res.json();
                alert(error.message || 'Erro ao solicitar entrada');
            }
        } catch (error) {
            console.error('Erro ao solicitar entrada na comunidade:', error);
            alert('Erro ao solicitar entrada na comunidade');
        }
    };

    // const handleEntrar = async (id) => {
    //     try {
    //         const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}/entrar`, {
    //             method: 'POST',
    //             credentials: 'include'
    //         });

    //         if (res.ok) {
    //             setComunidadesDoUsuario(prev => [...prev, id]);
    //             alert('Você entrou na comunidade!');
    //         } else {
    //             const text = await res.text();
    //             console.error('Falha ao entrar na comunidade', res.status, text);
    //         }
    //     } catch (error) {
    //         console.error('Erro ao entrar na comunidade:', error);
    //         alert('Erro ao entrar na comunidade');
    //     }
    // };

    // Redireciona para a outra tela
    const handleAcessar = (id) => {
        navigate(`/comunidade/${id}`);
    };

    return (
        <div className={styles.main}>
            <div className={styles.secao}>
                <div className={styles.headerComunidades}>
                    <h1 className={styles.titulo}>Comunidades</h1>
                    <button 
                        className={styles.botaoCriar}
                        onClick={() => setShowModal(true)}
                    >
                        <Plus size={20} />
                        Criar Comunidade
                    </button>
                </div>
            </div>

            <div className={`${styles.secao} ${styles.lista}`}>
                {cards.map((comunidade) => {
                    const ehMembro = comunidadesDoUsuario.includes(comunidade._id);
                    
                    return (
                        <div className={styles.card} key={comunidade._id}>
                            <h1>{comunidade.nome}</h1>
                            <p>{comunidade.descricao}</p>

                            {ehMembro ? (
                                <button 
                                    className={`${styles.submit} ${styles.botaoAcessar}`} 
                                    onClick={() => handleAcessar(comunidade._id)}
                                >
                                    Acessar comunidade
                                </button>
                            ) : (
                                <button 
                                    className={`${styles.submit} ${styles.botaoEntrar}`} 
                                    onClick={() => handleSolicitarEntrada(comunidade._id)}
                                >
                                    Solicitar Entrada
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <ModalCriarComunidade
                show={showModal}
                setShow={setShowModal}
                comunidade={novaComunidade}
                setComunidade={setNovaComunidade}
                handleCriar={handleCriarComunidade}
            />
        </div>
    );
}