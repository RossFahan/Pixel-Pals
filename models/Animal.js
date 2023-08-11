const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Animal extends Model {}

Animal.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prefered_food: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prefered_activity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'animal',
    }
)
module.exports = Animal;