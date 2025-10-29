import React, { useState } from "react";

export default function NotasForm() {
  const [notas, setNotas] = useState([
    { id: 1, estudiante: "Ana López", materia: "Matemáticas", nota: 4.9, fecha: "2024-10-15" },
    { id: 2, estudiante: "Juan Pérez", materia: "Español", nota: 4.8, fecha: "2024-10-15" },
    { id: 3, estudiante: "María Díaz", materia: "Historia", nota: 4.7, fecha: "2024-10-15" },
  ]);
  
  const [formData, setFormData] = useState({
    estudiante: "",
    materia: "",
    nota: "",
    fecha: "",
    observacion: "",
  });
  
  const [mensaje, setMensaje] = useState("");

  const estudiantes = [
    "Ana López", "Juan Pérez", "María Díaz", "Carlos Ruiz", "Sofia García"
  ];

  const materias = [
    "Matemáticas", "Español", "Historia", "Ciencias", "Inglés", "Educación Física"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevaNota = {
      id: Date.now(),
      estudiante: formData.estudiante,
      materia: formData.materia,
      nota: parseFloat(formData.nota),
      fecha: formData.fecha,
      observacion: formData.observacion,
    };

    setNotas((prev) => [...prev, nuevaNota]);
    setMensaje("✅ Nota registrada correctamente");

    setFormData({
      estudiante: "",
      materia: "",
      nota: "",
      fecha: "",
      observacion: "",
    });

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Gestión de Notas</h1>
      </div>

      {/* Formulario */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Registrar Nueva Nota</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Estudiante</label>
                <select
                  name="estudiante"
                  className="form-control"
                  value={formData.estudiante}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un estudiante</option>
                  {estudiantes.map((est) => (
                    <option key={est} value={est}>
                      {est}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Materia</label>
                <select
                  name="materia"
                  className="form-control"
                  value={formData.materia}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una materia</option>
                  {materias.map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Nota (1.0 - 5.0)</label>
                <input
                  type="number"
                  name="nota"
                  className="form-control"
                  value={formData.nota}
                  onChange={handleChange}
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  className="form-control"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Observación (opcional)</label>
                <input
                  type="text"
                  name="observacion"
                  className="form-control"
                  value={formData.observacion}
                  onChange={handleChange}
                  placeholder="Comentarios adicionales"
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit">
              <i className="fas fa-save"></i> Registrar Nota
            </button>
          </form>

          {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
        </div>
      </div>

      {/* Tabla de notas */}
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Registro de Notas</h6>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Estudiante</th>
                <th>Materia</th>
                <th>Nota</th>
                <th>Fecha</th>
                <th>Observación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota) => (
                <tr key={nota.id}>
                  <td>{nota.id}</td>
                  <td>{nota.estudiante}</td>
                  <td>{nota.materia}</td>
                  <td>
                    <span className={`badge ${nota.nota >= 4.0 ? 'bg-success' : nota.nota >= 3.0 ? 'bg-warning' : 'bg-danger'}`}>
                      {nota.nota}
                    </span>
                  </td>
                  <td>{nota.fecha}</td>
                  <td>{nota.observacion || "—"}</td>
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