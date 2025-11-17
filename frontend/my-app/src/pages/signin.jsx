import styles from '../styles/sign_in_up.module.css'
import bookshelfImg from '../assets/images/login-page-bookshelf.png';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Login({setIsAuthenticated}) {
  //Inicializando os elementos do formulário de login
      const [email,setEmail] = useState('')
      const [password,setPassword] = useState('')

      const navigate = useNavigate();

      //requisição para o backend
      const handleSubmit = async (event) => {
          event.preventDefault();

          try{
              const response = await fetch('http://localhost:5000/api/users/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
              // Enviar cookie para backend
              credentials: 'include',
          });
  
            const data = await response.json();
            if (response.ok) {
              alert('Login realizado com sucesso!')
              setIsAuthenticated(true);
              navigate("/");

            } 
            else {
              alert('Usuário ou senha incorretos.')
            }
          }
          catch(error){
              alert('Ocorreu um erro')
          }
      }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.formArea}>
          <h1 className={styles.heading}>Bem-Vindo de Volta!</h1>
          <p className={styles.subheading}>
            Faça login e acesse sua biblioteca.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />

            <label className={styles.label} htmlFor="password">
              Senha
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
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