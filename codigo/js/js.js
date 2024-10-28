// Determinar turno del jugador

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
  let marcadorA = document.getElementById("victoriasA");
  let marcadorB = document.getElementById("victoriasB");

  marcadorA.textContent = victoriasA;
  marcadorB.textContent = victoriasB;
};

// Reiniciar el juego
