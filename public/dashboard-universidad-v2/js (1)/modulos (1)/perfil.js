const perfil = {
    datosOriginales: null,
    modoEdicion: false,

    // Inicializar módulo
    inicializar: function() {
        this.cargarDatosUsuario();
        this.configurarEventos();
    },

    // Configurar eventos
    configurarEventos: function() {
        // Evento para cambio de foto de perfil
        document.getElementById('foto-perfil').addEventListener('change', function(e) {
            perfil.cambiarFotoPerfil(e.target.files[0]);
        });

        // Evento para guardar con Enter en formularios
        document.getElementById('form-perfil').addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && perfil.modoEdicion) {
                e.preventDefault();
                perfil.guardarCambios();
            }
        });
    },

    // Cargar datos del usuario
    cargarDatosUsuario: function() {
        // Simulación de datos del usuario
        const usuario = {
            nombres: 'Admin',
            apellidos: 'Sistema',
            email: 'admin@sistema.edu',
            telefono: '+57 300 123 4567',
            direccion: 'Calle 123 #45-67',
            ciudad: 'Bogotá',
            pais: 'Colombia',
            rol: 'Administrador',
            fechaRegistro: 'Ene 2024',
            notificacionesEmail: true,
            modoOscuro: false,
            idioma: 'es'
        };

        // Guardar datos originales
        this.datosOriginales = {...usuario};

        // Actualizar interfaz
        this.actualizarInterfaz(usuario);
    },

    // Actualizar interfaz con datos del usuario
    actualizarInterfaz: function(usuario) {
        // Perfil principal
        document.getElementById('nombre-perfil').textContent = `${usuario.nombres} ${usuario.apellidos}`;
        document.getElementById('rol-perfil').textContent = usuario.rol;
        document.getElementById('email-perfil').textContent = usuario.email;
        document.getElementById('fecha-registro').textContent = usuario.fechaRegistro;

        // Información de contacto
        document.getElementById('info-email').textContent = usuario.email;
        document.getElementById('info-telefono').textContent = usuario.telefono;
        document.getElementById('info-ubicacion').textContent = `${usuario.ciudad}, ${usuario.pais}`;

        // Formulario de edición
        document.getElementById('input-nombres').value = usuario.nombres;
        document.getElementById('input-apellidos').value = usuario.apellidos;
        document.getElementById('input-email').value = usuario.email;
        document.getElementById('input-telefono').value = usuario.telefono;
        document.getElementById('input-direccion').value = usuario.direccion;
        document.getElementById('input-ciudad').value = usuario.ciudad;
        document.getElementById('input-pais').value = usuario.pais;

        // Preferencias
        document.getElementById('notificaciones-email').checked = usuario.notificacionesEmail;
        document.getElementById('modo-oscuro').checked = usuario.modoOscuro;
        document.getElementById('select-idioma').value = usuario.idioma;
    },

    // Habilitar edición del perfil
    habilitarEdicion: function() {
        this.modoEdicion = true;
        const inputs = document.querySelectorAll('#form-perfil input, #form-perfil textarea');
        
        inputs.forEach(input => {
            input.disabled = false;
            input.classList.add('bg-light');
        });

        document.getElementById('botones-edicion').classList.remove('d-none');
    },

    // Cancelar edición
    cancelarEdicion: function() {
        this.modoEdicion = false;
        const inputs = document.querySelectorAll('#form-perfil input, #form-perfil textarea');
        
        inputs.forEach(input => {
            input.disabled = true;
            input.classList.remove('bg-light');
        });

        // Restaurar valores originales
        this.actualizarInterfaz(this.datosOriginales);

        document.getElementById('botones-edicion').classList.add('d-none');
    },

    // Guardar cambios del perfil
    guardarCambios: function() {
        const nuevosDatos = {
            nombres: document.getElementById('input-nombres').value,
            apellidos: document.getElementById('input-apellidos').value,
            email: document.getElementById('input-email').value,
            telefono: document.getElementById('input-telefono').value,
            direccion: document.getElementById('input-direccion').value,
            ciudad: document.getElementById('input-ciudad').value,
            pais: document.getElementById('input-pais').value
        };

        // Validaciones básicas
        if (!nuevosDatos.nombres || !nuevosDatos.apellidos || !nuevosDatos.email) {
            this.mostrarMensaje('Por favor complete todos los campos obligatorios', 'error');
            return;
        }

        if (!this.validarEmail(nuevosDatos.email)) {
            this.mostrarMensaje('Por favor ingrese un email válido', 'error');
            return;
        }

        // Simular guardado en servidor
        this.mostrarMensaje('Guardando cambios...', 'info');
        
        setTimeout(() => {
            // Actualizar datos originales
            this.datosOriginales = {...this.datosOriginales, ...nuevosDatos};
            
            // Actualizar interfaz
            this.actualizarInterfaz(this.datosOriginales);
            
            // Actualizar topbar
            this.actualizarTopbar();
            
            this.modoEdicion = false;
            document.getElementById('botones-edicion').classList.add('d-none');
            
            this.mostrarMensaje('Perfil actualizado exitosamente', 'success');
        }, 1000);
    },

    // Cambiar contraseña
    cambiarPassword: function() {
        const passwordActual = document.getElementById('password-actual').value;
        const passwordNueva = document.getElementById('password-nueva').value;
        const passwordConfirmar = document.getElementById('password-confirmar').value;

        // Validaciones
        if (!passwordActual || !passwordNueva || !passwordConfirmar) {
            this.mostrarMensaje('Por favor complete todos los campos', 'error');
            return;
        }

        if (passwordNueva !== passwordConfirmar) {
            this.mostrarMensaje('Las contraseñas nuevas no coinciden', 'error');
            return;
        }

        if (!this.validarPassword(passwordNueva)) {
            this.mostrarMensaje('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números', 'error');
            return;
        }

        // Simular cambio de contraseña
        this.mostrarMensaje('Cambiando contraseña...', 'info');
        
        setTimeout(() => {
            // Limpiar formulario
            document.getElementById('form-password').reset();
            this.mostrarMensaje('Contraseña cambiada exitosamente', 'success');
        }, 1500);
    },

    // Guardar preferencias
    guardarPreferencias: function() {
        const preferencias = {
            notificacionesEmail: document.getElementById('notificaciones-email').checked,
            modoOscuro: document.getElementById('modo-oscuro').checked,
            idioma: document.getElementById('select-idioma').value
        };

        // Simular guardado
        this.mostrarMensaje('Guardando preferencias...', 'info');
        
        setTimeout(() => {
            // Aplicar modo oscuro si está activado
            if (preferencias.modoOscuro) {
                document.body.classList.add('bg-dark', 'text-light');
            } else {
                document.body.classList.remove('bg-dark', 'text-light');
            }
            
            this.mostrarMensaje('Preferencias guardadas exitosamente', 'success');
        }, 1000);
    },

    // Cambiar foto de perfil
    cambiarFotoPerfil: function(archivo) {
        if (!archivo) return;

        // Validar tipo de archivo
        if (!archivo.type.startsWith('image/')) {
            this.mostrarMensaje('Por favor seleccione una imagen válida', 'error');
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (archivo.size > 5 * 1024 * 1024) {
            this.mostrarMensaje('La imagen no debe superar los 5MB', 'error');
            return;
        }

        // Simular subida de imagen
        this.mostrarMensaje('Subiendo imagen...', 'info');

        const reader = new FileReader();
        reader.onload = (e) => {
            setTimeout(() => {
                // Actualizar imagen de perfil
                const imgPerfil = document.querySelector('.img-fluid.rounded-circle');
                imgPerfil.src = e.target.result;
                
                // Actualizar también en el topbar
                const topbarImg = document.querySelector('.img-profile.rounded-circle');
                if (topbarImg) {
                    topbarImg.src = e.target.result;
                }
                
                this.mostrarMensaje('Foto de perfil actualizada exitosamente', 'success');
            }, 1000);
        };
        reader.readAsDataURL(archivo);
    },

    // Actualizar información en el topbar
    actualizarTopbar: function() {
        const nombreTopbar = document.getElementById('nombre-usuario');
        if (nombreTopbar) {
            nombreTopbar.textContent = `${this.datosOriginales.nombres} ${this.datosOriginales.apellidos}`;
        }
    },

    // Validar email
    validarEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Validar contraseña
    validarPassword: function(password) {
        // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    },

    // Mostrar mensajes
    mostrarMensaje: function(mensaje, tipo) {
        // En una implementación real, usaríamos un sistema de notificaciones
        // Por ahora usamos alertas simples
        const colores = {
            success: 'alert-success',
            error: 'alert-danger',
            info: 'alert-info',
            warning: 'alert-warning'
        };

        // Crear alerta temporal
        const alerta = document.createElement('div');
        alerta.className = `alert ${colores[tipo]} alert-dismissible fade show position-fixed`;
        alerta.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alerta.innerHTML = `
            ${mensaje}
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        `;

        document.body.appendChild(alerta);

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.parentNode.removeChild(alerta);
            }
        }, 5000);
    }
};

// Inicializar el módulo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    perfil.inicializar();
});