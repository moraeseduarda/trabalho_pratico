import HeaderComponent from "../components/header/header";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <>
      <HeaderComponent />
      <div className={styles.secao}>
        <div className={styles.card}>
          <h1 className={styles.titulo}>Bem-vindo(a) à sua estante de livros!</h1>
          <p className={styles.subtitulo}>Aqui você pode explorar sua coleção de livros, adicionar amigos e acompanhar as leituras deles.</p>
        </div>
      </div>
    </>
  );
}

