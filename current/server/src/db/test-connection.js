const Sequelize = require('sequelize')
const sequelize = new Sequelize('performanceeval', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      port: 3000
    }
})

const iconv = require('iconv-lite')
const encodings = require('iconv-lite/encodings')
iconv.encodings = encodings

module.exports = sequelize
global.sequelize = sequelize