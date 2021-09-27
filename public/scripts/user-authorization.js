const dataList = document.getElementById('users-list');
const addAuthUser = document.querySelector('#add-auth-user-button');
const authUserSearch = document.getElementById('user-search-input');

let dataListValues = [];

authUserSearch.addEventListener('input', (event) => {
  searchUser(event.target.value);
});

addAuthUser.addEventListener('click', () => {
  const collapsible = document.querySelector('.collapsible');
  collapsible.classList.toggle('active');

  let content = collapsible.querySelector('.collapsible-content');

  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
});

const createOption = (user, data, dataValues) => {
  if (!dataValues.includes(user.username)) {
    const option = document.createElement('option');
    option.value = user.username;
    data.appendChild(option);
  }
  for (i = 0; i < data.options.length; i++) {
    if (!dataValues.includes(data.options[i].value)) {
      dataValues.push(data.options[i].value);
    }
  }
};

const renderDataList = (users, data, dataValues) => {
  users.forEach((user) => createOption(user, data, dataValues));
};

const searchUser = (searchTerm) => {
  axios
    .post('http://localhost:3000/user/search', { searchTerm })
    .then((res) => {
      renderDataList(res.data, dataList, dataListValues);
    })
    .catch((error) => console.error(error));
};

// Veterinarian search

const vetDataList = document.getElementById('vet-list');
const addAuthVet = document.querySelector('#add-auth-vet-button');
const authVetSearch = document.getElementById('vet-search-input');

let vetListValues = [];

authVetSearch?.addEventListener('input', (event) => {
  searchUser(event.target.value);
});

addAuthVet?.addEventListener('click', () => {
  const collapsible = document.querySelector('.collapsible');
  collapsible.classList.toggle('active');
  let content = collapsible.querySelector('.collapsible-content');
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
});

const searchVet = (searchTerm) => {
  axios
    .post('http://localhost:3000/user/search', { searchTerm })
    .then((res) => {
      renderDataList(res.data, vetDataList, vetListValues);
    })
    .catch((error) => console.error(error));
};
