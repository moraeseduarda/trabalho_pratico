import { useNavigate } from "react-router-dom";
import styles from "../styles/comunidades.module.css";
import { useState } from "react";

// Dados fixos (Hardcoded)
const comunidadesLiterarias = [
  	{ id: 1, nome: "Ficção Científica & Cyberpunk", descricao: "Para amantes de distopias e robôs." },
  	{ id: 2, nome: "Clube dos Clássicos Brasileiros", descricao: "Leitura de Machado e Clarice." },
  	{ id: 3, nome: "Mistério e Crime Real", descricao: "Debates sobre thrillers e true crime." },
  	{ id: 4, nome: "Fantasia Medieval", descricao: "Dragões, magia e Tolkien." },
];

export default function Comunidades({cards = comunidadesLiterarias} ) {
	const navigate = useNavigate();

    // Simula que o usuário já participa da comunidade ID 2
    const [comunidadesDoUsuario, setComunidadesDoUsuario] = useState([2]); 

    // Apenas atualiza o array local
    const handleEntrar = (id) => {
        setComunidadesDoUsuario([...comunidadesDoUsuario, id]);
    };

    const handleSair = (id) => {
        setComunidadesDoUsuario(comunidadesDoUsuario.filter((item) => item !== id));
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
                    const ehMembro = comunidadesDoUsuario.includes(comunidade.id)
                  return(
                    <div className={styles.card} key={comunidade.id}>
                        <h1>{comunidade.nome}</h1>
                        <p>{comunidade.descricao}</p>

						{ehMembro ? (
                            <>
								{/* Se já participa */}
								<button className={`${styles.submit} ${styles.botaoAcessar}`} onClick={() => handleAcessar(comunidade.id)}>Acessar comunidade</button>

							</>

						) : (
							<>
								{/* Se não participa */}
								<button className={`${styles.submit} ${styles.botaoEntrar}`} onClick={() => handleEntrar(comunidade.id)}>Entrar</button>
							</>
						)}

                    </div>
                  )
                })}
            </div>
        </div>
    );
}