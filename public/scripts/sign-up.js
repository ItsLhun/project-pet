const signUpUserSearch = document.getElementById('input-username-sign-up');
const usernameAvailable = document.getElementById('username-available');

const signUpEmailSearch = document.getElementById('input-email-sign-up');
const emailAvailable = document.getElementById('email-available');

signUpUserSearch.addEventListener('input', (event) => {
  checkAvailability(event.target.value, event.target.name);
});

signUpEmailSearch.addEventListener('input', (event) => {
  checkAvailability(event.target.value, event.target.name);
});

const checkAvailability = (searchTerm, type) => {
  axios
    .post('http://localhost:3000/user/available', { searchTerm, type })
    .then((res) => {
      if (res.data.length) {
        type === 'username'
          ? (usernameAvailable.innerText = 'Username already in use')
          : (emailAvailable.innerText = 'Email address already in use');
      } else {
        usernameAvailable.innerText = '';
      }
    })
    .catch((error) => console.error(error));
};
