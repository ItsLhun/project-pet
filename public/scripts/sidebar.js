const sideMenuInput = document.querySelector('#side-menu-input');
const sideMenuToggle = document.querySelector('#menu-toggle');
const bodyElement = document.querySelector('body');
const sideMenu = document.querySelector('#sidebar-menu');
//const firstSectionElement = document.querySelector('section:first-of-type');

console.log('Hello');
let sideStatus = sideMenu?.style?.transform;

sideMenuInput.addEventListener('change', () => {
  sideStatus = sideMenu.style.transform;
  console.log('changed');
  if (sideStatus === 'none') {
    sideMenu.style.transform = 'translate(100%, 0)';
    bodyElement.classList.remove('no-scroll');
    sideMenu.classList.add('sidebar-no-show');
  } else {
    sideMenu.style.transform = 'none';
    sideMenu.classList.remove('sidebar-no-show');
    bodyElement.classList.add('no-scroll');
  }
});
