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

editMedical.addEventListener('click', (e) => {});

editNutrition.addEventListener('click', (e) => {
  const nutritionInputs = document.getElementById('nutrition-inputs');
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
