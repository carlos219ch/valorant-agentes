const Loader = ({ texto = 'Cargando...' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', gap: '16px' }}>
    <div style={{
      width: '40px', height: '40px',
      border: '3px solid #1a2332',
      borderTop: '3px solid #ff4655',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <span style={{ color: '#aba9a5', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{texto}</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Loader;
