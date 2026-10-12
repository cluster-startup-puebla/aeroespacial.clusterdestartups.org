# Estructura

## Mapa del sitio

El producto sigue siendo tres superficies. Esta planeación construye solo la primera.

| Ruta | Papel | Este plan |
|---|---|---|
| `/es/` y `/en/` | Landing del Año Espacial | Sí |
| `/es/calendario/` y `/en/calendario/` | Agenda de actividades | Se enlaza. El clon de Luma es un plan aparte |
| `/es/blog/` y `/en/blog/[slug]/` | Bitácora | Se enlaza. El blog ya publica |

Locales `es` (default) y `en`, prefijo siempre presente. Toda frase visible entra en `messages/es/home.json` y `messages/en/home.json`.

## Tipo de página

Relato largo. Hay que explicar un acto, un documento y una fecha límite antes de pedir la adhesión. Un héroe con captura de producto no alcanza.

## Orden de la landing

El vuelo ocupa el primer tramo y va pineado. Al soltar el pin, la página vuelve a ser documento.

### 1. Vuelo — héroe y capítulos

Un solo escenario a pantalla completa. El scroll no corta: cruza de un still al siguiente. El héroe es el cuadro 0 de ese vuelo, no una sección aparte.

**Cuadro 0, el que se ve al llegar.** Composición tomada de Xona y de la interfaz de vuelo a Hong Kong.

- Fondo a sangre: `IMG-01`, limbo de la Tierra en el tercio inferior, vacío arriba.
- Objeto en primer plano, sangrado por la derecha: `IMG-02`, el Cohete Antorcha.
- Ceja, arriba del nombre: `Año Espacial 2026–2027`.
- Nombre de lugar, enorme, en HTML, no dentro de la foto: `Puebla`.
- Una línea: cierre de la Semana Mundial del Espacio, inicio del año, entrega del Cohete Antorcha. 10 de octubre de 2026, UPAEP.
- Un botón: `Sumarme al Pacto`. Baja a `#adhesion`.
- Sobre el limbo, una fila en blanco: los doce convocantes. Wordmarks, no logotipos generados.
- Abajo, al centro: `Desliza para entrar`.
- Riel a la derecha, de `00` a `05`, visible desde 1024 px.

**Cuadros 1 a 5.** Cada uno tiene still, ceja, titular y dos líneas. El copy va en HTML, a la izquierda. La foto no lleva letras.

| Índice | Still | Capítulo |
|---|---|---|
| 01 | `IMG-03` | El acto. 10 de octubre, UPAEP, entrega del Cohete Antorcha |
| 02 | `IMG-04` | El Manifiesto. Una alianza que abre el camino y no lo cierra |
| 03 | `IMG-05` | Cinco ejes. Divulgación, industria, emprendimiento, talento, vinculación |
| 04 | `IMG-06` | La ruta. 10 de octubre, 13 de noviembre, 30 de noviembre |
| 05 | `IMG-07` | La adhesión. Puebla desde altitud, y la invitación a sumarse |

`IMG-08` no se ve en el scroll. Es la imagen de Open Graph.

### 2. Frase

Sección propia, después del vuelo, no pegada al héroe.

Dos líneas, en la voz del Manifiesto:

> Puebla entra a la cadena de valor aeroespacial.
> Ninguna institución lo logra sola.

Cada palabra pasa de ceniza a blanco de cabina cuando cruza el centro de la ventana, en orden de lectura.

### 3. Cinco ejes

Cinco paneles de filete, en el orden del Acuerdo Tercero. Sin iconos que reemplacen la fotografía. El still `IMG-05` ya mostró los objetos; aquí está el texto.

1. Divulgación científica. Acercar la ciencia y la tecnología espaciales a la sociedad y despertar vocaciones.
2. Reconfiguración de la industria en Puebla. Incorporar a la industria poblana a la cadena de valor aeroespacial.
3. Impulso al emprendimiento tecnológico en Space Tech. Convertir proyectos en startups con modelo de negocio.
4. Acercamiento del sector educativo a la iniciativa privada. Alinear talento y capacidades con la demanda de la industria.
5. Vinculación nacional e internacional. Conectar al ecosistema poblano con el sector del país y del mundo.

### 4. Ruta

Tres fechas en una línea de filete, no en una barra de reserva:

- 10 de octubre de 2026. Manifiesto y apertura.
- 13 de noviembre de 2026. Cierre de adhesiones para la firma.
- 30 de noviembre de 2026. Firma del Pacto y Comité Coordinador.

### 5. Agenda

Hasta tres eventos futuros, con el componente que ya existe (`UpcomingEvents` y `listUpcomingEvents`). Enlace de texto a `/calendario`. Esta sección es la prueba de que el año tiene actividades. No se rediseña el calendario aquí.

### 6. Bitácora

Hasta tres notas, con `LatestPosts` y `listPosts`. Enlace de texto a `/blog`.

### 7. Adhesión `#adhesion`

Repite el botón `Sumarme al Pacto`. El bloque explica, con frases del Manifiesto:

- La adhesión es por escrito al Clúster de Startups e Innovación.
- Se indica representante y aportación.
- No hace falta experiencia aeroespacial previa.
- El límite para quedar en la firma es el 13 de noviembre de 2026.
- El Manifiesto no obliga a aportar recursos.

El destino (correo o formulario) queda en `src/modules/cores/site/src/config/site.ts` como `ADHESION_HREF`. Hoy vale `#adhesion` hasta que exista el correo real. El botón no abre un `mailto:` inventado.

### 8. Preguntas

Seis preguntas, texto plano, para el roce de “¿esto me obliga?”. También alimentan el FAQ schema de la home.

1. ¿El Manifiesto me obliga a poner dinero?
2. ¿Necesito experiencia aeroespacial para sumarme?
3. ¿Hasta cuándo puedo adherirme?
4. ¿Quién convoca?
5. ¿Qué pasa el 30 de noviembre?
6. ¿Dónde veo las actividades del año?

### 9. Cierre

El mismo botón primario. Nada de un segundo offer.

## Qué no entra en esta página

- Ficha de evento, RSVP, mapa, anfitriones, precio. Eso es el plan del calendario.
- Rediseño del artículo de blog.
- Logotipos oficiales dibujados o inventados.
- Una segunda acción azul arriba del pliegue (calendario y blog no compiten con el Pacto en el héroe).
- Texto dentro de las fotografías. Fechas, “Puebla” y nombres de marca viven en HTML.

## Archivos que la landing va a tocar

La página en `src/app/[locale]/page.tsx` solo compone. Las secciones nuevas viven en `src/modules/features/pages/src/sections/home/`. Los slots de imagen viven en `public/landing/` y su índice en `src/modules/features/pages/src/config/frames.ts`. El detalle de cada archivo está en [plan-landing.md](plan-landing.md).
