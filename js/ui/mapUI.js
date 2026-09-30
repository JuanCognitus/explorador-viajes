// v0.5.0 MAPA: Integrqación con Leaflet

// INSTANCIA ACTUAL DE MAPA
let mapaActual = null;

// FUNCION DESTRUIR MAPA ACTUAL
export function destruirMapa() {
  // AÑADIMOS UNA VERIFICACIÓN SI HAY ALGUN MAPA
  if (mapaActual) {
    mapaActual.remove();
    mapaActual = null;
  }
}

// FUNCION CREAR MAPA
export function crearMapa(latitud, longitud, nombre) {
  // VALIDAR LAS COORDENADAS
  if (typeof latitud !== 'number' || typeof longitud !== 'number') {
    console.warn('Coordenadas no disponibles');

    const contenedor = document.querySelector('#destination-map');

    if (contenedor) {
      contenedor.innerHTML = /*html*/ `
      <div class='h-full
                flex
                items-center
                justify-center
                text-slate-500
                bg-slate-100'>
        Ubicación no disponible
      </div>

      `;
    }

    return;
  }

  // MANDAMOS A LLAMAR A LA FUNCION DESTRUIR MAPA
  destruirMapa();

  // INICIALIZAR LEAFLET
  mapaActual = L.map('destination-map').setView([latitud, longitud], 4);

  // AGREGAMOS UNA CAPA DE OPENSTREETMAP
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(mapaActual);

  // AGREGAR MARCADOR
  L.marker([latitud, longitud])
    .addTo(mapaActual)
    .bindPopup(/*html*/ `<strong>${nombre}</strong>`)
    .openPopup();
}
