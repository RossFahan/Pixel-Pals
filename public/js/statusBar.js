document.addEventListener("DOMContentLoaded", function () {
    const hunger = parseInt(window.hunger);
    const mood = parseInt(window.mood);
    const energy = parseInt(window.energy);

    function updateStatusBars() {
        updateHungerBar(hunger);
        updateMoodBar(mood);
        updateEnergyBar(energy);
    }

    function updateHungerBar(hungerLevel) {
        const hungerFillElement = document.getElementById('hunger-fill');

        hungerFillElement.style.width = `${hungerLevel}%`;

        if (hungerLevel < 30) {
            hungerFillElement.style.backgroundColor = 'red';
        } else if (hungerLevel < 75) {
            hungerFillElement.style.backgroundColor = 'yellow';
        } else {
            hungerFillElement.style.backgroundColor = 'green';
        }
    }

    function updateMoodBar(moodLevel) {
        const moodFillElement = document.getElementById('mood-fill');

        moodFillElement.style.width = `${moodLevel}%`;

        if (moodLevel < 30) {
            moodFillElement.style.backgroundColor = 'red';
        } else if (moodLevel < 75) {
            moodFillElement.style.backgroundColor = 'yellow';
        } else {
            moodFillElement.style.backgroundColor = 'green';
        }
    }

    function updateEnergyBar(energyLevel) {
        const energyFillElement = document.getElementById('energy-fill');

        energyFillElement.style.width = `${energyLevel}%`;

        if (energyLevel < 30) {
            energyFillElement.style.backgroundColor = 'red';
        } else if (energyLevel < 75) {
            energyFillElement.style.backgroundColor = 'yellow';
        } else {
            energyFillElement.style.backgroundColor = 'green';
        }
    }

    // Retrieve the pet ID from the hidden input element
    const petId = document.getElementById('pet-id').value;

    // Create an interval to update status bars every 5 seconds
    setInterval(updateStatusBars, 250); // 5000 milliseconds = 5 seconds
});