# Prompts de imagen

Ocho stills. En la página se usan como si ya fueran finales. Hasta que existan los archivos reales, el plan coloca un SVG numerado con el mismo nombre de slot.

Ninguna imagen lleva texto, cifras, logotipos ni marcas de agua. “Puebla”, las fechas y los nombres de los convocantes son HTML.

El Cohete Antorcha no tiene fotografía en el repositorio. `IMG-02` y `IMG-03` son una representación fotoreal del objeto ceremonial. Cuando llegue la foto del acto, reemplaza esos dos archivos y no regeneres el resto.

No pidas logotipos de UPAEP, INAOE, SECIHTI ni de ningún convocante. El Acuerdo Sexto del Manifiesto exige autorización escrita para usarlos.

## Cómo generarlos

1. Pega el **preámbulo** y, debajo, el prompt del slot.
2. Modelo: Gemini imagen o Nano Banana. Una imagen por slot. No pidas un collage.
3. Exporta al nombre de archivo indicado. Si el modelo entrega PNG, conviértelo a WebP de calidad alta y conserva el nombre.
4. Sustituye el SVG de `public/landing/` por el WebP y cambia la extensión en `src/modules/features/pages/src/config/frames.ts`.

## Preámbulo

Pégalo al inicio de cada prompt, sin cambiar una palabra. Es lo que mantiene la misma película.

```text
Photoreal cinematic still of the night side of Earth, shot as a science documentary plate, not as science fiction concept art. Large-format digital cinema camera. Cool restrained grade. The page background this image must disappear into is a blue-black void, exact hex #07080C, not pure black and not navy. The only light source in the whole frame is the atmospheric limb: a thin cyan-white rim of air, hex near #9EC9FF at its brightest, falling off into deep blue and then into #07080C. No second sun, no studio softbox, no purple nebula, no teal-and-orange blockbuster grade, no god rays made of graphics.

Real machined aerospace hardware only: brushed metal, black anodized aluminum, photovoltaic cells, fasteners, cabling. Not a cartoon, not a clay diorama, not low-poly, not isometric, not a toy, not an illustration, not a painting, not Unreal-engine gloss.

Absolutely no text, no letters, no numbers, no words, no captions, no logos, no watermarks, no flags, no NASA insignia, no SpaceX marks, no national emblems, no HUD, no reticles, no hex grids, no scanlines, no lens flares drawn as graphics, no readable instrument labels. No recognizable real people's faces. If a human figure is unavoidable, it is distant, back turned, and not identifiable. Empty rooms are better.

Sharp where the metal needs to be sharp. Crushed shadows that still keep the blue bias of #07080C. No border, no frame, no mockup of a website around the picture.
```

## Negativo

Si el modelo tiene campo negativo, pega esto. Si no lo tiene, añádelo al final del prompt como “Avoid:”.

```text
text, letters, typography, logo, watermark, caption, diagram labels, NASA, SpaceX, flag, face close-up, crowd, cartoon, anime, clay render, isometric diorama, low poly, HUD, hexagon grid, neon glow, purple galaxy, lens flare overlay, border, website mockup, satellite dish clipart, stock-photo smile
```

---

## IMG-01 — Fondo del héroe

- Archivo: `public/landing/img-01.webp`
- Relación: 16:9, también exporta un 9:16 con el mismo encuadre centrado en el limbo, como `public/landing/img-01-portrait.webp`
- En la página: fondo a sangre del cuadro 0. El limbo vive en el tercio inferior. El vacío de arriba es donde se escribe “Puebla”.
- Alt es: “Línea de la atmósfera terrestre vista de noche, desde órbita baja.”
- Alt en: “Earth’s atmospheric limb at night, seen from low orbit.”

```text
[PASTE PREAMBLE]

Wide 16:9 plate, 35mm lens, camera outside the atmosphere looking along the limb. The lower third of the frame is the curve of Earth at night: a thin bright atmospheric rim, then a narrow band of deep blue air, then the dark surface with only a faint suggestion of cloud and city light, no readable geography, no country borders, no labels. The upper two thirds are empty void #07080C, with a few real, tiny, optically sharp stars, irregularly placed, not a repeated starfield texture. No spacecraft. No Moon. The horizon line is calm and slightly below the vertical center, so a large word can sit in the black above it. Photographed, not illustrated. Leave the top half almost empty.
```

---

## IMG-02 — Cohete Antorcha, objeto del héroe

- Archivo: `public/landing/img-02.webp`
- Relación: 3:2 horizontal. El objeto ocupa la mitad derecha y se sale del borde derecho del encuadre.
- En la página: primer plano sobre `IMG-01`, alineado a la derecha, sangrado. Fondo del still debe ser el mismo `#07080C` para que se funda con el vacío. No hace falta transparencia si el negro coincide.
- Representación. No es una foto del objeto real.
- Alt es: “Representación fotográfica del Cohete Antorcha, objeto ceremonial sobre el vacío.”
- Alt en: “Photographic stand-in of the Antorcha rocket, a ceremonial object against the void.”

```text
[PASTE PREAMBLE]

3:2 landscape. A single ceremonial sounding-rocket model, roughly a meter and a half tall, photographed as a physical object in orbit-black, not a launch photo. White composite body, a narrow brushed-metal nose, one thin black band, small fins, no paint scheme from a real agency, no flag, no serial number, no letters anywhere on the airframe. It floats in the right half of the frame, angled about fifteen degrees, nose toward the upper right, and the tail is cut off by the right edge so the object bleeds out of frame. Left half of the image is empty void #07080C. Lighting comes only from a soft limb-like rim on the lower left of the metal, cyan-white #9EC9FF, with the rest of the body falling into blue-black shadow. Visible panel screws and a real composite weave. No stand, no hand, no smoke, no flame, no exhaust plume, no hangar, no Earth in this plate. The background must be a flat field of #07080C so it can be composited over another photograph.
```

---

## IMG-03 — Capítulo 01, el acto

- Archivo: `public/landing/img-03.webp`
- Relación: 16:9
- En la página: still del capítulo “El acto”.
- Representación del momento, sin retratos de las personas que estuvieron.
- Alt es: “Sala oscura con el Cohete Antorcha sobre una mesa, el día del acto.”
- Alt en: “A dark hall with the Antorcha rocket resting on a table, the day of the gathering.”

```text
[PASTE PREAMBLE]

16:9, 35mm, inside a darkened university auditorium in Puebla at night, photographed from the back of the room. Rows of empty seats fall into #07080C. At the front, a long black table. On the table stands the same ceremonial sounding rocket described as a white composite body, metal nose, no markings, no flags, about a meter and a half tall. A single practical light from the side rakes the rocket the way the atmospheric limb rakes a satellite, cyan-white and narrow. No people in focus. If a figure exists, it is a silhouette leaving the frame, unrecognizable. No banners, no projection screen with text, no university seal, no podium sign. The architecture is concrete and wood, contemporary, quiet. The top left of the frame stays dark enough for white type to be placed over it later.
```

---

## IMG-04 — Capítulo 02, el Manifiesto

- Archivo: `public/landing/img-04.webp`
- Relación: 16:9
- En la página: still del capítulo “El Manifiesto”.
- Alt es: “Mesa larga vacía en una sala oscura, preparada para una declaración conjunta.”
- Alt en: “A long empty table in a dark room, set for a joint declaration.”

```text
[PASTE PREAMBLE]

16:9, 50mm, a quiet institutional room at night. A long dark table seen from one end, running toward a tall window. On the table: closed unmarked folders, a glass carafe, a few pencils, no readable paper, no letterhead, no logos. Beyond the window, far away and out of focus, the same atmospheric blue rim, as if the night outside carried the limb light. The room itself is #07080C in the shadows. No people. No flags. No coats of arms. The left third of the frame is darker than the right, reserved for type. Photoreal, available light, no dramatic spotlight pool.
```

---

## IMG-05 — Capítulo 03, los cinco ejes

- Archivo: `public/landing/img-05.webp`
- Relación: 16:9
- En la página: still del capítulo de los cinco ejes. Los nombres de los ejes van en HTML, en la sección de paneles, no en la foto.
- Alt es: “Cinco objetos sobre una mesa negra: telescopio, pieza de taller, cubesat, banco óptico y globo terráqueo.”
- Alt en: “Five objects on a black table: a telescope, a machined part, a cubesat, an optical bench, and a globe.”

```text
[PASTE PREAMBLE]

16:9, 50mm, top three-quarter view of a matte black table in a dark lab. Five physical objects in a single row, evenly spaced, all in sharp focus, none labeled:

1. A small brass refractor telescope, no brand engraving.
2. A machined aluminum aerospace bracket, raw metal, no part number.
3. A real 10-centimeter cubesat frame with dark solar cells and no antenna flags, no mission patch.
4. An optical bench fragment: a lens in a simple mount and a steel rail.
5. A physical desktop globe, oceans dark, no readable country names, turned so any text is away from camera.

The table surface falls off into void #07080C at the edges. Limb-colored rim light from the left, #9EC9FF, catching metal edges only. No icons, no floating symbols, no infographic, no connecting lines, no numbers painted on the table. This is a photograph of objects, not a diagram.
```

---

## IMG-06 — Capítulo 04, la ruta

- Archivo: `public/landing/img-06.webp`
- Relación: 16:9
- En la página: still del capítulo de fechas. Las tres fechas son HTML.
- Alt es: “Mesa de firma vacía, con tres carpetas cerradas, en una sala a oscuras.”
- Alt en: “An empty signing table with three closed folders, in a darkened room.”

```text
[PASTE PREAMBLE]

16:9, 35mm, a signing table prepared and still empty. Three identical closed black folders in a row, no titles, no seals, no ribbons with text. A single pen parallel to the folders. Behind the table, a tall window onto night, and along the bottom of the window the faint cyan limb light, as if dawn were only a rim. Room shadows are #07080C. No people, no name cards, no screens, no clocks with readable faces. Solemn, photographic, not a stock handshake photo. Left side of frame darker, for type.
```

---

## IMG-07 — Capítulo 05, la adhesión

- Archivo: `public/landing/img-07.webp`
- Relación: 16:9
- En la página: último cuadro del vuelo, detrás de la invitación a sumarse.
- Alt es: “El valle de Puebla de noche, visto desde altitud, con la luz del amanecer en el horizonte.”
- Alt en: “The Puebla valley at night, seen from altitude, with dawn light on the horizon.”

```text
[PASTE PREAMBLE]

16:9, aerial photograph from high altitude at blue hour, looking across a highland valley that can read as Puebla: a basin of small city lights, dark volcanic silhouettes on the horizon, no readable street names, no map labels, no border lines. The sky occupies the top half and is already the void #07080C. On the horizon, a single thin band of cyan-white limb light #9EC9FF, the same light as the orbital plates, so this earthly view belongs to the same film. No airplane wing, no drone UI, no caption, no cathedral close-up used as a landmark logo. Quiet, specific, photographic. The upper left stays empty and dark.
```

---

## IMG-08 — Open Graph

- Archivo: `public/landing/img-08.webp`
- Relación: 1.91:1 (1200×630).
- En la página: no se ve en el scroll. Es `openGraph.images` de la home.
- Alt es: “Limbo de la Tierra y un cohete ceremonial, imagen para compartir el Año Espacial.”
- Alt en: “Earth’s limb and a ceremonial rocket, share image for the Space Year.”

```text
[PASTE PREAMBLE]

1.91:1 landscape, 1200 by 630 composition. Lower half: the atmospheric limb, same as the hero plate, Earth curve, cyan-white rim, void above. From the right edge, the nose and forward body of the same unmarked white ceremonial rocket enter the frame and are cut off by the edge. No text of any kind, because the page title will be added by the browser card, not by the picture. No logo. Leave the left-center empty. Same grade, same #07080C, same #9EC9FF rim. Photographic, not a poster design.
```

## Orden de generación

Genera primero `IMG-01` y `IMG-02`. Si el vacío no coincide entre los dos, regenera `IMG-02` con `IMG-01` como referencia de color, sin copiar su encuadre. Después `IMG-03` usando `IMG-02` como referencia del cohete, para que el objeto sea el mismo. El resto puede salir en paralelo, siempre con el mismo preámbulo.
