import { ROLES } from '../../constants';

const Badge = ({ rol }) => {
  const config = ROLES[rol] || { label: rol, color: '#aba9a5', bg: 'rgba(170,169,165,0.15)' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      color: config.color,
      background: config.bg,
      border: `1px solid ${config.color}40`,
      borderRadius: '2px',
    }}>
      {config.label}
    </span>
  );
};

export default Badge;
