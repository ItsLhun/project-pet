const dataList = document.getElementById('users-list');
const authorizedUsers = document.querySelector('.authorized');

let dataListValues = [];

authorizedUsers.addEventListener('click', () => {
  const collapsible = authorizedUsers.querySelector('.collapsible');
  collapsible.classList.toggle('active');

  let content = collapsible.querySelector('.collapsible-content');

  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
});

const renderDataList = (users) => {
  users.forEach((user) => createOption(user));
};

const createOption = (user) => {
  if (!dataListValues.includes(user.username)) {
    const option = document.createElement('option');
    option.value = user.username;
    dataList.appendChild(option);
  }

  for (i = 0; i < dataList.options.length; i++) {
    if (!dataListValues.includes(dataList.options[i].value)) {
      dataListValues.push(dataList.options[i].value);
    }
  }
};

const searchUser = (searchTerm) => {
  axios
    .post('http://localhost:3000/user/search', { searchTerm })
    .then((res) => {
      renderDataList(res.data);
    })
    .catch((error) => console.error(error));
};
