document.addEventListener("DOMContentLoaded", function() {
  const activityButtons = document.querySelectorAll('.activity-list');

  activityButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      
      const id = button.getAttribute('data-pet-id');
      
      const response = await fetch(`/api/activity/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        document.querySelector('.mood').textContent = responseData.hunger;
      }
    });
  });

  const activityButton = document.querySelector('.activity-button');
  const activityDropdown = document.querySelector('#activity-dropdown');

  if (activityButton && activityDropdown) {
    activityButton.addEventListener("click", function() {
      activityDropdown.classList.toggle("is-active");
    });
  }
});


// const playAnimal = async (event) => {
//   if (event.target.hasAttribute('activity')) {
//     const id = event.target.hasAttribute('id')
//     const food = event.target.hasAttribute('activity')
//     const preferedFood = document.querySelector('prefered-activity')
//     if (food == preferedFood) {
//       const response = await fetch(`/api/activity/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       if (response.ok) {
//         document.querySelector('.mood') = response.hunger
//       } 
//     } else {
//       console.log('wrong activity')
//     }
//   }
// }

// document.querySelector('.activity-list').addEventListener('click', playAnimal)
