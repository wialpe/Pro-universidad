document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en modo edición (hay un ID en la URL)
    const urlParams = new URLSearchParams(window.location.search);
    const asistenciaId = urlParams.get('id');

    if (asistenciaId) {
        // Modo edición: cargar los datos de la asistencia
        cargarAsistencia(asistenciaId);
        document.querySelector('.btn-create').classList.add('d-none');
        document.querySelector('.btn-update').classList.remove('d-none');
    }

    // Evento para el botón de crear
    document.querySelector('.btn-create').addEventListener('click', function() {
        crearAsistencia();
    });

    // Evento para el botón de actualizar
    document.querySelector('.btn-update').addEventListener('click', function() {
        actualizarAsistencia(asistenciaId);
    });

    // Mostrar/ocultar campos según el estado seleccionado
    const radiosEstado = document.querySelectorAll('input[name="estado"]');
    radiosEstado.forEach(radio => {
        radio.addEventListener('change', function() {
            mostrarCamposCondicionales(this.value);
        });
    });

    // Cargar estadísticas cuando se selecciona un estudiante
    const estudianteSelect = document.getElementById('estudiante-select');
    if (estudianteSelect) {
        estudianteSelect.addEventListener('change', function() {
            cargarEstadisticasEstudiante(this.value);
        });
    }

    // Establecer fecha y hora actual por defecto
    const fechaInput = document.getElementById('fecha-clase');
    const horaInput = document.getElementById('hora-clase');
    if (fechaInput) {
        const today = new Date().toISOString().split('T')[0];
        fechaInput.value = today;
    }
    if (horaInput) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        horaInput.value = `${hours}:${minutes}`;
    }
});

function mostrarCamposCondicionales(estado) {
    // Ocultar todos los campos condicionales primero
    document.getElementById('campo-tardanza').style.display = 'none';
    document.getElementById('campo-justificacion').style.display = 'none';

    // Mostrar campos según el estado seleccionado
    switch(estado) {
        case 'tardanza':
            document.getElementById('campo-tardanza').style.display = 'block';
            break;
        case 'ausente':
        case 'justificado':
            document.getElementById('campo-justificacion').style.display = 'block';
            break;
    }
}

function cargarEstadisticasEstudiante(estudianteId) {
    const estadisticasElement = document.getElementById('estadisticas-estudiante');
    
    if (!estudianteId) {
        estadisticasElement.innerHTML = '<p class="text-muted">Selecciona un estudiante para ver sus estadísticas</p>';
        return;
    }

    // Simulamos estadísticas desde una API
    const estadisticasEjemplo = {
        1: {
            nombre: "Alan Brito",
            grado: "10°",
            asistencia_total: "95%",
            ausencias: 2,
            tardanzas: 3,
            justificados: 1,
            ultima_asistencia: "2024-03-15"
        },
        2: {
            nombre: "Zoyla Vaca",
            grado: "11°",
            asistencia_total: "88%",
            ausencias: 5,
            tardanzas: 2,
            justificados: 3,
            ultima_asistencia: "2024-03-15"
        }
    };

    const estadisticas = estadisticasEjemplo[estudianteId];
    if (estadisticas) {
        estadisticasElement.innerHTML = `
            <div class="mb-3">
                <strong>${estadisticas.nombre}</strong><br>
                <small class="text-muted">${estadisticas.grado}</small>
            </div>
            <div class="mb-2">
                <span class="badge badge-success">Asistencia: ${estadisticas.asistencia_total}</span>
            </div>
            <div class="mb-1">
                <small>Ausencias: ${estadisticas.ausencias}</small>
            </div>
            <div class="mb-1">
                <small>Tardanzas: ${estadisticas.tardanzas}</small>
            </div>
            <div class="mb-1">
                <small>Justificados: ${estadisticas.justificados}</small>
            </div>
            <div class="mt-2">
                <small class="text-muted">Última asistencia: ${new Date(estadisticas.ultima_asistencia).toLocaleDateString('es-ES')}</small>
            </div>
        `;
    }
}

function cargarAsistencia(id) {
    // Simulamos la carga de datos desde una API
    const asistenciasEjemplo = {
        1: {
            estudiante_id: "1",
            asignatura: "matematicas",
            fecha_clase: "2024-03-15",
            hora_clase: "08:00",
            estado: "presente",
            observaciones: "",
            notificar_familia: false
        },
        2: {
            estudiante_id: "2",
            asignatura: "matematicas",
            fecha_clase: "2024-03-15",
            hora_clase: "08:15",
            estado: "tardanza",
            minutos_tardanza: 15,
            observaciones: "Llegó 15 minutos tarde",
            notificar_familia: true
        },
        3: {
            estudiante_id: "1",
            asignatura: "lenguaje",
            fecha_clase: "2024-03-16",
            hora_clase: "10:00",
            estado: "ausente",
            tipo_justificacion: "enfermedad",
            observaciones: "Enfermedad - Se presentó certificado médico",
            notificar_familia: true
        }
    };

    const asistencia = asistenciasEjemplo[id];
    if (asistencia) {
        document.getElementById('estudiante-select').value = asistencia.estudiante_id;
        document.getElementById('asignatura-select').value = asistencia.asignatura;
        document.getElementById('fecha-clase').value = asistencia.fecha_clase;
        document.getElementById('hora-clase').value = asistencia.hora_clase;
        document.getElementById(`estado-${asistencia.estado}`).checked = true;
        document.getElementById('observaciones').value = asistencia.observaciones;
        document.getElementById('notificar-familia').checked = asistencia.notificar_familia;

        // Mostrar campos condicionales y cargar datos
        mostrarCamposCondicionales(asistencia.estado);
        
        if (asistencia.estado === 'tardanza' && asistencia.minutos_tardanza) {
            document.getElementById('minutos-tardanza').value = asistencia.minutos_tardanza;
        }
        
        if ((asistencia.estado === 'ausente' || asistencia.estado === 'justificado') && asistencia.tipo_justificacion) {
            document.getElementById('tipo-justificacion').value = asistencia.tipo_justificacion;
        }

        // Cargar estadísticas del estudiante
        cargarEstadisticasEstudiante(asistencia.estudiante_id);
    }
}

function crearAsistencia() {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        asignatura: document.getElementById('asignatura-select').value,
        fecha_clase: document.getElementById('fecha-clase').value,
        hora_clase: document.getElementById('hora-clase').value,
        estado: document.querySelector('input[name="estado"]:checked').value,
        observaciones: document.getElementById('observaciones').value,
        notificar_familia: document.getElementById('notificar-familia').checked
    };

    // Agregar campos condicionales
    const estado = formData.estado;
    if (estado === 'tardanza') {
        formData.minutos_tardanza = document.getElementById('minutos-tardanza').value;
    }
    
    if (estado === 'ausente' || estado === 'justificado') {
        formData.tipo_justificacion = document.getElementById('tipo-justificacion').value;
    }

    // Aquí iría la llamada a la API para crear la asistencia
    console.log('Creando asistencia:', formData);
    alert('Asistencia registrada exitosamente');
    window.location.href = 'listado-asistencias.html';
}

function actualizarAsistencia(id) {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        asignatura: document.getElementById('asignatura-select').value,
        fecha_clase: document.getElementById('fecha-clase').value,
        hora_clase: document.getElementById('hora-clase').value,
        estado: document.querySelector('input[name="estado"]:checked').value,
        observaciones: document.getElementById('observaciones').value,
        notificar_familia: document.getElementById('notificar-familia').checked
    };

    // Agregar campos condicionales
    const estado = formData.estado;
    if (estado === 'tardanza') {
        formData.minutos_tardanza = document.getElementById('minutos-tardanza').value;
    }
    
    if (estado === 'ausente' || estado === 'justificado') {
        formData.tipo_justificacion = document.getElementById('tipo-justificacion').value;
    }

    // Aquí iría la llamada a la API para actualizar la asistencia
    console.log('Actualizando asistencia:', id, formData);
    alert('Asistencia actualizada exitosamente');
    window.location.href = 'listado-asistencias.html';
}

function validarFormulario() {
    // Validación básica
    const requiredFields = [
        'estudiante-select',
        'asignatura-select',
        'fecha-clase',
        'hora-clase'
    ];

    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            alert(`El campo ${field.labels[0].textContent} es obligatorio`);
            field.focus();
            return false;
        }
    }

    // Validar que la fecha no sea futura
    const fechaClase = new Date(document.getElementById('fecha-clase').value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Resetear hora para comparar solo fechas
    
    if (fechaClase > hoy) {
        alert('La fecha de la clase no puede ser futura');
        return false;
    }

    // Validaciones específicas por estado
    const estado = document.querySelector('input[name="estado"]:checked').value;
    
    if (estado === 'tardanza') {
        const minutos = document.getElementById('minutos-tardanza').value;
        if (!minutos || minutos < 1 || minutos > 120) {
            alert('Los minutos de tardanza deben estar entre 1 y 120');
            return false;
        }
    }
    
    if ((estado === 'ausente' || estado === 'justificado') && 
        document.getElementById('tipo-justificacion').value === '') {
        alert('Debe seleccionar un tipo de justificación');
        return false;
    }

    return true;
}