// Cargar sidebar
$(document).ready(function() {
    $('#sidebar-wrapper').load('components/sidebar.html', function() {
        // Activar el módulo actual en el sidebar
        const currentPage = window.location.pathname.split('/').pop();
        activateCurrentModule(currentPage);
    });
});

function activateCurrentModule(currentPage) {
    // Remover activo de todos los elementos
    $('.nav-item').removeClass('active');
    $('.collapse-item').removeClass('active');
    $('.collapse').removeClass('show');

    // Activar según la página actual
    switch(currentPage) {
        case 'index.html':
            $('.nav-item:has(a[href="index.html"])').addClass('active');
            break;
        case 'listado-estudiantes.html':
        case 'crear-estudiante.html':
            $('#collapseIngreso').addClass('show');
            $('.nav-item:has(#collapseIngreso)').addClass('active');
            $(`.collapse-item[href="${currentPage}"]`).addClass('active');
            break;
        case 'listado-notas.html':
        case 'crear-nota.html':
            $('#collapseNotas').addClass('show');
            $('.nav-item:has(#collapseNotas)').addClass('active');
            $(`.collapse-item[href="${currentPage}"]`).addClass('active');
            break;
        case 'listado-historial.html':
        case 'crear-historial.html':
            $('#collapseHistorial').addClass('show');
            $('.nav-item:has(#collapseHistorial)').addClass('active');
            $(`.collapse-item[href="${currentPage}"]`).addClass('active');
            break;
        case 'listado-familiares.html':
        case 'crear-familiar.html':
            $('#collapseFamiliar').addClass('show');
            $('.nav-item:has(#collapseFamiliar)').addClass('active');
            $(`.collapse-item[href="${currentPage}"]`).addClass('active');
            break;
        case 'listado-notas.html':
        case 'crear-nota.html':
            $('#collapseNotas').addClass('show');
            $('.nav-item:has(#collapseNotas)').addClass('active');
            $(`.collapse-item[href="${currentPage}"]`).addClass('active');
            break;
            
        case 'listado-asistencias.html':
        case 'crear-asistencia.html':
            $('#collapseAsistencias').addClass('show');
            $('.nav-item:has(#collapseAsistencias)').addClass('active');
            $(`.collapse-item[href="${currentPage}"]`).addClass('active');
            break;
            case 'listado-bienestar.html':
        case 'crear-bienestar.html':
            $('#collapseBienestar').addClass('show');
            $('.nav-item:has(#collapseBienestar)').addClass('active');
            $(`.collapse-item[href="${currentPage}"]`).addClass('active');
            break;
        case 'estadisticas.html':
            $('.nav-item:has(a[href="estadisticas.html"])').addClass('active');
            break;
        case 'perfil.html':
            $('.nav-item:has(a[href="perfil.html"])').addClass('active');
            break;
    }
}