const dayjs = require('dayjs');

// Constants for stat decrement rates
const HUNGER_DECREMENT_PER_HOUR = 5;
const MOOD_DECREMENT_PER_HOUR = 5;
const ENERGY_DECREMENT_PER_HOUR = 5;

router.post('/feed/:petId', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.petId);
        
        // Calculate the time difference between last fed and current time in hours
        const lastFedTime = dayjs(pet.interaction.last_fed);
        const currentTime = dayjs();
        const hoursSinceLastFed = currentTime.diff(lastFedTime, 'hour');
        
        // Calculate the amount to decrement hunger based on time passed
        const hungerDecrement = hoursSinceLastFed * HUNGER_DECREMENT_PER_HOUR;
        
        // Update the pet's hunger, ensuring it doesn't go below 0
        pet.hunger = Math.max(0, pet.hunger - hungerDecrement);
        pet.interaction.last_fed = currentTime.toISOString(); // Update last_fed timestamp
        
        // Decrement mood and energy similarly
        
        const moodDecrement = hoursSinceLastFed * MOOD_DECREMENT_PER_HOUR;
        pet.mood = Math.max(0, pet.mood - moodDecrement);
        pet.interaction.last_played = currentTime.toISOString(); // Update last_played timestamp
        
        const energyDecrement = hoursSinceLastFed * ENERGY_DECREMENT_PER_HOUR;
        pet.energy = Math.max(0, pet.energy - energyDecrement);
        pet.interaction.last_slept = currentTime.toISOString(); // Update last_slept timestamp
        
        await pet.save(); // Save changes to the database
        
        res.status(200).json({ message: 'Interacted with pet successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});
