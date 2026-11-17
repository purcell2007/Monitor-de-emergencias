# Cómo renovar las fichas de noticias (`datos.json`)

La página (`index.html`) pide sola los sismos y desastres naturales a USGS, NASA EONET, GDACS, OMS y ReliefWeb. Lo que **no** tiene fuente automática son las fichas redactadas: vuelos y transporte, servicios esenciales, brotes, crisis humanitarias y los desastres con víctimas que merecen resumen. Esas viven en `datos.json` y hay que renovarlas buscando noticias.

## Qué hacer en cada pasada

1. Lee `datos.json` tal como está.
2. Busca en la web lo ocurrido en las últimas horas en el mundo, con búsquedas separadas por tema:
   - cancelaciones masivas de vuelos, cierres de espacio aéreo o aeropuertos, huelgas de transporte (con atención a España y Europa);
   - apagones, caídas de internet, telefonía, banca, agua o servicios en la nube, ciberataques que interrumpen hospitales o servicios públicos;
   - brotes y alertas sanitarias (OMS, ECDC, CDC, ministerios);
   - crisis humanitarias (OCHA, ACNUR, PMA) y desastres con víctimas (inundaciones, ciclones, erupciones, incendios);
   - bulos virales sobre emergencias que hayan sido desmentidos.
3. Para cada ficha existente: comprueba si hay novedades. Actualiza cifras, estado (`st`), fecha (`d`) y resumen si cambian. Si no hay novedades, déjala como está, sin tocar su fecha.
4. Añade fichas nuevas para sucesos relevantes que falten.
5. Retira las fichas resueltas o sin novedades desde hace más de 10 días, salvo emergencias de larga duración que sigan activas (por ejemplo un brote declarado emergencia internacional).
6. Mantén entre 15 y 35 fichas.
7. Pon en `actualizado` la hora actual en UTC (ISO, por ejemplo `2026-11-17T06:00:00Z`).
8. Ejecuta `node validar.js`. Si falla, corrige y repite hasta que pase.
9. Haz commit solo de `datos.json` y súbelo a las dos ramas: `git push origin HEAD:main` y `git push origin HEAD:gh-pages`. GitHub Pages publica desde `gh-pages`.

No cambies `index.html`, `validar.js` ni este archivo.

## Reglas de contenido

- **Solo hechos contrastados.** Cada cifra debe salir de una fuente fiable que hayas abierto en esta pasada: organismo oficial, agencia de noticias o medio reconocido. Nada de memoria, nada estimado. Si un suceso solo aparece en una web dudosa, no entra.
- **Con fuente enlazada.** Entre 1 y 3 fuentes por ficha, con la URL exacta de la página consultada.
- **Redacción propia, en español,** breve y neutral. Sin copiar frases de las fuentes y sin opinar.
- **Sin sismos sueltos:** los añade la página desde USGS. Un sismo solo lleva ficha si causa víctimas o daños.
- No incluyas datos personales de particulares.

## Formato de cada ficha

```json
{
 "id": "huelga-renfe-17n",
 "cat": "transporte",
 "sev": 2,
 "t": "Huelga ferroviaria en toda España",
 "p": "España · martes 17 nov",
 "lat": 40.4, "lon": -3.7,
 "d": "2026-11-17T00:00:00Z",
 "st": "En curso",
 "f": [["72 %", "mínimos AVE y Larga Distancia"]],
 "s": "Resumen de dos o tres frases.",
 "src": [["EFE", "https://..."]]
}
```

- `id`: minúsculas, números y guiones; estable entre pasadas para el mismo suceso.
- `cat`: `transporte`, `servicios`, `salud`, `geo` (sismos y volcanes), `clima` (tiempo extremo e incendios) o `human` (crisis humanitarias).
- `sev`: 4 Crítico (emergencia internacional declarada o miles de víctimas), 3 Alto (daños graves o servicio esencial interrumpido ahora), 2 Medio (incidencia relevante, resuelta hace poco o prevista), 1 Seguimiento (registrado, sin daños notables, o bulo desmentido).
- `t`: título, máximo 90 caracteres. `p`: lugar. `st`: estado en una o dos palabras (Activo, En curso, Resuelto, Desmentido…).
- `lat`, `lon`: coordenadas aproximadas del lugar, o `null` en ambos si es mundial.
- `d`: fecha del dato, no de la pasada. Con hora UTC si se conoce (`2026-11-17T04:30:00Z`); si no, solo el día (`2026-11-17`). Nunca en el futuro.
- `f`: hasta 3 cifras clave como pares `[valor, etiqueta]`; puede ir vacío.
- `s`: resumen, máximo 420 caracteres.
