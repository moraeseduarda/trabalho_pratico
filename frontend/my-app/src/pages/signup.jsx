import React from 'react';
import styles from './signin.module.css';
import peopleReadingImg from '../assets/images/people-reading.png';

function SignUp(){
    return(
        <main className={styles.page}>
            <section className={styles.card}>
                <div className={styles.formArea}>
                    <h1 className={styles.heading}>Comece já!</h1>
                    <p className={styles.subheading}>Faça parte da nossa comunidade de leitores!</p>
                    <form className={styles.form}>
                        <label className={styles.label} htmlFor='nome'>Nome</label>
                        <input
                            className = {styles.input}
                            id = "nome"
                            type = "nome"
                            placeholder = "Seu nome completo"  
                        />
                        <label className = {styles.label} htmlFor='email'>
                            Email
                        </label>
                        <input
                        className={styles.input} 
                        id = "email"
                        type = "email"
                        placeholder='Seu E-Mail'
                         />
                        <label className = {styles.label} htmlFor='senha'>Senha</label>
                         <input className = {styles.input}
                         id = "senha"
                         type = "senha"
                         placeholder = "Defina sua senha"
                         />
                         <button className={styles.submit} type = "submit">Cadastre-se!</button>
                         <p className={styles.cta}>Já tem conta? <a href="/signin">Faça Login</a></p>
                    </form>
                </div>
                <div className = {styles.imageArea}>
                    <img 
                    src={peopleReadingImg} 
                    alt="" 
                    className = {styles.illustration}/>
                </div>
            </section>
        </main>


    )
}

export default SignUp;