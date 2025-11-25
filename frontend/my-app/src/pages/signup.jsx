import {useState} from 'react';
import styles from '../styles/sign_in_up.module.css'
import peopleReadingImg from '../assets/images/people-reading.png';
import logo from '../assets/images/bookbox-logo-signin.png';
import { Link } from 'react-router-dom';

function SignUp(){
  
    const URL_BACKEND =
      import.meta.env.MODE === 'development'
        ? 'http://localhost:5000'
        : 'https://trabalho-pratico-fgqh.onrender.com';

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event) => {
      event.preventDefault(); // evita reload da página

    // Validação de preenchimento
    if (!nome || !email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

  try {
    // Envia os dados para o backend
    const response = await fetch(`${URL_BACKEND}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, password }),
      // Enviar cookie para backend
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      alert('Usuário cadastrado com sucesso!');
      console.log('Usuário criado:', data);
    } else {
      alert(data.message || 'Erro ao cadastrar usuário.');
    }
  } catch (error) {
    alert('Erro de conexão com o servidor.');
    console.error('Erro no signup:', error);
  }
};


    return(
        // Reutilizando os componentes de estilo de signin, pois é a mesma identidade visual
        <main className={styles.page}>
            <section className={styles.card}>
                <div className={styles.formArea}>
                    <img src={logo} alt="BookBox" className={styles.logoImage} /> {/* ADICIONE ISSO */}
                    <h1 className={styles.heading}>Comece já!</h1>
                    <p className={styles.subheading}>Faça parte da nossa comunidade de leitores!</p>
                    <form className={styles.form} onSubmit={handleSubmit}> 
                        <label className={styles.label} htmlFor='nome'>Nome</label>
                        <input
                            className = {styles.input}
                            id = "nome"
                            type = "text"
                            placeholder = "Seu nome completo"
                            value = {nome} 
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <label className = {styles.label} htmlFor='email'>Email</label>
                        <input
                            className={styles.input} 
                            id = "email"
                            type = "email"
                            placeholder='seu@email.com'
                            value = {email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <label className = {styles.label} htmlFor='senha'>Senha</label>
                         <input className = {styles.input}
                         id = "senha"
                         type = "password"
                         placeholder = "Defina sua senha"
                         value = {password}
                         onChange={(e)=>setPassword(e.target.value)}
                         />
                         <button className={styles.submit} type = "submit">Cadastre-se!</button>
                         <p className={styles.cta}>Já tem conta? <Link to="/signin">Faça Login</Link></p>
                    </form>
                </div>
                <div className = {styles.imageArea}>
                    <img 
                        src={peopleReadingImg} 
                        alt="Pessoas lendo livros" 
                        className = {styles.illustration}
                    />
                </div>
            </section>
        </main>
    )
}

export default SignUp;