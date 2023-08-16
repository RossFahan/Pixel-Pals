const sleep = async () => {
const button = document.querySelector('#sleep')
  const id = button.getAttribute('data-pet-id');
  console.log(id)
    const response = await fetch(`/api/sleep/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
  console.log("yay")
    } else {
      alert("err",response.statusText);
    }
};

document.querySelector('#sleep').addEventListener('click', sleep);