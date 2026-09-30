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
  mostrarFavoritosVacios,
} from './ui/ui.js';

// v0.4.0 IMPORTAR PROCESAR PAISES
import { procesarPaises } from './utils/filters.js';

// v0.5.0 IMPORTAR LEAFLET
import { crearMapa, destruirMapa } from './ui/mapUI.js';

// v0.6.0 IMPORTAMOS NUESTRO SERVICIO
import {
  obtenerFavoritos,
  agregarFavorito,
  eliminarFavorito,
  esFavorito,
} from './services/favoritesService.js';

// v0.2.0 ESTADO DE LA APLICACIÓN
let paises = [];

// v0.6.0 ESTADO DE LA VISTA ACTUAL
let vistaActual = 'explorar';

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

// v0.6.0 REFERENCIAS DE NAVEGACIÓN
const btnExplorar = document.querySelector('#btn-explorar');
const btnFavoritos = document.querySelector('#btn-favoritos');
const sectionTitle = document.querySelector('#section-title');
const searchForm = document.querySelector('#search-form');

// v0.5.0 BUSCAR PAIS POR CODIGO
function obtenerPaisCodigo(codigo) {
  return paises.find((pais) => pais.codes?.alpha_3 === codigo);
}

// ACTUALIZAR NAVEGACIÓN
function actualizarNavegacion() {
  // Agregamos nuestras clases
  const clasesActivas = ['bg-blue-600', 'text-white'];
  const clasesInactivas = [
    'bg-white',
    'text-slate-700',
    'border',
    'border-slate-300',
  ];

  // UTILIZAMOS CLASSNAME
  if (vistaActual === 'explorar') {
    btnExplorar.className = `
        px-4
        py-2
        bg-blue-600
        text-white
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-blue-700
        transition
    `;

    btnFavoritos.className = `
        px-4
        py-2
        bg-white
        text-slate-700
        border
        border-slate-300
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-slate-100
        transition
    
    `;
  } else {
    btnExplorar.className = `
        px-4
        py-2
        bg-white
        text-slate-700
        border
        border-slate-300
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-slate-100
        transition
    
    `;

    btnFavoritos.className = `
        px-4
        py-2
        bg-blue-600
        text-white
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-blue-700
        transition
    
    `;
  }
}

// v0.4.0 APLICAR FILTROS
function aplicarFiltros() {
  // v0.6.0 EVITAR RENDERIZADO DE FILTROS EN FAVORITOS
  if (vistaActual !== 'explorar') {
    return;
  }

  //OBTENER VALORES SELECCIONADOS
  const texto = searchInput.value;
  const continente = continentFilter.value;
  const criterioOrden = sortFilter.value;

  //PROCESAR LOS DATOS
  const resultados = procesarPaises(paises, texto, continente, criterioOrden);

  // OBTENER FAVORITOS ACTUALES
  const favoritos = obtenerFavoritos();

  // RENDERIZAR LOS RESULTADOS
  renderPaises(resultados, destinationsContainer, 'explorar', favoritos);

  // ACTUALIZAR EL CONTADOR
  actualizarContador(resultados.length, resultsCount);
}

// v0.6.0 MOSTRAR VISTA EXPLORAR
function mostrarExplorar() {
  vistaActual = 'explorar';

  sectionTitle.textContent = 'Destinos';

  searchForm.classList.remove('hidden');

  actualizarNavegacion();

  aplicarFiltros();
}

// v0.6.0 MOSTRAR VISTA FAVORITOS
function mostrarFavoritos() {
  vistaActual = 'favoritos';

  sectionTitle.textContent = 'Mis favoritos';

  searchForm.classList.add('hidden');

  actualizarNavegacion();

  const favoritos = obtenerFavoritos();

  // PASO 18 UTILIZAR EL ESTADO VACÍO CORRECTO
  if (favoritos.length === 0) {
    mostrarFavoritosVacios(destinationsContainer);

    actualizarContador(0, resultsCount);

    return;
  }

  renderPaises(favoritos, destinationsContainer, 'favoritos');
}

// v0.6.0 AGREGAR DESTINO A FAVORITOS
function manejarAgregarFavoritos(codigo) {
  // Buscamso paises
  const pais = obtenerPaisCodigo(codigo);

  //Validamos
  if (!pais) {
    return;
  }

  // Si hay paises, verificamos si ya esta guardado
  if (esFavorito(codigo)) {
    // Primera vez que utilizamos SweetAlert
    Swal.fire({
      icon: 'info',
      title: 'Ya está en favoritos',
      text: 'Este destino ya había sido guardado.',
    });

    return;
  }

  // Guardar favorito
  const agregado = agregarFavorito(pais);

  if (agregado) {
    // ACTUALIZAR TARJETAS
    aplicarFiltros();
    Swal.fire({
      icon: 'success',
      title: 'Destino guardado',
      text: `${pais.names?.common ?? 'El destino fur agregado a favoritos'}`,
      timer: 1800,
      showConfirmButton: false,
    });
  }
}

// v0.6.0 ELIMINAR DESTINO DE FAVORITOS
async function manejarEliminarFavorito(codigo) {
  //Buscamos elpais
  const pais = obtenerPaisCodigo(codigo);

  if (!pais) {
    return;
  }

  const resultado = await Swal.fire({
    icon: 'warning',
    title: 'Eliminar favorito',
    text: `¿Deseas eliminar ${pais.names?.common ?? 'este destino'} de tus favoritos`,
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626',
  });

  if (!resultado.isConfirmed) {
    return;
  }

  eliminarFavorito(codigo);

  mostrarFavoritos();

  Swal.fire({
    icon: 'success',
    title: 'Favorito eliminado',
    timer: 1500,
    showConfirmButton: false,
  });
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
  // v0.6.0 EVITAR ENVIO DE FORMULARIO RECARGUE LA PAGINA
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  // EVENTO INPUT PARABUSCAR EN TIEMPO REAL
  searchInput.addEventListener('input', aplicarFiltros);

  // CONTINENTEEVENTO CHANGE CUANDO CAMBIA EL CRITERIO DE BUSQUEDA
  continentFilter.addEventListener('change', aplicarFiltros);

  // EVENTO CHANGE PARA ORDENAMIENTO
  sortFilter.addEventListener('change', aplicarFiltros);

  // v0.6.0 NAVEGACIÓN-EXPLORAR mostrar explorar
  btnExplorar.addEventListener('click', mostrarExplorar);

  // v0.6.0 NAVEGACION- FAVORITOS btnFavoritos
  btnFavoritos.addEventListener('click', mostrarFavoritos);

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
      return;
    }

    // v0.6.0 HACER FUNCIONAR EL BOTON `♡`
    if (accion === 'favorite') {
      manejarAgregarFavoritos(codigo);
      return;
    }

    // v0.6.0 REMOVE FAVORITE
    if (accion === 'remove-favorite') {
      manejarEliminarFavorito(codigo);
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
  resultsCount.textContent = '0 destinos';

  // v0.2.0 MOSTRAR ESTADO DE CARGA -> v0.3.0
  mostrarCargando(destinationsContainer);

  // v0.2.0 OBTENER PA´SISES DEADE LA API
  paises = await obtenerPaises();

  // v0.3.0 Comprobar si hay paises
  if (paises.length === 0) {
    mostrarError(destinationsContainer);

    actualizarContador(0, resultsCount);

    return;
  }

  // v0.4.0 BORRAMOS renderPaises y actualizarContador
  aplicarFiltros();

  // v0.6.0
  actualizarNavegacion();

  // v0.4.0 REGISTRAR EVENTOS
  registrarEventos();
}

// INICIALIZAMOS LA APLICACION
init();
