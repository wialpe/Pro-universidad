import { useState } from "react";

export default function Estadisticas() {
  // Filtros
  const [anio, setAnio] = useState("2024");
  const [grado, setGrado] = useState("");
  const [periodo, setPeriodo] = useState("");

  // Datos simulados
  const [data, setData] = useState({
    totalEstudiantes: 1240,
    promedioGeneral: 86,
    asistenciaPromedio: 93,
    casosBienestar: 18,
    notas: { bajas: 5, medias: 30, altas: 65 },
    asistenciaPorGrado: [
      { grado: "10°", valor: 95 },
      { grado: "11°", valor: 92 },
    ],
    bienestar: [
      { tipo: "Académico", valor: 8 },
      { tipo: "Psicosocial", valor: 4 },
      { tipo: "Salud", valor: 3 },
      { tipo: "Disciplina", valor: 3 },
    ],
    topEstudiantes: [
      { nombre: "Ana López", grado: "11°", promedio: 4.9 },
      { nombre: "Juan Pérez", grado: "11°", promedio: 4.8 },
      { nombre: "María Díaz", grado: "10°", promedio: 4.8 },
    ],
    topMaterias: [
      { materia: "Inglés", promedio: 4.6, estudiantes: 600 },
      { materia: "Lengua", promedio: 4.4, estudiantes: 620 },
      { materia: "Historia", promedio: 4.3, estudiantes: 610 },
    ],
  });

  const generarReporte = () => {
    // Aquí podrías llamar a tu API Laravel y actualizar setData()
    alert(`Generando reporte ${anio} ${grado} ${periodo || "completo"}`);
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Estadísticas del Sistema</h1>
        <button className="btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-download fa-sm text-white-50"></i> Exportar Reporte
        </button>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label">Año Académico</label>
          <select
            className="form-control"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
          >
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Grado</label>
          <select
            className="form-control"
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="10">10°</option>
            <option value="11">11°</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Período</label>
          <select
            className="form-control"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="">Todo el año</option>
            <option value="1">Primer Trimestre</option>
            <option value="2">Segundo Trimestre</option>
            <option value="3">Tercer Trimestre</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">&nbsp;</label>
          <button className="btn btn-primary w-100" onClick={generarReporte}>
            <i className="fas fa-chart-bar"></i> Generar Reporte
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="row mb-4">
        <Kpi color="primary" icon="fas fa-users" title="Total Estudiantes" value={data.totalEstudiantes} />
        <Kpi color="success" icon="fas fa-chart-line" title="Promedio General" value={`${data.promedioGeneral}%`} />
        <Kpi color="info" icon="fas fa-calendar-check" title="Asistencia Promedio" value={`${data.asistenciaPromedio}%`} />
        <Kpi color="warning" icon="fas fa-heartbeat" title="Casos de Bienestar" value={data.casosBienestar} />
      </div>

      {/* Simulaciones de gráficos */}
      <div className="row">
        <Card title="Distribución de Notas">
          {["bajas", "medias", "altas"].map((k) => (
            <Progress key={k} label={k} value={data.notas[k]} color="primary" />
          ))}
        </Card>

        <Card title="Asistencia por Grado">
          {data.asistenciaPorGrado.map((g) => (
            <Progress key={g.grado} label={g.grado} value={g.valor} color="success" />
          ))}
        </Card>
      </div>

      <div className="row">
        <Card title="Casos de Bienestar por Tipo">
          {data.bienestar.map((b) => (
            <Progress key={b.tipo} label={b.tipo} value={b.valor * 5} color="warning" />
          ))}
        </Card>

        <Card title="Rendimiento por Materia">
          {data.topMaterias.map((m) => (
            <Progress key={m.materia} label={m.materia} value={m.promedio * 20} color="info" />
          ))}
        </Card>
      </div>

      {/* Tablas */}
      <div className="row">
        <TableCard title="Top 10 Mejores Estudiantes">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Grado</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {data.topEstudiantes.map((e, i) => (
                <tr key={i}>
                  <td>{e.nombre}</td>
                  <td>{e.grado}</td>
                  <td>{e.promedio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard title="Materias con Mejor Rendimiento">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Materia</th>
                <th>Promedio</th>
                <th>Estudiantes</th>
              </tr>
            </thead>
            <tbody>
              {data.topMaterias.map((m, i) => (
                <tr key={i}>
                  <td>{m.materia}</td>
                  <td>{m.promedio}</td>
                  <td>{m.estudiantes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </div>


    </div>
  );
}

/* ---------- Subcomponentes ---------- */

function Kpi({ color, icon, title, value }) {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
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

function Card({ title, children }) {
  return (
    <div className="col-xl-6 col-lg-6 mb-4">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}

function TableCard({ title, children }) {
  return (
    <div className="col-xl-6 col-lg-6 mb-4">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
        </div>
        <div className="card-body table-responsive">{children}</div>
      </div>
    </div>
  );
}

function Progress({ label, value, color }) {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="progress">
        <div
          className={`progress-bar bg-${color}`}
          role="progressbar"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
