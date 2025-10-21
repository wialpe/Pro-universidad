import React from 'react';
import { useForm } from 'react-hook-form';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, navigateTo } = useApp();

  const onSubmited = (data) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === data.correo && u.contrasena === data.contrasena
    );

    if (usuarioEncontrado) {
      alert(`Bienvenido ${usuarioEncontrado.nombre}`);
      login(usuarioEncontrado);
      // currentView se ajusta automáticamente por rol en el contexto
    } else {
      alert('Correo y/o contraseña inválidos');
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1 className="text-center text-primary mb-4">Ingreso</h1>

          <form onSubmit={handleSubmit(onSubmited)} className="bg-white p-4 rounded shadow-sm">
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

            <button type="submit" className="btn btn-primary w-100">Ingresar</button>

            <div className="text-center mt-3">
              <button type="button" className="btn btn-link" onClick={() => navigateTo('register')}>
                ¿No tienes cuenta? Regístrate aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
