let historialActual = null;

// Función para mostrar el modal con información del historial
function verHistorial(id) {
    const historialesEjemplo = {
        1: {
            id: 1,
            estudiante_nombre: "Alan Brito",
            institucion_anterior: "Colegio Los Alamos",
            anio_graduacion: 2023,
            promedio: 4.5,
            puesto_clase: 5,
            conducta: "Excelente",
            logros: "Primer puesto en Olimpiadas de Matemáticas, Campeón regional de atletismo",
            actividades: "Equipo de baloncesto, Club de robótica, Voluntariado comunitario",
            observaciones: "Estudiante destacado con excelente rendimiento académico y participación activa en actividades extracurriculares."
        },
        2: {
            id: 2,
            estudiante_nombre: "Zoyla Vaca",
            institucion_anterior: "Colegio Las Violetas",
            anio_graduacion: 2023,
            promedio: 4.2,
            puesto_clase: 8,
            conducta: "Buena",
            logros: "Mención honorífica en concurso de literatura, Participación en modelo ONU",
            actividades: "Grupo de teatro, Club de debate, Coro estudiantil",
            observaciones: "Estudiante con buen desempeño, especialmente en áreas humanísticas. Participa activamente en actividades culturales."
        }
    };

    const historial = historialesEjemplo[id];
    if (historial) {
        historialActual = historial;
        
        // Poblar información básica
        document.getElementById('modal-estudiante-nombre').textContent = historial.estudiante_nombre;
        document.getElementById('modal-institucion').textContent = historial.institucion_anterior;
        document.getElementById('modal-anio-graduacion').textContent = historial.anio_graduacion;
        
        // Información de rendimiento
        document.getElementById('modal-promedio').textContent = historial.promedio;
        document.getElementById('modal-puesto').textContent = historial.puesto_clase;
        document.getElementById('modal-conducta').textContent = historial.conducta;
        
        // Información adicional
        let infoAdicional = `
            <strong>Logros y Reconocimientos:</strong><br>
            ${historial.logros}<br><br>
            <strong>Actividades Extracurriculares:</strong><br>
            ${historial.actividades}<br><br>
            <strong>Observaciones:</strong><br>
            ${historial.observaciones}
        `;
        document.getElementById('modal-informacion-adicional').innerHTML = infoAdicional;
        
        // Mostrar el modal
        $('#verHistorialModal').modal('show');
    }
}

function editarHistorial() {
    if (historialActual) {
        window.location.href = `crear-historial.html?id=${historialActual.id}`;
    }
}

function imprimirHV() {
    if (historialActual) {
        // Implementar lógica de impresión
        alert('Función de impresión - HV de ' + historialActual.estudiante_nombre);
    }
}

// Agregar event listeners a los botones de ver
document.addEventListener('DOMContentLoaded', function() {
    const botonesVer = document.querySelectorAll('.btn-view');
    botonesVer.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            verHistorial(id);
        });
    });

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#table-historial tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
});