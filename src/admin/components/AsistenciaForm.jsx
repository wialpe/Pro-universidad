import React, { useState, useEffect, useMemo } from "react";
import { getAsistencias } from "../../services/api";

export default function AsistenciaForm() {
  const [asistencias, setAsistencias] = useState([]);
  const [formData, setFormData] = useState({
    estudiante: "",
    grupo: "",
    fecha: "",
    estadoAsistencia: "Asistio",
    observacion: "",
  });
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  // ✅ Generar los 20 IDs solo una vez
  const studentIds = useMemo(() => {
    return Array.from({ length: 20 }, () => Math.floor(1000 + Math.random() * 9000));
  }, []); // 👈 se ejecuta solo al montar el componente

  // ✅ Cargar asistencias desde backend
  useEffect(() => {
    getAsistencias()
      .then((res) => {
        console.log("📋 Asistencias desde el backend:", res);
        setAsistencias(res);
      })
      .catch((err) => console.error("Error cargando asistencias:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Control de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Envío del formulario (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      idEstudiante: Number(formData.estudiante),
      grupos: formData.grupo,
      fecha: formData.fecha,
      estado: formData.estadoAsistencia,
      observacion: formData.observacion || null,
    };

    console.log("🟢 Payload a enviar:", payload);

    try {
      const res = await fetch("http://localhost:8080/api/asistencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Error al registrar asistencia:", text);
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const nuevaAsistencia = await res.json();
      setAsistencias((prev) => [...prev, nuevaAsistencia]);
      setMensaje("✅ Asistencia registrada correctamente");

      setFormData({
        estudiante: "",
        grupo: "",
        fecha: "",
        estadoAsistencia: "Asistio",
        observacion: "",
      });
    } catch (err) {
      console.error(err);
      setMensaje(`❌ No se pudo registrar la asistencia: ${err.message}`);
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando asistencias...</p>;

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Registrar Asistencia</h1>
      </div>

      {/* Formulario */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              {/* ID Estudiante */}
              <div className="col-md-3">
                <label className="form-label">ID Estudiante</label>
                <select
                  name="estudiante"
                  className="form-control"
                  value={formData.estudiante}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un ID de estudiante</option>
                  {studentIds.map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grupo */}
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
                  <option value="Grupo_A">Grupo A</option>
                  <option value="Grupo_B">Grupo B</option>
                  <option value="Grupo_C">Grupo C</option>
                  <option value="Grupo_D">Grupo D</option>
                </select>
              </div>

              {/* Fecha */}
              <div className="col-md-3">
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

              {/* Estado */}
              <div className="col-md-3">
                <label className="form-label">Estado</label>
                <select
                  name="estadoAsistencia"
                  className="form-control"
                  value={formData.estadoAsistencia}
                  onChange={handleChange}
                >
                  <option value="Asistio">Asistió</option>
                  <option value="No_asistio">No Asistió</option>
                </select>
              </div>
            </div>

            {/* Observación */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Observación (opcional)</label>
                <input
                  type="text"
                  name="observacion"
                  className="form-control"
                  value={formData.observacion}
                  onChange={handleChange}
                  placeholder="Escribe una observación si aplica"
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit">
              <i className="fas fa-save"></i> Guardar
            </button>
          </form>

          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
      </div>

      {/* Tabla de registros */}
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Listado de Asistencias</h6>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Estudiante</th>
                <th>Grupo</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.estudianteId}</td>
                  <td>{a.grupo}</td>
                  <td>{a.fecha}</td>
                  <td>{a.estadoAsistencia}</td>
                  <td>{a.observacion || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
