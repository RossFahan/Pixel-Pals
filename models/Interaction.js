const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interaction extends Model {}

Interaction.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        last_fed: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        last_played: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        last_slept: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'interaction',
    }
)
module.exports = Interaction;