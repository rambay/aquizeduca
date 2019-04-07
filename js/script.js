
const menu = document.getElementById('menuBurguer'),
      navMenu = document.getElementById('menuNav');

const tool = document.getElementById('tooltip');

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

function toolTipActive() {
 tool.classList.add('tooltip-active');
}

function toolTipFalse() {
  tool.classList.remove('tooltip-active');
 }
