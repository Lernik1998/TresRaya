// Determinar turno del jugador, comienzan los rojos

function turnoJugador() {
  // Si hay un ganador(TRUE), llamamos actualizarMarcador
  if (determinarGanador()) {
  } else {
    // Cambiamos de turno
  }
}

// Obtenemos todos los td

// Método para determinar el ganador

const determinarGanador = () => {
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
    let ganador = determinarGanador(); //me pasa el ganador de la partida
    
    if (ganador === 'X') { //añadimos al marcador del ganador el punto
      victoriasA++;
    } else if (ganador === 'O') {
      victoriasB++;
    }
  
    // Actualizar el marcador en la interfaz
    let marcadorA = document.getElementById("victoriasA");
    let marcadorB = document.getElementById("victoriasB");
  
    marcadorA.textContent = victoriasA;
    marcadorB.textContent = victoriasB;
  };
  

// Reiniciar el juego
// Reiniciar el juego

// Pantalla error

let idError = setTimeout(function () {
  // Abre la página de Google en una nueva ventana de 500x500px
  //   let ventanaError = window.open(
  //     "https://www.google.com",
  //     "_blank",
  //     "width=500,height=500"
  //   );
}, 3000); // Duración de 3 segundos

// Pantalla ganador