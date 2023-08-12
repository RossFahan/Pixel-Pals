const dayjs = require('dayjs');

// Constants for stat decrement rates
const HUNGER_DECREMENT_PER_HOUR = 5;
const MOOD_DECREMENT_PER_HOUR = 5;
const ENERGY_DECREMENT_PER_HOUR = 5;

function decrementStats(pet) {
    const currentTime = dayjs();
    
    // Calculate the time difference between interactions and current time in hours
    const hoursSinceLastFed = currentTime.diff(pet.interaction.last_fed, 'hour');
    const hoursSinceLastPlayed = currentTime.diff(pet.interaction.last_played, 'hour');
    const hoursSinceLastSlept = currentTime.diff(pet.interaction.last_slept, 'hour');

    // Calculate stat decrements based on time passed
    const hungerDecrement = hoursSinceLastFed * HUNGER_DECREMENT_PER_HOUR;
    const moodDecrement = hoursSinceLastPlayed * MOOD_DECREMENT_PER_HOUR;
    const energyDecrement = hoursSinceLastSlept * ENERGY_DECREMENT_PER_HOUR;

    // Update pet's stats and interaction timestamps
    pet.hunger = Math.max(0, pet.hunger - hungerDecrement);
    pet.mood = Math.max(0, pet.mood - moodDecrement);
    pet.energy = Math.max(0, pet.energy - energyDecrement);

    pet.interaction.last_fed = currentTime.toISOString();
    pet.interaction.last_played = currentTime.toISOString();
    pet.interaction.last_slept = currentTime.toISOString();

    return pet;
}

module.exports = {
    decrementStats
};
