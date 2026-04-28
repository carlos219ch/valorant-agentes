import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();
  const location              = useLocation();
  const redirectTo            = location.state?.from?.pathname || '/agentes';

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authService.login(form);
      login(data.token, data.usuario);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ margin: '0 0 4px', color: '#ff4655', fontWeight: 900, fontSize: '28px', letterSpacing: '4px' }}>VALORANT</h1>
          <p style={{ margin: 0, color: '#aba9a5', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>Agentes API</p>
        </div>

        <div style={{ background: '#1a2332', border: '1px solid #2a3441', borderTop: '3px solid #ff4655', borderRadius: '2px', padding: '32px' }}>
          <h2 style={{ margin: '0 0 24px', fontSize: '14px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#ece8e1' }}>
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Input label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} required />

            {error && (
              <div style={{ background: 'rgba(255,70,85,0.1)', border: '1px solid #ff455540', padding: '10px 14px', borderRadius: '2px', color: '#ff4655', fontSize: '13px' }}>
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} style={{ marginTop: '8px', width: '100%' }}>
              Ingresar
            </Button>
          </form>

          <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: '13px', color: '#aba9a5' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/register" style={{ color: '#ff4655', textDecoration: 'none', fontWeight: 700 }}>Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
