import Button from './Button';

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText  = 'Cancelar',
  variant     = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const accent = variant === 'danger' ? '#ff4655' : '#5ca9d6';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: '#1a2332',
          border: '1px solid #2a3441',
          borderTop: `3px solid ${accent}`,
          borderRadius: '2px',
          padding: '32px',
          maxWidth: '420px',
          width: '100%',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{
          margin: '0 0 12px', fontSize: '13px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase', color: '#ece8e1',
        }}>
          {title}
        </h3>
        <p style={{ margin: '0 0 28px', fontSize: '14px', color: '#aba9a5', lineHeight: '1.6' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button onClick={onConfirm} style={{ flex: 1 }}>{confirmText}</Button>
          <Button variant="ghost" onClick={onCancel} style={{ flex: 1 }}>{cancelText}</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
