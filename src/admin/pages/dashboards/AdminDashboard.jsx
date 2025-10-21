import React from 'react';
import { useApp } from '../../../context/AppContext';
import Card from './Card';

export default function AdminDashboard() {
  const { usuarioActivo, logout } = useApp();

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Bienvenido Administrador {usuarioActivo?.nombre}</h1>
        <button onClick={logout} className="btn btn-danger">Cerrar sesión</button>
      </div>

      <div className="row">
        <Card title="Usuarios registrados" value="45" icon="fa-users" color="primary" />
        <Card title="Transacciones" value="128" icon="fa-coins" color="success" />
        <Card title="Reportes" value="9" icon="fa-chart-line" color="info" />
        <Card title="Alertas" value="3" icon="fa-bell" color="warning" />
      </div>
    </div>
  );
}
