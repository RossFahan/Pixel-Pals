const decrementPetStats = async (petId) => {
    try {
        const pet = await Pet.findByPk(petId);
        
        if (!pet) {
            throw new Error('Pet not found');
        }

        // Decrement mood, hunger, and energy
        pet.mood = Math.max(0, pet.mood - 1);
        pet.hunger = Math.max(0, pet.hunger - 1);
        pet.energy = Math.max(0, pet.energy - 1);
        
        await pet.save();

        // Check if any stat is zero, and delete the pet
        if (pet.mood === 0 || pet.hunger === 0 || pet.energy === 0) {
            await Pet.destroy({
                where: {
                    id: petId,
                },
            });
            console.log('Pet ran away');
        }
    } catch (err) {
        console.error('Error decrementing pet stats:', err);
    }
};