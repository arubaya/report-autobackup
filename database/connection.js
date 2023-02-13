const { Sequelize } = require('sequelize');
const CONFIG = require('../config.json');

const sequelize = new Sequelize(CONFIG.DATABASE_NAME, CONFIG.DATABASE_USER, CONFIG.DATABASE_PASSWORD, {
  host: CONFIG.DATABASE_HOST,
  port: CONFIG.DATABASE_PORT,
  dialect: 'mysql'
});

const closeConnection = () => sequelize.close()

module.exports = {
  sequelize,
  closeConnection
}