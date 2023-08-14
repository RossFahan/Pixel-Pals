const dayjs = require('dayjs');
const handleRunaway = require('./runaway'); 

// Constants for stat decrement rates (in minutes)
const HUNGER_DECREMENT_PER_MINUTE = 5;
const MOOD_DECREMENT_PER_MINUTE = 5;
const ENERGY_DECREMENT_PER_MINUTE = 5;
const ENERGY_INCREMENT_PER_MINUTE_WHEN_SLEEPING = 10;

function decrementStats(pet) {
    const currentTime = dayjs();

    // Calculate the time difference between interactions and current time in minutes
    const minutesSinceLastFed = currentTime.diff(pet.interaction.last_fed, 'minute');
    const minutesSinceLastPlayed = currentTime.diff(pet.interaction.last_played, 'minute');
    const minutesSinceLastSlept = currentTime.diff(pet.interaction.last_slept, 'minute');

    console.log(`Minutes since last fed: ${minutesSinceLastFed}`);
    console.log(`Minutes since last played: ${minutesSinceLastPlayed}`);
    console.log(`Minutes since last slept: ${minutesSinceLastSlept}`);

    // Calculate stat decrements based on time passed
    const hungerDecrement = minutesSinceLastFed * HUNGER_DECREMENT_PER_MINUTE;
    const moodDecrement = minutesSinceLastPlayed * MOOD_DECREMENT_PER_MINUTE;
    const energyDecrement = minutesSinceLastSlept * ENERGY_DECREMENT_PER_MINUTE;
    const energyIncrement = minutesSinceLastSlept * ENERGY_INCREMENT_PER_MINUTE_WHEN_SLEEPING;

    // Update pet's stats and interaction timestamps
    pet.hunger = Math.max(0, pet.hunger - hungerDecrement);
    pet.mood = Math.max(0, pet.mood - moodDecrement);

    // Increase energy stat if the pet is sleeping, else decrement

    if (pet.is_sleeping && pet.energy > 0) {
        console.log(`Increasing energy due to sleep`);
        pet.energy = Math.min(100, pet.energy + energyIncrement);

        // Set is_sleeping to false if energy is 100 or more
        if (pet.energy >= 100) {
            console.log(`Pet is waking up from sleep`);
            pet.is_sleeping = false;

            // Update last_slept timestamp when waking up
            pet.interaction.last_slept = currentTime.toISOString();
        }
    }
    else { // Pet not sleeping
        pet.energy = Math.max(0, pet.energy - energyDecrement);
    }


    if (pet.hunger === 0 || pet.mood === 0 || pet.energy === 0) {
        console.log('Pet is running away!');
        handleRunaway(pet.id); // Call the handleRunaway function to delete the pet
        return null; // Return null to stop further stat updates
    }

    return pet;
}

module.exports = decrementStats;
