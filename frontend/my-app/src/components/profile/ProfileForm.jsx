import { useEffect, useState } from "react";
import { Link2, Eye, EyeOff } from "lucide-react";
import styles from "../../styles/profile_form.module.css";

export default function ProfileForm({ userData, onUpdate }) {
  const [nome, setNome] = useState(userData?.nome || "");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState(userData?.email || "");
  const [fotoPerfil, setFotoPerfil] = useState(userData?.fotoPerfil || "");
  const [sobre, setSobre] = useState("");
  const [generosFavoritos, setGenerosFavoritos] = useState("");
  const [idiomaPreferencia, setIdiomaPreferencia] = useState("");
  const [metaAnual, setMetaAnual] = useState("");
  
  // Estados para senha
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userData) {
      setNome(userData.nome || "");
      setEmail(userData.email || "");
      setFotoPerfil(userData.fotoPerfil || "");
      setDataNascimento(
        userData.dataNascimento
          ? new Date(userData.dataNascimento).toISOString().split("T")[0]
          : ""
      );
      setSobre(userData.sobre || "");
      setGenerosFavoritos(userData.generosFavoritos?.[0] || "");
      setIdiomaPreferencia(userData.idiomaPreferencia || "");
      setMetaAnual(userData.metaAnual?.toString() || "");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validação de senha
    if (novaSenha || senhaAtual || confirmarSenha) {
      if (!senhaAtual) {
        setMessage("Senha atual é obrigatória para alterar a senha");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      if (novaSenha !== confirmarSenha) {
        setMessage("Nova senha e confirmação não coincidem");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      if (novaSenha.length < 6) {
        setMessage("Nova senha deve ter no mínimo 6 caracteres");
        setTimeout(() => setMessage(""), 3000);
        return;
      }
    }

    const result = await onUpdate({
      nome,
      email,
      fotoPerfil,
      dataNascimento,
      sobre,
      generosFavoritos,
      idiomaPreferencia,
      metaAnual: parseInt(metaAnual),
      senhaAtual: senhaAtual || undefined,
      novaSenha: novaSenha || undefined
    });

    setMessage(result.message);
    
    // Limpa campos de senha após sucesso
    if (result.message.includes('sucesso')) {
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    }
    
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancel = () => {
    // Resetar para valores originais
    if (userData) {
      setNome(userData.nome || "");
      setEmail(userData.email || "");
      setFotoPerfil(userData.fotoPerfil || "");
      setDataNascimento(userData.dataNascimento ? userData.dataNascimento.split('T')[0] : "");
      setSobre(userData.sobre || "");
      setGenerosFavoritos(userData.generosFavoritos?.[0] || "");
      setIdiomaPreferencia(userData.idiomaPreferencia || "");
      setMetaAnual(userData.metaAnual?.toString() || "");
      
      // Limpa senhas
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    }
    setMessage("Alterações canceladas");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Informações do Perfil</h1>
        <p className={styles.subtitle}>
          Atualize seus dados pessoais e suas preferências de leitura
        </p>
        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <input
                type="date"
                placeholder="Data de Nascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <div className={styles.urlWrapper}>
                <Link2 size={20} className={styles.linkIcon} />
                <input
                  type="url"
                  placeholder="URL da Foto de Perfil (ex: https://...)"
                  value={fotoPerfil}
                  onChange={(e) => setFotoPerfil(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ADICIONE: Seção de Segurança */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Segurança</h2>
          <p className={styles.sectionSubtitle}>
            Deixe em branco se não quiser alterar a senha
          </p>
          
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={mostrarSenhaAtual ? "text" : "password"}
                  placeholder="Senha Atual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                  className={styles.eyeButton}
                >
                  {mostrarSenhaAtual ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={mostrarNovaSenha ? "text" : "password"}
                  placeholder="Nova Senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                  className={styles.eyeButton}
                >
                  {mostrarNovaSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  placeholder="Confirmar Nova Senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  className={styles.eyeButton}
                >
                  {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
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