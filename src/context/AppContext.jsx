import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

const roleViewMap = {
  administrador: 'dashboard_admin',
  admin: 'dashboard_admin',
  docente: 'dashboard_docente',
  estudiante: 'dashboard_estudiante',
  familiar: 'dashboard_familiar',
};

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');

  // --- Auth state (prioridad: tu app) ---
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const saved = localStorage.getItem('usuarioActivo');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (usuarioActivo) {
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
      const roleKey = (usuarioActivo?.tipoAcceso || '').toLowerCase();
      const view = roleViewMap[roleKey] || 'dashboard';
      setCurrentView(view);
    } else {
      localStorage.removeItem('usuarioActivo');
    }
  }, [usuarioActivo]);

  const navigateTo = (view) => setCurrentView(view);

  const login = (usuario) => setUsuarioActivo(usuario);
  const logout = () => {
    setUsuarioActivo(null);
    setCurrentView('dashboard'); // vuelves a tu dashboard por defecto
  };

  const value = useMemo(
    () => ({ currentView, navigateTo, usuarioActivo, login, logout }),
    [currentView, usuarioActivo]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
