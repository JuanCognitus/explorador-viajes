// Comunicación conla API de países
// CONFIGURACIÓN DE LA API

const API_URL =
  'https://juancognitus.github.io/explorador-viajes-api/paises.json';

export async function obtenerPaises() {
  try {
    //REALIZAR PETICIÓN HTTP
    const respose = await fetch(API_URL);

    // VALIDACIÓN RESPUESTA HTTP
    if (!respose.ok) {
      throw new Error(`Error HTTP: ${respose.status}`);
    }

    // CONVERTIR RESPUESTA A JSON
    const result = await respose.json();

    // OBTENER UN ARRAY DE PAÍSES
    const paises = result;

    // RETORNAMOS EL RESULTADO
    return paises;
  } catch (error) {
    // MANEJO DE ERRORES
    console.log('Error al obtener los paises: ', error);
    return [];
  }
}
