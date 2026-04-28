const variants = {
  primary:  { background: '#ff4655', color: '#fff', border: 'none' },
  ghost:    { background: 'transparent', color: '#ff4655', border: '1px solid #ff4655' },
  danger:   { background: 'transparent', color: '#ff4655', border: '1px solid #ff455520' },
};

const Button = ({ children, variant = 'primary', loading = false, style = {}, ...props }) => {
  const base = variants[variant] || variants.primary;
  return (
    <button
      disabled={loading || props.disabled}
      style={{
        ...base,
        padding: '10px 24px',
        fontFamily: 'inherit',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        transition: 'all 0.2s',
        borderRadius: '2px',
        ...style,
      }}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
};

export default Button;
