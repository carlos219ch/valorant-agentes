export const API_BASE = 'http://localhost:3000/api';

export const ROLES = {
  duelista:    { label: 'Duelista',    color: '#ff4655', bg: 'rgba(255,70,85,0.15)' },
  iniciador:   { label: 'Iniciador',   color: '#5ca9d6', bg: 'rgba(92,169,214,0.15)' },
  controlador: { label: 'Controlador', color: '#4ba56e', bg: 'rgba(75,165,110,0.15)' },
  centinela:   { label: 'Centinela',   color: '#d4a843', bg: 'rgba(212,168,67,0.15)' },
};

export const ROLES_OPTIONS = Object.entries(ROLES).map(([value, { label }]) => ({ value, label }));
