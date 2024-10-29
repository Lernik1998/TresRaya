window.addEventListener("load", cargar);

let jugadorA = "Jugador A";
let jugadorB = "Jugador B";
let jugadorActual;

// Localizaciones de las imagenes
let imgJugadorA = "../../imagenes/x.jpg";
let imgJugadorB = "../../imagenes/o.jpg";

function cargar() {

  let fichas=Array.from(document.querySelectorAll("[draggable]"));
  let casillas=Array.from(document.getElementsByTagName("td"));

  fichas.forEach((item)=>{
    item.addEventListener("dragstart",dragstart);
  });

  casillas.forEach((item)=>{
    item.addEventListener("dragenter",function (event){
        event.preventDefault();
    });

    item.addEventListener("dragover",function(event){
        event.preventDefault();
    });

    item.addEventListener("dragleave",function(event){
      event.preventDefault();
    });

    item.addEventListener("drop",function(event){
        event.preventDefault();
        event.target.appendChild(document.getElementById(event.dataTransfer.getData("text/plain")));
    });
  });

  function dragstart(e){
      e.dataTransfer.setData('text/plain',e.target.id);
  }
  // Determinar turno del jugador de inicio
  let jugadorEmpieza = Math.floor(Math.random() * 2) + 1;

  // Obtengo div del turno jugador

  let divImagenTurno = document.getElementById("turnoJugador");

  alert(divImagenTurno);

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
    if (determinarGanador()) {
    } else {
      // Cambiamos de turno
    }
  }

  // Método para determinar el ganador

  const determinarGanador = () => {
    // Tendriamos que obtener todos los td

    // Aqui se evalua las 3 primeras casillas y que el tablero esté definido
    if (tablero[0] == tablero[1] && tablero[0] == tablero[2] && tablero[0]) {
      return true; // Y si el 3 existe
    } else if (
      tablero[3] == tablero[4] &&
      tablero[3] == tablero[5] &&
      tablero[3]
    ) {
      return true; // Y si el 6 existe
    } else if (
      tablero[6] == tablero[7] &&
      tablero[6] == tablero[8] &&
      tablero[7]
    ) {
      return true;
    } else if (
      tablero[0] == tablero[3] &&
      tablero[0] == tablero[6] &&
      tablero[0]
    ) {
      // Ahora las verticales
      return true;
    } else if (
      tablero[1] == tablero[4] &&
      tablero[1] == tablero[7] &&
      tablero[1]
    ) {
      return true;
    } else if (
      tablero[2] == tablero[5] &&
      tablero[2] == tablero[8] &&
      tablero[2]
    ) {
      return true;
    } else if (
      tablero[0] == tablero[4] &&
      tablero[0] == tablero[8] &&
      tablero[0]
    ) {
      // Ahora con las diagonales
      return true;
    } else if (
      tablero[2] == tablero[4] &&
      tablero[2] == tablero[6] &&
      tablero[2]
    ) {
      return true;
    }
    // Si no se cumple
    return false;
  };

  //Metodo actualizar marcador
  const actualizarMarcador = () => {
    let marcadorA = document.getElementById("victoriasA");
    let marcadorB = document.getElementById("victoriasB");

    marcadorA.textContent = victoriasA;
    marcadorB.textContent = victoriasB;
  };

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

<<<<<<< HEAD

  //Metodo comprobar casilla

  function dragstart(e) {
    e.dataTransfer.setData('text/plain',e.target.id);
  }
=======
  
>>>>>>> 2cb1f477d995eb5e8ca23d030994c80e85a134ac
}
