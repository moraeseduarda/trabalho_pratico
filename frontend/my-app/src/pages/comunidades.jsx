import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/comunidades.module.css";

export default function Comunidades() {
	const navigate = useNavigate();
    const [cards, setCards] = useState([]);

    // Lembrar de mudar URL, para url backend do deploy
    // const URL_BACKEND = 'https://trabalho-pratico-fgqh.onrender.com';
    const URL_BACKEND = 'http://localhost:5000';

    const [comunidadesDoUsuario, setComunidadesDoUsuario] = useState([]);

    useEffect(() => {
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
                } else {
                    setComunidadesDoUsuario([]);
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchComunidades();
        fetchUsuario();
    }, []);


    const handleEntrar = async (id) => {
        try {
            const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}/entrar`, {
                method: 'POST',
                credentials: 'include'
            });

            if (res.ok) {
                setComunidadesDoUsuario(prev => [...prev, id]);
                alert('Você entrou na comunidade!');
            } else {
                const text = await res.text();
                console.error('Falha ao entrar na comunidade', res.status, text);
            }
        } catch (error) {
            console.error('Erro ao entrar na comunidade:', error);
            alert('Erro ao entrar na comunidade');
        }
    };

    // Redireciona para a outra tela
    const handleAcessar = (id) => {
        navigate(`/comunidade/${id}`);
    };

    return (
        <div className={styles.main}>

            <div className={styles.secao}>
                <h1 className={styles.titulo}>Comunidades</h1>
            </div>

            <div className={`${styles.secao} ${styles.lista}`}>
                {cards.map((comunidade) => {
                    // Verifica se o id da comunidade atual está na lista do usuário
                    const ehMembro = comunidadesDoUsuario.includes(comunidade._id)
                  return(
                    <div className={styles.card} key={comunidade._id}>
                        <h1>{comunidade.nome}</h1>
                        <p>{comunidade.descricao}</p>

						{ehMembro ? (
                            <>
								{/* Se já participa */}
								<button className={`${styles.submit} ${styles.botaoAcessar}`} onClick={() => handleAcessar(comunidade._id)}>Acessar comunidade</button>

							</>

						) : (
							<>
								{/* Se não participa */}
								<button className={`${styles.submit} ${styles.botaoEntrar}`} onClick={() => handleEntrar(comunidade._id)}>Entrar</button>
							</>
						)}

                    </div>
                  )
                })}
            </div>
        </div>
    );
}