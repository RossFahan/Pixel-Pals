
//pet data passed directly from route
//const { Pet } = require('../../models');

function updateStatusBars(pet) {
    updateHungerBar(pet);
    updateMoodBar(pet);
    updateEnergyBar(pet);
}

function updateHungerBar(pet) {
    const hungerFillElement = document.getElementById('hunger-fill');
    const hungerLevel = pet.hunger;

    hungerFillElement.style.width = `${hungerLevel}%`;

    if (hungerLevel < 30) {
        hungerFillElement.style.backgroundColor = 'red';
    } else if (hungerLevel < 75) {
        hungerFillElement.style.backgroundColor = 'yellow';
    } else {
        hungerFillElement.style.backgroundColor = 'green';
    }
}

function updateMoodBar(pet) {
    const moodFillElement = document.getElementById('mood-fill');
    const moodLevel = pet.mood;

    moodFillElement.style.width = `${moodLevel}%`;

    if (moodLevel < 30) {
        moodFillElement.style.backgroundColor = 'red';
    } else if (moodLevel < 75) {
        moodFillElement.style.backgroundColor = 'yellow';
    } else {
        moodFillElement.style.backgroundColor = 'green';
    }
}

function updateEnergyBar(pet) {
    const energyFillElement = document.getElementById('energy-fill');
    const energyLevel = pet.energy;

    energyFillElement.style.width = `${energyLevel}%`;

    if (energyLevel < 30) {
        energyFillElement.style.backgroundColor = 'red';
    } else if (energyLevel < 75) {
        energyFillElement.style.backgroundColor = 'yellow';
    } else {
        energyFillElement.style.backgroundColor = 'green';
    }
}

module.exports = updateStatusBars;