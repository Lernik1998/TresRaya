window.addEventListener("load", cargar);

let jugadorA = "x";
let jugadorB = "o";
let jugadorActual;

// Localizaciones de las imagenes
let imgJugadorA = "../../imagenes/x.jpg";
let imgJugadorB = "../../imagenes/o.jpg";

function cargar() {
  // Inicio del jugador
  inicioJugador();

  let fichas = Array.from(document.querySelectorAll("[draggable]"));
  let casillas = Array.from(document.getElementsByTagName("td"));

  fichas.forEach((item) => {
    item.addEventListener("dragstart", dragstart);
  });

  casillas.forEach((item) => {
    item.addEventListener("dragenter", function (event) {
      event.preventDefault();
    });

    casilla.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    casilla.addEventListener("drop", function (event) {
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

    let casillas=document.querySelectorAll("td");
    
    // Definir las combinaciones ganadoras del tablero
  const combinacionesGanadoras = [
    [0, 1, 2], // Filas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columnas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonales
    [2, 4, 6]
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

  // Método para actualizar el marcador
  const actualizarMarcador = () => {
    let casillas=document.querySelectorAll("td");
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
  
}
