// EXPLORADOR DE VIAJES
// Archivo principal de la aplicación

// v0.2.0 IMPORTACION OBTENER PAISES
import { obtenerPaises } from './api/countriesApi.js';

// v0.2.0 ESTADO DE LA APLICACIÓN
let paises = [];

// OBTENEMOS REFERENCIAS O ELEMENTOS DEL DOM
const destinationsContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');

// v0.2.0 OBTENEMOS EL ELEMENTO MENSAJE INICIAL crear error a proposito
const initialMessage = document.querySelector('#initial-message');

// CREAMOS LA FUNCION DE INICIALIZACIÓN DE MI APLICACIÓN
async function init() {
  console.log('Explorador de Viajes iniciado...');
  resultsCount.textContent = '0 destinos';

  // v0.2.0 MOSTRAR ESTADO DE CARGA
  initialMessage.innerHTML = /*html*/ `
  
  <div class='text-5xl mb-4'>
    🌎
  </div>

  <h3 class='text-xl
            font-semibold
            text-slate-800
            mb-2'>
    Cargando destinos...
  </h3>

  <p class='text-slate-500'>
    Estamos consultando información de paises alrededor del mundo
  </p>
  `;

  // v0.2.0 OBTENER PA´SISES DEADE LA API
  paises = await obtenerPaises();

  // v0.2.0 COMPROBAR RESULTADOS
  console.log('Paises obtenidos: ', paises);

  // v0.2.0 ACTUALIZAR CONTADOR
  resultsCount.textContent = `${paises.length} destinos`;

  // v0.2.0 MOSTRAR ESTADO DE CARGA
  if (paises.length > 0) {
    // Modificamos nuestro mensaje inciial
    initialMessage.innerHTML = /*html*/ `
    
    <div class='text-5xl mb-4'>
      ✅
    </div>

    <h3 class='text-xl
                font-semibold
                text-slate-800
                mb-2'>
      Destinos cargados
    </h3>

    <p class='text-slate-500'>
      Se obtuvieron ${paises.length} destinos correctamente
    </p>
    
    `;
  } else {
    initialMessage.innerHTML = /*html*/ `
    
    <div class='text-5xl mb-4'>
      ⚠️
    </div>

    <h3 class='text-xl
                font-semibold
                text-slate-800
                mb-2'>
      No fue posible cargar los destinos
    </h3>

    <p class='text-slate-500'>
      Verifica tu conexión e intenta nuevamente
    </p>

    `;
  }
}

// INICIALIZAMOS LA APLICACION
init();
