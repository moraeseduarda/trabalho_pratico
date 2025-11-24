import { useMemo } from 'react';
import styles from '../../styles/profile_sidebar.module.css'
import profileImage from '../../assets/images/cebolinha-pfp.jpg';

export default function ProfileSidebar({ userData, biblioteca = [] }) {
    // Calcular estatísticas
    const stats = useMemo(() => {
        const lidos = biblioteca.filter(livro => livro.status === 'lido').length;
        const lendo = biblioteca.filter(livro => livro.status === 'lendo').length;
        const favoritos = biblioteca.filter(livro => livro.favorito === true).length;

        return {
            livrosLidos: lidos,
            lendoAtualmente: lendo,
            favoritos: favoritos
        };
    }, [biblioteca]);
    return (
        <div className={styles.sidebar}>
            <div className={styles.avatarContainer}>
                <div className={styles.image}>
                    <img src={profileImage} alt="Foto de perfil" />
                </div>
                <h2 className={styles.username}>{userData?.nome || "Cebolinha"}</h2>
            </div>

            <div className={styles.stats}>
                <div className={styles.statItem}> 
                    <span className={styles.statLabel}>Livros lidos</span> 
                    <span className={styles.statValue}>{stats.livrosLidos}</span> 
                </div>
                
                <div className={styles.statItem}> 
                    <span className={styles.statLabel}>Lendo atualmente</span> 
                    <span className={styles.statValue}>{stats.lendoAtualmente}</span> 
                </div>
                
                <div className={styles.statItem}> 
                    <span className={styles.statLabel}>Favoritos</span> 
                    <span className={styles.statValue}>{stats.favoritos}</span> 
                </div>
            </div>
        </div>
    );
}