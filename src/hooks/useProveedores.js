import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';

const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [busqueda, setBusqueda] = useState('');


  useEffect(() => {
    const proveedoresStorage = localStorage.getItem('proveedores');
    if (proveedoresStorage) {
      setProveedores(JSON.parse(proveedoresStorage));
    }
  }, []);

 
  const agregarProveedor = (proveedor) => {
    const nuevoProveedor = {
      ...proveedor,
      id: Date.now() 
    };
    
    const nuevosProveedores = [...proveedores, nuevoProveedor];
    setProveedores(nuevosProveedores);
    localStorage.setItem('proveedores', JSON.stringify(nuevosProveedores));
    
    Swal.fire({
      icon: 'success',
      title: '¡Contacto Agregado!',
      text: 'El contacto ha sido agregado correctamente',
      timer: 2000,
      showConfirmButton: false
    });
  };

 
  const eliminarProveedor = (id, nombre) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al contacto ${nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const proveedoresFiltrados = proveedores.filter((proveedor) => proveedor.id !== id);
        setProveedores(proveedoresFiltrados);
        localStorage.setItem('proveedores', JSON.stringify(proveedoresFiltrados));
        
        Swal.fire(
          '¡Eliminado!',
          'El contacto ha sido eliminado.',
          'success'
        );
      }
    });
  };


  const editarProveedor = (proveedor) => {
    Swal.fire({
      title: 'Editar Contacto',
      html: `
        <input type="text" id="nombre" class="swal2-input" value="${proveedor.nombre}" placeholder="Nombre" />
        <input type="text" id="direccion" class="swal2-input" value="${proveedor.direccion}" placeholder="Dirección" />
        <input type="text" id="telefono" class="swal2-input" value="${proveedor.telefono}" placeholder="Teléfono" oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
        <input type="email" id="email" class="swal2-input" value="${proveedor.email}" placeholder="Email" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        
        if (!nombre || !direccion || !telefono || !email) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }
        
        return { nombre, direccion, telefono, email };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { nombre, direccion, telefono, email } = result.value;
        const proveedorActualizado = {
          ...proveedor,
          nombre,
          direccion,
          telefono,
          email,
        };
        const proveedoresActualizados = proveedores.map((p) => {
          if (p.id === proveedorActualizado.id) {
            return proveedorActualizado;
          }
          return p;
        });
        setProveedores(proveedoresActualizados);
        localStorage.setItem('proveedores', JSON.stringify(proveedoresActualizados));
        
        Swal.fire(
          '¡Actualizado!',
          'El contacto ha sido actualizado correctamente.',
          'success'
        );
      }
    });
  };

 
  const proveedoresFiltrados = useMemo(() => {
    if (!busqueda) return proveedores;
    
    const busquedaLowerCase = busqueda.toLowerCase();
    return proveedores.filter(proveedor => 
      proveedor.nombre.toLowerCase().includes(busquedaLowerCase) || 
      proveedor.email.toLowerCase().includes(busquedaLowerCase)
    );
  }, [proveedores, busqueda]);

  return {
    proveedores: proveedoresFiltrados,
    proveedoresTotal: proveedores.length,
    agregarProveedor,
    eliminarProveedor,
    editarProveedor,
    busqueda,
    setBusqueda
  };
};

export default useProveedores;