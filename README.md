# Explordor de Viajes y Lugares Turisticos

Proyecto integrador desarrollado con Javascript, APIs y librerias para explorar información de países y destinos alrededor del mundo

## Tecnologias

- HTML5
- JavaScript ES6+
- APIs REST
- LocalStorage
- Leaflet
- SweetAlert2
- Git
- GitHub
- OpenStreetMap
- Favoritos
- LocalStorage
- SweetAlert2
- Vista dinámica Explorar/Favoritos

## Caracteristicas

El proyecto permite:

- Consultar destinos desde una API REST.
- Mostrar destinos dinámicamente.
- Buscar destinos por nombre.
- Filtrar destinos por continente.
- Ordenar resultados alfabéticamente.
- Consultar información detallada sin cambiar de página.
- Visualizar la ubicación geográfica mediante Leaflet.
- Interactuar con mapas de OpenStreetMap.
- Guardar destinos favoritos.
- Identificar visualmente los destinos guardados.
- Evitar favoritos duplicados.
- Persistir favoritos mediante LocalStorage.
- Consultar una vista dinámica de favoritos.
- Eliminar favoritos mediante confirmación.
- Mostrar notificaciones utilizando SweetAlert2.
- Utilizar una interfaz responsive mediante Tailwind CSS.

## Arquitectura

La aplicación utiliza una sola página HTML y divide progrsivamente la lógica JavaScript en módulos según su responsabilidad

### API

`js/api/countriesApi.js`

Responsable de obtener la información de países desde REST Countries.

### Servicios

`js/services/favoritesService.js`

Responsable de gestionar favoritos y LocalStorage.

### Interfaz

`js/ui/ui.js`

Responsable de renderizar tarjetas, mensajes y detalles.

`js/ui/mapUI.js`

Responsable de integrar Leaflet y OpenStreetMap.

### Utilidades

`js/utils/filters.js`

Responsable de búsqueda, filtrado y ordenamiento.

### Aplicación

`js/app.js`

Punto principal de coordinación entre los diferentes módulos.

## Ejecución

El proyecto debe abrirse utilizando un servidor local, por ejemplo la extensión Live Server de Visual Studio Code.

No requiere npm ni node_modules.

## Versión actual

v1.0.0 - Versión estable del Explorador de Viajes y Lugares Tutísticos
