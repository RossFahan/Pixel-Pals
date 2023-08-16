const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  console.log(username, password)
  if (username && password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/pets');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document.querySelector('.sign-up-button').addEventListener('click', () => {
  document.querySelector('.signup-form').style.display = 'block';
  document.querySelector('.login-form').style.display = 'none';
});

document.querySelector('.logged-in-button').addEventListener('click', () => {
  document.querySelector('.signup-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
});

