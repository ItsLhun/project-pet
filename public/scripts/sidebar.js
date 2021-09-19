const sideMenuInput = document.querySelector('#side-menu-input');
const sideMenuToggle = document.querySelector('#menu-toggle');
const bodyElement = document.querySelector('body');
const htmlElement = document.querySelector('html');
const sideMenu = document.querySelector('#sidebar-menu');

let sideStatus = sideMenu?.style?.transform;

sideMenuInput.addEventListener('change', () => {
  sideStatus = sideMenu.style.transform;
  if (sideStatus === 'none') {
    console.log(sideMenuInput.checked);
    sideMenu.style.transform = 'translate(100%, 0)';
    bodyElement.classList.remove('no-scroll');
    htmlElement.classList.remove('no-scroll');
    sideMenu.classList.add('sidebar-no-show');
  } else {
    sideMenu.style.transform = 'none';
    sideMenu.classList.remove('sidebar-no-show');
    bodyElement.classList.add('no-scroll');
    htmlElement.classList.add('no-scroll');
  }
});
bodyElement.addEventListener('click', (e) => {
  if (
    (bodyElement === e.target || e.target !== sideMenu) &&
    e.target !== sideMenuInput
  ) {
    sideMenuInput.checked = false;
    console.log(sideMenuInput.checked);
    sideMenu.classList.add('sidebar-no-show');
    sideMenu.style.transform = 'translate(100%, 0)';
    bodyElement.classList.remove('no-scroll');
    htmlElement.classList.remove('no-scroll');
  }
});
