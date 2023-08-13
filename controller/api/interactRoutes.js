const { Pet, Interaction } = require('../../models');
const { updateStats, decrementStats } = require('../../utils/stats');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.post('/feed/:petId', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.petId, {
            include: Interaction,
        });

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found.' });
        }

        // Decrement pet's stats based on time elapsed
        const updatedPet = decrementStats(pet);

        // Increment pet's hunger when fed
        updatedPet.hunger = Math.min(100, updatedPet.hunger + HUNGER_INCREMENT_WHEN_FED);

        // Update last_fed timestamp
        updatedPet.interaction.last_fed = dayjs().toISOString();

        await updatedPet.save();

        res.status(200).json(updatedPet, { message: 'Pet fed successfully.' });
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

        // Decrement pet's stats based on time elapsed
        const updatedPet = decrementStats(pet);

        // Increment pet's hunger when fed
        updatedPet.mood = Math.min(100, updatedPet.mood + MOOD_INCREMENT_WHEN_PLAYED);

        // Update last_fed timestamp
        updatedPet.interaction.last_played = dayjs().toISOString();

        await updatedPet.save();

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
        
        if(!pet) {
            return res.status(404).json({ massage: 'Pet not found.' });
        }

        const updatedPet = decrementStats(pet);

        updatedPet.energy = Math.min(100, updatedPet.enery + ENERGY_INCREMENT_WHEN_PLAYED);

        updatedPet.interaction.last_slept = dayjs().toISOString();

        await updatedPet.save();

        res.status(200).json(updatedPet, { message: 'Pet slept with successfully.'});
    }  catch (err) {
        res.status(500).json(err); 
    }
})

module.exports = router;