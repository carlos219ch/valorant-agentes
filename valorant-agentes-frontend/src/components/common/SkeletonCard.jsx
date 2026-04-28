const Shimmer = ({ w = '100%', h = '16px', style = {} }) => (
  <div style={{
    width: w, height: h, borderRadius: '2px',
    background: 'linear-gradient(90deg, #1e2d3d 25%, #263548 50%, #1e2d3d 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s infinite',
    ...style,
  }} />
);

const SkeletonCard = () => (
  <div style={{
    background: '#1a2332',
    border: '1px solid #2a3441',
    borderRadius: '2px',
    overflow: 'hidden',
  }}>
    {/* Image area */}
    <div style={{
      height: '270px',
      background: 'linear-gradient(90deg, #1e2d3d 25%, #263548 50%, #1e2d3d 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s infinite',
    }} />

    {/* Info area */}
    <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Shimmer h="20px" w="55%" />
      <Shimmer h="13px" w="100%" />
      <Shimmer h="13px" w="75%" />
      <Shimmer h="12px" w="35%" />
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <Shimmer h="32px" style={{ flex: 1 }} />
        <Shimmer h="32px" style={{ flex: 1 }} />
        <Shimmer h="32px" style={{ flex: 1 }} />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
