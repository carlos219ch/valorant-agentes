import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

let nextId = 0;

const STYLES = {
  success: { border: '#4ba56e',  text: '#4ba56e' },
  error:   { border: '#ff4655',  text: '#ff4655' },
  info:    { border: '#5ca9d6',  text: '#5ca9d6' },
};

const ToastContainer = ({ toasts, onRemove }) => (
  <div style={{
    position: 'fixed', bottom: '24px', right: '24px',
    display: 'flex', flexDirection: 'column', gap: '10px',
    zIndex: 2000, width: '320px', pointerEvents: 'none',
  }}>
    {toasts.map(t => {
      const s = STYLES[t.type] || STYLES.success;
      return (
        <div key={t.id} style={{
          background: '#1a2332',
          border: `1px solid ${s.border}40`,
          borderLeft: `3px solid ${s.border}`,
          borderRadius: '2px',
          padding: '13px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'all',
          animation: 'toastIn 0.2s ease',
          boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
        }}>
          <span style={{ fontSize: '13px', color: '#ece8e1', lineHeight: '1.4', flex: 1 }}>
            {t.message}
          </span>
          <button onClick={() => onRemove(t.id)} style={{
            background: 'none', border: 'none', color: '#aba9a5',
            cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: 0, flexShrink: 0,
          }}>×</button>
        </div>
      );
    })}
  </div>
);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((message, type = 'success', duration = 3500) => {
    const id = ++nextId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};
