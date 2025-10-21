import React from 'react';
import { useForm } from 'react-hook-form';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onChange' });
  const { navigateTo } = useApp();
  const contra = watch('contrasena');

  const onSubmited = (data) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({
      nombre: data.nombre,
      correo: data.correo,
      contrasena: data.contrasena,
      tipoAcceso: data.tipoAcceso.toLowerCase(),
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso, ahora puedes iniciar sesión');
    navigateTo('login');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <h1 className="text-center text-primary mb-4">Registro</h1>

          <form onSubmit={handleSubmit(onSubmited)} className="bg-white p-4 rounded shadow-sm">
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input type="text" {...register('nombre', { required: true })} className="form-control" />
              {errors.nombre && <span className="text-danger">El nombre es obligatorio</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input type="email" {...register('correo', { required: true })} className="form-control" />
              {errors.correo && <span className="text-danger">El correo es obligatorio</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" {...register('contrasena', { required: true })} className="form-control" />
              {errors.contrasena && <span className="text-danger">La contraseña es obligatoria</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                {...register('confirmar_contrasena', {
                  required: 'Por favor confirme la contraseña',
                  validate: (value) => value === contra || 'Las contraseñas no coinciden',
                })}
                className="form-control"
              />
              {errors.confirmar_contrasena && <p className="text-danger">{errors.confirmar_contrasena.message}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo de acceso</label>
              <select {...register('tipoAcceso', { required: true })} className="form-select form-control">
                <option value="">Seleccione un tipo</option>
                <option value="Administrador">Administrador</option>
                <option value="Docente">Docente</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Familiar">Familiar</option>
              </select>
              {errors.tipoAcceso && <span className="text-danger">Debe seleccionar un tipo de acceso</span>}
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2">
              <button type="submit" className="btn btn-primary">Registrar</button>
              <button type="button" className="btn btn-link" onClick={() => navigateTo('login')}>
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
