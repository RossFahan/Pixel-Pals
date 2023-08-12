const feedAnimal = async (event) => {
  if (event.target.hasAttribute('food')) {
    const id = event.target.hasAttribute('id')
    const food = event.target.hasAttribute('food')
    const preferedFood = document.querySelector('prefered-food')
    if (food == preferedFood) {
      const response = await fetch(`/api/feed/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.querySelector('.hunger') = response.hunger
      } 
    } else {
      console.log('wrong food')
    }
  }
}

document.querySelector('.food-list').addEventListener('click', feedAnimal)