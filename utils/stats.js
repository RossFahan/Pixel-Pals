const handleRunaway = require('./runaway');

// Constants for stat decrement rates (in milliseconds)
const HUNGER_DECREMENT_PER_MINUTE = 10 * (60 * 1000); // 10 tick per min
const MOOD_DECREMENT_PER_MINUTE = 10 * (60 * 1000); // 10 tick per min
const ENERGY_DECREMENT_PER_MINUTE = 10 * (60 * 1000); // 10 tick per min
const ENERGY_INCREMENT_PER_MINUTE_WHEN_SLEEPING = 100 * (60 * 1000); // 100 tick per min

function decrementStats(pet) {
    const currentTime = new Date().getTime(); // Get current time in milliseconds

    // Calculate the time difference between interactions and current time in milliseconds
    const timeDiffLastFed = currentTime - new Date(pet.interaction.last_fed).getTime();
    const timeDiffLastPlayed = currentTime - new Date(pet.interaction.last_played).getTime();
    const timeDiffLastSlept = currentTime - new Date(pet.interaction.last_slept).getTime();

    // Convert milliseconds to seconds
    const secondsSinceLastFed = Math.floor(timeDiffLastFed / 1000);
    const secondsSinceLastPlayed = Math.floor(timeDiffLastPlayed / 1000);
    const secondsSinceLastSlept = Math.floor(timeDiffLastSlept / 1000);

    console.log(`Seconds since last fed: ${secondsSinceLastFed}`);
    console.log(`Seconds since last played: ${secondsSinceLastPlayed}`);
    console.log(`Seconds since last slept: ${secondsSinceLastSlept}`);

    // Calculate stat decrements based on time passed
    const hungerDecrement = Math.floor(secondsSinceLastFed / (HUNGER_DECREMENT_PER_MINUTE / 1000));
    const moodDecrement = Math.floor(secondsSinceLastPlayed / (MOOD_DECREMENT_PER_MINUTE / 1000));
    const energyDecrement = Math.floor(secondsSinceLastSlept / (ENERGY_DECREMENT_PER_MINUTE / 1000));
    const energyIncrement = Math.floor(secondsSinceLastSlept / (ENERGY_INCREMENT_PER_MINUTE_WHEN_SLEEPING / 1000));

    // Update pet's stats and interaction timestamps
    pet.hunger = Math.max(0, pet.hunger - hungerDecrement);
    pet.mood = Math.max(0, pet.mood - moodDecrement);

    // Increase energy stat if the pet is sleeping, else decrement
    if (pet.is_sleeping) {
        console.log(`Increasing energy due to sleep`);
        pet.energy = Math.min(100, pet.energy + energyIncrement);

        // Set is_sleeping to false if energy is 100 or more
        if (pet.energy >= 100) {
            console.log(`Pet is waking up from sleep`);
            pet.is_sleeping = false;

            // Update last_slept timestamp when waking up
            pet.interaction.last_slept = currentTime;
        }
    } else { // Pet not sleeping
        pet.energy = Math.max(0, pet.energy - energyDecrement);
    }

    // Update interaction timestamps only when each interaction occurs
    if (secondsSinceLastFed > 0) {
        console.log(`Updating last_fed timestamp`);
        pet.interaction.last_fed = currentTime;
    }
    if (secondsSinceLastPlayed > 0) {
        console.log(`Updating last_played timestamp`);
        pet.interaction.last_played = currentTime;
    }
    if (secondsSinceLastSlept > 0) {
        console.log(`Updating last_slept timestamp`);
        pet.interaction.last_slept = currentTime;
    }

    if (pet.hunger === 0 || pet.mood === 0 || pet.energy === 0) {
        console.log('Pet is running away!');
        handleRunaway(pet.id); // Call the handleRunaway function to delete the pet
        return null; // Return null to stop further stat updates
    }

    return pet;
}

module.exports = decrementStats;
