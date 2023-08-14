import { Draggable } from 'draggable';

const draggableButton = document.querySelector('.draggable-button');

const draggable = new Draggable(draggableButton, {
  draggable: '.draggable-button',
  dropzone: '.drop-zone',
  delay: 100,
});

draggable.on('droppable:dropped', (event) => {
  const dropTarget = event.source.dropzone;
  if (dropTarget == dropzone) {
    const feedAnimal = async (event) => {
      if (event.target.getAttribute('food')) {
        const id = event.target.getAttribute('id')
        const food = event.target.getAttribute('food')
        const preferedFood = document.querySelector('.prefered-food')
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
  }
});