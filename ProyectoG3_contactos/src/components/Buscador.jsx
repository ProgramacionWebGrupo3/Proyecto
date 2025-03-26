import React from 'react';

function Buscador({ busqueda, setBusqueda, totalResultados, resultadosFiltrados }) {
  return (
    <div className="mb-4">
      <div className="input-group">
        <span className="input-group-text bg-primary text-white">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        {busqueda && (
          <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={() => setBusqueda('')}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      
      {busqueda && (
        <div className="mt-2 text-muted small">
          Mostrando {resultadosFiltrados} de {totalResultados} contactos
        </div>
      )}
    </div>
  );
}

export default Buscador;