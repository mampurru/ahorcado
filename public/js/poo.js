let palabras = ['CASA', 'PERRO', 'GATO', 'ARBOL', 'COMPUTADORA'];
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
let juegoTerminado = false;
let intentosRestantes = 6;
let letrasAdivinadas = new Array(palabraSeleccionada.length).fill('_');
let hafallado = 0;

document.querySelector('#palabra').textContent = letrasAdivinadas.join(' ');

document.querySelector('#buscar-letra').addEventListener('click', buscarLetra);
document.querySelector('#letra').addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    buscarLetra();
  }
});

document.querySelector('#pista').addEventListener('click', function() {
  let letrasRestantes = [];
  for (let i = 0; i < letrasAdivinadas.length; i++) {
    if (letrasAdivinadas[i] === '_') {
      letrasRestantes.push(palabraSeleccionada[i]);
    }
  }
  let letraAleatoria = letrasRestantes[Math.floor(Math.random() * letrasRestantes.length)];
  document.querySelector('#mensaje').textContent = '😁 ¡Pista! La letra "' + letraAleatoria + '" está en la palabra.';
});

document.querySelector('#reiniciar').addEventListener('click', reiniciarJuego);

let contador = 0; // Contador inicializado en 0

function buscarLetra() {
  let letra = document.querySelector('#letra').value.toUpperCase();
  document.querySelector('#letra').value = '';
  
  if (juegoTerminado) {
    return;
  }
  
  if (!letra.match(/[A-Z]/)) {
    document.querySelector('#mensaje').textContent = 'Debe ingresar una letra.';
    return;
  }
  
  if (letrasAdivinadas.includes(letra)) {
    document.querySelector('#mensaje').textContent = 'Ya ha ingresado esta letra. Intente nuevamente.';
    return;
  }
  
  let letraEncontrada = false;
  for (let i = 0; i < palabraSeleccionada.length; i++) {
    if (palabraSeleccionada[i] === letra) {
      letrasAdivinadas[i] = letra;
      letraEncontrada = true;
    }
  }
  
  if (letraEncontrada) {
    document.querySelector('#mensaje').textContent = '¡Bien hecho! La letra ' + letra + ' está en la palabra.';
  } else {
    contador++; // Incrementar el contador de errores
    intentosRestantes--;
    // Dentro del bloque else cuando la letra es incorrecta
    document.querySelector('#imagenError').src = 'public/css/img/' + contador + '.png';
    document.querySelector('#intentos').textContent = '➡️ Intentos restantes: ' + intentosRestantes;
    document.querySelector('#mensaje').textContent = 'La letra ' + letra + ' no está en la palabra. Intente nuevamente.';
    if (intentosRestantes === 0) {
      juegoTerminado = true;
      document.querySelector('#mensaje').textContent = '¡Perdiste! La palabra era ' + palabraSeleccionada + '.';
      document.querySelector('#imagenError').src = 'public/css/img/0.png';
    }
  }
  
  document.querySelector('#palabra').textContent = letrasAdivinadas.join(' ');
  
  if (letrasAdivinadas.join('') === palabraSeleccionada) {
    juegoTerminado = true;
    document.querySelector('#mensaje').textContent = '¡Ganaste!';
  }

  document.querySelector('#contador').textContent = 'Errores: ' + contador; // Actualizar el contador en el HTML
}

function reiniciarJuego() {
  palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  juegoTerminado = false;
  intentosRestantes = 6;
  letrasAdivinadas = new Array(palabraSeleccionada.length).fill('_');
  
  document.querySelector('#palabra').textContent = letrasAdivinadas.join(' ');
  document.querySelector('#intentos').textContent = '➡️ Intentos restantes: ' + intentosRestantes;
  document.querySelector('#mensaje').textContent = '';
  
  contador = 0; // Reiniciar el contador de errores
  document.querySelector('#contador').textContent = 'Errores: ' + contador;
 

  // deshabilitar botón de reinicio
  document.querySelector('#reiniciar').disabled = true;

  
}

// agregar evento al botón de reinicio
document.querySelector('#reiniciar').addEventListener('click', function() {
  reiniciarJuego();
});

