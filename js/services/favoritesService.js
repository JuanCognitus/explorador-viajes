// v0.6.0 SERVICIO DE FAVORITOS: Manejo de favoritos con LocalStorage

// CLAVE DE LOCALSTORAGE
const FAVORITES_KEY = 'explorador_viajes_favoritos';

// FUNCION OBTENER FAVORITOS
export function obtenerFavoritos() {
  const favoritosGuardados = localStorage.getItem(FAVORITES_KEY);

  // VERIFICAMOS SI HAY FAVORITOS GUARDADOS
  if (!favoritosGuardados) {
    return [];
  }

  // SI HAY FAVORITOS GUARDADOS
  try {
    return JSON.parse(favoritosGuardados);
  } catch (error) {
    console.error('Error al leer favoritos: ', error);

    return [];
  }
}

// GUARDAR FAVORITOS
function guardarFavoritos(favoritos) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));
}

// VERIFICAR FAVORITO
export function esFavorito(codigo) {
  const favoritos = obtenerFavoritos();

  return favoritos.some((pais) => pais.codes?.alpha_3 === codigo);
}

// AGREAGAR FAVORITO
export function agregarFavorito(pais) {
  // Obtenemos el pais que sera favorito
  const favoritos = obtenerFavoritos();

  // obtenemos el codigo
  const codigo = pais.codes?.alpha_3;

  // Validmos si no hay codigo
  if (!codigo) {
    return false;
  }

  // Si ya hay un favorito que devuelva true
  const yaExiste = favoritos.some(
    (favorito) => favorito.codes?.alpha_3 === codigo,
  );

  // Verificamos si existe
  if (yaExiste) {
    return false;
  }

  // En dado caso que no este marcado como favorito
  // RETO FINAL - AGREGAR COMENTARIO
  favoritos.push({
    ...pais,
    comentario: '',
  });

  // Guardamos nuestro Favorito en localStorage
  guardarFavoritos(favoritos);

  return true;
}

// ELIMINAR FAVORITO
export function eliminarFavorito(codigo) {
  const favoritos = obtenerFavoritos();

  const favoritosActualizados = favoritos.filter(
    (pais) => pais.codes?.alpha_3 !== codigo,
  );

  guardarFavoritos(favoritosActualizados);

  return favoritosActualizados;
}

// RETO FINAL - ACTUALIZAR COMENTARIO
export function actualizarComentario(codigo, comentario) {
  // recuperar favoritos
  const favoritos = obtenerFavoritos();

  // BUSCAR FAVORITO
  const favorito = favoritos.find((pais) => pais.codes?.alpha_3 === codigo);

  // VALIDAR FAVORITO
  if (!favorito) {
    return false;
  }

  // ACTUALIZAR COMENTARIO
  favorito.comentario = comentario;

  // GUARDAR CAMBIOS
  guardarFavoritos(favoritos);

  return true;
}
