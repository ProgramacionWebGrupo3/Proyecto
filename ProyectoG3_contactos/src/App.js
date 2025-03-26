import React from 'react';
import Proveedor from './components/Proveedor';
import FormProveedor from './components/FormProveedor';
import Buscador from './components/Buscador';
import useProveedores from './hooks/useProveedores';

function App() {
  const { 
    proveedores, 
    proveedoresTotal,
    agregarProveedor, 
    eliminarProveedor, 
    editarProveedor,
    busqueda,
    setBusqueda
  } = useProveedores();

  return (
    <div className="container">
       <h1 className="text-center">Proyecto Final - Grupo #3 - Contactos</h1>
    <h1 className="text-center">--------------------------------------------------- </h1>
    <FormProveedor agregarProveedor={agregarProveedor} />
      
      <Buscador 
        busqueda={busqueda} 
        setBusqueda={setBusqueda}
        totalResultados={proveedoresTotal}
        resultadosFiltrados={proveedores.length}
      />
      {proveedores.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <Proveedor
                key={proveedor.id}
                proveedor={proveedor}
                editarProveedor={editarProveedor}
                eliminarProveedor={eliminarProveedor}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info mt-3">
          No hay contactos registrados. Agrega uno nuevo.
        </div>
      )}
    </div>
  );
}

export default App;