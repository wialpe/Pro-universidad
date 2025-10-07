document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en modo edición (hay un ID en la URL)
    const urlParams = new URLSearchParams(window.location.search);
    const historialId = urlParams.get('id');

    if (historialId) {
        // Modo edición: cargar los datos del historial
        cargarHistorial(historialId);
        document.querySelector('.btn-create').classList.add('d-none');
        document.querySelector('.btn-update').classList.remove('d-none');
    }

    // Evento para el botón de crear
    document.querySelector('.btn-create').addEventListener('click', function() {
        crearHistorial();
    });

    // Evento para el botón de actualizar
    document.querySelector('.btn-update').addEventListener('click', function() {
        actualizarHistorial(historialId);
    });
});

function cargarHistorial(id) {
    // Simulamos la carga de datos desde una API
    const historialesEjemplo = {
        1: {
            estudiante_id: "1",
            institucion_anterior: "Colegio Los Alamos",
            anio_graduacion: 2023,
            promedio_anterior: 4.5,
            conducta_anterior: "Excelente",
            logros: "Primer puesto en Olimpiadas de Matemáticas, Campeón regional de atletismo",
            actividades: "Equipo de baloncesto, Club de robótica, Voluntariado comunitario",
            observaciones: "Estudiante destacado con excelente rendimiento académico y participación activa en actividades extracurriculares."
        },
        2: {
            estudiante_id: "2",
            institucion_anterior: "Colegio Las Violetas",
            anio_graduacion: 2023,
            promedio_anterior: 4.2,
            conducta_anterior: "Buena",
            logros: "Mención honorífica en concurso de literatura, Participación en modelo ONU",
            actividades: "Grupo de teatro, Club de debate, Coro estudiantil",
            observaciones: "Estudiante con buen desempeño, especialmente en áreas humanísticas. Participa activamente en actividades culturales."
        }
    };

    const historial = historialesEjemplo[id];
    if (historial) {
        document.getElementById('estudiante-select').value = historial.estudiante_id;
        document.getElementById('institucion-anterior').value = historial.institucion_anterior;
        document.getElementById('anio-graduacion').value = historial.anio_graduacion;
        document.getElementById('promedio-anterior').value = historial.promedio_anterior;
        document.getElementById('conducta-anterior').value = historial.conducta_anterior;
        document.getElementById('logros').value = historial.logros;
        document.getElementById('actividades').value = historial.actividades;
        document.getElementById('observaciones').value = historial.observaciones;
    }
}

function crearHistorial() {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        institucion_anterior: document.getElementById('institucion-anterior').value,
        anio_graduacion: document.getElementById('anio-graduacion').value,
        promedio_anterior: document.getElementById('promedio-anterior').value,
        conducta_anterior: document.getElementById('conducta-anterior').value,
        logros: document.getElementById('logros').value,
        actividades: document.getElementById('actividades').value,
        observaciones: document.getElementById('observaciones').value
    };

    // Aquí iría la llamada a la API para crear el historial
    console.log('Creando historial:', formData);
    alert('HV Estudiantil creado exitosamente');
    window.location.href = 'listado-historial.html';
}

function actualizarHistorial(id) {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        institucion_anterior: document.getElementById('institucion-anterior').value,
        anio_graduacion: document.getElementById('anio-graduacion').value,
        promedio_anterior: document.getElementById('promedio-anterior').value,
        conducta_anterior: document.getElementById('conducta-anterior').value,
        logros: document.getElementById('logros').value,
        actividades: document.getElementById('actividades').value,
        observaciones: document.getElementById('observaciones').value
    };

    // Aquí iría la llamada a la API para actualizar el historial
    console.log('Actualizando historial:', id, formData);
    alert('HV Estudiantil actualizado exitosamente');
    window.location.href = 'listado-historial.html';
}

function validarFormulario() {
    // Validación básica
    const requiredFields = [
        'estudiante-select',
        'institucion-anterior',
        'anio-graduacion',
        'promedio-anterior',
        'conducta-anterior'
    ];

    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            alert(`El campo ${field.labels[0].textContent} es obligatorio`);
            field.focus();
            return false;
        }
    }

    // Validar que el promedio esté entre 0 y 5
    const promedio = parseFloat(document.getElementById('promedio-anterior').value);
    if (promedio < 0 || promedio > 5) {
        alert('El promedio debe estar entre 0 y 5');
        return false;
    }

    // Validar que el año sea razonable
    const anio = parseInt(document.getElementById('anio-graduacion').value);
    const currentYear = new Date().getFullYear();
    if (anio < 2000 || anio > currentYear) {
        alert('El año de graduación debe ser razonable');
        return false;
    }

    return true;
}