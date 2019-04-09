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

// INDICADOR PUNTOS JUGADORES

var acertoJugada = 25;

var acumPuntosJugadorUno = 0;
var acumPuntosJugadorDos = 0;

// INDICADOR DE NUMERO DE PREGUNTAS

var indicarInicial = 1;

// NIVEL DE PREGUNTA

var level = 0;

// JUGADORES

jugadorUnoActivo = true;
jugadorDosActivo = false;

let pointsCorrect = 0;
let pointsIncorrect = 0;

function jugadorUno() {
  questionOrder.innerHTML = ++indicarInicial + '/3';
  acumPuntosJugadorUno += acertoJugada;
  ++pointsCorrect;
  jugar(level++);
}

function jugadorDos() {
  questionOrder.innerHTML = ++indicarInicial + '/3';
  acumPuntosJugadorDos += acertoJugada;
  ++pointsCorrect;
  jugar(level++);
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

function winPlayer() {
  modalResult.classList.add('active-modalResult');
}

jugar(level);

function jugar() {

  var indice_respuesta_correcta;

  var indiceAleatorio = Math.floor(Math.random() * questions.length);

  let respuestas_posibles = respuestas[level];

  var posiciones = [0, 1, 2];
  var respuestas_reordenadas = [];

  var ya_se_metio = false;
  var posicion_aleatoria;
  for (i in respuestas_posibles) {
    posicion_aleatoria = Math.floor(Math.random() * posiciones.length);
    if (posicion_aleatoria == 0 && ya_se_metio == false) {
      indice_respuesta_correcta = i;
      ya_se_metio = true;
    }
    respuestas_reordenadas[i] = respuestas_posibles[posiciones[posicion_aleatoria]];
    posiciones.splice(posicion_aleatoria, 1);
  }

  var txt_respuestas = '';
  for (i in respuestas_reordenadas) {
    txt_respuestas += '<button class="answers__full" value="' + i + '">' + respuestas_reordenadas[i] + '</button>';
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

  $(".answers__full").click(function () {

    var respuesta = $(this).val();
    if (respuesta == indice_respuesta_correcta && jugadorUnoActivo == true) {
      jugadorUno();
    }
    else if (jugadorDosActivo == true) {
      jugadorDos();
      jugadorUnoActivo = false;
      jugadorDosActivo = true;
    }
    else {
      jugadorUnoActivo = false;
      jugadorDosActivo = true;
      ++pointsIncorrect;
    }
  });

  pointsPlayerOne.innerHTML = acumPuntosJugadorUno + ' ' + 'pts';
  pointsPlayerTwo.innerHTML = acumPuntosJugadorDos + ' ' + 'pts';

  if (indicarInicial > 3 && acumPuntosJugadorUno > acumPuntosJugadorDos) {
    modalResult.innerHTML = templateModalResult('user01', 'Diego', acumPuntosJugadorUno, pointsCorrect, pointsIncorrect);
    winPlayer();
    level = 0;
    indicarInicial = 1;
    questionOrder.innerHTML = indicarInicial + '/3';
    jugar(level);
  }
  else if (indicarInicial > 3 && acumPuntosJugadorDos > acumPuntosJugadorUno) {
    modalResult.innerHTML = templateModalResult('user02', 'Luis', acumPuntosJugadorDos, pointsCorrect, pointsIncorrect);
    winPlayer();
    level = 0;
    indicarInicial = 1;
    questionOrder.innerHTML = indicarInicial + '/3';
    jugar(level);
  }
}

