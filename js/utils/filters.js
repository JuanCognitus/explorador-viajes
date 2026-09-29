// v0.4.0 FILTROS Y ORDENAMIENTO
// Funciones para procesardestinos

// FUNCION BUSCAR PAÍSES POR NOMBRE
export function buscarPaises(paises, texto) {
  // NORMALIZAR TEXTO DE BUSQUEDA
  const textoNormalizado = texto.trim().toLowerCase();

  // RETORNAR TODOS LOS PAISES SIN BUSQUEDA
  if (!textoNormalizado) {
    return paises;
  }

  // FILTRAR PAÍSES
  return paises.filter((pais) => {
    const nombre = pais.names?.common?.toLowerCase() ?? '';
    return nombre.includes(textoNormalizado);
  });
}

// FILTRAR POR CONTINENTE
export function filtrarPorContinente(paises, continente) {
  // RETORNAR LOSPAISES CON FILTER
  if (continente === 'all') {
    return paises;
  }

  // FILTRAMOS POR RGION
  return paises.filter((pais) => pais.region === continente);
}

// ORDENAR PAÍSES
export function ordenarPaises(paises, criterio) {
  // CREAR UNA COPIA
  const paisesOrdenados = [...paises];

  // ORDENAR A-Z CON localeCompare()
  if (criterio === 'az') {
    return paisesOrdenados.sort((a, b) => {
      const nombreA = a.names?.common ?? '';
      const nombreB = b.names?.common ?? '';

      return nombreA.localeCompare(nombreB);
    });
  }

  // ORDENAR Z-A
  if (criterio === 'za') {
    return paisesOrdenados.sort((a, b) => {
      const nombreA = a.names?.common ?? '';
      const nombreB = b.names?.common ?? '';

      return nombreB.localeCompare(nombreA);
    });
  }

  return paisesOrdenados;
}

// PROCESAR PAÍSES
export function procesarPaises(paises, texto, continente, criterioOrden) {
  let resultado = buscarPaises(paises, texto);

  resultado = filtrarPorContinente(resultado, continente);

  resultado = ordenarPaises(resultado, criterioOrden);

  return resultado;
}
