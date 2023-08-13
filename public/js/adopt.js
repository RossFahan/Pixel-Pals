const signupForm = document.querySelector('.adopt-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-adopt').value;
  //animalID depends on how animal_id is stored on page
  const animalID = document.querySelector('#animal-id').value;

  try {
    const response = await fetch(`/api/addPet/${animalID}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the adoption page after successful signup
      res.redirect('/pets');
    } else {
      alert('Adoption failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});