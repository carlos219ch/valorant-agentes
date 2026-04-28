import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Login         from './pages/Login';
import Register      from './pages/Register';
import Agentes       from './pages/Agentes';
import AgenteDetalle from './pages/AgenteDetalle';
import AgenteForm    from './pages/AgenteForm';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
    <ToastProvider>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/agentes" element={
          <ProtectedRoute><Layout><Agentes /></Layout></ProtectedRoute>
        } />
        <Route path="/agentes/nuevo" element={
          <ProtectedRoute><Layout><AgenteForm /></Layout></ProtectedRoute>
        } />
        <Route path="/agentes/:id/editar" element={
          <ProtectedRoute><Layout><AgenteForm /></Layout></ProtectedRoute>
        } />
        <Route path="/agentes/:id" element={
          <ProtectedRoute><Layout><AgenteDetalle /></Layout></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/agentes" replace />} />
      </Routes>
    </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
