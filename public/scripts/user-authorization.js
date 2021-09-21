const dataList = document.getElementById('users-list');
let dataListValues = [];

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
