import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productos = () => {
  // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);

  // Efecto para obtener los productos del backend cuando se carga el componente
  useEffect(() => {
    axios.get('http://localhost:5000/api/productos') // Cambia esta URL si tu backend está en otro puerto
      .then(response => {
        setProductos(response.data.productos);  // Guardamos los productos en el estado
      })
      .catch(error => {
        console.error('Hubo un error al obtener los productos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.length > 0 ? (
          productos.map(producto => (
            <li key={producto._id}>
              <h2>{producto.nombre}</h2>
              <p>Precio: ${producto.precio}</p>
              <p>Talla: {producto.talla}</p>
              <img src={producto.imagen} alt={producto.nombre} style={{ width: '200px' }} />
            </li>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </ul>
    </div>
  );
};

export default Productos;
