import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import styles from '../styles/gerenciar_comunidade.module.css';

export default function GerenciarComunidade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comunidade, setComunidade] = useState(null);
  const [loading, setLoading] = useState(true);

  const URL_BACKEND =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000'
      : 'https://trabalho-pratico-fgqh.onrender.com';

  useEffect(() => {
    fetchComunidade();
  }, [id]);

  const fetchComunidade = async () => {
    try {
      const res = await fetch(`${URL_BACKEND}/api/comunidades/${id}`, {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setComunidade(data);
      }
    } catch (error) {
      console.error('Erro ao buscar comunidade:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAprovar = async (usuarioId) => {
    try {
      const res = await fetch(
        `${URL_BACKEND}/api/comunidades/${id}/aprovar/${usuarioId}`,
        {
          method: 'POST',
          credentials: 'include'
        }
      );

      if (res.ok) {
        alert('Solicitação aprovada!');
        fetchComunidade(); // Atualiza a lista
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Erro ao aprovar:', error);
    }
  };

  const handleRejeitar = async (usuarioId) => {
    try {
      const res = await fetch(
        `${URL_BACKEND}/api/comunidades/${id}/rejeitar/${usuarioId}`,
        {
          method: 'POST',
          credentials: 'include'
        }
      );

      if (res.ok) {
        alert('Solicitação rejeitada');
        fetchComunidade();
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Erro ao rejeitar:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <button className={styles.botaoVoltar} onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1>Gerenciar: {comunidade?.nome}</h1>
      </header>

      <div className={styles.container}>
        <section className={styles.secao}>
          <h2>Solicitações Pendentes ({comunidade?.solicitacoesPendentes?.length || 0})</h2>
          
          {comunidade?.solicitacoesPendentes?.length === 0 ? (
            <p className={styles.semDados}>Nenhuma solicitação pendente</p>
          ) : (
            <div className={styles.lista}>
              {comunidade?.solicitacoesPendentes?.map((usuario) => (
                <div key={usuario._id} className={styles.itemSolicitacao}>
                  <div>
                    <p className={styles.nomeUsuario}>{usuario.nome}</p>
                    <p className={styles.emailUsuario}>{usuario.email}</p>
                  </div>
                  <div className={styles.acoes}>
                    <button
                      className={styles.botaoAprovar}
                      onClick={() => handleAprovar(usuario._id)}
                    >
                      <Check size={18} />
                      Aprovar
                    </button>
                    <button
                      className={styles.botaoRejeitar}
                      onClick={() => handleRejeitar(usuario._id)}
                    >
                      <X size={18} />
                      Rejeitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.secao}>
          <h2>Membros ({comunidade?.membros?.length || 0})</h2>
          <div className={styles.lista}>
            {comunidade?.membros?.map((membro) => (
              <div key={membro._id} className={styles.itemMembro}>
                <div>
                  <p className={styles.nomeUsuario}>{membro.nome}</p>
                  <p className={styles.emailUsuario}>{membro.email}</p>
                </div>
                {comunidade?.admin?.some(a => a._id === membro._id) && (
                  <span className={styles.badgeAdmin}>Admin</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}