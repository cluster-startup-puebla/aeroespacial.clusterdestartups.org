# Lectura de DESIGN.md para la landing

`DESIGN.md` en la raíz es la autoridad visual. Esta nota solo dice cómo se comporta en la landing del Año Espacial. Si algo de aquí chocara con ese archivo, gana `DESIGN.md`.

## Estrella norte

El observatorio del limbo. La landing es una sala a oscuras. La luz sale de la atmósfera de la Tierra. El Cohete Antorcha ocupa el primer viewport y se sale del marco. La interfaz no compite con el objeto.

La escena física no cambia: alguien abre el sitio de noche, como quien sigue un acto. El default de toda la página, no solo del héroe, pasa a los tokens oscuros de `DESIGN.md`. Hoy `globals.css` sigue en blanco neutro. El plan lo sustituye.

## Qué se usa tal cual

| Regla de DESIGN.md | En esta landing |
|---|---|
| Vacío `#07080c` como fondo de página | Héroe, capítulos, ejes, ruta, FAQ y adhesión |
| Azul señal `#2454e0` una sola vez por vista | El botón `Sumarme al Pacto`. En el héroe hay uno. Más abajo se repite el mismo botón, no un segundo color |
| Schibsted Grotesk, pesos 400 y 500, sentence case | Todo el texto, incluido `Puebla` |
| Mayúsculas con tracking solo en etiquetas | Ceja, riel `00–05`, “Desliza para entrar”, nombres cortos de la fila de convocantes |
| Fotografía a sangre, radio 0 | `IMG-01` a `IMG-07` |
| Objeto sangrado por al menos dos bordes | `IMG-02` toca la derecha y puede cruzar el borde inferior del vacío |
| Filete de 1 px, sin sombra | Ejes, ruta, tarjetas de evento y de nota |
| Riel de capítulos desde 1024 px | Índices del vuelo |
| Vidrio solo sobre fotografía | La barra de navegación, mientras el vuelo está detrás, queda sin fondo. Al salir del vuelo recupera `void` al 86 % y un filete inferior |
| `prefers-reduced-motion` | El vuelo se desarma en capítulos apilados. Las fotos se quedan quietas |
| Hex solo en `globals.css` | Los componentes usan `bg-surface`, `text-ink`, `bg-accent`, `border-line` |
| Español mexicano en los botones | `Sumarme al Pacto` |

## Token que esta landing agrega

`DESIGN.md` fija el display en `clamp(3.25rem, 6.4vw, 6rem)`. “Puebla” necesita el tamaño de un nombre de lugar, como “Hong Kong” en la referencia de vuelo: más grande que un titular de sección.

En la implementación se agrega un escalón, solo en `globals.css`:

```css
--text-place: clamp(4.5rem, 14vw, 11rem);
--text-place--line-height: 0.9;
--text-place--font-weight: 500;
--text-place--letter-spacing: -0.045em;
```

Sigue siendo Schibsted Grotesk. No es una segunda familia ni un degradado. Después de construir, ese escalón se anota en `DESIGN.md` como `display-place`.

## Qué de las referencias no entra

- El magenta de SPACED. El botón es azul señal.
- El wordmark cromado de Orvion. “Puebla” es texto plano.
- El día azul de Hanergy como fondo de sección. El limbo vive dentro de la fotografía.
- Retícula HUD, esquinas de mirilla, estrellas repetidas en CSS. Si hay estrellas, vienen dentro de `IMG-01`.
- Píldora de vidrio flotando como navegación. La nav del sistema es una barra quieta sobre el vacío.
- Logotipos generados. La fila de convocantes es tipografía.

## Movimiento, dentro de las reglas

`DESIGN.md` pide llegada lenta, ligada al scroll, sin rebote y sin pulso. La curva es `cubic-bezier(0.22, 1, 0.36, 1)`, 180 ms en controles y ~480 ms entre cuadros.

En el vuelo:

- Cada still entra con escala de `1.06` a `1` durante su tramo. Se siente como llegar, no como un corte.
- El cruce de opacidad entre dos stills dura cerca del 12 % del tramo.
- El cuadro 0 permanece quieto al cargar. “Puebla” y la fila de convocantes aparecen una vez, en la llegada, y no vuelven a animarse en cada scroll.
- El objeto `IMG-02` se desplaza unos píxeles en sentido contrario al fondo mientras el cuadro 0 sigue activo. Parallax corto. No es un giro 3D.
- Botones: el hover oscurece a `#1b43c2`. No hay `translateY` ni glow.
- El riel marca el índice activo. No pulsa.

La implementación no usa `window.addEventListener("scroll")` sin control. El progreso sale de `animation-timeline: scroll()` y, donde eso no exista, de un `IntersectionObserver` sobre centinelas. El detalle está en el plan.
