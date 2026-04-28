import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useAgente } from '../hooks/useAgentes';
import { agentesService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants';
import { useValorantImage } from '../hooks/useValorantImage';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ConfirmModal from '../components/common/ConfirmModal';

const Campo = ({ label, valor }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aba9a5' }}>{label}</span>
    <span style={{ fontSize: '15px', color: '#ece8e1' }}>{valor}</span>
  </div>
);

const AgenteDetalle = () => {
  const { id }              = useParams();
  const navigate            = useNavigate();
  const { isAuthenticated } = useAuth();
  const { agente, loading, error, refetch } = useAgente(id);
  const imgSrc  = useValorantImage(agente, 'full');
  const { toast } = useToast();
  const [showConfirmEliminar, setShowConfirmEliminar] = useState(false);
  const [showConfirmToggle,   setShowConfirmToggle]   = useState(false);

  if (loading) return <Loader texto="Cargando agente" />;
  if (error)   return <div style={{ color: '#ff4655', padding: '40px', textAlign: 'center' }}>{error}</div>;
  if (!agente) return null;

  const color    = ROLES[agente.rol]?.color || '#ff4655';
  const inactivo = !agente.activo;

  const handleEliminar = async () => {
    try {
      await agentesService.eliminar(agente.id);
      toast(`${agente.nombre} eliminado`, 'success');
      navigate('/agentes');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleToggleActivo = async () => {
    try {
      await agentesService.actualizar(agente.id, { activo: !agente.activo });
      toast(agente.activo ? `${agente.nombre} desactivado` : `${agente.nombre} activado`, 'success');
      setShowConfirmToggle(false);
      refetch();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
      <ConfirmModal
        isOpen={showConfirmEliminar}
        title="Eliminar agente"
        message={`¿Estás seguro que querés eliminar a ${agente.nombre}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        onConfirm={handleEliminar}
        onCancel={() => setShowConfirmEliminar(false)}
      />
      <ConfirmModal
        isOpen={showConfirmToggle}
        title={inactivo ? 'Activar agente' : 'Desactivar agente'}
        message={
          inactivo
            ? `¿Querés volver a activar a ${agente.nombre}? Volverá a aparecer en la lista principal.`
            : `¿Querés desactivar a ${agente.nombre}? Va a dejar de aparecer en la lista principal y se podrá reactivar después.`
        }
        confirmText={inactivo ? 'Activar' : 'Desactivar'}
        variant={inactivo ? 'default' : 'danger'}
        onConfirm={handleToggleActivo}
        onCancel={() => setShowConfirmToggle(false)}
      />

      <button onClick={() => navigate('/agentes')} style={{
        background: 'none', border: 'none', color: '#aba9a5', cursor: 'pointer',
        fontSize: '13px', letterSpacing: '1px', marginBottom: '24px', padding: 0,
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        ← Volver
      </button>

      <div style={{
        background: '#1a2332',
        border: '1px solid #2a3441',
        borderTop: `3px solid ${color}`,
        borderRadius: '2px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: imgSrc ? '280px 1fr' : '1fr',
        filter: inactivo ? 'grayscale(60%)' : 'none',
      }}>
        {/* Columna imagen */}
        {imgSrc && (
          <div style={{
            background: `radial-gradient(ellipse at 50% 90%, ${color}30 0%, #0f1923 70%)`,
            borderRight: `1px solid #2a3441`,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            minHeight: '380px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src={imgSrc}
              alt={agente.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', position: 'absolute', bottom: 0 }}
            />
          </div>
        )}

        {/* Columna info */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ margin: '0 0 10px', fontSize: '28px', fontWeight: 900, letterSpacing: '3px', color: '#ece8e1' }}>
                {agente.nombre.toUpperCase()}
              </h1>
              <Badge rol={agente.rol} />
            </div>
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
              color: agente.activo ? '#4ba56e' : '#aba9a5',
              background: agente.activo ? 'rgba(75,165,110,0.15)' : 'rgba(170,169,165,0.1)',
              padding: '4px 10px', borderRadius: '2px', alignSelf: 'flex-start',
            }}>
              {agente.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Campo label="País de origen"      valor={agente.pais_origen} />
            <Campo label="Habilidad Ultimate"  valor={agente.habilidad_ultimate} />
          </div>

          <Campo label="Descripción" valor={agente.descripcion} />

          {agente.creadoPor && (
            <div style={{ borderTop: '1px solid #2a3441', paddingTop: '20px' }}>
              <Campo label="Registrado por" valor={`${agente.creadoPor.nombre} (${agente.creadoPor.email})`} />
            </div>
          )}

          {isAuthenticated && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
              {!inactivo && (
                <Button onClick={() => navigate(`/agentes/${agente.id}/editar`)}>Editar</Button>
              )}
              <Button
                variant="ghost"
                onClick={() => setShowConfirmToggle(true)}
                style={inactivo
                  ? { borderColor: '#4ba56e40', color: '#4ba56e' }
                  : { borderColor: '#d4a84340', color: '#d4a843' }
                }
              >
                {inactivo ? 'Activar' : 'Desactivar'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowConfirmEliminar(true)}
                style={{ borderColor: '#ff455540', color: '#ff4655' }}
              >
                Eliminar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgenteDetalle;
