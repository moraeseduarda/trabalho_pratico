import React from 'react';
import styles from './login.module.css';

function Login() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
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
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;