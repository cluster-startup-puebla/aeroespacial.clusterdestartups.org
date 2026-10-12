---
name: Clúster Aeroespacial
description: Observatorio del limbo. Vacío oscuro, la Tierra como luz, un solo azul de acción.
colors:
  void: "#07080c"
  void-raised: "#10131a"
  limb-ink: "#161b26"
  hairline: "#ffffff24"
  text-primary: "#f3f5f7"
  text-secondary: "#a7b0bd"
  text-muted: "#8b94a3"
  signal: "#2454e0"
  signal-hover: "#1b43c2"
  on-signal: "#ffffff"
  limb: "#9ec9ff"
  instrument: "#f4f6f8"
  instrument-ink: "#12141a"
  instrument-muted: "#5c6573"
  instrument-line: "#d9dee6"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(3.25rem, 6.4vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  display-quiet:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 5.5vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  sharp: "0px"
  panel: "8px"
  pill: "999px"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
  5xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.on-signal}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.signal-hover}"
    textColor: "{colors.on-signal}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 21px"
  button-instrument:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.on-signal}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0 28px"
    height: "72px"
  card-hairline:
    backgroundColor: "{colors.void-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.panel}"
    padding: "24px"
  input-instrument:
    backgroundColor: "{colors.instrument}"
    textColor: "{colors.instrument-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sharp}"
    padding: "16px 20px"
    height: "72px"
---

# Design System: Clúster Aeroespacial

Dirección comprometida a partir del tablero visual (SPACED, AT-Universe, Hanergy, Orvion Space, LOOP, interfaz de vuelo, Xona, el landing de CubeSats de Shakuro y el scrollytelling de Pexelflow). El código actual sigue en tokens neutros de relleno; este archivo es la autoridad visual hasta que la primera implementación lo concilie.

## Overview

**Creative North Star: "El observatorio del limbo"**

La página es una sala a oscuras y la pantalla es la única luz. Esa luz no sale de un gradiente: sale del limbo de la Tierra, la franja azul-blanca donde la atmósfera toca el negro. Encima de ese vacío flota un objeto real —satélite, cohete, globo— a escala monumental, recortado por el borde del viewport. El objeto explica el tema. La interfaz se queda quieta para no competir con él.

El sitio del clúster (landing, blog, calendario) se lee como una institución aeroespacial contemporánea: titulares grandes y exactos, una acción azul, cifras enormes, y un scroll que avanza por capítulos con un riel a la derecha. La fotografía y el render del hardware cargan la emoción. La tipografía no se disfraza de ciencia ficción.

La escena física que fija el modo: alguien abre el sitio de noche, como quien sigue un lanzamiento. El default es oscuro. La única superficie clara es el instrumento: la barra de búsqueda, el filtro de fechas, cualquier control denso que hay que operar con precisión.

**Key Characteristics:**

- Vacío azul-negro de página completa; el color vive en la foto, en el hardware y en un solo botón.
- Titular grotesco, peso medio, tracking cerrado, alineado a la izquierda cuando hay un objeto a la derecha; centrado solo en un capítulo cinematográfico.
- Objeto monumental que se sale del frame: el satélite o la Tierra ocupan más de la mitad del primer viewport.
- Riel de capítulos en el borde derecho (puntos o índices 01–05).
- Paneles con filete de 1px, sin sombra.
- Barra instrumento blanca, de borde a borde, para la tarea densa (buscar vuelos en la referencia; aquí, filtrar eventos o miembros).
- Movimiento lento, ligado al scroll: el objeto se desplaza o rota poco; los capítulos cambian. Sin rebote y sin pulso neón.

## Colors

Paleta contenida: neutrales fríos de vacío, blanco de instrumento, y un azul de señal tomado del botón del landing de CubeSats y de las celdas solares del hardware.

### Primary

- **Azul señal** (`signal`): el único color de acción. Rellena el botón primario y el tramo de “buscar” de la barra instrumento. También puede teñir una celda solar o un detalle del render si el objeto de verdad es azul. Hover un paso más oscuro (`signal-hover`). Texto sobre el botón: blanco (`on-signal`).

### Neutral

- **Vacío** (`void`): fondo de página. No es negro puro; tiene un sesgo azul mínimo para que el blanco no vibre.
- **Vacío elevado** (`void-raised`): paneles, tarjetas, pie de página cuando necesita separarse del fondo.
- **Tinta del limbo** (`limb-ink`): superficie de lectura larga (cuerpo de un artículo) un paso más clara que la tarjeta, para sostener párrafos sin volver la página blanca.
- **Filete** (`hairline`): bordes, divisores, el contorno del botón secundario. Una línea, nunca un bloque gris.
- **Blanco de cabina** (`text-primary`): titulares y texto de interfaz sobre el vacío.
- **Niebla** (`text-secondary`): párrafos, dek, metadatos de apoyo.
- **Ceniza** (`text-muted`): índices, “scroll para explorar”, pies de foto. No se usa para párrafos.
- **Luz de limbo** (`limb`): el blanco-azul de la atmósfera. Solo en cejas sobre fotografía o en un resplandor que ya existe dentro de la imagen. No rellena botones ni secciones.
- **Instrumento** (`instrument`): fondo de la barra de tarea densa. Tinta `instrument-ink`, apoyo `instrument-muted`, línea `instrument-line`.

Hanergy aporta el globo entre nubes como sujeto fotográfico de “impacto en la Tierra”. Su azul de día completo no entra a la paleta de UI.

### Named Rules

**La regla del vacío.** El fondo de toda la página es `void`. Un bloque de sección no se pinta de otro color para “separar”. La separación es espacio, filete, o un cambio de fotografía.

**La regla de una sola señal.** `signal` aparece en la acción primaria de esa vista, una vez. Enlaces, iconos decorativos y titulares se quedan en blanco de cabina. Si hay dos llamados, el segundo es botón de contorno.

**La regla de la luz del limbo.** El único glow permitido es el que ya trae la fotografía del horizonte. Las tarjetas no llevan sombra de color ni borde luminoso.

## Typography

**Display Font:** Schibsted Grotesk (con Helvetica Neue, Helvetica, Arial)
**Body Font:** Schibsted Grotesk (la misma familia)
**Label/Mono Font:** Schibsted Grotesk en versalitas simuladas (mayúsculas + tracking). No hay mono.

**Character:** Una sola grotesca contemporánea, cercana a la Helvetica de los landings de referencia. El titular del CubeSat marca el peso: medio, no fino de lujo y no negro condensado. Las mayúsculas con tracking ancho quedan reservadas a la etiqueta pequeña (capítulo, índice, “scroll para explorar”), como en el scrollytelling de Pexelflow. Las cifras grandes usan la misma familia con cifras tabulares.

### Hierarchy

- **Display** (500, `clamp(3.25rem, 6.4vw, 6rem)`, line-height 0.96, tracking −0.035em): el titular del primer viewport y de un capítulo a pantalla completa. Una o dos líneas. Sentence case, como “What are CubeSats”.
- **Display place** (500, `clamp(4.5rem, 14vw, 11rem)`, line-height 0.9, tracking −0.045em): una sola vez, para el nombre del lugar en el héroe.
- **Display quiet** (400, `clamp(2.75rem, 5.5vw, 5rem)`, line-height 1.02): la variante centrada y más quieta para un capítulo cinematográfico sobre la curva de la Tierra.
- **Headline** (500, `clamp(2rem, 3.6vw, 3.25rem)`, line-height 1.05): declaraciones de sección, el equivalente al statement de Orvion, en sentence case y a la izquierda.
- **Title** (500, 1.25rem, line-height 1.3): título de tarjeta, nombre de startup, nombre de evento.
- **Body** (400, 1.0625rem, line-height 1.65): párrafos. Medida máxima 65ch. Color `text-secondary` sobre vacío; `text-primary` solo si el párrafo es la única frase de la sección.
- **Label** (500, 0.75rem, tracking 0.14em, mayúsculas): navegación, ceja, índice 01–05, “scroll para explorar”, etiquetas de la barra instrumento.

### Named Rules

**La regla del titular quieto.** Un titular no lleva gradiente, contorno, ni relleno metálico. El wordmark cromado de Orvion es un logo dibujado, no un estilo de texto. Si el clúster tiene logo, el logo es el logo; los titulares siguen en Schibsted Grotesk.

**La regla de la etiqueta.** Las mayúsculas con tracking solo existen en `label`. Un titular en mayúsculas sostenidas deja de ser display y se vuelve cartel.

## Layout

El modelo espacial es un observatorio: margen amplio, objeto grande, texto en un bloque corto.

- Contenedor de lectura y de rejilla: 1200px, padding horizontal 24px en móvil y 40px desde 1024px. La fotografía, el objeto 3D y la barra instrumento rompen ese contenedor y llegan al borde del viewport.
- Primer viewport, composición por defecto: navegación flotando arriba; a la izquierda, ceja + display + dek de dos líneas + un botón; a la derecha, el objeto monumental sangrado por arriba y por la derecha. En un capítulo de mapa o de Tierra, el titular puede centrarse en el tercio superior y el globo ocupa el tercio inferior, con “scroll para explorar” al centro-bajo.
- Rejilla de contenido: 12 columnas. Texto de héroe en 5; objeto en 7. Bloques de cifras en 3 o 4 columnas iguales. Listados (startups, eventos, artículos) en 3 columnas desde 1024px, 1 columna bajo 640px.
- Ritmo vertical: 96px entre secciones en desktop, 64px en móvil. Más aire arriba de un titular que debajo. Una sección densa (cifras, listado) va seguida de una sección quieta (una frase, una foto a sangre).
- Riel de capítulos: fijo al borde derecho, centrado en vertical, solo desde 1024px. En móvil se vuelve una fila de puntos bajo la navegación o desaparece si la página es corta.
- Blog: columna única de 65ch sobre `limb-ink`, título display o headline, fotos a sangre dentro del artículo sin radio.
- Calendario: la manipulación (fecha, sede, tipo) vive en la barra instrumento; los resultados vuelven al vacío.

### Named Rules

**La regla del objeto sangrado.** En el primer viewport el sujeto fotográfico o 3D toca al menos dos bordes del frame. Centrar un render pequeño con margen parejo lo convierte en icono.

**La regla del capítulo.** Una página larga es una ruta. Cada bloque mayor tiene índice. El scroll cambia el capítulo; no apila la misma tarjeta doce veces.

## Elevation & Depth

La profundidad es fotográfica. Las superficies de UI son planas. Un panel se separa del vacío por un filete de 1px (`hairline`) y, si hace falta, por el paso tonal `void` → `void-raised` → `limb-ink`. No hay sombras proyectadas.

El objeto 3D o la foto es la capa de adelante. Puede cruzar por encima del titular solo si el texto sigue leyéndose; si no, el texto queda en su columna.

El vidrio existe en un solo caso: controles flotando sobre fotografía (píldora de menú, cápsula de “en reproducción”, punto del riel). Relleno `void` al 62% y desenfoque de 16px. Un grid de tarjetas de vidrio no entra en el sistema.

### Named Rules

**La regla del plano.** En reposo, botón, tarjeta e input no tienen sombra. El hover del botón primario oscurece el azul. El hover de una tarjeta aclara el filete a blanco al 40%. Nada se eleva con `translateY` ni con glow.

## Shapes

Las acciones son píldoras. Los contenedores son rectángulos de radio corto. La fotografía no se recorta con radio.

- Botón primario y secundario: píldora completa (`pill`).
- Tarjeta y panel: radio 8px (`panel`).
- Barra instrumento y sus campos: esquinas rectas (`sharp`). Es una pieza de equipo, no una pastilla.
- Medios (foto, video, globo, satélite): radio 0. Llegan al borde o quedan en un rectángulo seco.
- Riel: puntos de 6px; el activo de 8px con anillo de 1px.
- Iconos de línea, si aparecen, a 1.5px, en `text-secondary`. No sustituyen al objeto monumental.

### Named Rules

**La regla de la píldora única.** El radio completo es para acciones y para la cápsula de navegación sobre foto. Una tarjeta, una imagen o un input de formulario no heredan la píldora.

## Components

### Buttons

Carácter: una pastilla precisa. La primaria es el azul de señal; la secundaria es un contorno.

- **Shape:** píldora (`pill`).
- **Primary:** fondo `signal`, texto `on-signal`, label en mayúsculas con tracking de etiqueta pero en sentence case real — la etiqueta visible va en sentence case con tracking 0.02em y peso 500, 0.9375rem (la navegación y los índices sí usan el tracking ancho). Padding 14px 22px. El texto del botón no va en mayúsculas sostenidas: “Discover how it works”, “Agenda una visita”.
- **Hover / Focus:** el fondo pasa a `signal-hover` en 180ms. Focus visible: anillo de 2px `signal` con offset de 3px sobre el vacío. Sin escala ni salto.
- **Secondary:** fondo transparente, filete 1px al 40% de blanco, texto `text-primary`, mismo padding. Hover: filete al 70%. Es el “Contact us” y el “Learn more” de las referencias.
- **Sobre instrumento:** el tramo final de la barra es un bloque rectangular `signal` de altura completa, sin radio, label en mayúsculas de tracking ancho (“Buscar”). Es la única acción que no es píldora, porque pertenece al equipo, no al vacío.

### Chips

- **Style:** fondo transparente, filete `hairline`, texto `text-secondary`, radio `pill`, padding 6px 12px, tamaño label.
- **State:** el chip activo invierte a fondo `text-primary` y texto `void`. No usa el azul. El azul sigue siendo solo el botón.

### Cards / Containers

- **Corner Style:** radio 8px.
- **Background:** `void-raised`.
- **Shadow Strategy:** ninguna. Ver Elevation.
- **Border:** 1px `hairline`.
- **Internal Padding:** 24px.
- **Contenido:** ceja label, título, una línea de apoyo, y si hay cifra, la cifra en display quiet a color `text-primary`. La tarjeta de estadística de Orvion es el modelo: número enorme, etiqueta pequeña arriba, filete, sin icono.

### Inputs / Fields

- **En el vacío** (formulario de contacto, búsqueda suelta): fondo `void-raised`, filete `hairline`, texto `text-primary`, radio 8px, padding 14px 16px. Placeholder en `text-muted`.
- **En el instrumento:** fondo `instrument`, sin radio, altura 72px, label micro arriba en `instrument-muted`, valor en `instrument-ink`. Separador vertical `instrument-line` entre campos.
- **Focus:** el filete pasa a `text-primary` en el vacío, o a `signal` en el instrumento. Sin glow.
- **Error:** filete `#c4493a`, mensaje en ese mismo rojo a 0.875rem bajo el campo. El rojo no entra a la paleta de marca; solo existe como estado.
- **Disabled:** opacidad 0.4, sin cambio de color.

### Navigation

Barra superior sobre el vacío o sobre la foto, sin fondo propio mientras el héroe está detrás. A la izquierda el wordmark del clúster. Al centro, o repartidos hacia la derecha, links en `label` pero en sentence case con tracking 0.04em (más corto que el índice): Inicio, Misión, Startups, Agenda, Bitácora, Contacto. A la derecha, botón secundario de contorno (“Contacto”) o el botón primario si esa página tiene una sola acción.

Al hacer scroll más allá del héroe, la barra gana fondo `void` al 86% y un filete inferior `hairline`.

Activo: texto `text-primary`. Inactivo: `text-secondary`. Hover: `text-primary`. No hay subrayado ni píldora detrás del link.

Móvil: wordmark y un botón de menú de contorno. El menú abre un panel `void` a altura completa, links en headline, una acción primaria al fondo.

El cambio de idioma (`es` / `en`) es un par de labels, el activo en `text-primary`, sin botón.

### Riel de capítulos

Firma del sistema. Columna fija a 28px del borde derecho. Cada capítulo es un punto de 6px en `text-muted`; el activo es un punto de 8px en `text-primary` con anillo. Opcional: el número `01` en label a la izquierda del punto, visible solo en el activo. No se usa bajo 1024px de ancho.

### Barra instrumento

Firma de tarea. Franja `instrument` de 72px de alto, borde a borde, pegada al siguiente bloque o al fondo del héroe. Cuatro zonas con label + valor, y un cierre `signal` con la acción. En este producto sirve para filtrar la agenda o el directorio, no para simular una reserva de vuelo.

### Cifra

Número en display quiet o en un escalón menor (`clamp(2.5rem, 4vw, 4.5rem)`, peso 400), color `text-primary`, cifras tabulares. Debajo o arriba, la etiqueta en `label` color `text-muted`. Unidades y signos (`%`, `+`, `−`) en el mismo tamaño que el número.

## Do's and Don'ts

### Do:

- **Do** dejar que una fotografía real de hardware, de la Tierra o un render 3D del objeto ocupe el primer viewport y explique el tema sin un párrafo largo.
- **Do** usar `signal` una sola vez por vista, en la acción primaria.
- **Do** mantener el titular en Schibsted Grotesk peso 400 o 500, sentence case, tracking negativo.
- **Do** separar con filete de 1px y con aire (64–96px), no con cambios de color de fondo.
- **Do** tratar el scroll largo como capítulos, con riel a la derecha en desktop.
- **Do** pasar la tarea densa (filtros, fechas, búsqueda) a la barra instrumento blanca.
- **Do** escribir los botones en español mexicano, con un verbo concreto.

### Don't:

- **Don't** pintar secciones de azul cielo, gradientes nebulosa, ni el día completo de Hanergy como fondo de UI.
- **Don't** usar el magenta de SPACED. Esa referencia aporta el limbo, la barra instrumento y la píldora; su color es de una marca de viajes, no de este clúster.
- **Don't** poner retícula HUD, esquinas de mirilla, scanlines, hexágonos, estrellas repetidas en CSS, ni iconos de cohete como sistema de ilustración.
- **Don't** redondear las fotografías ni encerrar al satélite en una tarjeta.
- **Don't** usar vidrio más que en un control flotando sobre foto.
- **Don't** introducir una segunda familia tipográfica, ni mono “espacial”, ni un display con gradiente metálico.
- **Don't** sombrear tarjetas ni animar con rebote, pulso o glow.
- **Don't** centrar todas las secciones. El centro se reserva al capítulo cinematográfico sobre la Tierra.
