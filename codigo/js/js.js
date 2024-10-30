window.addEventListener("load", cargar);

let jugadorA = "Jugador A";
let jugadorB = "Jugador B";
let jugadorActual;

// Variables de puntuación
let victoriasA;
let victoriasB;

// Localizaciones de las imagenes
let imgJugadorA = "../../imagenes/x.jpg";
let imgJugadorB = "../../imagenes/o.jpg";

function cargar() {
  // Inicio del jugador
  inicioJugador();

  // Obtenemos todas las img draggables
  let fichas = Array.from(document.querySelectorAll("[draggable]"));
  // Y todos los td
  let casillas = Array.from(document.getElementsByTagName("td"));

  // A las imagenes les asigno eventos de drag and drop
  fichas.forEach((item) => {
    item.addEventListener("dragstart", dragstart);
  });

  // A todos los td les indicamos que prevengan su funcionalidad
  casillas.forEach((item) => {
    item.addEventListener("dragenter", function (event) {
      event.preventDefault();
    });

    item.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    item.addEventListener("dragleave", function (event) {
      event.preventDefault();
    });

    // Añadimos un drop a los td
    item.addEventListener("drop", function (event) {
      event.preventDefault();
      // Al td objetivo le pasamos
      event.target.appendChild(
        document.getElementById(event.dataTransfer.getData("text/plain"))
      );
    });
  });

  function dragstart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  // Determinar turno del jugador de inicio
  function inicioJugador() {
    // Rndom
    let jugadorEmpieza = Math.floor(Math.random() * 2) + 1;

    // Obtengo div del turno jugador

    let divImagenTurno = document.getElementById("turnoJugador");

    // Si es par empieza el jugador A
    if (jugadorEmpieza % 2 == 0) {
      jugadorActual = jugadorA;

      // Asigno en el div el siguiente contenido
      divImagenTurno.innerHTML = `<img src="${imgJugadorA}" alt="${jugadorA}">`;
    } else {
      jugadorActual = jugadorB;
      divImagenTurno.innerHTML = `<img src="${imgJugadorB}" alt="${jugadorB}">`;
    }
  }

  function turnoJugador() {
    // Si hay un ganador(TRUE), llamamos actualizarMarcador
    if (determinarGanador()) {
    } else {
      // Cambiamos de turno
    }
  }

  // Método para determinar el ganador

  const determinarGanador = () => {
    let casillas = document.querySelectorAll("td");

    // Definir las combinaciones ganadoras del tablero
    const combinacionesGanadoras = [
      [0, 1, 2], // Filas
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columnas
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonales
      [2, 4, 6],
    ];
    // Revisar cada combinación ganadora
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
      const [a, b, c] = combinacionesGanadoras[i];

      if (
        casillas[a].className &&
        casillas[a].className === casillas[b].className &&
        casillas[a].className === casillas[c].className
      ) {
        return casillas[a].className; // Retorna 'X' o 'O' según el ganador
      }
    }
  };

  //Metodo actualizar marcador
  const actualizarMarcador = () => {
    let casillas = document.querySelectorAll("td");
    let ganador = determinarGanador();

    if (ganador === "x") {
      victoriasA++;
    } else if (ganador === "o") {
      victoriasB++;
    }

    let marcadorA = document.getElementById("victoriasA");
    let marcadorB = document.getElementById("victoriasB");

    marcadorA.textContent = victoriasA;
    marcadorB.textContent = victoriasB;
  };

  // Reiniciar el juego

  // Pantalla error, no borrar el codigo por favor

  function abrirVentanaEmergente(mensaje) {
    let idError = setTimeout(function () {
      // Abre la página de Google en una nueva ventana de 500x500px

      let ventanaError = window.open(
        "about:blank",
        "_blank",
        "width=200px,height=100px,left=50px,top=50px" // Desde la ventana
      );

      switch (mensaje) {
        case "Error":
          ventanaError.document.write(`
      <html>
       <head>
         <title>Error</title>
           <body>
         <p>CASILLA OCUPADA.</p>
       </body>
     </html>
     `);

          // LLamada al método para que vuelva la ficha a su posición de origen
          break;

        case "Turno":
          ventanaError.document.write(`
      <html>
       <head>
         <title>Error</title>
           <body>
         <p>TURNO INCORRECTO.</p>
       </body>
     </html>
     `);

          break;
        case "Ganador":
          ventanaError.document.write(`
      <html>
       <head>
         <title>Error</title>
           <body>
         <p>GANADOR JUGADOR X.</p>
       </body>
     </html>
     `);
          break;

        default:
          break;
      }

      if (ventanaError) {
      }
    }, 1000); // Duración de 3 segundos
  }

  // Función F5

  window.addEventListener("keydown", detectarF5);

  function detectarF5(event) {
    // Obtengo la tecla pulsada
    let teclaPulsada = event.key;

    alert(teclaPulsada);
    // Si es F5
    if (teclaPulsada === "F5") {
      // Prevengo el comportamiento por defecto de F5 (recargar la página)
      event.preventDefault();

      // Obtengo todas las variables y las seteo a 0
      let marcadorA = document.getElementById("victoriasA");
      let marcadorB = document.getElementById("victoriasB");

      marcadorA.innerHTML = 0;
      marcadorB.innerHTML = 0;

      // Llama a la función que reinicia las casillas
      reestablecerFichas();
    }
  }
  // Recorro todos los td y verifico si tienen algo
  function reestablecerFichas() {
    // Obtengo todos los td
    let casillas = Array.from(document.getElementsByTagName("td"));

    // Recorro todas las casillas
    for (let i = 0; i < casillas.length; i++) {
      // Si tiene algo, lo borro
      if (casillas[i].hasChildNodes()) {
        // Vacio el contenido del td
        casillas[i].innerHTML = "";
      }
    }

    // Cargo las imagenes los divs

    // Obtengo de los divs las fichas que haya

    const jugadorA = document.getElementById("jugadorA");
    const jugadorB = document.getElementById("jugadorB");

    // Vaciar las imágenes en los divs (si fuera necesario)
    jugadorA.innerHTML = '<h3>Victorias A:<span id="victoriasA">0</span></h3>';
    jugadorB.innerHTML = '<h3>Victorias B:<span id="victoriasB">0</span></h3>';

    // Y llamo a la función inicio
    inicioJugador();
  }
}
