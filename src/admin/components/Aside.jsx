import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Aside() {
  const { navigateTo, usuarioActivo } = useApp();
  const role = (usuarioActivo?.tipoAcceso || '').toLowerCase();

  // A dónde debe ir el botón "Dashboard" según rol
  const dashboardView = usuarioActivo
    ? `dashboard_${role}` // p.e. dashboard_familiar
    : 'dashboard';

  // ====== Definición de menús por rol ======
  const roleMenus = {
    administrador: [
      {
        header: 'GESTIÓN',
        items: [
          { icon: 'fas fa-users-cog', text: 'Usuarios', view: 'admin_users' },
          { icon: 'fas fa-file-alt', text: 'Reportes', view: 'admin_reports' },
          { icon: 'fas fa-cogs', text: 'Configuración', view: 'admin_settings' },
        ],
      },
      {
        header: 'GESTIÓN ACADÉMICA',
        items: [
          { icon: 'fas fa-user-graduate', text: 'Estudiantes', view: 'acad_students' },
          { icon: 'fas fa-clipboard-list', text: 'Notas', view: 'acad_grades' },
          { icon: 'fas fa-calendar-check', text: 'Asistencias', view: 'acad_attendance' },
          { icon: 'fas fa-heartbeat', text: 'Bienestar', view: 'acad_wellbeing' },
          { icon: 'fas fa-users', text: 'Familiares', view: 'acad_families' },
        ],
      },
      {
        header: 'REPORTES',
        items: [{ icon: 'fas fa-chart-area', text: 'Estadísticas', view: 'estadisticas' }],
      },
    ],
    docente: [
      {
        header: 'DOCENTE',
        items: [
          { icon: 'fas fa-chalkboard-teacher', text: 'Mis Clases', view: 'teacher_classes' },
          { icon: 'fas fa-user-graduate', text: 'Estudiantes', view: 'teacher_students' },
          { icon: 'fas fa-upload', text: 'Cargar Notas', view: 'teacher_upload_grades' },
          { icon: 'fas fa-calendar-check', text: 'Asistencia', view: 'teacher_attendance' },
        ],
      },
      {
        header: 'REPORTES',
        items: [{ icon: 'fas fa-chart-area', text: 'Estadísticas', view: 'estadisticas' }],
      },
    ],
    estudiante: [
      {
        header: 'MI PROGRESO',
        items: [
          { icon: 'fas fa-book', text: 'Materias', view: 'student_subjects' },
          { icon: 'fas fa-tasks', text: 'Tareas', view: 'student_tasks' },
          { icon: 'fas fa-calendar-alt', text: 'Horario', view: 'student_schedule' },
          { icon: 'fas fa-clipboard-list', text: 'Mis Notas', view: 'student_grades' },
        ],
      },
      {
        header: 'REPORTES',
        items: [{ icon: 'fas fa-chart-area', text: 'Estadísticas', view: 'estadisticas' }],
      },
    ],
    familiar: [
      {
        header: 'FAMILIA',
        items: [
          { icon: 'fas fa-child', text: 'Hijos', view: 'family_children' },
          { icon: 'fas fa-comments', text: 'Mensajes', view: 'family_messages' },
          { icon: 'fas fa-envelope', text: 'Citaciones', view: 'family_meetings' },
          { icon: 'fas fa-calendar-alt', text: 'Eventos', view: 'family_events' },
        ],
      },
      {
        header: 'REPORTES',
        items: [{ icon: 'fas fa-chart-area', text: 'Estadísticas', view: 'estadisticas' }],
      },
    ],
  };

  // Menú por defecto cuando NO hay sesión (tu menú original resumido)
  const publicMenu = [
    {
      header: null,
      items: [
        { icon: 'fas fa-fw fa-tachometer-alt', text: 'Dashboard', view: 'dashboard' },
        { icon: 'fas fa-sign-in-alt', text: 'Ingresar', view: 'login' },
        { icon: 'fas fa-user-plus', text: 'Registrarse', view: 'register' },
      ],
    },
    {
      header: 'GESTIÓN ACADÉMICA',
      items: [
        { icon: 'fas fa-user-graduate', text: 'Estudiantes', view: 'acad_students' },
        { icon: 'fas fa-clipboard-list', text: 'Notas', view: 'acad_grades' },
        { icon: 'fas fa-calendar-check', text: 'Asistencias', view: 'acad_attendance' },
        { icon: 'fas fa-heartbeat', text: 'Bienestar', view: 'acad_wellbeing' },
        { icon: 'fas fa-users', text: 'Familiares', view: 'acad_families' },
      ],
    },
    {
      header: 'REPORTES',
      items: [{ icon: 'fas fa-chart-area', text: 'Estadísticas', view: 'estadisticas' }],
    },
  ];

  const sections = usuarioActivo ? roleMenus[role] || publicMenu : publicMenu;

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigateTo(dashboardView);
        }}
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          SISTEMA <sup>EDU</sup>
        </div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Item fijo: Dashboard (siempre visible, va a dashboard del rol si hay sesión) */}
      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateTo(dashboardView);
          }}
        >
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* Si NO hay sesión, mostramos Ingresar/Registrarse arriba (ya están en publicMenu).
          Si hay sesión, NO los incluimos (porque sections proviene de roleMenus). */}
      {sections.map((section, si) => (
        <React.Fragment key={si}>
          <hr className="sidebar-divider" />
          {section.header ? <div className="sidebar-heading">{section.header}</div> : null}

          {section.items.map((it, ii) => (
            <li className="nav-item" key={`${si}-${ii}`}>
              <a
                className="nav-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(it.view || 'dashboard');
                }}
              >
                <i className={it.icon}></i>
                <span>{it.text}</span>
              </a>
            </li>
          ))}
        </React.Fragment>
      ))}

      {/* Divider final */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
}
