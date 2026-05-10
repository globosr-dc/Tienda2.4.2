const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Esta será tu "Base de Datos" temporal (en memoria)
let productos = [];
let ordenes = [];

// Rutas para Productos
app.get('/api/products', (req, res) => res.json(productos));
app.post('/api/products', (req, res) => {
    productos.push(req.body);
    res.status(201).json({ message: 'Producto guardado!' });
});

// Rutas para Órdenes
app.get('/api/orders', (req, res) => res.json(ordenes));
app.post('/api/orders', (req, res) => {
    ordenes.push(req.body);
    res.status(201).json({ message: 'Orden creada!' });
});

app.listen(5000, () => console.log('🚀 Servidor corriendo en http://localhost:5000'));