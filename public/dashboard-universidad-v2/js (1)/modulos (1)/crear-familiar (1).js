document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en modo edición (hay un ID en la URL)
    const urlParams = new URLSearchParams(window.location.search);
    const familiarId = urlParams.get('id');

    if (familiarId) {
        // Modo edición: cargar los datos del familiar
        cargarFamiliar(familiarId);
        document.querySelector('.btn-create').classList.add('d-none');
        document.querySelector('.btn-update').classList.remove('d-none');
    }

    // Evento para el botón de crear
    document.querySelector('.btn-create').addEventListener('click', function() {
        crearFamiliar();
    });

    // Evento para el botón de actualizar
    document.querySelector('.btn-update').addEventListener('click', function() {
        actualizarFamiliar(familiarId);
    });
});

function cargarFamiliar(id) {
    // Simulamos la carga de datos desde una API
    const familiaresEjemplo = {
        1: {
            estudiante_id: "1",
            nombre: "María",
            apellido: "Brito",
            parentesco: "Madre",
            ocupacion: "Ingeniera",
            telefono: "3101234567",
            email: "maria.brito@gmail.com",
            direccion: "Calle ciega 123",
            acudiente: true,
            emergencia: true,
            observaciones: "Disponible para reuniones en horario de 2pm a 5pm"
        },
        2: {
            estudiante_id: "1",
            nombre: "Carlos",
            apellido: "Brito",
            parentesco: "Padre",
            ocupacion: "Arquitecto",
            telefono: "3112345678",
            email: "carlos.brito@gmail.com",
            direccion: "Calle ciega 123",
            acudiente: false,
            emergencia: true,
            observaciones: "Viaja frecuentemente por trabajo"
        },
        3: {
            estudiante_id: "2",
            nombre: "Ana",
            apellido: "Vaca",
            parentesco: "Madre",
            ocupacion: "Doctora",
            telefono: "3123456789",
            email: "ana.vaca@gmail.com",
            direccion: "Cra no se meta 12",
            acudiente: true,
            emergencia: true,
            observaciones: "Contactar preferiblemente por WhatsApp"
        }
    };

    const familiar = familiaresEjemplo[id];
    if (familiar) {
        document.getElementById('estudiante-select').value = familiar.estudiante_id;
        document.getElementById('nombre-familiar').value = familiar.nombre;
        document.getElementById('apellido-familiar').value = familiar.apellido;
        document.getElementById('parentesco').value = familiar.parentesco;
        document.getElementById('ocupacion').value = familiar.ocupacion;
        document.getElementById('telefono').value = familiar.telefono;
        document.getElementById('email').value = familiar.email;
        document.getElementById('direccion').value = familiar.direccion;
        document.getElementById('acudiente').checked = familiar.acudiente;
        document.getElementById('emergencia').checked = familiar.emergencia;
        document.getElementById('observaciones').value = familiar.observaciones;
    }
}

function crearFamiliar() {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        nombre: document.getElementById('nombre-familiar').value,
        apellido: document.getElementById('apellido-familiar').value,
        parentesco: document.getElementById('parentesco').value,
        ocupacion: document.getElementById('ocupacion').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
        acudiente: document.getElementById('acudiente').checked,
        emergencia: document.getElementById('emergencia').checked,
        observaciones: document.getElementById('observaciones').value
    };

    // Aquí iría la llamada a la API para crear el familiar
    console.log('Creando familiar:', formData);
    alert('Familiar creado exitosamente');
    window.location.href = 'listado-familiares.html';
}

function actualizarFamiliar(id) {
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }

    // Obtener datos del formulario
    const formData = {
        estudiante_id: document.getElementById('estudiante-select').value,
        nombre: document.getElementById('nombre-familiar').value,
        apellido: document.getElementById('apellido-familiar').value,
        parentesco: document.getElementById('parentesco').value,
        ocupacion: document.getElementById('ocupacion').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
        acudiente: document.getElementById('acudiente').checked,
        emergencia: document.getElementById('emergencia').checked,
        observaciones: document.getElementById('observaciones').value
    };

    // Aquí iría la llamada a la API para actualizar el familiar
    console.log('Actualizando familiar:', id, formData);
    alert('Familiar actualizado exitosamente');
    window.location.href = 'listado-familiares.html';
}

function validarFormulario() {
    // Validación básica
    const requiredFields = [
        'estudiante-select',
        'nombre-familiar',
        'apellido-familiar',
        'parentesco',
        'telefono'
    ];

    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            alert(`El campo ${field.labels[0].textContent} es obligatorio`);
            field.focus();
            return false;
        }
    }

    // Validar formato de teléfono (solo números, mínimo 10 caracteres)
    const telefono = document.getElementById('telefono').value;
    if (!/^\d{10,}$/.test(telefono)) {
        alert('El teléfono debe contener solo números y tener al menos 10 dígitos');
        return false;
    }

    // Validar email si está presente
    const email = document.getElementById('email').value;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor ingrese un email válido');
        return false;
    }

    return true;
}