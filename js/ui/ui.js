// INTERFAZ DE USUARIO
// Funciones encargadas de actualizar el DOM

// v0.3.0 MOSTRAR ESTADO DE CARGA
export function mostrarCargando(contenedor) {
  // v0.3.0 MOSTRAR ESTADO DE CARGA
  contenedor.innerHTML = /*html*/ `
  
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
}

// v0.3.0 CREAR FUNCION PARA MOSTRAR ERROR
export function mostrarError(contenedor) {
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

// MOSTRAR FAVORITOS VACÍOS
export function mostrarFavoritosVacios(contenedor) {
  contenedor.innerHTML = /*html*/ `

    <div class='col-span-full
                bg-white
                border
                border-dashed
                border-slate-300
                rounded-xl
                p-12
                text-center'>
      <div class='text-5xl mb-4'>
        ♡
      </div>

      <h3 class='text-xl
                    font-semibold
                    text-slate-800
                    mb-2'>
        No tienes destinos favoritos
      </h3>

      <p class='text-slate-500'>
        Explorar los destinos y guarda los que más te interesen.
      </p>
    </div>
  
  
  `;
}

// v0.3.0 ACTUALIZAR CONTADOR
export function actualizarContador(total, elementoContador) {
  // modificar1.0.0
  const texto = total === 1 ? 'destino' : 'destinos';
  elementoContador.textContent = `${total} ${texto}`;
}

// v0.3.0 RENDERIZAR DESTINOS
export function renderPaises(
  paises,
  contenedor,
  modo = 'explorar',
  favoritos = [],
) {
  // v0.3.0 MOSTRAR MENSAJE SI NO EXISTEN DESTINOS
  if (paises.length === 0) {
    contenedor.innerHTML = /*html*/ `

      <div class='col-span-full
                bg-white
                border
                border-dashed
                border-slate-300
                rounded-xl
                p-12
                text-center'>
        <div class='text-5xl mb-4'>
          🔎
        </div>
        <h3 class='text-xl
                    font-semibold
                    text-slate-800
                    mb-2'>
          No encontramos destinos
        </h3>

        <p class='text-slate-500'>
          Intenta cambiar los criterios de búsqueda
        </p>
      </div>
    
    `;
    return;
  }

  // v0.3.0 CREAR TARJETAS VISUALES
  const tarjetas = paises
    .map((pais) => {
      // v0.3.0 OBTENER INFORMACIÓN DE CADA PAÍS
      const nombre = pais.names?.common ?? 'Nombre no disponible';
      const region = pais.region ?? 'Region no disponible';
      const poblacion = pais.population ?? 0;
      const bandera = pais.flag?.url_png ?? '';
      const codigo = pais.codes?.alpha_3 ?? '';

      // RETO FINAL -COMENTARIO
      const comentario = pais.comentario ?? '';

      // VERIFICAR SI ES FAVORITO
      const favoritoActivo = favoritos.some(
        (favorito) => favorito.codes?.alpha_3 === codigo,
      );

      // v0.3.0 FORMATEAR POBLACIÓN con tolocalstring
      const poblacionFormateada = poblacion.toLocaleString('es-Mx');

      // v0.6.0 CREAMOS DINAMICAMENTE EL BOTÓN DE FAVORITOS
      const botonFavorito =
        modo === 'favoritos'
          ? /*html*/ `
      <button type='button' data-action='remove-favorite' data-country-code='${codigo}' class='px-4
                    py-2
                    border
                    border-red-300
                    text-red-600
                    rounded-lg
                    cursor-pointer
                    hover:bg-red-50
                    transition'>
        ♥ Eliminar
      </button> 
      `
          : /*html*/ `
      <button type='button' data-action='favorite' data-country-code='${codigo}' aria-label='Agregar ${nombre} a favoritos' class='px-4
                    py-2
                    border
                    ${
                      favoritoActivo
                        ? 'border-red-300 text-red-600 bg-red-50'
                        : 'border-slate-300 text-slate-600'
                    }
                    rounded-lg
                    cursor-pointer
                    hover:bg-slate-100
                    transition'>
        ${favoritoActivo ? '♥' : '♡'}
      </button>
      `;

      const seccionComentario =
        modo === 'favoritos'
          ? /*html*/ `
          
          <div class='mt-4 border-t border-slate-200 pt-4'>
            <label class='mb-2 block text-sm font-semibold text-slate-700'>
              Mi comentario
            </label>

            <textarea data-comment-country='${codigo}' 
                      class='w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-blue-500' 
                      rows='3' 
                      placeholder='Escribe una nota sobre este destino...'>
                ${comentario}
            </textarea>

            <button type='button'
                    data-action='save-comment'
                    data-country-code='${codigo}'
                    class='mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'>
              Guardar comentario
            </button>
          </div>
          `
          : '';

      return /*html*/ `
      <article class='bg-white
            rounded-xl
            border
            border-slate-200
            overflow-hidden
            shadow-sm
            hover:shadow-md
            transition'>

      <!--BANDERA-->
      <div class='h-48
                bg-slate-100
                overflow-hidden'>
          
          <img src="${bandera}" alt="Bandera de ${nombre}" class='w-full
                    h-full
                    object-cover'>

      </div>

        <!--v0.3.0 INFORMACIÓN DEL DESTINO -->
      <div class='p-5'>

        <div class='flex
                    items-start
                    justify-between
                    gap-4
                    mb-4'>
          <div>
            <h3 class='text-xl
                            font-bold
                            text-slate-900'>
              ${nombre}
            </h3>
            <p class='text-sm text-slate-500'>
              ${region}
            </p>
          </div>

          <span class='px-3
                        py-1
                        bg-blue-50
                        text-blue-600
                        text-xs
                        font-medium
                        rounded-full'>
            ${codigo}
          </span>
        </div>

        <!--v0.3.0 POBLACION-->
        <div class='mb-5'>
          <p class='text-xs text-slate-500'>
            Población 
          </p>
          <p class='text-lg
                        font-semibold
                        text-slate-800'>
            ${poblacionFormateada}
          </p>
        </div>

        <!--v0.3.0 ACCIONES-->
        <div class='flex gap-3'>
          <button type='button'
                  data-action='detail'
                  data-country-code='${codigo}'
                  class='flex-1
                        px-4
                        py-2
                        bg-blue-600
                        text-white
                        rounded-lg
                        font-medium
                        cursor-pointer
                        hover:bg-blue-700
                        transition'
            >
            Ver mas
          </button>
          <!--ELIMINAMOS EL BOTON Y LO CREAMOS DINAMICO-->
          ${botonFavorito}
        </div>

        <!--RETO FINAL - COMENTARIO-->
        ${seccionComentario}

      </div>
    
    </article> 
    `;
    })
    .join('');

  contenedor.innerHTML = tarjetas;
}

// v0.5.0 MOSTRAR DETALLE DEL DESTINO
export function mostrarDetalle(pais, modal, modalContent) {
  // OBTENER INFORMACIÓN DEL PAÍS
  const nombre = pais.names?.common ?? 'Nombre no disponible';
  const nombreOficial = pais.names?.official ?? 'No disponible';
  const region = pais.region ?? 'No disponible';
  const subregion = pais.subregion ?? 'No disponible';
  const poblacion = pais.population ?? 0;
  const bandera = pais.flag?.url_png ?? '';
  const codigo = pais.codes?.alpha_3 ?? '';
  const capital = pais.capitals?.[0]?.name ?? 'No disponible';

  // COORDENADAS
  const latitud = pais.coordinates?.lat;
  const longitud = pais.coordinates?.lng;

  // FORMATEAR POBLACIÓN
  const poblacionFormateada = poblacion.toLocaleString('es-MX');

  // CREAMOS EL CONTENIDO DE NUESTRO MODAL
  modalContent.innerHTML = /*html*/ `
  
  <article class='bg-white
            rounded-2xl
            overflow-hidden
            shadow-2xl'>

    <!--CABECERA-->

    <div class='flex
                items-center
                justify-between
                gap-4
                p-6
                border-b
                border-slate-200'>

      <div>
        <p class='text-sm
                  text-blue-600
                  font-medium'>
          ${codigo}
        </p>

        <h2 class='text-2xl
                  md:text-3xl
                  font-bold
                  text-slate-900'>
          ${nombre}
        </h2>

      </div>

      <button id='btn-close-detail' type='button' aria-label='Cerrar detalle' class='w-10
                    h-10
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-slate-600
                    text-xl
                    cursor-pointer
                    hover:bg-slate-200'>
        X
      </button>
    
    </div>

    <!--BANDERA-->
    <div class='h-64
        md:h-80
        bg-slate-100
        overflow-hidden'>
      <img src="${bandera}" alt="Bandera de ${nombre}" class='w-full
            h-full
            object-cover'>
    </div>

    <!--INFORMACIÓN-->

    <div class='p-6'>
      <div class='grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            mb-'>
        <div class='bg-slate-50
                rounded-xl
                p-4'>
          <p class='text-xs text-slate-500'>
            Capital
          </p class='font-semibold text-slate-900'>
          <p>
            ${capital}
          </p>    
        </div>

        <div class='bg-slate-50
                rounded-xl
                p-4'>
          <p class='text-xs text-slate-500'>
            Región
          </p>
          <p class='font-semibold text-slate-900'>
            ${region}
          </p>
        </div>

        <div class='bg-slate-50
                rounded-xl
                p-4'>
          <p class='text-xs text-slate-500'>
            Subregion
          </p>
          <p class='font-semibold text-slate-900'>
            ${subregion}
          </p>
        </div>

        <div class='bg-slate-50
                rounded-xl
                p-4'>
          <p class='text-xs text-slate-500'>
            Población
          </p>
          <p class='font-semibold text-slate-900'>
            ${poblacionFormateada}
          </p>
        </div>

        <div class='bg-slate-50
                rounded-xl
                p-4
                sm:col-span-2'>
          <p class='text-xs text-slate-500'>
            Nombre oficial
          </p>
          <p class='font-semibold text-slate-900'>
            ${nombreOficial}
          </p>
        </div>
      </div>

      <!--MAPA-->
        <div>
          <div class='mb-3'>
            <h3 class='text-xl
                font-bold
                text-slate-900'>
              Ubicación
            </h3>

            <p class='text-sm text-slate-500'>
              Centro grografico aproximado del pais
            </p>
          </div>

          <div id='destination-map' 
          class='w-full
                            h-80
                            rounded-xl
                            overflow-hidden
                            border
                            border-slate-200'> 
          </div>
        </div>
    </div>
  
  </article>
  `;

  // MOSTRAL MODAL
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  // RETONAR DATOS DEL MAPA
  return {
    latitud,
    longitud,
    nombre,
  };
}

// CERRAR DETALLE
export function cerrarDetalle(modal, modalContent) {
  modal.classList.add('hidden');

  modalContent.innerHTML = '';

  document.body.classList.remove('overflow-hidden');
}
