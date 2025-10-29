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
                         />

                    </form>
                </div>

            </section>
        </main>


    )
}

export default SignUp;