
const menu = document.getElementById('menuBurguer'),
      navMenu = document.getElementById('menuNav');

const ipad = window.matchMedia('screen and (max-width: 800px)');

ipad.addListener(validacion);

function validacion(event) {
  if (event.matches) {
    navMenu.addEventListener('click', showMenu);
  } else {
    navMenu.removeEventListener('click', showMenu);
  }
}

menu.addEventListener('click', showMenu);

function showMenu() {
  menu.classList.toggle('is-active');
  navMenu.classList.toggle('menu-active')
};
