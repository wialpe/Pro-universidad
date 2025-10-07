document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en modo edición (hay un ID en la URL)
    const urlParams = new URLSearchParams(window.location.search);
    const notaId = urlParams.get('id');

    if (notaId) {
        // Modo edición: cargar los datos de la nota
        cargarNota(notaId);
        document.querySelector('.btn-create').classList.add('d-none');
        document.querySelector('.btn-update').classList.remove('d-none');
    }

    // Evento para el botón de crear
    document.querySelector('.btn-create').addEventListener('click', function() {
        crearNota();
    });

    // Evento para el botón de actualizar
    document.querySelector('.btn-update').addEventListener('click', function() {
        actualizarNota(notaId);
    });

    // Calcular promedio automáticamente
    const inputsNotas = document.querySelectorAll('#nota1, #nota2, #nota3');
    inputsNotas.forEach(input => {
        input.addEventListener('input', calcularPromedio);
    });

    // Establecer fecha actual por defecto
    const fechaInput = document.getElementById('fecha-evaluacion');
    if (fechaInput) {
        const today = new Date().toISOString().split('T')[0];
        fechaInput.value = today;
    }
});

function calcularPromedio() {
    const nota1 = parseFloat(document.getElementById('nota1').value) || 0;
    const nota2 = parseFloat(document.getElementById('nota2').value) || 0;
    const nota3 = parseFloat(document.getElementById('nota3').value) || 0;

    // Calcular promedio ponderado
    const promedio = (nota1 * 0.3) + (nota2 * 0.3) + (nota3 * 0.4);
    
    // Actualizar el display del promedio
    const promedioElement = document.getElementById('promedio-calculado');
    const estadoElement = document.getElementById('estado-promedio');
    
    if (promedio > 0) {
        promedioElement.querySelector('strong').textContent = promedio.toFixed(1);
        
        // Determinar estado
        let estado = '';
        let clase = '';
        
        if (promedio >= 4.6) {
            estado = 'Excelente';
            clase = 'alert-success';
        } else if (promedio >= 4.0) {
            estado = 'Bueno';
            clase = 'alert-primary';
        } else if (promedio >= 3.0) {
            estado = 'Aceptable';
            clase = 'alert-warning';
        } else {
            estado = 'Reprobado';
            clase = 'alert-danger';
        }
        
        estadoElement.textContent = estado;
        promedioElement.className = `alert ${clase}`;
    } else {
        promedioElement.querySelector('strong').textContent = '0.0';
        estadoElement.textContent = 'Sin calificar';
        promedioElement.className = 'alert alert-info';
    }
}

function cargarNota(id) {
    // Simulamos la carga de datos desde una API
    const notasEjemplo = {
        1: {
            estudiante_id: "1",
            asignatura: "matematicas",
            periodo: "1",
            docente: "1",
            nota1: 4.5,
            nota2: 4.2,
            nota3: 4.8,
            observaciones: "Excelente desempeño en matemáticas. Muestra gran habilidad para resolver problemas complejos y tiene una actitud muy positiva hacia el aprendizaje.",
            recomendaciones: "Continuar con el mismo nivel de dedicación. Se recomienda participar en las olimpiadas de matemáticas.",
            fecha_evaluacion: "2024-03-15"
        },
        2: {
            estudiante_id: "1",
            asignatura: "lenguaje",
            periodo: "1",
            docente: "2",
            nota1: 3.8,
            nota2: 4.0,
            nota3: 4.2,
            observaciones: "Buen desempeño en comprensión lectora y expresión escrita. Mejora notable en la redacción de textos.",
            recomendaciones: "Practicar más la ortografía y ampliar el vocabulario mediante la lectura de diferentes géneros literarios.",
            fecha_evaluacion: "2024-03-20"
        }
    };

    const nota = notasEjemplo[id];
    if (nota) {
        document.getElementById('estudiante-select').value = nota.estudiante_id;
        document.getElementById('asignatura-select').value = nota.asignatura;
        document.getElementById('periodo-select').value = nota.periodo;
        document.getElementById('docente-select').value = nota.docente;
        document.getElementById('nota1').value = nota.nota1;
        document.getElementById('nota2').value = nota.nota2;
        document.getElementById('nota3').value = nota.nota3;
        document.getElementById('observaciones').value = nota.observaciones;
        document.getElementById('recomendaciones').value = nota.recomendaciones;
        document.getElementById('fecha-evaluacion').value = nota.fecha_evaluacion;
        
        // Calcular promedio
        calcularPromedio();
    }
}

function crearNota() {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        asignatura: document.getElementById('asignatura-select').value,
        periodo: document.getElementById('periodo-select').value,
        docente: document.getElementById('docente-select').value,
        nota1: parseFloat(document.getElementById('nota1').value),
        nota2: parseFloat(document.getElementById('nota2').value),
        nota3: parseFloat(document.getElementById('nota3').value),
        observaciones: document.getElementById('observaciones').value,
        recomendaciones: document.getElementById('recomendaciones').value,
        fecha_evaluacion: document.getElementById('fecha-evaluacion').value
    };

    // Aquí iría la llamada a la API para crear la nota
    console.log('Creando nota:', formData);
    alert('Nota registrada exitosamente');
    window.location.href = 'listado-notas.html';
}

function actualizarNota(id) {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        asignatura: document.getElementById('asignatura-select').value,
        periodo: document.getElementById('periodo-select').value,
        docente: document.getElementById('docente-select').value,
        nota1: parseFloat(document.getElementById('nota1').value),
        nota2: parseFloat(document.getElementById('nota2').value),
        nota3: parseFloat(document.getElementById('nota3').value),
        observaciones: document.getElementById('observaciones').value,
        recomendaciones: document.getElementById('recomendaciones').value,
        fecha_evaluacion: document.getElementById('fecha-evaluacion').value
    };

    // Aquí iría la llamada a la API para actualizar la nota
    console.log('Actualizando nota:', id, formData);
    alert('Nota actualizada exitosamente');
    window.location.href = 'listado-notas.html';
}

function validarFormulario() {
    // Validación básica
    const requiredFields = [
        'estudiante-select',
        'asignatura-select',
        'periodo-select',
        'docente-select',
        'nota1',
        'nota2',
        'nota3',
        'fecha-evaluacion'
    ];

    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            alert(`El campo ${field.labels[0].textContent} es obligatorio`);
            field.focus();
            return false;
        }
    }

    // Validar que las notas estén entre 0 y 5
    const notas = ['nota1', 'nota2', 'nota3'];
    for (let notaId of notas) {
        const nota = parseFloat(document.getElementById(notaId).value);
        if (nota < 0 || nota > 5) {
            alert('Las notas deben estar entre 0 y 5');
            document.getElementById(notaId).focus();
            return false;
        }
    }

    // Validar que la fecha no sea futura
    const fechaEvaluacion = new Date(document.getElementById('fecha-evaluacion').value);
    const hoy = new Date();
    if (fechaEvaluacion > hoy) {
        alert('La fecha de evaluación no puede ser futura');
        return false;
    }

    return true;
}