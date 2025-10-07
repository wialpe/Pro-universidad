let bienestarActual = null;

// Función para mostrar el modal con información del registro de bienestar
function verBienestar(id) {
    const bienestarEjemplo = {
        1: {
            id: 1,
            estudiante_nombre: "Alan Brito",
            grado: "10°",
            edad: "16 años",
            acudiente: "María Brito",
            tipo: "Académico",
            fecha: "2024-03-15",
            estado: "En Seguimiento",
            descripcion: "Bajo rendimiento en matemáticas. Se observa falta de participación en clase.",
            acciones: "Entrevista con el estudiante, comunicación con el acudiente, refuerzo académico programado.",
            observaciones: "El estudiante muestra interés pero tiene dificultades de comprensión.",
            registrado_por: "Psic. Laura Méndez",
            seguimiento: [
                { fecha: "2024-03-15", accion: "Entrevista inicial con el estudiante", responsable: "Psic. Laura Méndez" },
                { fecha: "2024-03-16", accion: "Comunicación con acudiente", responsable: "Psic. Laura Méndez" },
                { fecha: "2024-03-18", accion: "Programa de refuerzo académico", responsable: "Prof. Carlos Ruiz" }
            ]
        },
        2: {
            id: 2,
            estudiante_nombre: "Zoyla Vaca",
            grado: "11°",
            edad: "17 años",
            acudiente: "Juan Vaca",
            tipo: "Salud",
            fecha: "2024-03-10",
            estado: "Resuelto",
            descripcion: "Dolor de cabeza frecuente durante las clases de la mañana.",
            acciones: "Evaluación por enfermería, recomendaciones médicas, ajuste de horario de actividades.",
            observaciones: "Se descartó problema visual, se recomienda hidratación y descanso adecuado.",
            registrado_por: "Enf. Roberto Silva",
            seguimiento: [
                { fecha: "2024-03-10", accion: "Evaluación inicial en enfermería", responsable: "Enf. Roberto Silva" },
                { fecha: "2024-03-12", accion: "Seguimiento y recomendaciones", responsable: "Enf. Roberto Silva" },
                { fecha: "2024-03-15", accion: "Alta del caso", responsable: "Enf. Roberto Silva" }
            ]
        }
    };

    const registro = bienestarEjemplo[id];
    if (registro) {
        bienestarActual = registro;
        
        // Poblar información básica
        document.getElementById('modal-estudiante-nombre').textContent = registro.estudiante_nombre;
        document.getElementById('modal-grado').textContent = registro.grado;
        document.getElementById('modal-edad').textContent = registro.edad;
        document.getElementById('modal-acudiente').textContent = registro.acudiente;
        document.getElementById('modal-tipo').textContent = registro.tipo;
        document.getElementById('modal-fecha').textContent = new Date(registro.fecha).toLocaleDateString('es-ES');
        document.getElementById('modal-registrado-por').textContent = registro.registrado_por;
        
        // Estado con badge
        const estadoElement = document.getElementById('modal-estado');
        let badgeClass = '';
        switch(registro.estado) {
            case 'Activo': badgeClass = 'badge-danger'; break;
            case 'En Seguimiento': badgeClass = 'badge-warning'; break;
            case 'Resuelto': badgeClass = 'badge-success'; break;
        }
        estadoElement.innerHTML = `<span class="badge ${badgeClass}">${registro.estado}</span>`;
        
        // Descripción
        document.getElementById('modal-descripcion').textContent = registro.descripcion;
        
        // Acciones
        document.getElementById('modal-acciones').textContent = registro.acciones || 'No hay acciones registradas';
        
        // Seguimiento
        const seguimientoElement = document.getElementById('modal-seguimiento');
        if (registro.seguimiento && registro.seguimiento.length > 0) {
            let seguimientoHTML = '';
            registro.seguimiento.forEach(seg => {
                seguimientoHTML += `
                    <div class="mb-2">
                        <strong>${new Date(seg.fecha).toLocaleDateString('es-ES')}</strong><br>
                        <span>${seg.accion}</span><br>
                        <small class="text-muted">Responsable: ${seg.responsable}</small>
                    </div>
                    <hr>
                `;
            });
            seguimientoElement.innerHTML = seguimientoHTML;
        } else {
            seguimientoElement.innerHTML = '<small class="text-muted">No hay seguimiento registrado</small>';
        }
        
        // Mostrar el modal
        $('#verBienestarModal').modal('show');
    }
}

function editarBienestar() {
    if (bienestarActual) {
        window.location.href = `crear-bienestar.html?id=${bienestarActual.id}`;
    }
}

function imprimirReporte() {
    if (bienestarActual) {
        // Implementar lógica de impresión
        alert('Función de impresión - Reporte de ' + bienestarActual.estudiante_nombre);
    }
}

// Función para aplicar filtros
function aplicarFiltros() {
    const estudiante = document.getElementById('filtro-estudiante').value.toLowerCase();
    const tipo = document.getElementById('filtro-tipo').value;
    const estado = document.getElementById('filtro-estado').value;
    const fecha = document.getElementById('filtro-fecha').value;
    
    const rows = document.querySelectorAll('#table-bienestar tbody tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Filtrar por estudiante
        if (estudiante) {
            const estudianteRow = row.cells[1].textContent.toLowerCase();
            if (!estudianteRow.includes(estudiante)) {
                showRow = false;
            }
        }
        
        // Filtrar por tipo
        if (tipo && !row.cells[2].textContent.includes(tipo)) {
            showRow = false;
        }
        
        // Filtrar por estado
        if (estado) {
            const estadoRow = row.cells[4].textContent.toLowerCase();
            if (!estadoRow.includes(estado.toLowerCase())) {
                showRow = false;
            }
        }
        
        // Filtrar por fecha
        if (fecha) {
            const fechaRow = row.cells[3].textContent;
            if (fechaRow !== fecha) {
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
            verBienestar(id);
        });
    });

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#table-bienestar tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Filtros
    const filtros = document.querySelectorAll('#filtro-estudiante, #filtro-tipo, #filtro-estado, #filtro-fecha');
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
            eliminarBienestar(id);
        });
    });

    // Cargar estadísticas iniciales
    cargarEstadisticas();
});

function eliminarBienestar(id) {
    if (confirm('¿Está seguro de que desea eliminar este registro de bienestar?')) {
        // Aquí iría la llamada a la API para eliminar
        console.log('Eliminando registro de bienestar:', id);
        alert('Registro de bienestar eliminado exitosamente');
        // Recargar la página o eliminar la fila de la tabla
        location.reload();
    }
}

function cargarEstadisticas() {
    // Simular carga de estadísticas
    document.getElementById('total-registros').textContent = '24';
    document.getElementById('total-resueltos').textContent = '15';
    document.getElementById('total-seguimiento').textContent = '7';
    document.getElementById('total-activos').textContent = '2';
}