const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});

const Producto = sequelize.define('producto', {
  nombre: Sequelize.STRING,
  descripcion: Sequelize.STRING,
  precio: Sequelize.FLOAT,
});

const Usuario = sequelize.define('usuario', {
  nombre: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});



module.exports = {
  sequelize,
  Producto,
  Usuario
};