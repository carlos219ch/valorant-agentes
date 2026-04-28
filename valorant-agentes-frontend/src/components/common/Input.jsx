const Input = ({ label, error, style = {}, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    {label && (
      <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aba9a5' }}>
        {label}
      </label>
    )}
    <input
      style={{
        background: '#0f1923',
        border: `1px solid ${error ? '#ff4655' : '#2a3441'}`,
        color: '#ece8e1',
        padding: '10px 14px',
        fontSize: '14px',
        borderRadius: '2px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s',
        ...style,
      }}
      onFocus={e => (e.target.style.borderColor = '#ff4655')}
      onBlur={e  => (e.target.style.borderColor = error ? '#ff4655' : '#2a3441')}
      {...props}
    />
    {error && <span style={{ fontSize: '12px', color: '#ff4655' }}>{error}</span>}
  </div>
);

export default Input;
