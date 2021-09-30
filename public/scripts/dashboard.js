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
  .then(() => {
    const events = document.querySelectorAll('.event');
    events.forEach((event) => {
      event.style.background = event.color;
    });
  })
  .catch((error) => console.log(error));
