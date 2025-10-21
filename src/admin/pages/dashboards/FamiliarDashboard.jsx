import React from 'react';
import { useApp } from '../../../context/AppContext';
import Card from './Card';

export default function FamiliarDashboard() {
  const { usuarioActivo, logout } = useApp();

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Bienvenido Familiar {usuarioActivo?.nombre}</h1>
        <button onClick={logout} className="btn btn-danger">Cerrar sesión</button>
      </div>

      <div className="row">
        <Card title="Hijos Registrados" value="2" icon="fa-child" color="primary" />
        <Card title="Notas Promedio" value="4.5" icon="fa-graduation-cap" color="success" />
        <Card title="Citaciones Pendientes" value="1" icon="fa-envelope" color="warning" />
        <Card title="Mensajes Recientes" value="3" icon="fa-comments" color="info" />
        <Card title="Eventos Escolares" value="2 próximos" icon="fa-calendar-alt" color="secondary" />
      </div>
    </div>
  );
}
