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
    ondrop: async function (event) {

      const droppedElement = event.relatedTarget;
      console.log(dropZone)
      console.log(droppedElement.id + ' was dropped into ' + dropZone.id);
      const id = dropZone.getAttribute('data-id')
      console.log(id)
      if (droppedElement.id == dropZone.id) {
        //console.log('Prefered Food')
        const response = await fetch(`/api/feed/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          //document.querySelector('.hunger') = response.hunger
        } else {
          alert(response.statusText);
        }
      }
    },
  });