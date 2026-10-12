# Skills instaladas y qué se usa

Instaladas en el proyecto, fuera de git (`.cursor/` está en `.gitignore`):

- `.cursor/skills/scroll-world/` — clon de https://github.com/oso95/scroll-world
- `.cursor/skills/landing-page-design/SKILL.md` — skill `landing-page-design` de https://github.com/elayadesign/ai-design-skills

Sirven para decidir la landing. No se ejecuta su pipeline de video ni se genera imagen en este paso.

## scroll-world

La skill construye un vuelo continuo: el scroll mueve el tiempo de una cámara prerenderizada, escena por escena, sin cortes. Pide stills, clips de inmersión y conectores con Higgsfield o Monid, y un motor en `references/scrub-engine.js`.

Eso choca con dos cosas de este encargo. El arte por defecto es un diorama de arcilla isométrico, y `DESIGN.md` pide fotografía del limbo y hardware real. Además ahora no hay video: las imágenes se numeran y se piden a Gemini o Nano Banana.

### Se toma

- **Arquitectura A, walkthrough.** Una llegada hacia adelante. La arquitectura B (alejarse y saltar de isla en isla) se siente a rewind en foto real. La skill lo dice explícito: B es para miniatura; A es para lo fotoreal.
- **El viaje por capítulos.** Cada tramo tiene ceja, titular, una línea y un still. El último tramo sostiene la acción.
- **Linger.** El cuadro 0 (Puebla) ocupa más scroll que un capítulo de tránsito, para que el nombre y los convocantes se lean antes de cruzar.
- **Riel de ruta.** El motor trae un índice lateral. Aquí se dibuja como el riel `00–05` de `DESIGN.md`.
- **El still es el póster.** Si no hay video, o si la persona pidió menos movimiento, se ve la foto. No hay pantalla negra.
- **La costura.** Cuando más adelante existan clips, el frame final de uno tiene que ser el frame inicial del siguiente. Esta fase no genera esos clips. Los stills se cruzan con opacidad, que es la versión honesta de esa costura sin video.

### Se deja fuera de este plan

- Diorama, clay, papercraft, tilt-shift, isométrico.
- Monid, Higgsfield, Seedance, Kling, y el gasto por clip. Una cadena de seis escenas en 1080p ronda los 27 USD y además exige cuentas que aquí no están.
- `scrub-engine.js` tal cual. Inyecta su propio DOM y su propia CSS, con copy en inglés dentro del config. La landing vive en Next.js, con next-intl y con los tokens de `globals.css`. El plan escribe un escenario propio que obedece la misma idea de progreso.
- Versión móvil 9:16 renderizada aparte. El teléfono recibe los mismos stills, con `object-position` que conserva el limbo y el objeto. Una segunda cadena de video queda para una fase posterior, si se aprueba el gasto.

### Fase posterior, no tarea de este plan

Si más adelante se quiere la cámara de verdad, el camino es el de la skill: arquitectura A, un solo modelo, stills de esta lista como `--start-image`, y revisión de costuras. No se mezcla con el diorama.

## landing-page-design

La skill obliga a una oferta, una audiencia y una acción. También trae un sistema visual propio (Geist, degradado en el titular, píldora de vidrio, radios de Tailwind). Cuando esa parte choca con `DESIGN.md` o con el encargo, gana el encargo.

### Se toma de la parte A

- Una acción: sumarse al Pacto. Conversión = llegar a `#adhesion` y entender el trámite.
- Audiencia: quien puede adherir a su institución antes del 13 de noviembre de 2026.
- Prueba junto a la afirmación: los doce convocantes están en el primer viewport, no al final.
- Relato largo, no héroe de captura.
- Orden de construcción: héroe, ejes, ruta, prueba (agenda y bitácora), preguntas, cierre. El plan respeta ese orden.
- Preguntas en texto plano, seis, para el roce de la adhesión. La home sí se indexa: el Año Espacial y el Pacto son búsqueda real, no una campaña de ads efímera.
- Copy concreto. Fechas, UPAEP, doce convocantes, “por escrito”. Sin “impulsa”, “revoluciona” ni “el futuro del espacio”.
- Sin CTA competidora arriba del pliegue. Calendario y blog esperan a su sección.
- La frase de dos líneas, separada del héroe, con palabras que se encienden en orden de lectura.

### Se deja fuera de la parte B

| Regla de la skill | Por qué no |
|---|---|
| Geist, Manrope, Poppins, y la prohibición de Helvetica | `DESIGN.md` fija Schibsted Grotesk, con Helvetica Neue como respaldo |
| Degradado blanco a gris en el titular | `DESIGN.md` prohíbe el titular con degradado. “Puebla” es blanco de cabina |
| Fondos solo `#000` y `#181818` | El vacío es `#07080c` |
| Píldora de vidrio como navegación | La nav del sistema es barra transparente sobre la foto |
| “Nunca uses gradientes de fondo” | No se pintan gradientes CSS. El limbo es fotografía |
| Phosphor o Solar como sistema de iconos | El sitio ya usa Lucide para menú y cerrar. La landing no suma una librería. Los ejes no llevan icono |
| Hover con escala | El botón solo oscurece el azul |
| `text-9xl` de Tailwind como techo | “Puebla” usa el escalón `--text-place` definido en [lectura-design.md](lectura-design.md) |

La curva de la skill (`cubic-bezier(0.32, 0.72, 0, 1)`) no se usa. La llegada es la de `DESIGN.md`: `cubic-bezier(0.22, 1, 0.36, 1)`.

## Cómo se combinan

El relato y la disciplina de una sola acción vienen de landing-page-design. El vuelo por stills, el linger del primer cuadro y el riel vienen de scroll-world, en arquitectura A y sin video. El color, el tipo, el filete y la prohibición de teatro sci-fi vienen de `DESIGN.md`.
