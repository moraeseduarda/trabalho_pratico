import './StatusBadge.css';

function StatusBadge({ status }) {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'lendo':
        return { label: '📖 Lendo', cor: '#3498db' };
      case 'quero_ler':
        return { label: '🔖 Quero Ler', cor: '#f39c12' };
      case 'lido':
        return { label: '✅ Lido', cor: '#27ae60' };
      default:
        return { label: status, cor: '#666' };
    }
  };

  const { label, cor } = getStatusInfo(status);

  return (
    <div 
      className="status-badge" 
      style={{ backgroundColor: cor }}
    >
      {label}
    </div>
  );
}

export default StatusBadge;