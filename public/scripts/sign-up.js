const signUpUserSearch = document.getElementById('input-username-sign-up');
const available = document.getElementById('username-available');

signUpUserSearch.addEventListener('input', (event) => {
  checkUsernameAvailability(event.target.value);
});

const checkUsernameAvailability = (searchTerm) => {
  axios
    .post('http://localhost:3000/user/available', { searchTerm })
    .then((res) => {
      if (res.data.length) {
        available.innerText = 'Username already in use';
        available.style.color = 'red';
      } else {
        available.innerText = '';
      }
    })
    .catch((error) => console.error(error));
};
