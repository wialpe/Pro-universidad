const estadisticas = {
    charts: {},
    
    // Inicializar módulo
    inicializar: function() {
        this.cargarResumen();
        this.generarGraficos();
        this.cargarTablas();
        this.configurarEventos();
    },

    // Configurar eventos
    configurarEventos: function() {
        // Evento para el botón de exportar
        document.getElementById('btn-exportar').addEventListener('click', function() {
            estadisticas.exportarReporte();
        });

        // Eventos para filtros
        document.getElementById('filtro-anio').addEventListener('change', function() {
            estadisticas.actualizarDatos();
        });

        document.getElementById('filtro-grado').addEventListener('change', function() {
            estadisticas.actualizarDatos();
        });

        document.getElementById('filtro-periodo').addEventListener('change', function() {
            estadisticas.actualizarDatos();
        });
    },

    // Cargar resumen estadístico
    cargarResumen: function() {
        // Simulación de datos
        const resumen = {
            totalEstudiantes: 245,
            promedioGeneral: 82.5,
            asistenciaPromedio: 94.2,
            casosBienestar: 18
        };

        document.getElementById('total-estudiantes').textContent = resumen.totalEstudiantes;
        document.getElementById('promedio-general').textContent = resumen.promedioGeneral + '%';
        document.getElementById('asistencia-promedio').textContent = resumen.asistenciaPromedio + '%';
        document.getElementById('casos-bienestar').textContent = resumen.casosBienestar;
    },

    // Generar todos los gráficos
    generarGraficos: function() {
        this.generarGraficoNotas();
        this.generarGraficoAsistencia();
        this.generarGraficoBienestar();
        this.generarGraficoMaterias();
    },

    // Gráfico de distribución de notas
    generarGraficoNotas: function() {
        const ctx = document.getElementById('graficoNotas').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (this.charts.notas) {
            this.charts.notas.destroy();
        }

        // Datos de ejemplo
        const data = {
            labels: ['0-59', '60-69', '70-79', '80-89', '90-100'],
            datasets: [{
                label: 'Cantidad de Estudiantes',
                data: [5, 15, 45, 120, 60],
                backgroundColor: [
                    '#dc3545',
                    '#ffc107',
                    '#17a2b8',
                    '#28a745',
                    '#20c997'
                ],
                borderWidth: 1
            }]
        };

        this.charts.notas = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Distribución de Calificaciones'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    // Gráfico de asistencia por grado
    generarGraficoAsistencia: function() {
        const ctx = document.getElementById('graficoAsistencia').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (this.charts.asistencia) {
            this.charts.asistencia.destroy();
        }

        const data = {
            labels: ['1° Grado', '2° Grado', '3° Grado', '4° Grado', '5° Grado'],
            datasets: [{
                label: 'Porcentaje de Asistencia',
                data: [92.5, 94.8, 96.2, 93.7, 95.1],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };

        this.charts.asistencia = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Porcentaje (%)'
                        }
                    }
                }
            }
        });
    },

    // Gráfico de casos de bienestar
    generarGraficoBienestar: function() {
        const ctx = document.getElementById('graficoBienestar').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (this.charts.bienestar) {
            this.charts.bienestar.destroy();
        }

        const data = {
            labels: ['Salud', 'Psicológico', 'Académico', 'Social', 'Disciplinario'],
            datasets: [{
                data: [8, 12, 15, 6, 4],
                backgroundColor: [
                    '#ff6b6b',
                    '#4ecdc4',
                    '#45b7d1',
                    '#96ceb4',
                    '#feca57'
                ]
            }]
        };

        this.charts.bienestar = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    },

    // Gráfico de rendimiento por materia
    generarGraficoMaterias: function() {
        const ctx = document.getElementById('graficoMaterias').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (this.charts.materias) {
            this.charts.materias.destroy();
        }

        const data = {
            labels: ['Matemáticas', 'Lenguaje', 'Ciencias', 'Historia', 'Inglés', 'Arte'],
            datasets: [{
                label: 'Promedio General',
                data: [78.5, 85.2, 82.1, 88.7, 79.8, 91.2],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        };

        this.charts.materias = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Calificación Promedio'
                        }
                    }
                }
            }
        });
    },

    // Cargar tablas de datos
    cargarTablas: function() {
        this.cargarTablaTopEstudiantes();
        this.cargarTablaTopMaterias();
    },

    // Cargar tabla de mejores estudiantes
    cargarTablaTopEstudiantes: function() {
        const tbody = document.querySelector('#tablaTopEstudiantes tbody');
        
        const estudiantes = [
            { nombre: 'Ana García López', grado: '11°', promedio: 95.8 },
            { nombre: 'Carlos Méndez Ruiz', grado: '10°', promedio: 94.2 },
            { nombre: 'María Rodríguez Silva', grado: '11°', promedio: 93.7 },
            { nombre: 'Juan Pérez Martínez', grado: '10°', promedio: 92.1 },
            { nombre: 'Laura Hernández Díaz', grado: '11°', promedio: 91.5 },
            { nombre: 'David González Castro', grado: '10°', promedio: 90.9 },
            { nombre: 'Sofia López Mendoza', grado: '11°', promedio: 90.3 },
            { nombre: 'Miguel Torres Rojas', grado: '10°', promedio: 89.7 },
            { nombre: 'Elena Castro Vargas', grado: '11°', promedio: 89.2 },
            { nombre: 'Javier Ramírez Ortega', grado: '10°', promedio: 88.6 }
        ];

        let html = '';
        estudiantes.forEach((est, index) => {
            let badgeClass = '';
            if (index === 0) badgeClass = 'badge-success';
            else if (index < 3) badgeClass = 'badge-primary';
            else if (index < 5) badgeClass = 'badge-info';
            
            html += `
                <tr>
                    <td>
                        <span class="badge ${badgeClass}">${index + 1}</span>
                    </td>
                    <td>${est.nombre}</td>
                    <td>${est.grado}</td>
                    <td>
                        <strong>${est.promedio}%</strong>
                        <div class="progress" style="height: 5px;">
                            <div class="progress-bar" role="progressbar" style="width: ${est.promedio}%"></div>
                        </div>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    },

    // Cargar tabla de mejores materias
    cargarTablaTopMaterias: function() {
        const tbody = document.querySelector('#tablaTopMaterias tbody');
        
        const materias = [
            { nombre: 'Arte', promedio: 91.2, estudiantes: 245 },
            { nombre: 'Historia', promedio: 88.7, estudiantes: 240 },
            { nombre: 'Lenguaje', promedio: 85.2, estudiantes: 245 },
            { nombre: 'Ciencias', promedio: 82.1, estudiantes: 242 },
            { nombre: 'Inglés', promedio: 79.8, estudiantes: 238 },
            { nombre: 'Matemáticas', promedio: 78.5, estudiantes: 245 }
        ];

        let html = '';
        materias.forEach(materia => {
            html += `
                <tr>
                    <td>
                        <strong>${materia.nombre}</strong>
                    </td>
                    <td>
                        <span class="badge badge-success">${materia.promedio}%</span>
                    </td>
                    <td>${materia.estudiantes}</td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    },

    // Generar reporte con filtros
    generarReporte: function() {
        const anio = document.getElementById('filtro-anio').value;
        const grado = document.getElementById('filtro-grado').value;
        const periodo = document.getElementById('filtro-periodo').value;

        console.log('Generando reporte con filtros:', { anio, grado, periodo });
        
        // Simular carga de datos con filtros
        this.mostrarCargando();
        
        setTimeout(() => {
            this.actualizarDatos();
            this.ocultarCargando();
            this.mostrarMensaje('Reporte generado exitosamente', 'success');
        }, 1000);
    },

    // Actualizar datos con filtros aplicados
    actualizarDatos: function() {
        const anio = document.getElementById('filtro-anio').value;
        const grado = document.getElementById('filtro-grado').value;
        const periodo = document.getElementById('filtro-periodo').value;

        // Simular datos actualizados basados en filtros
        let datosFiltrados = this.obtenerDatosFiltrados(anio, grado, periodo);
        
        // Actualizar resumen
        document.getElementById('total-estudiantes').textContent = datosFiltrados.resumen.totalEstudiantes;
        document.getElementById('promedio-general').textContent = datosFiltrados.resumen.promedioGeneral + '%';
        document.getElementById('asistencia-promedio').textContent = datosFiltrados.resumen.asistenciaPromedio + '%';
        document.getElementById('casos-bienestar').textContent = datosFiltrados.resumen.casosBienestar;

        // Actualizar gráficos
        this.actualizarGraficos(datosFiltrados);
    },

    // Obtener datos filtrados (simulación)
    obtenerDatosFiltrados: function(anio, grado, periodo) {
        // En una implementación real, esto vendría de una API
        return {
            resumen: {
                totalEstudiantes: 245 - (grado ? 50 : 0),
                promedioGeneral: 82.5 + (parseInt(anio) - 2024),
                asistenciaPromedio: 94.2 - (periodo ? 2 : 0),
                casosBienestar: 18 + (grado ? 5 : 0)
            },
            notas: [4, 14, 44, 118, 59],
            asistencia: [91.5, 93.8, 95.2, 92.7, 94.1],
            bienestar: [7, 11, 14, 5, 3],
            materias: [77.5, 84.2, 81.1, 87.7, 78.8, 90.2]
        };
    },

    // Actualizar gráficos con nuevos datos
    actualizarGraficos: function(datos) {
        // Actualizar gráfico de notas
        if (this.charts.notas) {
            this.charts.notas.data.datasets[0].data = datos.notas;
            this.charts.notas.update();
        }

        // Actualizar gráfico de asistencia
        if (this.charts.asistencia) {
            this.charts.asistencia.data.datasets[0].data = datos.asistencia;
            this.charts.asistencia.update();
        }

        // Actualizar gráfico de bienestar
        if (this.charts.bienestar) {
            this.charts.bienestar.data.datasets[0].data = datos.bienestar;
            this.charts.bienestar.update();
        }

        // Actualizar gráfico de materias
        if (this.charts.materias) {
            this.charts.materias.data.datasets[0].data = datos.materias;
            this.charts.materias.update();
        }
    },

    // Exportar reporte
    exportarReporte: function() {
        const anio = document.getElementById('filtro-anio').value;
        const grado = document.getElementById('filtro-grado').value;
        const periodo = document.getElementById('filtro-periodo').value;

        console.log('Exportando reporte con filtros:', { anio, grado, periodo });
        
        // Simular exportación
        this.mostrarCargando();
        
        setTimeout(() => {
            this.ocultarCargando();
            this.mostrarMensaje('Reporte exportado exitosamente como PDF', 'success');
            
            // En una implementación real, aquí se generaría y descargaría el PDF
            // this.generarPDF();
        }, 1500);
    },

    // Mostrar estado de carga
    mostrarCargando: function() {
        // Podría implementarse un spinner o overlay de carga
        console.log('Cargando...');
    },

    // Ocultar estado de carga
    ocultarCargando: function() {
        console.log('Carga completada');
    },

    // Mostrar mensaje
    mostrarMensaje: function(mensaje, tipo) {
        // Podría implementarse un sistema de notificaciones
        alert(mensaje);
    }

    // Nota: En una implementación real, se agregaría:
    // - generarPDF() para exportar reportes
    // - Más gráficos y estadísticas
    // - Conexión con APIs reales
    // - Sistema de caché para mejorar rendimiento
};

// Inicializar el módulo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    estadisticas.inicializar();
});