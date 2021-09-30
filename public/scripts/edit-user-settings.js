const colorInputs = document.getElementsByClassName('event-color');
const eventColorForm = document.getElementById('event-color-form');

document.addEventListener('change', () => {
  for (let i = 0; i < colorInputs.length; i++) {
    colorInputs[i].parentNode.style.backgroundColor = colorInputs[i].value;
  }

  eventColorForm.submit();
});
