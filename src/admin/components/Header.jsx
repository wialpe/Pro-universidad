import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { usuarioActivo, logout } = useApp();

  const toggleSidebar = () => {
    const sidebar = document.getElementById('accordionSidebar');
    const wrapper = document.getElementById('wrapper');
    if (sidebar && wrapper) {
      sidebar.classList.toggle('toggled');
      wrapper.classList.toggle('toggled');
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      <button 
        id="sidebarToggleTop" 
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={toggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input type="text" className="form-control bg-light border-0 small" placeholder="Buscar..." />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <a 
            className="nav-link dropdown-toggle" 
            href="#" 
            id="userDropdown" 
            role="button" 
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {usuarioActivo ? `${usuarioActivo.nombre} (${usuarioActivo.tipoAcceso})` : 'Invitado'}
            </span>
            <img
              className="img-profile rounded-circle"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="perfil"
              width="32"
              height="32"
            />
          </a>

          <div className="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Perfil
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Configuración
            </a>
            <div className="dropdown-divider"></div>
            {usuarioActivo ? (
              <button className="dropdown-item" onClick={logout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Cerrar sesión
              </button>
            ) : null}
          </div>
        </li>
      </ul>
    </nav>
  );
}
