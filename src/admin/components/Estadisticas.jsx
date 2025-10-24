import { useEffect, useState } from "react";
import { getEstadisticas } from "../../services/api";

export default function Estadisticas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEstadisticas()
      .then((res) => {
        console.log("📊 Datos del backend:", res);
        setData(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Cargando datos...</p>;

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Estadísticas del Sistema</h1>
      </div>

      {/* === Fila de KPIs principales === */}
      <div className="row">
        <Kpi
          color="primary"
          icon="fas fa-user-graduate"
          title="Total de Asistencias"
          value={data.length}
        />
        <Kpi
          color="success"
          icon="fas fa-calendar-check"
          title="Asistencias Asistió"
          value={data.filter((a) => a.estadoAsistencia === "Asistio").length}
        />
        <Kpi
          color="danger"
          icon="fas fa-calendar-times"
          title="Inasistencias"
          value={data.filter((a) => a.estadoAsistencia === "No_asistio").length}
        />
        <Kpi
          color="info"
          icon="fas fa-users"
          title="Grupos Registrados"
          value={new Set(data.map((a) => a.grupo)).size}
        />
      </div>

      {/* === Tabla resumen === */}
      <div className="card shadow mt-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Detalle de Asistencias</h6>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Estudiante</th>
                <th>Grupo</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.estudianteId}</td>
                  <td>{a.grupo}</td>
                  <td>{a.fecha}</td>
                  <td>{a.estadoAsistencia}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.estado === "Asistio" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {a.estado}
                    </span>
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

// === Subcomponente KPI (cuadro) ===
function Kpi({ color, icon, title, value }) {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div
                className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}
              >
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
            </div>
            <div className="col-auto">
              <i className={`${icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
