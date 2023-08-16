const handleRunaway = require('./runaway');

// Constants for stat decrement rates (in milliseconds)
const HUNGER_DECREMENT_PER_MINUTE = 60 * 1000; // 1 minute in milliseconds
const MOOD_DECREMENT_PER_MINUTE = 60 * 1000; // 1 minute in milliseconds
const ENERGY_DECREMENT_PER_MINUTE = 60 * 1000; // 1 minute in milliseconds
const ENERGY_INCREMENT_PER_MINUTE_WHEN_SLEEPING = 60 * 1000; // 1 minute in milliseconds

function decrementStats(pet) {
    const currentTime = new Date().getTime();

    // Calculate the time difference between interactions and current time in milliseconds
    const timeDiffLastFed = currentTime - new Date(pet.interaction.last_fed).getTime();
    const timeDiffLastPlayed = currentTime - new Date(pet.interaction.last_played).getTime();
    const timeDiffLastSlept = currentTime - new Date(pet.interaction.last_slept).getTime();

    // Convert milliseconds to minutes
    const minutesSinceLastFed = Math.floor(timeDiffLastFed / (60 * 1000));
    const minutesSinceLastPlayed = Math.floor(timeDiffLastPlayed / (60 * 1000));
    const minutesSinceLastSlept = Math.floor(timeDiffLastSlept / (60 * 1000));

    console.log("Minutes since last fed:", minutesSinceLastFed);
    console.log(`Minutes since last played: ${minutesSinceLastPlayed}`);
    console.log(`Minutes since last slept: ${minutesSinceLastSlept}`);

    // Calculate stat decrements based on time passed
    const hungerDecrement = Math.floor(minutesSinceLastFed / HUNGER_DECREMENT_PER_MINUTE);
    const moodDecrement = Math.floor(minutesSinceLastPlayed / MOOD_DECREMENT_PER_MINUTE);
    const energyDecrement = Math.floor(minutesSinceLastSlept / ENERGY_DECREMENT_PER_MINUTE);
    const energyIncrement = Math.floor(minutesSinceLastSlept / ENERGY_INCREMENT_PER_MINUTE_WHEN_SLEEPING);

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
            pet.interaction.last_slept = new Date(currentTime).toISOString();
        }
    } else { // Pet not sleeping
        pet.energy = Math.max(0, pet.energy - energyDecrement);
    }

    // Update interaction timestamps to current time
    console.log(`Updating interaction timestamps`);
    console.log(`Before update - last_fed: ${pet.interaction.last_fed}`);
    console.log(`Before update - last_played: ${pet.interaction.last_played}`);
    console.log(`Before update - last_slept: ${pet.interaction.last_slept}`);

    pet.interaction.last_fed = new Date(currentTime).toISOString();
    pet.interaction.last_played = new Date(currentTime).toISOString();
    pet.interaction.last_slept = new Date(currentTime).toISOString();

    console.log(`After update - last_fed: ${pet.interaction.last_fed}`);
    console.log(`After update - last_played: ${pet.interaction.last_played}`);
    console.log(`After update - last_slept: ${pet.interaction.last_slept}`);

    if (pet.hunger === 0 || pet.mood === 0 || pet.energy === 0) {
        console.log('Pet is running away!');
        handleRunaway(pet.id); // Call the handleRunaway function to delete the pet
        return null; // Return null to stop further stat updates
    }

    return pet;
}

module.exports = decrementStats;