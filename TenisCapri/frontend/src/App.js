import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/logo2.png'; // Ajusta la ruta según la ubicación de tu logo
import { FaSearch, FaShoppingCart } from 'react-icons/fa';  // Importar los iconos

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/productos')
      .then(response => setProductos(response.data.productos))
      .catch(error => console.error('Hubo un error al obtener los productos:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar2">
          <div className="navbar-left">
            <div className="navbar-logo">
              <img src={logo} alt="Logo de la empresa" />
            </div>
          </div>
          <ul className="navbar-list">
            <li className="navbar-item">Hombre</li>
            <li className="navbar-item">Mujer</li>
            <li className="navbar-item">Marcas</li>
            <li className="navbar-item">Ofertas</li>
          </ul>
          <div className="navbar-search">
            <input type="text" placeholder="Buscar..." />
            <FaSearch className="search-icon" /> {/* Usando el icono de búsqueda */}
          </div>
          <div className="navbar-cart">
            <FaShoppingCart /> {/* Usando el icono del carrito */}
          </div>
        </nav>
        <section className="image-section">
  <div className="image-overlay">
    <h2>Los mejores sneakers</h2>
    <p>Siente la libertad, vive el estilo</p>
  </div>
</section>
        <h1>Bienvenidos a la tienda de Tenis</h1>
        <h2>Lista de Productos</h2>

        {productos.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="product-list">
            {productos.map((producto) => (
              <div className="product-card" key={producto._id}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="product-image"
                />
                <h3>{producto.nombre}</h3>
                <p>Talla: {producto.talla}</p>
                <p>Precio: ${producto.precio}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
