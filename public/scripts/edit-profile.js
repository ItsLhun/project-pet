const editBtn = document.getElementById('edit-profile-icon');
const saveBtn = document.getElementById('edit-profile-save');
const discardBtn = document.getElementById('edit-profile-discard');

const form = document.querySelector('#form-user-profile');
const profileValueFields = document.querySelectorAll('.profile-value');

editBtn.addEventListener('click', () => {
  editBtn.classList.add('d-none');
  discardBtn.classList.remove('d-none');
  saveBtn.classList.remove('d-none');

  profileValueFields.forEach((field) => {
    const value = field.innerText;
    const input = document.createElement('input');
    input.classList.add('profile-edit-input');
    input.value = value;
    input.setAttribute('name', field.getAttribute('name'));
    field.parentNode.replaceChild(input, field);
  });
});
saveBtn.addEventListener('click', (e) => {
  editBtn.classList.remove('d-none');
  discardBtn.classList.add('d-none');
  saveBtn.classList.add('d-none');
  form.submit();
});
discardBtn.addEventListener('click', (e) => {
  window.location.reload();
});
