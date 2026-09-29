// EXPLORADOR DE VIAJES
// Archivo principal de la aplicación

// v0.2.0 IMPORTACION DE COUNTRIESAPI
import { obtenerPaises } from './api/countriesApi.js';

// v0.3.0 IMPORTACION  UI
import {
  mostrarCargando,
  mostrarError,
  renderPaises,
  actualizarContador,
} from './ui/ui.js';

// v0.2.0 ESTADO DE LA APLICACIÓN
let paises = [];

// OBTENEMOS REFERENCIAS O ELEMENTOS DEL DOM
const destinationsContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');

// v0.2.0 OBTENEMOS EL ELEMENTO MENSAJE INICIAL crear error a proposito
// const initialMessage = document.querySelector('#initial-message');

// CREAMOS LA FUNCION DE INICIALIZACIÓN DE MI APLICACIÓN
async function init() {
  console.log('Explorador de Viajes iniciado...');
  resultsCount.textContent = '0 destinos';

  // v0.2.0 MOSTRAR ESTADO DE CARGA -> v0.3.0
  mostrarCargando(destinationsContainer);

  // v0.2.0 OBTENER PA´SISES DEADE LA API
  paises = await obtenerPaises();

  // v0.2.0 COMPROBAR RESULTADOS
  console.log('Paises obtenidos: ', paises);

  // v0.3.0 Comprobar si hay paises
  if (paises.length === 0) {
    mostrarError(destinationsContainer);

    actualizarContador(0, resultsCount);

    return;
  }

  // v0.3.0 RENDERIZAR DESTINOS
  renderPaises(paises, destinationsContainer);

  // v0.3.0 ACTUALIZAR CONTADOR y eliminamos todo lo de abajo
  actualizarContador(paises.length, resultsCount);
}

// INICIALIZAMOS LA APLICACION
init();
