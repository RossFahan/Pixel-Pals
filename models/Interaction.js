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
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        last_played: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        last_slept: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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