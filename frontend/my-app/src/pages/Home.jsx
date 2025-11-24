import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.secao}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>Bem-vindo(a) à sua estante de livros!</h1>
        <p className={styles.subtitulo}>Organize sua biblioteca, adicione novas leituras, entre em comunidades e interaja em discussões.</p>
      </div>
    </div>
  );
}

