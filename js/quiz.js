let questionSection = document.getElementById('questionTitle');
let answer = document.getElementById('answerList');
let images = document.getElementById('imageContainer');
let questionsOrder = document.getElementById('cantQuestions');
let pointUno = document.getElementById('pointsPlayerUno');
let pointDos = document.getElementById('pointsPlayerDos');

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

function jugadorUno() {
  // alert('Correcto');
  questionsOrder.innerHTML = ++indicarInicial + '/3';
  acumPuntosJugadorUno += acertoJugada;
  jugar(level++);
}

function jugadorDos() {
  // alert('Correcto');
  questionsOrder.innerHTML = ++indicarInicial + '/3';
  acumPuntosJugadorDos += acertoJugada;
  jugar(level++);
}

setTimeout(function () {
  alert('Turno Diego')
}, 300);

jugar(level);

function jugar() {

  var indice_respuesta_correcta;

  var indiceAleatorio = Math.floor(Math.random() * questions.length);

  let respuestas_posibles = respuestas[level];

  var posiciones = [0, 1, 2];
  var respuestas_reordenadas = [];

  var ya_se_metio = false;
  indice_respuesta_correcta;
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
  if (level === 0) {
    applyImage = '<img class="mt-4 mt-sm-0" src="' + 'https://i.pinimg.com/originals/e2/89/9c/e2899c265ad24e60cda1add2a8cb580f.jpg' + '" width="90%" />';
  }
  else if (level === 1) {
    applyImage = '<img class="mt-4 mt-sm-0" src="' + 'http://perugreenluxury.com.pe/wp-content/uploads/2017/09/Lima01.jpeg' + '" width="90%" />';
  }
  else if (level === 2) {
    applyImage = '<img class="mt-4 mt-sm-0" src="' + 'https://avatars0.githubusercontent.com/u/9919?s=280&v=4' + '" width="90%" />';
  }

  questionSection.innerHTML = questions[level];
  images.innerHTML = applyImage;
  answer.innerHTML = txt_respuestas;

  jugadorUnoActivo = true;
  jugadorDosActivo = false;

  //VERIFICAR LOS BOTONES DE RESPUESTAS

  $("button").click(function () {

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
      setTimeout(function () {
        alert('Turno Luis')
      });
      jugadorUnoActivo = false;
      jugadorDosActivo = true;
    }
  });


  pointUno.innerHTML = acumPuntosJugadorUno + ' ' + 'pts';
  pointDos.innerHTML = acumPuntosJugadorDos + ' ' + 'pts';

  if (indicarInicial > 3 && acumPuntosJugadorUno > acumPuntosJugadorDos) {
    setTimeout(function () {
      alert('Gana Diego');
    });
    level = 0;
    indicarInicial = 1;
    questionsOrder.innerHTML = indicarInicial + '/3';
    jugar(level);
  }
  else if (indicarInicial > 3 && acumPuntosJugadorDos > acumPuntosJugadorUno) {
    setTimeout(function () {
      alert('Gana Luis');
    });
    level = 0;
    indicarInicial = 1;
    questionsOrder.innerHTML = indicarInicial + '/3';
    jugar(level);
  }
}

