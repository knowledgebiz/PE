const Sequelize = require('sequelize')

const competency = sequelize.define('competencies', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    competency: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = competency