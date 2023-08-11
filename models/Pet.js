const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adoption_time: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        hunger: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mood: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        energy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        animal_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'animal',
                key: 'id',
            }
        },
        interaction_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'interaction',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'pet',
    }
)
module.exports = Pet;