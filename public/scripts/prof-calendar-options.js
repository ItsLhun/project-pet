const calendarInstance = new calendarJs('calendar', {
  manualEditingEnabled: false
});
//set up notyf
const notyf = new Notyf({
  position: { x: 'center', y: 'center' },
  duration: 2000
});

//pet appointment event modal & related buttons
const newAppointmentBtn = document.getElementById('appointment-btn');
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

const userSearchInput = document.getElementById('user-search-input');
const appointmentDesc = document.getElementById('appointment-desc');
const dateAppointmentInput = document.getElementById('date-appointment-input');
const fromAppointmentInput = document.getElementById('from-appointment-input');
const toAppointmentInput = document.getElementById('to-appointment-input');

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
    option.setAttribute('pet-name', pet.name);

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
  const selectedFromDataListName = userDataList
    ?.querySelector(`option[value="${userSearchInput.value}"]`)
    ?.getAttribute('pet-name');
  console.log(selectedFromDataListId);

  //2021-10-07T12:01:00.000Z
  const formFields = {
    originPet: selectedFromDataListId,
    from: `${dateAppointmentInput.value}T${fromAppointmentInput.value}:00.000+00:00`,
    to: `${dateAppointmentInput.value}T${toAppointmentInput.value}:00.000+00:00`,
    title: 'Appointment',
    type: 'Vet Appointment',
    description: appointmentDesc.value,
    isAllDay: false,
    showAlerts: false,
    repeatEvery: null,
    reapeatEnds: null,
    repeatEveryCustomValue: null,
    repeatEveryCustomType: null,
    originPetName: selectedFromDataListName
  };
  console.log(formFields);
  switch (true) {
    case typeof selectedFromDataListId == 'undefined':
      notyf.error('You must select a client before moving forward');
      break;
    case appointmentDesc.value == '':
      notyf.error('You must fill out the description before moving forward');
      break;
    case dateAppointmentInput.value == '':
      notyf.error('You must fill the date before moving forward');
      break;
    case fromAppointmentInput.value == '':
    case toAppointmentInput.value == '':
      notyf.error('You must fill the times before moving forward');
      break;
    case fromAppointmentInput.value > toAppointmentInput.value:
      notyf.error('Start time must be earlier than end time');
      break;
    default:
      axios
        .post(`${ROOT_URL}/event/create`, formFields)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
  }
});
