const draggableButton = document.querySelectorAll('.draggable-button');

draggableButton.forEach((btn) => {
  interact(btn).draggable({
    listeners: {
      start(event) {
        event.interaction.startOffset = { x: 0, y: 0 };
      },
      move(event) {
        const { x, y } = event.interaction.startOffset;
        const dx = event.pageX - event.clientX0;
        const dy = event.pageY - event.clientY0;
        event.target.style.transform = `translate(${x + dx}px, ${y + dy}px)`;
      },
      end(event) {
        event.target.style.transform = 'translate(0px, 0px)';
      },
    },
  });
})


const dropZone = document.querySelector('.drop-zone');

interact(dropZone)
  .dropzone({
    ondrop: function (event) {
      const droppedElement = event.relatedTarget;
      console.log(droppedElement.id + ' was dropped in ');
    },
  });

/* const draggable = new Draggable(draggableButton, {
  draggable: '.draggable-button',
  dropzone: '.drop-zone',
  delay: 100,
});
 */
/* draggable.on('droppable:dropped', (event) => {
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
}); */