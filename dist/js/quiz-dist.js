'use strict';

var questionTitle = document.getElementById('questionTitle');
var wrapperAnswers = document.getElementById('wrapperAnswers');
var questionImage = document.getElementById('questionImage');
var questionOrder = document.getElementById('questionOrder');
var pointsPlayerOne = document.getElementById('pointsPlayerOne');
var pointsPlayerTwo = document.getElementById('pointsPlayerTwo');
var modalResult = document.getElementById('modalResult');

var questions = ['¿Cuanto es la suma total de 2 + 2?', '¿Cual es la capital del Perú?', '¿Qué es Github?'];

var respuestas = [[4, 6, 9], ['Lima', 'Moquegua', 'Cuzco'], ['control de versiones', 'plataforma', 'comunidad']];

var pointsCorrectJugadorUno = 0;
var pointsIncorrectJugadorUno = 0;

var pointsCorrectJugadorDos = 0;
var pointsIncorrectJugadorDos = 0;

// INDICADOR PUNTOS JUGADORES

var acertoJugada = 25;

var acumPuntosJugadorUno = 0;
var acumPuntosJugadorDos = 0;

// INDICADOR DE NUMERO DE PREGUNTAS

var questionInitial = 1;

questionOrder.textContent = questionInitial + '/3';

// NIVEL DE PREGUNTA

var level = 0;

function posicionQuestion() {
  if (questionInitial >= 3) {
    questionOrder.textContent = questionInitial + '/3';
  } else {
    questionOrder.textContent = ++questionInitial + '/3';
  }
}

function templateModalResult(playerPhoto, playerName, pointTotal, pointCorrect, pointIncorrect) {
  return '<span id="closeModal" onclick="cerrarModal()" class="closeModal fas fa-times"></span>\n    <h2>Ganador</h2>\n    <img src="assets/' + playerPhoto + '.jpg" width="80" alt="UserModal">\n    <h3>' + playerName + '</h3>\n    <div class="modalResultStadist">\n    <h3>Estadisticas</h3>\n    <div class="points">\n    <h4>Puntos obtenidos</h4>\n    <small>' + pointTotal + '</small>\n    </div>\n    <div class="answerCorrect">\n    <h4>Respuestas correctas</h4>\n    <small>' + pointCorrect + '</small>\n    </div>\n    <div class="answerIncorrect">\n    <h4>Respuestas incorrectas</h4>\n    <small>' + pointIncorrect + '</small>\n    </div>\n    </div>';
}

function showModal() {
  modalResult.classList.add('active-modalResult');
}

empezarJuego(level);

var indice_respuesta_correcta;
var valueAnswer;

var jugadorUnoTurno = true;
var jugadorDosTurno = false;

cerrarModal();

function empezarJuego() {

  var indiceAleatorio = Math.floor(Math.random() * questions.length);

  var respuestas_posibles = respuestas[level];

  var posiciones = [0, 1, 2];
  var respuestas_reordenadas = [];

  var ya_se_metio = false;
  var posicion_aleatoria;
  for (var i in respuestas_posibles) {
    posicion_aleatoria = Math.floor(Math.random() * posiciones.length);
    if (posicion_aleatoria === 0 && ya_se_metio == false) {
      indice_respuesta_correcta = i;
      ya_se_metio = true;
    }
    respuestas_reordenadas[i] = respuestas_posibles[posiciones[posicion_aleatoria]];
    posiciones.splice(posicion_aleatoria, 1);
  }

  var txt_respuestas = '';
  for (var _i in respuestas_reordenadas) {
    txt_respuestas += '<button id="btnRespuesta" class="answers__full" data-value="' + _i + '">' + respuestas_reordenadas[_i] + '</button>';
  }

  var applyImage = "";
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
      console.log('No se encontraron imagenes');
      break;
  }

  questionTitle.innerHTML = questions[level];
  questionImage.setAttribute('src', applyImage);
  wrapperAnswers.innerHTML = txt_respuestas;

  //VERIFICAR LOS BOTONES DE RESPUESTAS

  pointsPlayerOne.innerHTML = acumPuntosJugadorUno + ' ' + 'pts';
  pointsPlayerTwo.innerHTML = acumPuntosJugadorDos + ' ' + 'pts';

  if (questionInitial >= 3 && acumPuntosJugadorUno > acumPuntosJugadorDos) {
    modalResult.innerHTML = templateModalResult('user01', 'Diego', acumPuntosJugadorUno, pointsCorrectJugadorUno, pointsIncorrectJugadorUno);
    showModal();
    acumPuntosJugadorUno = 0;
  } else if (questionInitial >= 3 && acumPuntosJugadorDos > acumPuntosJugadorUno) {
    modalResult.innerHTML = templateModalResult('user02', 'Luis', acumPuntosJugadorDos, pointsCorrectJugadorDos, pointsIncorrectJugadorDos);
    showModal();
    acumPuntosJugadorDos = 0;
  }

  var buttonAnswer = document.querySelectorAll('.answers__full');

  buttonAnswer.forEach(function (i) {
    i.addEventListener('click', function (ev) {
      if (level >= 2) {
        level = 0;
      } else {
        level += 1;
      }
      valueAnswer = i.dataset.value;
      if (jugadorUnoTurno === true) {
        if (valueAnswer === indice_respuesta_correcta) {
          setTimeout(function () {
            console.log('Correcto jugador1');
            acumPuntosJugadorUno += acertoJugada;
            pointsCorrectJugadorUno += 1;
            empezarJuego(level);
            posicionQuestion();
          }, 300);
          ev.target.classList.add('active');
        } else {
          console.log('Incorrecto jugador1');
          jugadorUnoTurno = false;
          jugadorDosTurno = true;
          pointsIncorrectJugadorUno += 1;
          ev.target.classList.add('error');
          setTimeout(function () {
            ev.target.classList.remove('error');
          }, 300);
        }
      } else if (jugadorDosTurno === true) {
        if (valueAnswer === indice_respuesta_correcta) {
          setTimeout(function () {
            console.log('Correcto jugador2');
            acumPuntosJugadorDos += acertoJugada;
            pointsCorrectJugadorDos += 1;
            empezarJuego(level);
            posicionQuestion();
          }, 300);
          ev.target.classList.add('active');
        } else {
          console.log('Incorrecto jugador2');
          jugadorDosTurno = false;
          jugadorUnoTurno = true;
          pointsIncorrectJugadorDos += 1;
          ev.target.classList.add('error');
          setTimeout(function () {
            ev.target.classList.remove('error');
          }, 300);
        }
      }
    });
  });
}

function cerrarModal() {
  modalResult.style.transform = 'translateY(1000px)';
  questionOrder.innerHTML = questionInitial + '/3';
  empezarJuego(level = 0);
}