import { X } from 'lucide-react';
import styles from '../styles/ModalPostagem.module.css'; // Reuse os estilos

export default function ModalCriarComunidade({ show, setShow, comunidade, setComunidade, handleCriar }) {
  if (!show) return null;

  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.titulo}>Criar Nova Comunidade</h2>
          <button className={styles.botaoFechar} onClick={() => setShow(false)}>
            <X />
          </button>
        </div>

        <form onSubmit={handleCriar}>
          {/* Nome */}
          <div className={styles.grupoFormulario}>
            <label className={styles.label}>Nome da Comunidade</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ex: Amantes de Ficção Científica"
              value={comunidade.nome}
              onChange={(e) => setComunidade({ ...comunidade, nome: e.target.value })}
              required
            />
          </div>

          {/* Descrição */}
          <div className={styles.grupoFormulario}>
            <label className={styles.label}>Descrição</label>
            <textarea
              className={styles.textarea}
              rows="4"
              placeholder="Descreva sobre o que é a comunidade..."
              value={comunidade.descricao}
              onChange={(e) => setComunidade({ ...comunidade, descricao: e.target.value })}
              required
            />
          </div>

          {/* Botões */}
          <div className={styles.botoes}>
            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={() => setShow(false)}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.botaoSubmit}>
              Criar Comunidade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}