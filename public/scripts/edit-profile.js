const editBtn = document.querySelector('.edit-profile-icon');
const form = document.querySelector('#form-user-profile');
const profileValueFields = document.querySelectorAll('.profile-value');

const submitBtn = document.createElement('button');
submitBtn.innerText = 'Save';

editBtn.addEventListener('click', () => {
  form.removeChild(editBtn);
  form.appendChild(submitBtn);

  profileValueFields.forEach((field) => {
    const value = field.innerText;
    const input = document.createElement('input');
    input.value = value;
    input.setAttribute('name', field.getAttribute('name'));
    field.parentNode.replaceChild(input, field);
  });
});
