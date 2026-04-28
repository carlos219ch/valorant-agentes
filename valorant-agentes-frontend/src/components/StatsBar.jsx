import { useState, useEffect } from 'react';
import { agentesService } from '../services/api';
import { ROLES } from '../constants';

const Stat = ({ label, value, color }) => (
  <div style={{
    background: '#1a2332',
    border: `1px solid ${color}30`,
    borderTop: `2px solid ${color}`,
    borderRadius: '2px',
    padding: '12px 16px',
    minWidth: '90px',
    flex: '1 1 90px',
  }}>
    <div style={{ fontSize: '22px', fontWeight: 900, color, letterSpacing: '1px', lineHeight: 1 }}>
      {value ?? '—'}
    </div>
    <div style={{ fontSize: '10px', color: '#aba9a5', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>
      {label}
    </div>
  </div>
);

const StatsBar = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    agentesService.stats().then(setStats).catch(() => {});
  }, []);

  if (!stats) return null;

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
      <Stat label="Total"     value={stats.total}    color="#ece8e1" />
      <Stat label="Activos"   value={stats.activos}  color="#4ba56e" />
      <Stat label="Inactivos" value={stats.inactivos} color="#aba9a5" />
      {Object.entries(ROLES).map(([key, { label, color }]) => (
        <Stat key={key} label={label} value={stats.porRol?.[key] ?? 0} color={color} />
      ))}
    </div>
  );
};

export default StatsBar;
