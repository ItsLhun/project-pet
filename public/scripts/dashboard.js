//pet addition modal DOM elements and event listeners
const addPetElement = document.querySelector('.pet-modal');
const addPetCloseButton = document.querySelector('#pet-close');
const addPetButton = document.querySelector('.add-pet-button');

addPetButton.addEventListener('click', () => {
  addPetElement.style.display = 'flex';
});

addPetCloseButton.addEventListener('click', () => {
  addPetElement.style.display = 'none';
});

fetchUserEventsHTTP()
  .then((res) => {
    calendarInstance.setEvents(res.data);
  })
  .catch((error) => console.log(error));
