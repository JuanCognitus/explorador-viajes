// EXPLORADOR DE VIAJES
// Archivo principal de la aplicación

// OBTENEMOS REFERENCIAS O ELEMENTOS DEL DOM
const destinationsContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');

// CREAMOS LA FUNCION DE INICIALIZACIÓN DE MI APLICACIÓN
function init() {
  console.log('Explorador de Viajes iniciado...');
  resultsCount.textContent = '0 destinos';
}

// INICIALIZAMOS LA APLICACION
init();
