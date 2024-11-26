const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('btechnol_test_app', 'btechnol_oscar', 'ZVe@f9ggaVykkE7', {
  host: '192.250.227.80',
  dialect: 'mysql'
});

module.exports = sequelize;