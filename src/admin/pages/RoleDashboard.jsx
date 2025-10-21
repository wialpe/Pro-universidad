import React from 'react';
import { useApp } from '../../context/AppContext';

// Tarjeta simple estilo KPI (como tus cards)
const Card = ({ color, icon, title, value }) => (
  <div className="col-xl-3 col-md-6 mb-4">
    <div className={`card border-left-${color} shadow h-100 py-2`}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>{title}</div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
          </div>
          <div className="col-auto">
            <i className={`fas ${icon} fa-2x text-gray-300`}></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function RoleDashboard() {
  const { usuarioActivo } = useApp();
  const nombre = usuarioActivo?.nombre || 'Usuario';
  const rol = (usuarioActivo?.tipoAcceso || '').toLowerCase();

  const Header = ({ saludo }) => (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">{saludo} {nombre}</h1>
    </div>
  );

  if (rol === 'administrador') {
    return (
      <>
        <Header saludo="Bienvenido Administrador" />
        <div className="row">
          <Card title="Usuarios registrados" value="45" icon="fa-users" color="primary" />
          <Card title="Transacciones" value="128" icon="fa-coins" color="success" />
          <Card title="Reportes" value="9" icon="fa-chart-line" color="info" />
          <Card title="Alertas" value="3" icon="fa-bell" color="warning" />
        </div>
      </>
    );
  }

  if (rol === 'docente') {
    return (
      <>
        <Header saludo="Bienvenido Docente" />
        <div className="row">
          <Card title="Clases Asignadas" value="5" icon="fa-chalkboard-teacher" color="primary" />
          <Card title="Estudiantes Activos" value="120" icon="fa-user-graduate" color="success" />
          <Card title="Tareas por Revisar" value="8" icon="fa-tasks" color="warning" />
          <Card title="Asistencia Promedio" value="92%" icon="fa-check-circle" color="info" />
          <Card title="Avisos Pendientes" value="3" icon="fa-bell" color="danger" />
        </div>
      </>
    );
  }

  if (rol === 'estudiante') {
    return (
      <>
        <Header saludo="Bienvenido Estudiante" />
        <div className="row">
          <Card title="Promedio Actual" value="4.3" icon="fa-star" color="success" />
          <Card title="Materias Inscritas" value="6" icon="fa-book" color="primary" />
          <Card title="Tareas Pendientes" value="3" icon="fa-tasks" color="warning" />
          <Card title="Asistencia" value="96%" icon="fa-calendar-check" color="info" />
          <Card title="Exámenes Próximos" value="2" icon="fa-file-alt" color="secondary" />
        </div>
      </>
    );
  }

  if (rol === 'familiar') {
    return (
      <>
        <Header saludo="Bienvenido Familiar" />
        <div className="row">
          <Card title="Hijos Registrados" value="2" icon="fa-child" color="primary" />
          <Card title="Notas Promedio" value="4.5" icon="fa-graduation-cap" color="success" />
          <Card title="Citaciones Pendientes" value="1" icon="fa-envelope" color="warning" />
          <Card title="Mensajes Recientes" value="3" icon="fa-comments" color="info" />
          <Card title="Eventos Escolares" value="2 próximos" icon="fa-calendar-alt" color="secondary" />
        </div>
      </>
    );
  }

  // Rol desconocido: muestra tu Dashboard por defecto (Content.jsx lo maneja)
  return null;
}
