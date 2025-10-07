document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en modo edición (hay un ID en la URL)
    const urlParams = new URLSearchParams(window.location.search);
    const bienestarId = urlParams.get('id');

    if (bienestarId) {
        // Modo edición: cargar los datos del registro
        cargarBienestar(bienestarId);
        document.querySelector('.btn-create').classList.add('d-none');
        document.querySelector('.btn-update').classList.remove('d-none');
    }

    // Evento para el botón de crear
    document.querySelector('.btn-create').addEventListener('click', function() {
        crearBienestar();
    });

    // Evento para el botón de actualizar
    document.querySelector('.btn-update').addEventListener('click', function() {
        actualizarBienestar(bienestarId);
    });

    // Cargar información del estudiante cuando se selecciona
    const estudianteSelect = document.getElementById('estudiante-select');
    if (estudianteSelect) {
        estudianteSelect.addEventListener('change', function() {
            cargarInfoEstudiante(this.value);
        });
    }

    // Establecer fecha actual por defecto
    const fechaInput = document.getElementById('fecha-registro');
    if (fechaInput) {
        const today = new Date().toISOString().split('T')[0];
        fechaInput.value = today;
    }
});

function cargarInfoEstudiante(estudianteId) {
    const infoElement = document.getElementById('info-estudiante');
    
    if (!estudianteId) {
        infoElement.innerHTML = '<p class="text-muted">Selecciona un estudiante para ver su información</p>';
        return;
    }

    // Simulamos información desde una API
    const infoEjemplo = {
        1: {
            nombre: "Alan Brito",
            grado: "10°",
            edad: "16 años",
            acudiente: "María Brito",
            telefono: "300-123-4567",
            alergias: "Ninguna",
            observaciones: "Estudiante aplicado, con dificultades en matemáticas."
        },
        2: {
            nombre: "Zoyla Vaca",
            grado: "11°",
            edad: "17 años",
            acudiente: "Juan Vaca",
            telefono: "300-765-4321",
            alergias: "Polen",
            observaciones: "Buena estudiante, participativa en clase."
        }
    };

    const info = infoEjemplo[estudianteId];
    if (info) {
        infoElement.innerHTML = `
            <div class="mb-3">
                <strong>${info.nombre}</strong><br>
                <small class="text-muted">${info.grado} - ${info.edad}</small>
            </div>
            <div class="mb-2">
                <strong>Acudiente:</strong> ${info.acudiente}<br>
                <strong>Teléfono:</strong> ${info.telefono}
            </div>
            <div class="mb-2">
                <strong>Alergias:</strong> ${info.alergias}
            </div>
            <div class="mb-2">
                <strong>Observaciones:</strong> ${info.observaciones}
            </div>
        `;
    }
}

function cargarBienestar(id) {
    // Simulamos la carga de datos desde una API
    const bienestarEjemplo = {
        1: {
            estudiante_id: "1",
            tipo: "academico",
            fecha_registro: "2024-03-15",
            estado: "seguimiento",
            descripcion: "Bajo rendimiento en matemáticas. Se observa falta de participación en clase.",
            acciones_tomadas: "Entrevista con el estudiante, comunicación con el acudiente, refuerzo académico programado.",
            observaciones: "El estudiante muestra interés pero tiene dificultades de comprensión.",
            proximos_pasos: "Seguimiento semanal, evaluación de progreso en refuerzo.",
            fecha_seguimiento: "2024-03-22",
            notificar_familia: true
        },
        2: {
            estudiante_id: "2",
            tipo: "salud",
            fecha_registro: "2024-03-10",
            estado: "resuelto",
            descripcion: "Dolor de cabeza frecuente durante las clases de la mañana.",
            acciones_tomadas: "Evaluación por enfermería, recomendaciones médicas, ajuste de horario de actividades.",
            observaciones: "Se descartó problema visual, se recomienda hidratación y descanso adecuado.",
            proximos_pasos: "",
            fecha_seguimiento: "",
            notificar_familia: false
        }
    };

    const registro = bienestarEjemplo[id];
    if (registro) {
        document.getElementById('estudiante-select').value = registro.estudiante_id;
        document.getElementById('tipo-caso').value = registro.tipo;
        document.getElementById('fecha-registro').value = registro.fecha_registro;
        document.getElementById('estado-caso').value = registro.estado;
        document.getElementById('descripcion').value = registro.descripcion;
        document.getElementById('acciones-tomadas').value = registro.acciones_tomadas;
        document.getElementById('observaciones').value = registro.observaciones;
        document.getElementById('proximos-pasos').value = registro.proximos_pasos;
        document.getElementById('fecha-seguimiento').value = registro.fecha_seguimiento;
        document.getElementById('notificar-familia').checked = registro.notificar_familia;

        // Cargar información del estudiante
        cargarInfoEstudiante(registro.estudiante_id);
    }
}

function crearBienestar() {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        tipo: document.getElementById('tipo-caso').value,
        fecha_registro: document.getElementById('fecha-registro').value,
        estado: document.getElementById('estado-caso').value,
        descripcion: document.getElementById('descripcion').value,
        acciones_tomadas: document.getElementById('acciones-tomadas').value,
        observaciones: document.getElementById('observaciones').value,
        proximos_pasos: document.getElementById('proximos-pasos').value,
        fecha_seguimiento: document.getElementById('fecha-seguimiento').value,
        notificar_familia: document.getElementById('notificar-familia').checked
    };

    // Aquí iría la llamada a la API para crear el registro
    console.log('Creando registro de bienestar:', formData);
    alert('Registro de bienestar creado exitosamente');
    window.location.href = 'listado-bienestar.html';
}

function actualizarBienestar(id) {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        tipo: document.getElementById('tipo-caso').value,
        fecha_registro: document.getElementById('fecha-registro').value,
        estado: document.getElementById('estado-caso').value,
        descripcion: document.getElementById('descripcion').value,
        acciones_tomadas: document.getElementById('acciones-tomadas').value,
        observaciones: document.getElementById('observaciones').value,
        proximos_pasos: document.getElementById('proximos-pasos').value,
        fecha_seguimiento: document.getElementById('fecha-seguimiento').value,
        notificar_familia: document.getElementById('notificar-familia').checked
    };

    // Aquí iría la llamada a la API para actualizar el registro
    console.log('Actualizando registro de bienestar:', id, formData);
    alert('Registro de bienestar actualizado exitosamente');
    window.location.href = 'listado-bienestar.html';
}

function validarFormulario() {
    // Validación básica
    const requiredFields = [
        'estudiante-select',
        'tipo-caso',
        'fecha-registro',
        'estado-caso',
        'descripcion'
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
    const fechaRegistro = new Date(document.getElementById('fecha-registro').value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Resetear hora para comparar solo fechas
    
    if (fechaRegistro > hoy) {
        alert('La fecha del reporte no puede ser futura');
        return false;
    }

    return true;
}