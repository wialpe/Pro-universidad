import React, { useState, useEffect } from "react";

export default function EstudiantesForm() {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1001, nombre: "Ana López", grado: "11°", grupo: "A", promedio: 4.9 },
    { id: 1002, nombre: "Juan Pérez", grado: "11°", grupo: "B", promedio: 4.8 },
    { id: 1003, nombre: "María Díaz", grado: "10°", grupo: "A", promedio: 4.8 },
    { id: 1004, nombre: "Carlos Ruiz", grado: "10°", grupo: "B", promedio: 4.5 },
    { id: 1005, nombre: "Sofia García", grado: "11°", grupo: "A", promedio: 4.7 },
  ]);
  
  const [formData, setFormData] = useState({
    nombre: "",
    grado: "",
    grupo: "",
    email: "",
    telefono: "",
  });
  
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevoEstudiante = {
      id: Math.floor(1000 + Math.random() * 9000),
      nombre: formData.nombre,
      grado: formData.grado,
      grupo: formData.grupo,
      email: formData.email,
      telefono: formData.telefono,
      promedio: 0.0,
    };

    setEstudiantes((prev) => [...prev, nuevoEstudiante]);
    setMensaje("✅ Estudiante registrado correctamente");

    setFormData({
      nombre: "",
      grado: "",
      grupo: "",
      email: "",
      telefono: "",
    });

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Gestión de Estudiantes</h1>
      </div>

      {/* Formulario */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Registrar Nuevo Estudiante</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Grado</label>
                <select
                  name="grado"
                  className="form-control"
                  value={formData.grado}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="10°">10°</option>
                  <option value="11°">11°</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Grupo</label>
                <select
                  name="grupo"
                  className="form-control"
                  value={formData.grupo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="A">Grupo A</option>
                  <option value="B">Grupo B</option>
                  <option value="C">Grupo C</option>
                  <option value="D">Grupo D</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  className="form-control"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit">
              <i className="fas fa-save"></i> Registrar Estudiante
            </button>
          </form>

          {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
        </div>
      </div>

      {/* Tabla de estudiantes */}
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Lista de Estudiantes</h6>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Grado</th>
                <th>Grupo</th>
                <th>Promedio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <tr key={estudiante.id}>
                  <td>{estudiante.id}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.grado}</td>
                  <td>{estudiante.grupo}</td>
                  <td>{estudiante.promedio}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}