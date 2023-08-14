const signupForm = document.querySelector('.adopt-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-adopt').value;
  //animalID depends on how animal_id is stored on page
  const animalButton = document.querySelector('#animal-button');
  const animalID = animalButton.getAttribute('animal-id');

  if (!name) {
    alert('Enter your pet name');
  }
  
  try {
    const response = await fetch(`/api/pets/addPet/${animalID}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the adoption page after successful signup
      // res.redirect('/pets');
      document.location.replace('/pets');
    } else {
      alert('Adoption failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});