const playAnimal = async (event) => {
  if (event.target.hasAttribute('activity')) {
    const id = event.target.hasAttribute('id')
    const food = event.target.hasAttribute('activity')
    const preferedFood = document.querySelector('prefered-activity')
    if (food == preferedFood) {
      const response = await fetch(`/api/activity/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.querySelector('.mood') = response.hunger
      } 
    } else {
      console.log('wrong activity')
    }
  }
}

document.querySelector('.activity-list').addEventListener('click', playAnimal)