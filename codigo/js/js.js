window.addEventListener("load", cargar);

let jugadorA = "x";
let jugadorB = "o";
let jugadorActual;
let victoriasA=0;
let victoriasB=0;

// Localizaciones de las imagenes
let imgJugadorA = "../../imagenes/x.jpg";
let imgJugadorB = "../../imagenes/o.jpg";

function cargar() {
  let fichas = Array.from(document.querySelectorAll("[draggable='true']"));
  let casillas = Array.from(document.querySelectorAll("#tabla td"));

  // Configurar el dragstart para almacenar el id de la ficha arrastrada
  fichas.forEach((ficha) => {
    ficha.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text", ficha.id); // Guardamos el id en dataTransfer
      event.dataTransfer.effectAllowed = "move";
    });
  });

  casillas.forEach((casilla) => {
    casilla.addEventListener("dragenter", function (event) {
      event.preventDefault();
    });

    casilla.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    casilla.addEventListener("drop", function (event) {
      event.preventDefault();

      // Comprobar si la casilla ya tiene un hijo (una ficha)
      if (!casilla.hasChildNodes()) {
        // Obtener el id de la ficha desde dataTransfer
        const fichaId = event.dataTransfer.getData("text");

        // Seleccionar la ficha usando el id
        const ficha = document.getElementById(fichaId);

        if (ficha.className==jugadorActual) {
          // Mover la ficha a la casilla
          casilla.appendChild(ficha);
          actualizarMarcador();
        } else {
          abrirVentanaEmergente("Error: Turno Incorrecto");
        }
        turnoJugador();
        cambiarImagenTurno();
      } else {
        abrirVentanaEmergente("Error");
      }
    });
  });

  function dragstart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  // Determinar turno del jugador, comienzan los rojos
  // Determinar turno del jugador de inicio
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

  function turnoJugador() {
    // Si hay un ganador(TRUE), llamamos actualizarMarcador
    if (determinarGanador() != false) {
      actualizarMarcador();
    } else {
      if (jugadorActual == jugadorA) {
        jugadorActual = jugadorB;
      } else {
        jugadorActual = jugadorA;
      }
    }
  }

  function cambiarImagenTurno(){
    if(jugadorActual==jugadorA){
      divImagenTurno.innerHTML = `<img src="${imgJugadorA}" alt="${jugadorA}">`;
    }else{
      divImagenTurno.innerHTML = `<img src="${imgJugadorB}" alt="${jugadorB}">`;
    }
  }

  // Método para determinar el ganador
  const determinarGanador = () => {
    let casillas = document.querySelectorAll("#tabla td");

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

      // Verificar si las casillas tienen una clase de ficha y coinciden
      if (
        casillas[a].firstChild && // Asegurarse de que hay una ficha en la casilla
        casillas[a].firstChild.className === casillas[b].firstChild.className &&
        casillas[a].firstChild.className === casillas[c].firstChild.className
      ) {
        return casillas[a].firstChild.className; // Retorna 'x' o 'o' según el ganador
      }
    }
    return false;
  }
  

  // Método para actualizar el marcador
  const actualizarMarcador = () => {
    let ganador = determinarGanador();

    if (ganador === "x") {
      victoriasA++;
    } else if (ganador === "o") {
      victoriasB++;
    }

    // Actualizar el marcador en el HTML
    document.getElementById("victoriasA").textContent = victoriasA;
    document.getElementById("victoriasB").textContent = victoriasB;
  };

  // Cargar el tablero y la funcionalidad al cargar la página
  window.addEventListener("load", cargar);

  // Reiniciar el juego

  // Pantalla error

  /*
  let idError = setTimeout(function () {
    // Abre la página de Google en una nueva ventana de 500x500px

    let ventanaError = window.open(
      "about:blank",
      "_blank",
      "width=200px,height=100px,left=50px,top=50px" // Desde la ventana
    );

    if (ventanaError) {
      ventanaError.document.write(`
       <html>
        <head>
          <title>Error</title>
            <body>
          <p>CASILLA OCUPADA.</p>
        </body>
      </html>
      `);
    }
  }, 1000); // Duración de 3 segundos
*/
  // Pantalla ganador
}
