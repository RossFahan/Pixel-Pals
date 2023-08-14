const { Pet } = require('../models'); // Adjust the path as needed

async function handleRunaway(petID) {
    try {
        // Fetch the pet's data from the database
        const pet = await Pet.findByPk(petID);

        if (!pet) {
            console.log('Pet not found');
            return;
        }

        // Delete the pet from the database
        await Pet.destroy({ where: { id: petID } });

        console.log('Pet has run away!');
    } catch (err) {
        console.error(err);
    }
}

module.exports =  handleRunaway;