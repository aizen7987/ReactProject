const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbtutorapp', 'root', 'root123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;