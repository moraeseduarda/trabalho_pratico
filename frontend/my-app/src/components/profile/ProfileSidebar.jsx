import styles from '../../styles/profile_sidebar.module.css'
import profileImage from '../../assets/images/cebolinha-pfp.jpg';

export default function ProfileSidebar({ userData}) {
    return (
        <div className={styles.sidebar}>
            <div className={styles.avatarContainer}>
                <div className={styles.image}>
                    <img src={profileImage} alt="Foto de perfil" />
                </div>
                <h2 className={styles.username}>{userData?.nome || "Cebolinha"}</h2>
            </div>

            <div className={styles.stats}>
                <div className={styles.statItem}> {/*styles.statItem*/}
                    <span className={styles.statLabel}>Livros lidos</span> {/*styles.statLabel*/}
                    <span className={styles.statValue}>32</span> {/*styles.statValue*/}
                </div>
                
                <div className={styles.statItem}> {/*styles.statItem*/}
                    <span className={styles.statLabel}>Lendo atualmente</span> {/*styles.statLabel*/}
                    <span className={styles.statValue}>2</span> {/*styles.statValue*/}
                </div>
                
                <div className={styles.statItem}> {/*styles.statItem*/}
                    <span className={styles.statLabel}>Favoritos</span> {/*styles.statLabel*/}
                    <span className={styles.statValue}>8</span> {/*styles.statValue*/}
                </div>
            </div>
        </div>
    );
}