const express = require('express');
const cors = require('cors');
const { sequelize, Producto, Usuario } = require('./src/database');
const bcrypt = require('bcryptjs')

const app = express();
app.use(express.json());
app.use(cors());

// Crear un nuevo producto
app.post('/api/productos', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const producto = await Producto.create({ nombre, descripcion, precio });
  res.json(producto);
});

// Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

// Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  res.json(producto);
});

// Actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const producto = await Producto.findByPk(req.params.id);
  producto.nombre = nombre;
  producto.descripcion = descripcion;
  producto.precio = precio;
  await producto.save();
  res.json(producto);
});

// Eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  await producto.destroy();
  res.json({ message: 'Producto eliminado' });
});

// Crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre, email, password } = req.body;
  const usuario = await Usuario.create({ nombre, email, password });
  res.json(usuario);
});

// Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

// Obtener un usuario por ID
app.get('/api/usuarios/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  res.json(usuario);
});

// Actualizar un usuario
app.put('/api/usuarios/:id', async (req, res) => {
  const { nombre, email, password } = req.body;
  const usuario = await Usuario.findByPk(req.params.id);
  usuario.nombre = nombre;
  usuario.email = email;
  usuario.password = password;
  await usuario.save();
  res.json(usuario);
});

// Eliminar un usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  await usuario.destroy();
  res.json({ message: 'Usuario eliminado' });
});

// login

app.post('/api/usuarios/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  console.log(usuario);
  if (usuario) {
    // Compara la contraseña proporcionada con la contraseña encriptada almacenada
    const passwordMatches = await bcrypt.compare(password, usuario.password)

    if (passwordMatches) {
      // Si las contraseñas coinciden, devuelve el usuario
      res.json(usuario)
    } else {
      // Si las contraseñas no coinciden, devuelve un error
      res.status(401).json({ message: 'Contraseña incorrecta' })
    }
  } else {
    res.status(401).json({ message: 'Usuario no encontrado' })
  }
});


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});