let familiarActual = null;

// Función para mostrar el modal con información del familiar
function verFamiliar(id) {
    const familiaresEjemplo = {
        1: {
            id: 1,
            estudiante_nombre: "Alan Brito",
            estudiante_grado: "10°",
            familiar_nombre: "María Brito",
            parentesco: "Madre",
            telefono: "3101234567",
            email: "maria.brito@gmail.com",
            ocupacion: "Ingeniera",
            direccion: "Calle ciega 123",
            acudiente: "Sí",
            emergencia: "Sí",
            observaciones: "Disponible para reuniones en horario de 2pm a 5pm"
        },
        2: {
            id: 2,
            estudiante_nombre: "Alan Brito",
            estudiante_grado: "10°",
            familiar_nombre: "Carlos Brito",
            parentesco: "Padre",
            telefono: "3112345678",
            email: "carlos.brito@gmail.com",
            ocupacion: "Arquitecto",
            direccion: "Calle ciega 123",
            acudiente: "No",
            emergencia: "Sí",
            observaciones: "Viaja frecuentemente por trabajo"
        },
        3: {
            id: 3,
            estudiante_nombre: "Zoyla Vaca",
            estudiante_grado: "11°",
            familiar_nombre: "Ana Vaca",
            parentesco: "Madre",
            telefono: "3123456789",
            email: "ana.vaca@gmail.com",
            ocupacion: "Doctora",
            direccion: "Cra no se meta 12",
            acudiente: "Sí",
            emergencia: "Sí",
            observaciones: "Contactar preferiblemente por WhatsApp"
        }
    };

    const familiar = familiaresEjemplo[id];
    if (familiar) {
        familiarActual = familiar;
        
        // Poblar información del familiar
        document.getElementById('modal-familiar-nombre').textContent = familiar.familiar_nombre;
        document.getElementById('modal-parentesco').innerHTML = `<span class="badge badge-primary">${familiar.parentesco}</span>`;
        document.getElementById('modal-telefono').textContent = familiar.telefono;
        document.getElementById('modal-email').textContent = familiar.email;
        document.getElementById('modal-ocupacion').textContent = familiar.ocupacion;
        document.getElementById('modal-direccion').textContent = familiar.direccion;
        document.getElementById('modal-observaciones').textContent = familiar.observaciones;
        
        // Poblar información del estudiante
        document.getElementById('modal-estudiante-nombre').textContent = familiar.estudiante_nombre;
        document.getElementById('modal-estudiante-grado').textContent = familiar.estudiante_grado;
        document.getElementById('modal-acudiente').innerHTML = familiar.acudiente === "Sí" ? 
            '<span class="badge badge-success">Sí</span>' : '<span class="badge badge-secondary">No</span>';
        document.getElementById('modal-emergencia').innerHTML = familiar.emergencia === "Sí" ? 
            '<span class="badge badge-success">Sí</span>' : '<span class="badge badge-secondary">No</span>';
        
        // Mostrar el modal
        $('#verFamiliarModal').modal('show');
    }
}

function editarFamiliar() {
    if (familiarActual) {
        window.location.href = `crear-familiar.html?id=${familiarActual.id}`;
    }
}

// Agregar event listeners a los botones de ver
document.addEventListener('DOMContentLoaded', function() {
    const botonesVer = document.querySelectorAll('.btn-view');
    botonesVer.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            verFamiliar(id);
        });
    });

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#table-familiares tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Funcionalidad de eliminar
    const botonesEliminar = document.querySelectorAll('.btn-delete');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            eliminarFamiliar(id);
        });
    });
});

function eliminarFamiliar(id) {
    if (confirm('¿Está seguro de que desea eliminar este familiar?')) {
        // Aquí iría la llamada a la API para eliminar
        console.log('Eliminando familiar:', id);
        alert('Familiar eliminado exitosamente');
        // Recargar la página o eliminar la fila de la tabla
        location.reload();
    }
}