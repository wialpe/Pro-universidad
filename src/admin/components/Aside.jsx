import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Aside() {
  const { navigateTo } = useApp();
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Sistema <sup>Edu</sup></div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard'); }}>
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">
        Gestión Académica
      </div>

      {/* Nav Item - Estudiantes */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEstudiantes"
          aria-expanded="true" aria-controls="collapseEstudiantes">
          <i className="fas fa-fw fa-user-graduate"></i>
          <span>Estudiantes</span>
        </a>
        <div id="collapseEstudiantes" className="collapse" aria-labelledby="headingEstudiantes"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opciones:</h6>
            <a className="collapse-item" href="#">Listado</a>
            <a className="collapse-item" href="#">Agregar Nuevo</a>
            <a className="collapse-item" href="#">Importar</a>
          </div>
        </div>
      </li>

      {/* Nav Item - Notas */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseNotas"
          aria-expanded="true" aria-controls="collapseNotas">
          <i className="fas fa-fw fa-clipboard-list"></i>
          <span>Notas</span>
        </a>
        <div id="collapseNotas" className="collapse" aria-labelledby="headingNotas" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Gestión de Notas:</h6>
            <a className="collapse-item" href="#">Ver Notas</a>
            <a className="collapse-item" href="#">Cargar Notas</a>
            <a className="collapse-item" href="#">Reportes</a>
          </div>
        </div>
      </li>

      {/* Nav Item - Asistencias */}
      <li className="nav-item">
        <a className="nav-link" href="#">
          <i className="fas fa-fw fa-calendar-check"></i>
          <span>Asistencias</span>
        </a>
      </li>

      {/* Nav Item - Bienestar */}
      <li className="nav-item">
        <a className="nav-link" href="#">
          <i className="fas fa-fw fa-heartbeat"></i>
          <span>Bienestar</span>
        </a>
      </li>

      {/* Nav Item - Familiares */}
      <li className="nav-item">
        <a className="nav-link" href="#">
          <i className="fas fa-fw fa-users"></i>
          <span>Familiares</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">
        Reportes
      </div>

      {/* Nav Item - Estadísticas */}
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigateTo('estadisticas'); }}>
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Estadísticas</span>
        </a>
      </li>

      {/* Nav Item - Reportes */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseReportes"
          aria-expanded="true" aria-controls="collapseReportes">
          <i className="fas fa-fw fa-folder"></i>
          <span>Reportes</span>
        </a>
        <div id="collapseReportes" className="collapse" aria-labelledby="headingReportes" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Tipos de Reporte:</h6>
            <a className="collapse-item" href="#">Académico</a>
            <a className="collapse-item" href="#">Asistencia</a>
            <a className="collapse-item" href="#">Disciplinario</a>
          </div>
        </div>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>
  );
}
