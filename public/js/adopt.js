const animalButtons = document.querySelectorAll('.animal-button');

animalButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-adopt').value;
    const animalID = button.getAttribute('data-animal-id');

    if (!name) {
      alert('Enter your pet name');
    }
    else {
      try {
        const response = await fetch(`/api/pets/addPet/${animalID}`, {
          method: 'POST',
          body: JSON.stringify({ name }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          // Redirect to the adoption page after successful signup
          document.location.replace('/pets');
        } else {
          alert('Adoption failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
});
