window.addEventListener("load", cargar);

// Variables empleadas para el control de los jugadores
let jugadorA = "x";
let jugadorB = "o";
// Variable para obtener el jugador en turno
let jugadorActual;
// Contadores de victorias
let victoriasA = 0;
let victoriasB = 0;

// Localizaciones de las imagenes
let imgJugadorA = "../../imagenes/x.jpg";
let imgJugadorB = "../../imagenes/o.jpg";

// Obtengo div del turno jugador
let divImagenTurno = document.getElementById("turnoJugador");

function cargar() {
  // Determinamos el jugador que comienza
  inicioJugador();

  // Obtenemos las fichas (dragables) y las casillas
  let fichas = Array.from(document.querySelectorAll("[draggable='true']"));
  let casillas = Array.from(document.querySelectorAll("#tabla td"));

  // Configurar el dragstart para almacenar el id de la ficha arrastrada
  fichas.forEach((ficha) => {
    ficha.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text", ficha.id); // Guardamos el id en dataTransfer
    });
  });

  // Recorremos las casillas habilitando los eventos de drag
  casillas.forEach((casilla) => {
    casilla.addEventListener("dragenter", function (event) {
      event.preventDefault();
    });

    casilla.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    // Añadimos el evento de drop
    casilla.addEventListener("drop", function (event) {
      event.preventDefault();

      // Obtener el id de la ficha desde dataTransfer
      const fichaId = event.dataTransfer.getData("text");

      // Seleccionar la ficha usando el id
      const ficha = document.getElementById(fichaId);

      // Comprobamos que el turno sea el correcto
      if (ficha.className == jugadorActual) {

        // Comprobar si la casilla ya tiene un hijo (una ficha)
        if (!casilla.hasChildNodes()) {
          // Mover la ficha a la casilla
          casilla.appendChild(ficha);
          // Cambiamos de turno (dentro se comprueba si hay ganador)
          turnoJugador();
          // Cambiamos la imagen del turno
          cambiarImagenTurno();
        } else {
          // Si la casilla está ocupada mostramos error
          abrirVentanaEmergente("Error", "");
        }
      } else {
        // Mostramos que el turno es incorrecto
        abrirVentanaEmergente("Turno", "");
      }
    });
  });

  function inicioJugador() {
    // Determinar turno del jugador de inicio
    let jugadorEmpieza = Math.floor(Math.random() * 2) + 1;

    // Si es par empieza el jugador A si no B
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
    // Si hay un ganador llamamos actualizarMarcador
    if (determinarGanador() == "x" || determinarGanador() == "o") {
      actualizarMarcador();
    } else { // Si no, cambiamos el turno
      if (jugadorActual == jugadorA) {
        jugadorActual = jugadorB;
      } else {
        jugadorActual = jugadorA;
      }
    }
  }

  // Cambiamos la imagen del turno
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
      //Recogemos las variables a b c segun los arrays contenidos en combinacionesGanadoras
      const [a, b, c] = combinacionesGanadoras[i];

      //Comprobamos que las tres tengan ficha
      if (
        casillas[a].hasChildNodes() &&
        casillas[b].hasChildNodes() &&
        casillas[c].hasChildNodes()
      ) {
        // Verificar si la clase de las tres casillas coinciden
        if (
          casillas[a].firstChild.className ===
            casillas[b].firstChild.className &&
          casillas[a].firstChild.className === casillas[c].firstChild.className
        ) {
          return casillas[a].firstChild.className; // Retorna 'x' o 'o' según el ganador
        }
      }
    }
    return false;
  };

  // Método para actualizar el marcador
  const actualizarMarcador = () => {
    let ganador = determinarGanador(); //Recogemos el ganador (nunca retorna false porque en turnoJugador ya comprobamos que sea x o o)
    abrirVentanaEmergente("Ganador", ganador); //Mostramos en otra ventana el ganador

    // Comprobamos el ganador para sumarle la victoria
    if (ganador === "x") {
      victoriasA++;
    } else  {
      victoriasB++; 
    }

    bloquearFichas();

    // Actualizar el marcador en el HTML
    document.getElementById("victoriasA").textContent = victoriasA;
    document.getElementById("victoriasB").textContent = victoriasB;
  };

  // Pantallas emergentes

  function abrirVentanaEmergente(mensaje, ganador) {
    // Esta variable nos sirve para cuando mostramos la ventana de ganar
    if (ganador == "x") {
      ganador = "A";
    } else {
      ganador = "B";
    }

    // Creamos la ventana
    let ventanaError = window.open(
      "about:blank",
      "_blank",
      "width=200px,height=100px,left=50px,top=50px"
    );

    //Según el mensaje mostramos una pantalla determinada
    switch (mensaje) {
      case "Error":
        ventanaError.document.write(`<p>CASILLA OCUPADA.</p>`);
        break;

      case "Turno":
        ventanaError.document.write(`<p>TURNO INCORRECTO.</p>`);
        break;
      
      case "Ganador":
        ventanaError.document.write(`<p>GANADOR JUGADOR ` + ganador +`.</p>`);
        break;
    }
    setInterval(() => ventanaError.close(), 1000);
  }

  // Función F5
  window.addEventListener("keydown", detectarF5);

  function detectarF5(event) {
    // Obtengo la tecla pulsada
    let teclaPulsada = event.key;

    // Si es F5
    if (teclaPulsada === "F5") {
      // Prevengo el comportamiento por defecto de F5 (recargar la página)
      event.preventDefault();

      // Llama a la función que reinicia las casillas
      reestablecerFichas();
    }
  }

  function reestablecerFichas() {
    // Obtengo todos los td, fichasO y fichasX
    let casillas = Array.from(document.getElementsByTagName("td"));
    let fichasX = Array.from(document.getElementsByClassName("x"));
    let fichasO = Array.from(document.getElementsByClassName("o"));

    // Recorro todas las casillas
    for (let i = 0; i < casillas.length; i++) {
      // Si tiene algo, lo borro
      if (casillas[i].hasChildNodes()) {
        // Vacio el contenido del td
        casillas[i].innerHTML = "";
      }
    }

    //Recogemos los divs
    const jugadorA = document.getElementById("jugadorA");
    const jugadorB = document.getElementById("jugadorB");

    // Borramos los br que separan las fichas en el sitio inicial
    let br = Array.from(document.getElementsByTagName("br"));
    br.forEach((element) => element.remove());

    //Recorremos las fichas metiendolas en su sitio inicial y separandolas con br
    fichasX.forEach((ficha) => {
      jugadorA.appendChild(ficha);
      jugadorA.appendChild(document.createElement("br"));
    });
    fichasO.forEach((ficha) => {
      jugadorB.appendChild(ficha);
      jugadorB.appendChild(document.createElement("br"));
    });

    // Y llamo a la función inicio
    inicioJugador();
  }

  function bloquearFichas() {
    let fichasFinal = Array.from(document.querySelectorAll("[draggable='true']"));
    fichasFinal.forEach(element => {
      element.getAttribute("draggable") = false;
    });
  }
}
