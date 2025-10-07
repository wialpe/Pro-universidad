let notaActual = null;

// Función para mostrar el modal con información de la nota
function verNota(id) {
    const notasEjemplo = {
        1: {
            id: 1,
            estudiante_nombre: "Alan Brito",
            asignatura: "Matemáticas",
            periodo: "Primer Trimestre 2024",
            docente: "Prof. María González",
            nota1: 4.5,
            nota2: 4.2,
            nota3: 4.8,
            promedio: 4.5,
            estado: "Aprobado",
            observaciones: "Excelente desempeño en matemáticas. Muestra gran habilidad para resolver problemas complejos y tiene una actitud muy positiva hacia el aprendizaje.",
            recomendaciones: "Continuar con el mismo nivel de dedicación. Se recomienda participar en las olimpiadas de matemáticas."
        },
        2: {
            id: 2,
            estudiante_nombre: "Alan Brito",
            asignatura: "Lenguaje",
            periodo: "Primer Trimestre 2024",
            docente: "Prof. Carlos Rodríguez",
            nota1: 3.8,
            nota2: 4.0,
            nota3: 4.2,
            promedio: 4.0,
            estado: "Aprobado",
            observaciones: "Buen desempeño en comprensión lectora y expresión escrita. Mejora notable en la redacción de textos.",
            recomendaciones: "Practicar más la ortografía y ampliar el vocabulario mediante la lectura de diferentes géneros literarios."
        },
        3: {
            id: 3,
            estudiante_nombre: "Zoyla Vaca",
            asignatura: "Matemáticas",
            periodo: "Primer Trimestre 2024",
            docente: "Prof. María González",
            nota1: 2.8,
            nota2: 3.0,
            nota3: 2.5,
            promedio: 2.8,
            estado: "Reprobado",
            observaciones: "Dificultades significativas en la comprensión de conceptos matemáticos básicos. Necesita reforzamiento urgente.",
            recomendaciones: "Asistir a clases de refuerzo, practicar ejercicios básicos diariamente y solicitar tutoría individual."
        },
        4: {
            id: 4,
            estudiante_nombre: "Zoyla Vaca",
            asignatura: "Ciencias",
            periodo: "Primer Trimestre 2024",
            docente: "Prof. Ana Martínez",
            nota1: 3.5,
            nota2: 3.8,
            nota3: 4.0,
            promedio: 3.8,
            estado: "Aprobado",
            observaciones: "Buen desempeño en trabajos prácticos y experimentos. Interés notable por las ciencias naturales.",
            recomendaciones: "Mantener el interés y profundizar en los temas mediante investigación adicional."
        }
    };

    const nota = notasEjemplo[id];
    if (nota) {
        notaActual = nota;
        
        // Poblar información básica
        document.getElementById('modal-estudiante-nombre').textContent = nota.estudiante_nombre;
        document.getElementById('modal-asignatura').textContent = nota.asignatura;
        document.getElementById('modal-periodo').textContent = nota.periodo;
        document.getElementById('modal-docente').textContent = nota.docente;
        
        // Información de notas
        document.getElementById('modal-nota1').textContent = nota.nota1;
        document.getElementById('modal-nota2').textContent = nota.nota2;
        document.getElementById('modal-nota3').textContent = nota.nota3;
        
        // Promedio con color según estado
        const promedioElement = document.getElementById('modal-promedio');
        promedioElement.textContent = nota.promedio;
        if (nota.estado === "Aprobado") {
            promedioElement.className = 'text-gray-800 font-weight-bold text-success';
        } else {
            promedioElement.className = 'text-gray-800 font-weight-bold text-danger';
        }
        
        // Observaciones y recomendaciones
        document.getElementById('modal-observaciones').textContent = nota.observaciones;
        document.getElementById('modal-recomendaciones').textContent = nota.recomendaciones;
        
        // Mostrar el modal
        $('#verNotaModal').modal('show');
    }
}

function editarNota() {
    if (notaActual) {
        window.location.href = `crear-nota.html?id=${notaActual.id}`;
    }
}

function imprimirBoletin() {
    if (notaActual) {
        // Implementar lógica de impresión
        alert('Función de impresión - Boletín de ' + notaActual.estudiante_nombre);
    }
}

// Función para aplicar filtros
function aplicarFiltros() {
    const periodo = document.getElementById('filtro-periodo').value;
    const asignatura = document.getElementById('filtro-asignatura').value;
    const grado = document.getElementById('filtro-grado').value;
    const estado = document.getElementById('filtro-estado').value;
    
    const rows = document.querySelectorAll('#table-notas tbody tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Filtrar por periodo
        if (periodo && !row.cells[3].textContent.toLowerCase().includes(periodo.toLowerCase())) {
            showRow = false;
        }
        
        // Filtrar por asignatura
        if (asignatura && !row.cells[2].textContent.toLowerCase().includes(asignatura.toLowerCase())) {
            showRow = false;
        }
        
        // Filtrar por estado
        if (estado) {
            const estadoRow = row.cells[8].textContent.toLowerCase();
            if (estado === 'aprobado' && !estadoRow.includes('aprobado')) {
                showRow = false;
            }
            if (estado === 'reprobado' && !estadoRow.includes('reprobado')) {
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
            verNota(id);
        });
    });

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#table-notas tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Filtros
    const filtros = document.querySelectorAll('#filtro-periodo, #filtro-asignatura, #filtro-grado, #filtro-estado');
    filtros.forEach(filtro => {
        filtro.addEventListener('change', aplicarFiltros);
    });

    // Funcionalidad de eliminar
    const botonesEliminar = document.querySelectorAll('.btn-delete');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            eliminarNota(id);
        });
    });
});

function eliminarNota(id) {
    if (confirm('¿Está seguro de que desea eliminar esta nota?')) {
        // Aquí iría la llamada a la API para eliminar
        console.log('Eliminando nota:', id);
        alert('Nota eliminada exitosamente');
        // Recargar la página o eliminar la fila de la tabla
        location.reload();
    }
}