import React from 'react';
import { useApp } from '../../../context/AppContext';
import Card from './Card';

export default function DocenteDashboard() {
  const { usuarioActivo, logout } = useApp();

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Bienvenido Docente {usuarioActivo?.nombre}</h1>
        <button onClick={logout} className="btn btn-danger">Cerrar sesión</button>
      </div>

      <div className="row">
        <Card title="Clases Asignadas" value="5" icon="fa-chalkboard-teacher" color="primary" />
        <Card title="Estudiantes Activos" value="120" icon="fa-user-graduate" color="success" />
        <Card title="Tareas por Revisar" value="8" icon="fa-tasks" color="warning" />
        <Card title="Asistencia Promedio" value="92%" icon="fa-check-circle" color="info" />
        <Card title="Avisos Pendientes" value="3" icon="fa-bell" color="danger" />
      </div>
    </div>
  );
}
