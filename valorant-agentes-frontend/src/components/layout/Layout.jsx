import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div style={{ minHeight: '100vh', color: '#ece8e1' }}>
    <Navbar />
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      {children}
    </main>
  </div>
);

export default Layout;
