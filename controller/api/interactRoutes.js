const router = require('express').Router();
const { Pet, Interaction } = require('../../models');

// Route to feed the pet
router.post('/feed/:petId', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Decrement hunger and update the Interaction's last_fed timestamp
        pet.hunger = Math.max(0, pet.hunger - 1);
        const interaction = await Interaction.findByPk(pet.interaction_id);
        interaction.last_fed = new Date();
        
        await pet.save();
        await interaction.save();

        res.status(200).json({ message: 'Pet fed successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;