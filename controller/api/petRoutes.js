const router = require('express').Router();
const { Pet, Interaction } = require('../../models');

router.post('/addPet/:animalID/', async (req, res) => {
    try {
        const newInteraction = await Interaction.create()

        const newPet = await Pet.create({
            name: req.body.name,
            hunger: req.body.hunger,
            mood: req.body.mood,
            energy: req.body.energy,
            user_id: req.session.user_id,
            animal_id: req.params.animalID,
        });
        
        res.status(201).json(newInteraction);
        res.status(201).json(newPet);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;