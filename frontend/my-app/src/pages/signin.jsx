import React from 'react';
import styles from './signin.module.css';
import bookshelfImg from '../assets/images/login-page-bookshelf.png';

function Login() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.formArea}>
          <h1 className={styles.heading}>Bem-Vindo de Volta!</h1>
          <p className={styles.subheading}>
            Faça login e acesse sua biblioteca.
          </p>
          <form className={styles.form}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              placeholder="you@example.com"
            />

            <label className={styles.label} htmlFor="password">
              Senha
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              placeholder="Digite sua senha"
            />

            <button className={styles.submit} type="submit">
              Login
            </button>
          </form>
          <p className={styles.cta}>
            Ainda não tem conta?{' '}
            <a className={styles.ctaLink} href="/signup">
              Cadastre-se</a> 
          </p>
        </div>
        <div className={styles.imageArea}>
          <img
            src={bookshelfImg}
            alt="Estante de livros estilizada ao lado de um vaso com planta."
            className={styles.illustration}
          />
        </div>
      </section>
    </main>
  );
}

export default Login;