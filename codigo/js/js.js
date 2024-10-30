window.addEventListener("load", cargar);

let jugadorA = "x";
let jugadorB = "o";
let jugadorActual;
let victoriasA = 0;
let victoriasB = 0;

// Localizaciones de las imagenes
let imgJugadorA = "../../imagenes/x.jpg";
let imgJugadorB = "../../imagenes/o.jpg";

function cargar() {
  inicioJugador();
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

        if (ficha.className == jugadorActual) {
          // Mover la ficha a la casilla
          casilla.appendChild(ficha);
        } else {
          abrirVentanaEmergente("Turno");
        }
        turnoJugador();
        cambiarImagenTurno();
      } else {
        abrirVentanaEmergente("Error");
      }
    });
  });

  function inicioJugador() {
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
  }

  function turnoJugador() {
    // Si hay un ganador(TRUE), llamamos actualizarMarcador
    if (determinarGanador() == "x" || determinarGanador() == "o") {
      actualizarMarcador();
    } else {
      if (jugadorActual == jugadorA) {
        jugadorActual = jugadorB;
      } else {
        jugadorActual = jugadorA;
      }
    }
  }

  function cambiarImagenTurno() {
    if (jugadorActual == jugadorA) {
      divImagenTurno.innerHTML = `<img src="${imgJugadorA}" alt="${jugadorA}">`;
    } else {
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
        casillas[a].firstChild.className && // Asegurarse de que hay una ficha en la casilla
        casillas[a].firstChild.className === casillas[b].firstChild.className &&
        casillas[a].firstChild.className === casillas[c].firstChild.className
      ) {
        return casillas[a].firstChild.className; // Retorna 'x' o 'o' según el ganador
      }
    }
    return false;
  };

  // Método para actualizar el marcador
  const actualizarMarcador = () => {
    let ganador = determinarGanador();
    abrirVentanaEmergente("Ganador");

    if (ganador === "x") {
      victoriasA++;
      reestablecerFichas();
    } else if (ganador === "o") {
      victoriasB++;
      reestablecerFichas();
    }

    // Actualizar el marcador en el HTML
    document.getElementById("victoriasA").textContent = victoriasA;
    document.getElementById("victoriasB").textContent = victoriasB;
  };

  // Cargar el tablero y la funcionalidad al cargar la página
  window.addEventListener("load", cargar);

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

    //alert(teclaPulsada);
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
    let fichasX=Array.from(document.getElementsByClassName("x"));
    let fichasO=Array.from(document.getElementsByClassName("o"));

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
    let br=Array.from(document.getElementsByTagName("br"));
    br.forEach((element)=>element.remove());

    fichasX.forEach((ficha)=>{
      jugadorA.appendChild(ficha);
      jugadorA .appendChild(document.createElement("br"));
    });
    fichasO.forEach((ficha)=>{
      jugadorB.appendChild(ficha);
      jugadorB.appendChild(document.createElement("br"));
    });

    // Y llamo a la función inicio
    inicioJugador();
  }
}
