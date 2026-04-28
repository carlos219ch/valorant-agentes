import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgentes } from '../hooks/useAgentes';
import { agentesService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import AgentCard from '../components/AgentCard';
import SkeletonCard from '../components/common/SkeletonCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ConfirmModal from '../components/common/ConfirmModal';
import StatsBar from '../components/StatsBar';
import { ROLES_OPTIONS } from '../constants';

const ROLES_FILTRO = [{ value: '', label: 'Todos los roles' }, ...ROLES_OPTIONS];

const SORT_OPTIONS = [
  { value: 'createdAt|DESC', label: 'Más reciente' },
  { value: 'createdAt|ASC',  label: 'Más antiguo'  },
  { value: 'nombre|ASC',     label: 'Nombre A-Z'   },
  { value: 'nombre|DESC',    label: 'Nombre Z-A'   },
  { value: 'rol|ASC',        label: 'Por rol'       },
];

const selectStyle = {
  background: '#0f1923', border: '1px solid #2a3441', color: '#ece8e1',
  padding: '10px 14px', borderRadius: '2px', fontSize: '14px',
  fontFamily: 'inherit', cursor: 'pointer',
};

const TabBtn = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none',
    borderBottom: `2px solid ${active ? '#ff4655' : 'transparent'}`,
    color: active ? '#ece8e1' : '#aba9a5',
    fontFamily: 'inherit', fontWeight: 700, fontSize: '12px',
    letterSpacing: '2px', textTransform: 'uppercase',
    padding: '6px 0', cursor: 'pointer',
    transition: 'color 0.15s, border-color 0.15s',
  }}>
    {children}
  </button>
);

const Agentes = () => {
  const [busqueda, setBusqueda]           = useState('');
  const [rol, setRol]                     = useState('');
  const [sort, setSort]                   = useState('createdAt|DESC');
  const [pagina, setPagina]               = useState(1);
  const [inactivos, setInactivos]         = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const { isAuthenticated }               = useAuth();
  const { toast }                         = useToast();
  const navigate                          = useNavigate();

  const [orderBy, orderDir] = sort.split('|');

  const params = [
    busqueda && `nombre=${busqueda}`,
    !inactivos && rol && `rol=${rol}`,
    inactivos && `inactivos=true`,
    `orderBy=${orderBy}`,
    `orderDir=${orderDir}`,
    `page=${pagina}`,
    `limit=9`,
  ].filter(Boolean).join('&');

  const { agentes, total, totalPaginas, loading, error, refetch } = useAgentes(params);

  const handleEliminar = (agente) => setPendingDelete(agente);

  const confirmarEliminar = async () => {
    const nombre = pendingDelete.nombre;
    setPendingDelete(null);
    try {
      await agentesService.eliminar(pendingDelete.id);
      toast(`${nombre} eliminado correctamente`, 'success');
      refetch();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleReactivar = async (agente) => {
    try {
      await agentesService.actualizar(agente.id, { activo: true });
      toast(`${agente.nombre} reactivado`, 'success');
      refetch();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleTab = (esInactivos) => {
    setInactivos(esInactivos);
    setRol('');
    setPagina(1);
  };

  const handleBusqueda = e => { setBusqueda(e.target.value); setPagina(1); };
  const handleRol      = e => { setRol(e.target.value);      setPagina(1); };
  const handleSort     = e => { setSort(e.target.value);     setPagina(1); };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 900, letterSpacing: '3px', color: '#ece8e1' }}>AGENTES</h1>
          <p style={{ margin: 0, color: '#aba9a5', fontSize: '13px' }}>{total} agentes {inactivos ? 'inactivos' : 'registrados'}</p>
        </div>
        {isAuthenticated && !inactivos && (
          <Button onClick={() => navigate('/agentes/nuevo')}>+ Nuevo Agente</Button>
        )}
      </div>

      {/* Stats */}
      <StatsBar />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', borderBottom: '1px solid #2a3441' }}>
        <TabBtn active={!inactivos} onClick={() => handleTab(false)}>Activos</TabBtn>
        <TabBtn active={inactivos}  onClick={() => handleTab(true)}>Inactivos</TabBtn>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <Input placeholder="Buscar por nombre..." value={busqueda} onChange={handleBusqueda} />
        </div>
        {!inactivos && (
          <select value={rol} onChange={handleRol} style={selectStyle}>
            {ROLES_FILTRO.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        )}
        <select value={sort} onChange={handleSort} style={selectStyle}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Contenido */}
      {error && (
        <div style={{ background: 'rgba(255,70,85,0.1)', border: '1px solid #ff455540', padding: '20px', borderRadius: '2px', color: '#ff4655', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {!loading && !error && agentes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#aba9a5' }}>
          <p style={{ fontSize: '16px' }}>{inactivos ? 'No hay agentes inactivos.' : 'No se encontraron agentes.'}</p>
          {isAuthenticated && !inactivos && <Button onClick={() => navigate('/agentes/nuevo')}>Crear el primero</Button>}
        </div>
      )}

      {!loading && agentes.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {agentes.map(a => (
            <AgentCard key={a.id} agente={a} onEliminar={handleEliminar} onReactivar={handleReactivar} />
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px', alignItems: 'center' }}>
          <Button variant="ghost" onClick={() => setPagina(p => p - 1)} disabled={pagina === 1} style={{ padding: '8px 16px' }}>←</Button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPagina(p)} style={{
              width: '36px', height: '36px', border: `1px solid ${p === pagina ? '#ff4655' : '#2a3441'}`,
              background: p === pagina ? '#ff4655' : 'transparent', color: p === pagina ? '#fff' : '#aba9a5',
              cursor: 'pointer', borderRadius: '2px', fontFamily: 'inherit', fontWeight: 700,
            }}>{p}</button>
          ))}
          <Button variant="ghost" onClick={() => setPagina(p => p + 1)} disabled={pagina === totalPaginas} style={{ padding: '8px 16px' }}>→</Button>
        </div>
      )}

      <ConfirmModal
        isOpen={!!pendingDelete}
        title="Eliminar agente"
        message={`¿Estás seguro que querés eliminar a ${pendingDelete?.nombre}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        onConfirm={confirmarEliminar}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default Agentes;
