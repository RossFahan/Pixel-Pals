const { Pet, Interaction } = require('../../models');
const decrementStats = require('../../utils/stats');
const router = require('express').Router();
const dayjs = require('dayjs');
const withAuth = require('../../utils/auth');

const HUNGER_INCREMENT_WHEN_FED = 10;
const MOOD_INCREMENT_WHEN_PLAYED = 15;

router.post('/feed/:petId', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.petId, {
            include: Interaction,
        });

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }
        // Interaction wakes up pet
        pet.is_sleeping = false;

        // Decrement pet's stats based on time elapsed
        const updatedPet = decrementStats(pet);



        // Increment pet's hunger when fed
        updatedPet.hunger = Math.min(100, updatedPet.hunger + HUNGER_INCREMENT_WHEN_FED);

        // Update last_fed timestamp
        updatedPet.interaction.last_fed = dayjs().toISOString();

        await updatedPet.save();

        // Update last_fed timestamp in Interaction table
        const interaction = await Interaction.findByPk(pet.interaction.id);
        interaction.last_fed = updatedPet.interaction.last_fed;
        await interaction.save();

        res.status(200).json(/* updatedPet,  */{ message: 'Pet fed successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/activity/:petId', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.petId, {
            include: Interaction,
        });

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }

        // Interaction wakes up pet
        pet.is_sleeping = false;

        // Decrement pet's stats based on time elapsed
        const updatedPet = decrementStats(pet);

        // Increment pet's mood when played
        updatedPet.mood = Math.min(100, updatedPet.mood + MOOD_INCREMENT_WHEN_PLAYED);

        // Update last_played timestamp
        updatedPet.interaction.last_played = dayjs().toISOString();

        await updatedPet.save();

        // Update last_played timestamp in Interaction table
        const interaction = await Interaction.findByPk(pet.interaction.id);
        interaction.last_played = updatedPet.interaction.last_played;
        await interaction.save();

        res.status(200).json(updatedPet, { message: 'Pet played with successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/sleep/:petID', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.petID, {
            include: Interaction,
        });

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }

        // Check if the pet is already sleeping
        if (pet.is_sleeping) {
            return res.status(400).json({ message: 'Pet is already sleeping.' });
        }

        // Set the pet's sleeping state to true
        pet.is_sleeping = true;

        // Decrement pet's stats based on time elapsed
        const updatedPet = decrementStats(pet);

        // Update last_slept timestamp
        updatedPet.interaction.last_slept = currentTime.toISOString();

        // Save the updated pet
        await updatedPet.save();

        res.status(200).json({ pet: updatedPet, message: 'Pet slept successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
