const calendarInstance = new calendarJs('calendar', {
  manualEditingEnabled: false
});
//pet appointment event modal & related buttons
const newAppointmentBtn = document.getElementById('appointment-btn');
const userSearchInput = document.getElementById('user-search-input');
const deletionElement = document.querySelector('.confirm');
const closeButton = document.querySelector('.close');
const cancelButton = document.querySelector('.btn-cancel');

newAppointmentBtn.addEventListener('click', () => {
  deletionElement.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
  deletionElement.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
  deletionElement.style.display = 'none';
});

// newAppointmentBtn.addEventListener('click', (e) => {});

const userDataList = document.createElement('datalist');
userDataList.setAttribute('id', 'users-list');

userSearchInput.insertAdjacentElement('afterend', userDataList);

let usersListValues = [];

userSearchInput.addEventListener('input', (event) => {
  searchPet(event.target.value, '');
});

const createOption = (pet, data, dataValues) => {
  if (
    !dataValues.includes(
      `${pet.owner.firstName} ${pet.owner.lastName} - ${pet.name}`
    )
  ) {
    const option = document.createElement('option');
    option.value = `${pet.owner.firstName} ${pet.owner.lastName} - ${pet.name}`;
    option.setAttribute('pet-id', pet._id);
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

const searchPet = (searchTerm, field) => {
  axios
    .post(`${ROOT_URL}/pet/search`, {
      searchTerm
    })
    .then((res) => {
      renderDataList(res.data, userDataList, usersListValues);
    })
    .catch((error) => console.error(error));
};

const addAppointmentButtonPost = document.getElementById(
  'add-appointment-post'
);

addAppointmentButtonPost.addEventListener('click', (e) => {
  //get selected option element to access its Id
  const selectedFromDataListId = userDataList
    ?.querySelector(`option[value="${userSearchInput.value}"]`)
    ?.getAttribute('pet-id');
  console.log(selectedFromDataListId);

  const formFields = {
    originPet: selectedFromDataListId
  };

  console.log(formFields);
  //   axios
  //     .post(`${ROOT_URL}/event/edit/medical/`, formFields)
  //     .then((res) => {
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     });
});
