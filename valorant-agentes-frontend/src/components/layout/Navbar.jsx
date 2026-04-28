import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to || pathname.startsWith(to + '/');
  return (
    <Link to={to} style={{
      color: active ? '#ff4655' : '#aba9a5',
      textDecoration: 'none',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      borderBottom: active ? '2px solid #ff4655' : '2px solid transparent',
      paddingBottom: '2px',
      transition: 'color 0.2s',
    }}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { usuario, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#0f1923',
      borderBottom: '1px solid #1a2332',
      padding: '0 32px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link to="/agentes" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#ff4655', fontWeight: 900, fontSize: '18px', letterSpacing: '2px' }}>VALORANT</span>
          <span style={{ color: '#aba9a5', fontWeight: 400, fontSize: '12px', letterSpacing: '1px' }}>AGENTES</span>
        </Link>
        <NavLink to="/agentes">Agentes</NavLink>
        {isAuthenticated && <NavLink to="/agentes/nuevo">Nuevo Agente</NavLink>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isAuthenticated ? (
          <>
            <span style={{ color: '#aba9a5', fontSize: '13px' }}>
              Hola, <strong style={{ color: '#ece8e1' }}>{usuario.nombre}</strong>
            </span>
            <Button variant="ghost" onClick={handleLogout} style={{ padding: '6px 16px' }}>
              Salir
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registro</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
