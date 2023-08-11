const sequelize = require('../config/connection');
const { Animal } = require('../models');

const animalData = require('./animalData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await Animal.bulkCreate(animalData, {
      returning: true
    })
    process.exit(0);
  } catch (err) {
    console.error('Error seeding', err)
  }
};

seedDatabase();