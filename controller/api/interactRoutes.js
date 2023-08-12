const { Pet, Interaction } = require('../../models');
const { updateStats } = require('../../utils/stats');
const router = require('express').Router();

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

        res.status(200).json({ message: 'Pet fed successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;