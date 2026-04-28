import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agentesService } from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ConfirmModal from '../components/common/ConfirmModal';
import { useToast } from '../context/ToastContext';
import { ROLES_OPTIONS } from '../constants';

const CAMPOS_VACIOS = { nombre: '', rol: 'duelista', descripcion: '', pais_origen: '', habilidad_ultimate: '', imagen_url: '' };

const AgenteForm = () => {
  const { id }              = useParams();
  const isEditing           = !!id;
  const navigate            = useNavigate();
  const [form, setForm]     = useState(CAMPOS_VACIOS);
  const [loading, setLoading]       = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError]   = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isEditing) return;
    agentesService.obtener(id)
      .then(data => {
        setForm({
          nombre: data.nombre,
          rol: data.rol,
          descripcion: data.descripcion,
          pais_origen: data.pais_origen,
          habilidad_ultimate: data.habilidad_ultimate,
          imagen_url: data.imagen_url || '',
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoadingData(false));
  }, [id, isEditing]);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (isEditing) { setShowConfirm(true); return; }
    guardar();
  };

  const guardar = async () => {
    setShowConfirm(false);
    setError('');
    setLoading(true);
    try {
      if (isEditing) {
        await agentesService.actualizar(id, form);
        toast(`${form.nombre} actualizado correctamente`, 'success');
      } else {
        await agentesService.crear(form);
        toast(`${form.nombre} creado correctamente`, 'success');
      }
      navigate('/agentes');
    } catch (err) {
      setError(err.message);
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <Loader texto="Cargando datos" />;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <ConfirmModal
        isOpen={showConfirm}
        title="Guardar cambios"
        message={`¿Estás seguro que querés guardar los cambios en ${form.nombre}?`}
        confirmText="Guardar"
        variant="default"
        onConfirm={guardar}
        onCancel={() => setShowConfirm(false)}
      />

      <button onClick={() => navigate(-1)} style={{
        background: 'none', border: 'none', color: '#aba9a5', cursor: 'pointer',
        fontSize: '13px', letterSpacing: '1px', marginBottom: '24px', padding: 0,
      }}>
        ← Volver
      </button>

      <div style={{ background: '#1a2332', border: '1px solid #2a3441', borderTop: '3px solid #ff4655', borderRadius: '2px', padding: '32px' }}>
        <h2 style={{ margin: '0 0 28px', fontSize: '14px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#ece8e1' }}>
          {isEditing ? `Editar — ${form.nombre}` : 'Nuevo Agente'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input label="Nombre del agente" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Jett" required />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aba9a5' }}>Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              style={{
                background: '#0f1923', border: '1px solid #2a3441', color: '#ece8e1',
                padding: '10px 14px', borderRadius: '2px', fontSize: '14px', fontFamily: 'inherit',
              }}
            >
              {ROLES_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>

          <Input label="País de origen" name="pais_origen" value={form.pais_origen} onChange={handleChange} placeholder="Ej: Corea del Sur" required />
          <Input label="Habilidad Ultimate" name="habilidad_ultimate" value={form.habilidad_ultimate} onChange={handleChange} placeholder="Ej: Cascade de cuchillas" required />
          <Input label="URL de imagen (opcional)" name="imagen_url" value={form.imagen_url} onChange={handleChange} placeholder="https://... — si está vacío se busca automáticamente" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aba9a5' }}>Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Describe al agente..."
              style={{
                background: '#0f1923', border: '1px solid #2a3441', color: '#ece8e1',
                padding: '10px 14px', borderRadius: '2px', fontSize: '14px', fontFamily: 'inherit',
                resize: 'vertical', outline: 'none',
              }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(255,70,85,0.1)', border: '1px solid #ff455540', padding: '10px 14px', borderRadius: '2px', color: '#ff4655', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button type="submit" loading={loading} style={{ flex: 1 }}>
              {isEditing ? 'Guardar cambios' : 'Crear agente'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate(-1)} style={{ flex: 1 }}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgenteForm;
