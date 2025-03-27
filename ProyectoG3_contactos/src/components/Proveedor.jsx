import React from 'react';

function Proveedor({ proveedor, editarProveedor, eliminarProveedor }) {
  return (
    <tr>
      <td>{proveedor.nombre}</td>
      <td>{proveedor.direccion}</td>
      <td>{proveedor.telefono}</td>
      <td>{proveedor.email}</td>
      <td>
        <button 
          className="btn btn-primary me-2" 
          onClick={() => editarProveedor(proveedor)}
        >
          <i className="fas fa-edit"></i> Editar
        </button>
        <button 
          className="btn btn-danger" 
          onClick={() => eliminarProveedor(proveedor.id, proveedor.nombre)}
        >
          <i className="fas fa-trash-alt"></i> Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Proveedor;