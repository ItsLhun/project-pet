//details btns
const editDetails = document.getElementById('edit-details-btn');
const editDetailsSave = document.getElementById('edit-details-save');
const editDetailsDiscard = document.getElementById('edit-details-discard');

const detailsForm = document.getElementById('profile-details-form');

//medical btns
const editMedical = document.getElementById('edit-medical-btn');
const editMedicalSave = document.getElementById('edit-medical-save');
const editMedicalDiscard = document.getElementById('edit-medical-discard');

//nutrition btns
const editNutrition = document.getElementById('edit-nutrition-btn');
const editNutritionSave = document.getElementById('edit-nutrition-save');
const editNutritionDiscard = document.getElementById('edit-nutrition-discard');

editDetails.addEventListener('click', (e) => {
  const detailsValues = document.querySelectorAll('.profile-value');
  detailsValues.forEach((field) => {
    const input = document.createElement('input');
    input.classList.add('profile-edit-input');
    input.value = field.innerText;
    input.setAttribute('name', field.getAttribute('name'));
    input.setAttribute('type', field.getAttribute('type'));

    field.parentNode.replaceChild(input, field);
  });

  editDetails.classList.add('d-none');
  editDetailsSave.classList.remove('d-none');
  editDetailsDiscard.classList.remove('d-none');
  editDetailsSave.addEventListener('click', (e) => {
    editDetails.classList.remove('d-none');
    editDetailsDiscard.classList.add('d-none');
    editDetailsSave.classList.add('d-none');

    detailsForm.submit();
  });
  editDetailsDiscard.addEventListener('click', (e) => {
    window.location.reload();
  });
});

editMedical?.addEventListener('click', (e) => {});

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
