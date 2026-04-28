import { useNavigate } from 'react-router-dom';
import Badge from './common/Badge';
import Button from './common/Button';
import { ROLES } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useValorantImage } from '../hooks/useValorantImage';

const AgentCard = ({ agente, onEliminar, onReactivar }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const color  = ROLES[agente.rol]?.color || '#ff4655';
  const imgSrc = useValorantImage(agente, 'bust');
  const inactivo = !agente.activo;

  return (
    <div
      style={{
        background: '#1a2332',
        border: '1px solid #2a3441',
        borderRadius: '2px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        filter: inactivo ? 'grayscale(100%)' : 'none',
        opacity: inactivo ? 0.65 : 1,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = inactivo ? '0 12px 32px rgba(0,0,0,0.3)' : `0 12px 32px ${color}35`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Imagen */}
      <div style={{
        position: 'relative',
        height: '270px',
        background: `radial-gradient(ellipse at 60% 80%, ${color}25 0%, #0f1923 70%)`,
        borderBottom: `2px solid ${color}40`,
        overflow: 'hidden',
      }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={agente.nombre}
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom' }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              border: `2px solid ${color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', color: `${color}60`,
            }}>?</div>
            <span style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#2a3441', textTransform: 'uppercase' }}>Sin imagen</span>
          </div>
        )}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <Badge rol={agente.rol} />
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to top, #1a2332, transparent)',
        }} />
      </div>

      {/* Info */}
      <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 900, color: '#ece8e1', letterSpacing: '2px' }}>
          {agente.nombre.toUpperCase()}
        </h3>

        <p style={{ margin: 0, fontSize: '13px', color: '#aba9a5', lineHeight: '1.6', flexGrow: 1 }}>
          {agente.descripcion.length > 80 ? agente.descripcion.slice(0, 80) + '...' : agente.descripcion}
        </p>

        <div style={{ fontSize: '12px', color: '#aba9a5' }}>
          🌍 {agente.pais_origen}
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <Button
            variant="ghost"
            style={{ flex: 1, padding: '7px 0', fontSize: '11px' }}
            onClick={() => navigate(`/agentes/${agente.id}`)}
          >
            Ver
          </Button>
          {isAuthenticated && !inactivo && (
            <Button
              variant="ghost"
              style={{ flex: 1, padding: '7px 0', fontSize: '11px' }}
              onClick={() => navigate(`/agentes/${agente.id}/editar`)}
            >
              Editar
            </Button>
          )}
          {isAuthenticated && inactivo && (
            <Button
              variant="ghost"
              style={{ flex: 1, padding: '7px 0', fontSize: '11px', borderColor: '#4ba56e40', color: '#4ba56e' }}
              onClick={() => onReactivar(agente)}
            >
              Reactivar
            </Button>
          )}
          {isAuthenticated && (
            <Button
              variant="danger"
              style={{ flex: 1, padding: '7px 0', fontSize: '11px' }}
              onClick={() => onEliminar(agente)}
            >
              Eliminar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
