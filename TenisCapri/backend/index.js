const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const Producto = require('./models/Producto'); // Modelo Producto

dotenv.config();  // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Permite el cuerpo de las solicitudes JSON

// Configuración para servir imágenes estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend en funcionamiento');
});

// Ruta para agregar un producto (agregar imágenes locales)
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, precio, talla, imagen } = req.body;

    // Si la imagen está en la carpeta "uploads" y la imagen se pasa como nombre de archivo
    const imagenUrl = `http://localhost:5000/uploads/${imagen}`; // Cambia la ruta según tu estructura

    const nuevoProducto = new Producto({
      nombre,
      precio,
      talla,
      imagen: imagenUrl,
    });

    await nuevoProducto.save();
    res.status(201).json({ message: 'Producto creado con éxito', producto: nuevoProducto });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

app.get('/api/productos', async (req, res) => {
    try {
      const productos = await Producto.find();  // Obtener todos los productos desde la base de datos
      res.json({ productos });  // Devolver los productos en formato JSON
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
  

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
