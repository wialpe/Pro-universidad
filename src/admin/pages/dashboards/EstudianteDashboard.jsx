import React from 'react';
import { useApp } from '../../../context/AppContext';
import Card from './Card';

export default function EstudianteDashboard() {
  const { usuarioActivo, logout } = useApp();

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Bienvenido Estudiante {usuarioActivo?.nombre}</h1>
        <button onClick={logout} className="btn btn-danger">Cerrar sesión</button>
      </div>

      <div className="row">
        <Card title="Promedio Actual" value="4.3" icon="fa-star" color="success" />
        <Card title="Materias Inscritas" value="6" icon="fa-book" color="primary" />
        <Card title="Tareas Pendientes" value="3" icon="fa-tasks" color="warning" />
        <Card title="Asistencia" value="96%" icon="fa-calendar-check" color="info" />
        <Card title="Exámenes Próximos" value="2" icon="fa-file-alt" color="secondary" />
      </div>
    </div>
  );
}
