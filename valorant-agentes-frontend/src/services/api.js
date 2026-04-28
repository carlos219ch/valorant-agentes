import { API_BASE } from '../constants';

const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
  const { auth = false, ...rest } = options;

  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...rest,
  };

  if (auth) {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error en la solicitud');
  }

  return data;
};

export const authService = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login:    (body) => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
};

export const agentesService = {
  listar:    (params = '') => request(`/agentes${params ? '?' + params : ''}`),
  obtener:   (id)          => request(`/agentes/${id}`),
  stats:     ()            => request('/agentes/stats'),
  crear:     (body)        => request('/agentes',     { method: 'POST',   auth: true, body: JSON.stringify(body) }),
  actualizar:(id, body)    => request(`/agentes/${id}`, { method: 'PUT',  auth: true, body: JSON.stringify(body) }),
  eliminar:  (id)          => request(`/agentes/${id}`, { method: 'DELETE', auth: true }),
};
