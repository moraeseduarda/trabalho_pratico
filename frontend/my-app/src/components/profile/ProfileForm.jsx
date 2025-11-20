import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "../../styles/profile_form.module.css";

export default function ProfileForm({ userData }) {
  const [nome, setNome] = useState(userData?.nome || "");
  const [username, setUsername] = useState(userData?.username || "");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sobre, setSobre] = useState("");
  const [generosFavoritos, setGenerosFavoritos] = useState("");
  const [idiomaPreferencia, setIdiomaPreferencia] = useState("");
  const [metaAnual, setMetaAnual] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para salvar alterações
    console.log("Salvando alterações...");
  };

  const handleCancel = () => {
    // Resetar formulário ou voltar
    console.log("Cancelando...");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Informações do Perfil</h1>
        <p className={styles.subtitle}>
          Atualize seus dados pessoais e suas preferências de leitura
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
          
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Nome Completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <input
                type="date"
                placeholder="04 / 08 / 1993"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sobre Você</h2>
          <textarea
            placeholder="Conte aos outros mais sobre você e suas jornadas com a leitura"
            value={sobre}
            onChange={(e) => setSobre(e.target.value)}
            className={styles.textarea}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Preferências de Leitura</h2>
          
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <select
                value={generosFavoritos}
                onChange={(e) => setGenerosFavoritos(e.target.value)}
                className={styles.select}
              >
                <option value="">Gêneros Favoritos</option>
                <option value="ficcao">Ficção</option>
                <option value="romance">Romance</option>
                <option value="fantasia">Fantasia</option>
                <option value="terror">Terror</option>
              </select>
            </div>
            
            <div className={styles.inputGroup}>
              <select
                value={idiomaPreferencia}
                onChange={(e) => setIdiomaPreferencia(e.target.value)}
                className={styles.select}
              >
                <option value="">Idioma de Preferência</option>
                <option value="portugues">Português</option>
                <option value="ingles">Inglês</option>
                <option value="espanhol">Espanhol</option>
              </select>
            </div>
            
            <div className={styles.inputGroup}>
              <select
                value={metaAnual}
                onChange={(e) => setMetaAnual(e.target.value)}
                className={styles.select}
              >
                <option value="">Meta Anual</option>
                <option value="10">10 livros</option>
                <option value="20">20 livros</option>
                <option value="30">30 livros</option>
              </select>
            </div>
          </div>
        </section>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.saveButton}>
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}