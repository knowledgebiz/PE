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
    },
    id_answer_types: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = competency