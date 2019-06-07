const Sequelize = require('sequelize')

const objectiveType = sequelize.define('quantitative_objective_types', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = objectiveType