//details btns
const editDetails = document.getElementById('edit-details-btn');
const editDetailsSave = document.getElementById('edit-details-save');
const editDetailsDiscard = document.getElementById('edit-details-discard');

//medical btns
const editMedical = document.getElementById('edit-medical-btn');
const editMedicalSave = document.getElementById('edit-medical-save');
const editMedicalDiscard = document.getElementById('edit-medical-discard');

//nutrition btns
const editNutrition = document.getElementById('edit-nutrition-btn');
const editNutritionSave = document.getElementById('edit-nutrition-save');
const editNutritionDiscard = document.getElementById('edit-nutrition-discard');

//authorize user modal, related form & buttons
const authElement = document.querySelector('.auth-modal');
const authCloseButton = document.querySelector('#auth-close');
const addAuthButton = document.querySelector('#add-auth');

addAuthButton.addEventListener('click', () => {
  authElement.style.display = 'flex';
});

authCloseButton.addEventListener('click', () => {
  authElement.style.display = 'none';
});

//confirm pet deletion modal & related buttons
const deleteButton = document.querySelector('#delete-pet');
const deletionElement = document.querySelector('#confirm-modal');
const deletionCloseButton = document.querySelector('#confirm-close');
const deletionCancelButton = document.querySelector('#confirm-cancel');

deleteButton.addEventListener('click', () => {
  deletionElement.style.display = 'flex';
});

deletionCloseButton.addEventListener('click', () => {
  deletionElement.style.display = 'none';
});

deletionCancelButton.addEventListener('click', () => {
  deletionElement.style.display = 'none';
});

document.addEventListener('click', (event) => {
  console.log(event.target);
  if (event.target.classList.contains('close-modal')) {
    deletionElement.style.display = 'none';
    authElement.style.display = 'none';
  }
});

editDetails.addEventListener('click', (e) => {
  const detailsForm = document.getElementById('profile-details-form');
  const detailsValues = detailsForm.querySelectorAll('.profile-value');

  //name
  const nameInput = document.createElement('input');
  nameInput.value = detailsValues[0].innerText;
  nameInput.classList.add('profile-edit-input');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('type', 'text');
  detailsValues[0].parentNode.replaceChild(nameInput, detailsValues[0]);

  //birthday
  const birthdayInput = document.createElement('input');

  birthdayInput.classList.add('profile-edit-input');
  birthdayInput.setAttribute('name', 'birthday');
  birthdayInput.setAttribute('type', 'date');

  birthdayInput.valueAsDate = new Date(
    detailsValues[1].innerText.split('/').reverse().join('-') + 'T00:00:00'
  );
  console.log(
    detailsValues[1].innerText.split('/').reverse().join('-') + 'T00:00:00'
  );
  detailsValues[1].parentNode.replaceChild(birthdayInput, detailsValues[1]);

  //species
  const speciesInput = document.createElement('select');
  speciesInput.classList.add('profile-edit-input');
  speciesInput.setAttribute('name', 'species');

  // options
  const options = ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Other'];
  options.forEach((option) => {
    const input = document.createElement('option');
    input.setAttribute('id', `option-${option}`);
    input.classList.add('profile-edit-input');
    input.value = option;
    input.textContent = option;
    speciesInput.appendChild(input);
  });

  detailsValues[2].parentNode.replaceChild(speciesInput, detailsValues[2]);

  // this ensures the currently seleted species input is pre-selected every time
  document.getElementById(
    `option-${detailsValues[2].innerText}`
  ).selected = true;

  editDetails.classList.add('d-none');
  editDetailsSave.classList.remove('d-none');
  editDetailsDiscard.classList.remove('d-none');
  editDetailsSave.addEventListener('click', (e) => {
    editDetails.classList.remove('d-none');
    editDetailsDiscard.classList.add('d-none');
    editDetailsSave.classList.add('d-none');
    console.log(speciesInput.value);
    detailsForm.submit();
  });
  editDetailsDiscard.addEventListener('click', (e) => {
    window.location.reload();
  });
});

editMedical.addEventListener('click', (e) => {
  const detailsForm = document.getElementById('profile-medical-form');
  const detailsValues = detailsForm.querySelectorAll('.profile-value');
  const activePetId = detailsValues[3].value;

  //Med Id
  const medId = document.createElement('input');
  medId.value = detailsValues[0].innerText;
  medId.classList.add('profile-edit-input');
  medId.setAttribute('name', 'medicalId');
  medId.setAttribute('type', 'text');
  detailsValues[0].parentNode.replaceChild(medId, detailsValues[0]);

  // Veterinarian search
  const currentVetId = detailsValues[2].getAttribute('value'); // null if no vet is assigned yet
  const vetNameSearch = document.createElement('input');
  vetNameSearch.value = detailsValues[2].innerText;
  vetNameSearch.classList.add('profile-edit-input');
  vetNameSearch.setAttribute('name', 'veterinarian');
  vetNameSearch.setAttribute('type', 'text');
  vetNameSearch.setAttribute('autocomplete', 'off');
  vetNameSearch.setAttribute('list', 'vet-list');

  const vetDataList = document.createElement('datalist');
  vetDataList.setAttribute('id', 'vet-list');

  detailsValues[2].parentNode.replaceChild(vetNameSearch, detailsValues[2]);
  vetNameSearch.parentNode.appendChild(vetDataList);

  let vetListValues = [];

  vetNameSearch.addEventListener('input', (event) => {
    searchVet(event.target.value, 'username');
  });

  const createOption = (user, data, dataValues) => {
    if (
      !dataValues.includes(
        `${user.firstName} ${user.lastName} - ${user.username}`
      )
    ) {
      const option = document.createElement('option');
      option.value = `${user.firstName} ${user.lastName} - ${user.username}`;
      option.setAttribute('vet-id', user._id);
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

  const searchVet = (searchTerm, field) => {
    axios
      .post(`${ROOT_URL}/professional/search/${field}/veterinarian`, {
        searchTerm
      })
      .then((res) => {
        renderDataList(res.data, vetDataList, vetListValues);
      })
      .catch((error) => console.error(error));
  };

  //buttons appear/dissapear
  editMedical.classList.add('d-none');
  editMedicalSave.classList.remove('d-none');
  editMedicalDiscard.classList.remove('d-none');
  editMedicalSave.addEventListener('click', (e) => {
    editMedical.classList.remove('d-none');
    editMedicalDiscard.classList.add('d-none');
    editMedicalSave.classList.add('d-none');

    //get selected option element to access its Id
    const selectedFromDataListId = vetDataList
      ?.querySelector(`option[value="${vetNameSearch.value}"]`)
      ?.getAttribute('vet-id');
    console.log(selectedFromDataListId);

    const formFields = {
      medicalId: medId.value,
      veterinarian: selectedFromDataListId,
      _id: activePetId,
      oldVet: currentVetId
    };

    console.log('fields', formFields);
    const notyf = new Notyf({ position: { x: 'center', y: 'center' } });
    axios
      .post(`${ROOT_URL}/pet/edit/medical/`, formFields)
      .then((res) => {
        // notyf.success('Edited sucessfully');
        // setTimeout(() => {
        window.location.reload();
        // }, 900);
      })
      .catch((error) => {
        notyf.error('Could not update');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      });
  });
  editMedicalDiscard.addEventListener('click', (e) => {
    window.location.reload();
  });
});

editNutrition.addEventListener('click', (e) => {
  const nutritionInputs = document.getElementById('profile-nutrition-form');
  const dailyServingInput = document.createElement('input');
  dailyServingInput.classList.add('profile-edit-input');
  dailyServingInput.value = nutritionInputs.children[1].lastChild.innerText;

  dailyServingInput.classList.add('profile-edit-input');
  nutritionInputs.children[1].removeChild(
    nutritionInputs.children[1].lastChild
  );
  nutritionInputs.children[1].appendChild(dailyServingInput);
  editNutrition.classList.add('d-none');
  editNutritionSave.classList.remove('d-none');
  editNutritionDiscard.classList.remove('d-none');
  editNutritionSave.addEventListener('click', (e) => {
    editBtn.classList.remove('d-none');
    discardBtn.classList.add('d-none');
    saveBtn.classList.add('d-none');

    form.submit();
  });
  editNutritionDiscard.addEventListener('click', (e) => {
    window.location.reload();
  });
});

function togglePencil(boolean) {
  if (boolean) {
    editDetails.classList.remove('d-none');
    editDetailsDiscard.classList.add('d-none');
    editDetailsSave.classList.add('d-none');
  }
}
