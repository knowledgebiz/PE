const Sequelize = require('sequelize')

const answerType = sequelize.define('answer_types', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = answerType