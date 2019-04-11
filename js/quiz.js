const questionTitle = document.getElementById('questionTitle');
const wrapperAnswers = document.getElementById('wrapperAnswers');
const questionImage = document.getElementById('questionImage');
const questionOrder = document.getElementById('questionOrder');
const pointsPlayerOne = document.getElementById('pointsPlayerOne');
const pointsPlayerTwo = document.getElementById('pointsPlayerTwo');
const modalResult = document.getElementById('modalResult');

let questions = [
  '¿Cuanto es la suma total de 2 + 2?',
  '¿Cual es la capital del Perú?',
  '¿Qué es Github?'
];

let respuestas = [
  [4, 6, 9],
  ['Lima', 'Moquegua', 'Cuzco'],
  ['control de versiones', 'plataforma', 'comunidad']
];

let pointsCorrectJugadorUno = 0;
let pointsIncorrectJugadorUno = 0;

let pointsCorrectJugadorDos = 0;
let pointsIncorrectJugadorDos = 0;

// INDICADOR PUNTOS JUGADORES

var acertoJugada = 25;

var acumPuntosJugadorUno = 0;
var acumPuntosJugadorDos = 0;

// INDICADOR DE NUMERO DE PREGUNTAS

var indicarInicial = 1;


// NIVEL DE PREGUNTA

var level = 0;

function posicionQuestion() {
  questionOrder.textContent = `${indicarInicial++}/3`;
}

function templateModalResult(playerPhoto, playerName, pointTotal, pointCorrect, pointIncorrect) {
  return (`<h2>Ganador</h2>
  <img src="assets/${playerPhoto}.jpg" width="80" alt="UserModal">
  <h3>${playerName}</h3>
  <div class="modalResultStadist">
    <h3>Estadisticas</h3>
    <div class="points">
      <h4>Puntos obtenidos</h4>
      <small>${pointTotal}</small>
    </div>
    <div class="answerCorrect">
      <h4>Respuestas correctas</h4>
      <small>${pointCorrect}</small>
    </div>
    <div class="answerIncorrect">
      <h4>Respuestas incorrectas</h4>
      <small>${pointIncorrect}</small>
    </div>
  </div>`);
}

function showModal() {
  modalResult.classList.add('active-modalResult');
}

empezarJuego(level);

posicionQuestion();

var indice_respuesta_correcta;
var respuesta;

var jugadorUnoTurno = true;
var jugadorDosTurno = false;

function empezarJuego() {

  function jugadorUno() {
    if (respuesta === indice_respuesta_correcta) {
      console.log('Correcto jugador1');
      acumPuntosJugadorUno += acertoJugada;
      pointsCorrectJugadorUno += 1;
      empezarJuego(level++);
      posicionQuestion();

    } else {
      console.log('Incorrecto jugador1');
      jugadorUnoTurno = false;
      jugadorDosTurno = true;
      pointsIncorrectJugadorUno += 1;
    }
  }

  function jugadorDos() {
    if (respuesta === indice_respuesta_correcta) {
      console.log('Correcto jugador2');
      acumPuntosJugadorDos += acertoJugada;
      pointsCorrectJugadorDos += 1;
      empezarJuego(level++);
      posicionQuestion();
    } else {
      console.log('Incorrecto jugador2');
      jugadorDosTurno = false;
      jugadorUnoTurno = true;
      pointsIncorrectJugadorDos += 1;
    }
  }

  var indiceAleatorio = Math.floor(Math.random() * questions.length);

  let respuestas_posibles = respuestas[level];

  var posiciones = [0, 1, 2];
  var respuestas_reordenadas = [];

  var ya_se_metio = false;
  var posicion_aleatoria;
  for (i in respuestas_posibles) {
    posicion_aleatoria = Math.floor(Math.random() * posiciones.length);
    if (posicion_aleatoria === 0 && ya_se_metio == false) {
      indice_respuesta_correcta = i;
      ya_se_metio = true;
    }
    respuestas_reordenadas[i] = respuestas_posibles[posiciones[posicion_aleatoria]];
    posiciones.splice(posicion_aleatoria, 1);
  }

  var txt_respuestas = '';
  for (i in respuestas_reordenadas) {
    txt_respuestas += '<button class="answers__full" data-value="' + i + '">' + respuestas_reordenadas[i] + '</button>';
  }

  let applyImage = "";
  switch (level) {
    case 0:
      applyImage = 'https://i.pinimg.com/originals/e2/89/9c/e2899c265ad24e60cda1add2a8cb580f.jpg';
      break;
    case 1:
      applyImage = 'http://perugreenluxury.com.pe/wp-content/uploads/2017/09/Lima01.jpeg';
      break;
    case 2:
      applyImage = 'https://avatars0.githubusercontent.com/u/9919?s=280&v=4';
      break;
    default:
      console.log('No se encontraron imagenes')
      break;
  }

  questionTitle.innerHTML = questions[level];
  questionImage.setAttribute('src', applyImage);
  wrapperAnswers.innerHTML = txt_respuestas;

  //VERIFICAR LOS BOTONES DE RESPUESTAS

  pointsPlayerOne.innerHTML = acumPuntosJugadorUno + ' ' + 'pts';
  pointsPlayerTwo.innerHTML = acumPuntosJugadorDos + ' ' + 'pts';

  if (indicarInicial > 3 && acumPuntosJugadorUno > acumPuntosJugadorDos) {
    modalResult.innerHTML = templateModalResult('user01', 'Diego', acumPuntosJugadorUno, pointsCorrectJugadorUno, pointsIncorrectJugadorUno);
    showModal();
    level = 0;
    indicarInicial = 1;
    questionOrder.innerHTML = indicarInicial + '/3';
    empezarJuego(level);
  }
  else if (indicarInicial > 3 && acumPuntosJugadorDos > acumPuntosJugadorUno) {
    modalResult.innerHTML = templateModalResult('user02', 'Luis', acumPuntosJugadorDos, pointsCorrectJugadorDos, pointsIncorrectJugadorDos);
    showModal();
    level = 0;
    indicarInicial = 1;
    questionOrder.innerHTML = indicarInicial + '/3';
    empezarJuego(level);
  }

  var buttonAnswer = document.querySelectorAll('.answers__full');

  buttonAnswer.forEach(i => {
    i.addEventListener('click', () => {
      respuesta = i.dataset.value;
      if (jugadorUnoTurno === true) {
        jugadorUno();
      }

      else if (jugadorDosTurno === true) {
        jugadorDos();
      }
    })
  });



}


