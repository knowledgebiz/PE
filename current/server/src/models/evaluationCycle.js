const Sequelize = require('sequelize')

const evaluationCycle = sequelize.define('evaluation_cycles', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = evaluationCycle