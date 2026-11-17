# Monitor Global de Emergencias

Panel web con un mapa mundial de emergencias: sismos y volcanes, tiempo extremo e incendios, brotes, transporte, servicios esenciales y crisis humanitarias, con cuatro niveles de gravedad y la fuente de cada dato.

**Página:** https://purcell2007.github.io/Monitor-de-emergencias/

## Cómo se actualiza

Al abrir o recargar la página, cada 5 minutos y con el botón «Actualizar datos», la página consulta USGS (sismos), NASA EONET y GDACS (desastres naturales), la OMS (brotes) y ReliefWeb (desastres en curso). Debajo del botón se ve qué fuentes han respondido.

Las fichas de vuelos, huelgas, servicios y crisis humanitarias no tienen fuente automática: están redactadas a mano a partir de fuentes citadas y llevan su fecha.

Todo está en un único archivo, `index.html`.
