import React, { useState } from 'react';
import Swal from 'sweetalert2';

function FormProveedor({ agregarProveedor }) {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const handleTelefonoChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setTelefono(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre === '' || direccion === '' || telefono === '' || email === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
    } else {
      agregarProveedor({
        nombre,
        direccion,
        telefono,
        email,
      });
      
     
      setNombre('');
      setDireccion('');
      setTelefono('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del contacto"
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              className="form-control"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Dirección del contacto"
            />
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={handleTelefonoChange}
              placeholder="Escribe solo números"
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@ejemplo.com"
            />
          </div>
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary mb-4">
        <i className="fas fa-plus"></i> Agregar Contacto
      </button>
    </form>
  );
}

export default FormProveedor;