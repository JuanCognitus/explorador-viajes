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
  // v0.5.0 ACTUALIZAR IMPORTACIÓN
  mostrarDetalle,
  cerrarDetalle,
} from './ui/ui.js';

// v0.4.0 IMPORTAR PROCESAR PAISES
import { procesarPaises } from './utils/filters.js';

// v0.5.0 IMPORTAR LEAFLET
import { crearMapa, destruirMapa } from './ui/mapUI.js';

// v0.2.0 ESTADO DE LA APLICACIÓN
let paises = [];

// OBTENEMOS REFERENCIAS O ELEMENTOS DEL DOM
const destinationsContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');

// v0.2.0 OBTENEMOS EL ELEMENTO MENSAJE INICIAL crear error a proposito
// const initialMessage = document.querySelector('#initial-message');

// v0.4.0 CONTROLES DEL DOM
const searchInput = document.querySelector('#search-input');
const continentFilter = document.querySelector('#continent-filter');
const sortFilter = document.querySelector('#sort-filter');

// v0.5.0 REFERENCIAS AL MODAL
const detailModal = document.querySelector('#detail-modal');
const detailModalContent = document.querySelector('#detail-modal-content');

// v0.5.0 BUSCAR PAIS POR CODIGO
function obtenerPaisCodigo(codigo) {
  return paises.find((pais) => pais.codes?.alpha_3 === codigo);
}

// v0.4.0 APLICAR FILTROS
function aplicarFiltros() {
  //OBTENER VALORES SELECCIONADOS
  const texto = searchInput.value;
  const continente = continentFilter.value;
  const criterioOrden = sortFilter.value;

  //PROCESAR LOS DATOS
  const resultados = procesarPaises(paises, texto, continente, criterioOrden);

  // RENDERIZAR LOS RESULTADOS
  renderPaises(resultados, destinationsContainer);

  // ACTUALIZAR EL CONTADOR
  actualizarContador(resultados.length, resultsCount);
}

// v0.5.0 ABRIR DETALLE DEL DESTINO
function abrirDetalle(codigo) {
  const pais = obtenerPaisCodigo(codigo);

  // SI NO EXISTE MUESTRA UN MENSAJE
  if (!pais) {
    console.warn('Pais no encontrado');
    return;
  }

  // SI EXISTE
  const datosMapa = mostrarDetalle(pais, detailModal, detailModalContent);

  // CREAMOS MAPA DEL DESTINO
  setTimeout(() => {
    crearMapa(datosMapa.latitud, datosMapa.longitud, datosMapa.nombre);
  }, 0);
}

// v0.4.0 REGISTRAR EVENTOS
function registrarEventos() {
  // EVENTO INPUT PARABUSCAR EN TIEMPO REAL
  searchInput.addEventListener('input', aplicarFiltros);

  // EVENTO CHANGE CUANDO CAMBIA EL CRITERIO DE BUSQUEDA
  continentFilter.addEventListener('change', aplicarFiltros);

  // EVENTO CHANGE PARA ORDENAMIENTO
  sortFilter.addEventListener('change', aplicarFiltros);

  // v0.5.0 ACCIONES DE LAS TARJETAS
  destinationsContainer.addEventListener('click', (event) => {
    // Creamos un boton para cerrar el mapa
    const boton = event.target.closest('[data-action]');

    // Si no hay boton no hagas nada
    if (!boton) {
      return;
    }

    // De lo contrario
    const accion = boton.dataset.action;
    const codigo = boton.dataset.countryCode;

    if (accion === 'detail') {
      abrirDetalle(codigo);
    }
  });

  // v0.5.0 CERRRAR MODAL
  detailModal.addEventListener('click', (event) => {
    if (event.target.id === 'btn-close-detail') {
      cerrarModalDetalle();
    }

    // Cerrar al dar click fuera del modal o contenido
    if (event.target === detailModal) {
      cerrarModalDetalle();
    }
  });

  // CERRAR CON  TECLA ESCAPE
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !detailModal.classList.contains('hidden')) {
      cerrarModalDetalle();
    }
  });
}

// v0.5.0 CERRAR MODAL DE DETALLE
function cerrarModalDetalle() {
  destruirMapa();

  cerrarDetalle(detailModal, detailModalContent);
}

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

  // v0.4.0 BORRAMOS renderPaises y actualizarContador
  aplicarFiltros();

  // v0.4.0 REGISTRAR EVENTOS
  registrarEventos();
}

// INICIALIZAMOS LA APLICACION
init();
