const router = require('express').Router();
const { Pet, Interaction } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/addPet/:animalID/', async (req, res) => {
    try {
        const newInteraction = await Interaction.create()

        const newPet = await Pet.create({
            name: req.body.name,
            hunger: 100,
            mood: 100,
            energy: 100,
            user_id: req.session.user_id,
            animal_id: req.params.animalID,
            interaction_id: newInteraction.id,
        });

        //res.status(201).json(newInteraction);
        res.status(201).json(newPet);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Route for Pet running away
router.delete('/runaway/:petID', async (req, res) => {
    try {
        const petID = req.params.petID;

        // Fetch the pet's data from the database
        const pet = await Pet.findByPk(petID);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Delete the pet from the database
        await Pet.destroy({ where: { id: petID } });

        res.json({ message: 'Pet has run away!' });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;