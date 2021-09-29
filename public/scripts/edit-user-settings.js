const colorInputs = document.getElementsByClassName('event-color');
console.log(colorInputs);

document.addEventListener('change', () => {
  for (let i = 0; i < colorInputs.length; i++) {
    colorInputs[i].parentNode.style.backgroundColor = colorInputs[i].value;
  }
});
