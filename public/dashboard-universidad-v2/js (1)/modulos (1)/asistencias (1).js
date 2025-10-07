let asistenciaActual = null;

// Función para mostrar el modal con información de la asistencia
function verAsistencia(id) {
    const asistenciasEjemplo = {
        1: {
            id: 1,
            estudiante_nombre: "Alan Brito",
            grado: "10°",
            asignatura: "Matemáticas",
            docente: "Prof. María González",
            fecha: "2024-03-15",
            hora: "08:00 AM",
            estado: "Presente",
            observaciones: "",
            registrado_por: "Admin Sistema",
            historial: [
                { fecha: "2024-03-14", estado: "Presente", asignatura: "Matemáticas" },
                { fecha: "2024-03-13", estado: "Presente", asignatura: "Matemáticas" },
                { fecha: "2024-03-12", estado: "Tardanza", asignatura: "Matemáticas" },
                { fecha: "2024-03-11", estado: "Presente", asignatura: "Matemáticas" },
                { fecha: "2024-03-08", estado: "Ausente", asignatura: "Matemáticas" }
            ]
        },
        2: {
            id: 2,
            estudiante_nombre: "Zoyla Vaca",
            grado: "11°",
            asignatura: "Matemáticas",
            docente: "Prof. María González",
            fecha: "2024-03-15",
            hora: "08:15 AM",
            estado: "Tardanza",
            observaciones: "Llegó 15 minutos tarde",
            registrado_por: "Admin Sistema",
            historial: [
                { fecha: "2024-03-14", estado: "Presente", asignatura: "Matemáticas" },
                { fecha: "2024-03-13", estado: "Justificado", asignatura: "Matemáticas" },
                { fecha: "2024-03-12", estado: "Presente", asignatura: "Matemáticas" },
                { fecha: "2024-03-11", estado: "Presente", asignatura: "Matemáticas" },
                { fecha: "2024-03-08", estado: "Tardanza", asignatura: "Matemáticas" }
            ]
        },
        3: {
            id: 3,
            estudiante_nombre: "Alan Brito",
            grado: "10°",
            asignatura: "Lenguaje",
            docente: "Prof. Carlos Rodríguez",
            fecha: "2024-03-16",
            hora: "10:00 AM",
            estado: "Ausente",
            observaciones: "Enfermedad - Se presentó certificado médico",
            registrado_por: "Admin Sistema",
            historial: [
                { fecha: "2024-03-15", estado: "Presente", asignatura: "Lenguaje" },
                { fecha: "2024-03-14", estado: "Presente", asignatura: "Lenguaje" },
                { fecha: "2024-03-13", estado: "Presente", asignatura: "Lenguaje" },
                { fecha: "2024-03-12", estado: "Ausente", asignatura: "Lenguaje" },
                { fecha: "2024-03-11", estado: "Presente", asignatura: "Lenguaje" }
            ]
        },
        4: {
            id: 4,
            estudiante_nombre: "Zoyla Vaca",
            grado: "11°",
            asignatura: "Ciencias",
            docente: "Prof. Ana Martínez",
            fecha: "2024-03-17",
            hora: "09:00 AM",
            estado: "Justificado",
            observaciones: "Cita médica programada - Justificación aprobada",
            registrado_por: "Admin Sistema",
            historial: [
                { fecha: "2024-03-16", estado: "Presente", asignatura: "Ciencias" },
                { fecha: "2024-03-15", estado: "Presente", asignatura: "Ciencias" },
                { fecha: "2024-03-14", estado: "Justificado", asignatura: "Ciencias" },
                { fecha: "2024-03-13", estado: "Presente", asignatura: "Ciencias" },
                { fecha: "2024-03-12", estado: "Presente", asignatura: "Ciencias" }
            ]
        }
    };

    const asistencia = asistenciasEjemplo[id];
    if (asistencia) {
        asistenciaActual = asistencia;
        
        // Poblar información básica
        document.getElementById('modal-estudiante-nombre').textContent = asistencia.estudiante_nombre;
        document.getElementById('modal-grado').textContent = asistencia.grado;
        document.getElementById('modal-asignatura').textContent = asistencia.asignatura;
        document.getElementById('modal-docente').textContent = asistencia.docente;
        document.getElementById('modal-fecha').textContent = new Date(asistencia.fecha).toLocaleDateString('es-ES');
        document.getElementById('modal-hora').textContent = asistencia.hora;
        document.getElementById('modal-registrado-por').textContent = asistencia.registrado_por;
        
        // Estado con badge
        const estadoElement = document.getElementById('modal-estado');
        let badgeClass = '';
        switch(asistencia.estado) {
            case 'Presente': badgeClass = 'badge-success'; break;
            case 'Ausente': badgeClass = 'badge-danger'; break;
            case 'Tardanza': badgeClass = 'badge-warning'; break;
            case 'Justificado': badgeClass = 'badge-info'; break;
        }
        estadoElement.innerHTML = `<span class="badge ${badgeClass}">${asistencia.estado}</span>`;
        
        // Observaciones
        document.getElementById('modal-observaciones').textContent = 
            asistencia.observaciones || 'No hay observaciones registradas';
        
        // Historial
        const historialElement = document.getElementById('modal-historial');
        if (asistencia.historial && asistencia.historial.length > 0) {
            let historialHTML = '';
            asistencia.historial.forEach(registro => {
                let estadoBadge = '';
                switch(registro.estado) {
                    case 'Presente': estadoBadge = 'badge-success'; break;
                    case 'Ausente': estadoBadge = 'badge-danger'; break;
                    case 'Tardanza': estadoBadge = 'badge-warning'; break;
                    case 'Justificado': estadoBadge = 'badge-info'; break;
                }
                historialHTML += `
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span>${new Date(registro.fecha).toLocaleDateString('es-ES')} - ${registro.asignatura}</span>
                        <span class="badge ${estadoBadge}">${registro.estado}</span>
                    </div>
                `;
            });
            historialElement.innerHTML = historialHTML;
        } else {
            historialElement.innerHTML = '<small class="text-muted">No hay historial disponible</small>';
        }
        
        // Mostrar el modal
        $('#verAsistenciaModal').modal('show');
    }
}

function editarAsistencia() {
    if (asistenciaActual) {
        window.location.href = `crear-asistencia.html?id=${asistenciaActual.id}`;
    }
}

function imprimirJustificante() {
    if (asistenciaActual) {
        // Implementar lógica de impresión
        alert('Función de impresión - Justificante de ' + asistenciaActual.estudiante_nombre);
    }
}

// Función para aplicar filtros
function aplicarFiltros() {
    const fecha = document.getElementById('filtro-fecha').value;
    const grado = document.getElementById('filtro-grado').value;
    const asignatura = document.getElementById('filtro-asignatura').value;
    const estado = document.getElementById('filtro-estado').value;
    
    const rows = document.querySelectorAll('#table-asistencias tbody tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Filtrar por fecha
        if (fecha) {
            const fechaRow = row.cells[4].textContent;
            if (fechaRow !== fecha) {
                showRow = false;
            }
        }
        
        // Filtrar por grado
        if (grado && !row.cells[2].textContent.includes(grado)) {
            showRow = false;
        }
        
        // Filtrar por asignatura
        if (asignatura && !row.cells[3].textContent.toLowerCase().includes(asignatura.toLowerCase())) {
            showRow = false;
        }
        
        // Filtrar por estado
        if (estado) {
            const estadoRow = row.cells[6].textContent.toLowerCase();
            if (!estadoRow.includes(estado.toLowerCase())) {
                showRow = false;
            }
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Agregar event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botones de ver
    const botonesVer = document.querySelectorAll('.btn-view');
    botonesVer.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            verAsistencia(id);
        });
    });

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#table-asistencias tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Filtros
    const filtros = document.querySelectorAll('#filtro-fecha, #filtro-grado, #filtro-asignatura, #filtro-estado');
    filtros.forEach(filtro => {
        filtro.addEventListener('change', aplicarFiltros);
    });

    // Establecer fecha actual por defecto en filtro
    const filtroFecha = document.getElementById('filtro-fecha');
    if (filtroFecha) {
        const today = new Date().toISOString().split('T')[0];
        filtroFecha.value = today;
    }

    // Funcionalidad de eliminar
    const botonesEliminar = document.querySelectorAll('.btn-delete');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            eliminarAsistencia(id);
        });
    });
});

function eliminarAsistencia(id) {
    if (confirm('¿Está seguro de que desea eliminar este registro de asistencia?')) {
        // Aquí iría la llamada a la API para eliminar
        console.log('Eliminando asistencia:', id);
        alert('Registro de asistencia eliminado exitosamente');
        // Recargar la página o eliminar la fila de la tabla
        location.reload();
    }
}