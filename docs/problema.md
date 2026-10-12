# Problema

## Qué ocurrió

El 10 de octubre de 2026, en la UPAEP, se cerró en Puebla la Semana Mundial del Espacio 2026 y se dio inicio al Año Espacial 2026–2027. En ese acto se entregó el Cohete Antorcha y se emitió el Manifiesto de colaboración rumbo al Pacto por el Desarrollo del Sector Aeroespacial en Puebla (versión 0.3).

Fuente: `Manifiesto Colaboracion Rumbo al Pacto`, entregado para esta planeación. No hay en el repositorio una fotografía del acto ni del cohete. Los stills de ese objeto se tratan como representación hasta que exista la foto real. Ver [prompts-imagenes.md](prompts-imagenes.md).

## Qué es el Manifiesto

Es una declaración conjunta de voluntad, pública y no vinculante. No genera obligaciones jurídicas, económicas ni presupuestales. La firman doce convocantes y su función es abrir el camino: invitar a más instituciones, empresas y comunidades a redactar y suscribir el Pacto.

Convocantes, en el orden del documento:

1. UPAEP
2. SECIHTI Puebla
3. Clúster de Startups e Innovación, A.C. (CSI)
4. INAOE
5. Coordinación Nacional de la Semana Mundial del Espacio México
6. SEDETRA
7. Capital de la Tecnología y la Sostenibilidad (CTS)
8. Clúster Automotriz Zona Centro
9. CANACINTRA Puebla
10. Sintonía
11. Yankuilotl
12. REGENIA

El Acuerdo Sexto prohíbe usar el nombre o el logotipo de otro convocante sin autorización previa y por escrito. La landing reserva el lugar de cada marca. Hasta recibir el SVG autorizado, cada lugar se dibuja como wordmark en blanco con la tipografía del sistema. No se generan logotipos institucionales con un modelo de imagen.

## La ruta que la página tiene que volver legible

| Fecha | Hecho |
|---|---|
| 10 de octubre de 2026 | Emisión del Manifiesto, cierre de la Semana Mundial del Espacio, inicio del Año Espacial, entrega del Cohete Antorcha |
| 10 de octubre al 13 de noviembre de 2026 | Invitaciones, adhesiones y comentarios al proyecto de Pacto |
| 13 de noviembre de 2026 | Límite para quedar incluido en la firma |
| 30 de noviembre de 2026 | Firma del Pacto e instalación del Comité Coordinador |

La adhesión es por escrito al Clúster de Startups e Innovación, con representante y aportación. No se exige experiencia aeroespacial previa. El correo o el formulario de recepción no vienen en el Manifiesto: la landing explica el trámite y deja el destino de contacto como dato pendiente, sin inventar una dirección.

## A quién le habla la landing

A una institución, empresa, cámara o comunidad de Puebla que puede sumarse al Pacto antes del 13 de noviembre de 2026. Llega sabiendo poco: que hubo un acto, que existe un año espacial, y que alguien le pide voluntad, no un presupuesto.

## La única acción

**Sumarme al Pacto.** Lleva a la sección de adhesión de la misma página. El botón azul aparece en el héroe y se repite al cierre. Agenda y bitácora se enlazan más abajo, como lectura, sin un segundo botón azul arriba del pliegue.

## Qué ya resuelve el código

Explorado en [Mapear sitio aeroespacial](23bf8d5e-9565-4808-9c78-b5ddc338e673) y [Buscar patrón Luma](8c4da00c-08a4-4f8c-9cc0-fe3073d7e3df).

| Superficie | Estado hoy |
|---|---|
| `/[locale]/` | Cuatro bloques de texto: héroe, tres notas, tres eventos, un cierre. Sin fotografía ni movimiento |
| `/[locale]/blog` y `/blog/[slug]` | Blog en markdown, listo para seguir usándose |
| `/[locale]/calendario` | Mes en cuadrícula más lista de próximos. No es un clon de Luma: no hay ficha, RSVP, hora, portada ni filtros |

El calendario tipo Luma y el rediseño del blog quedan fuera de este plan. La landing solo los presenta y enlaza.

## Qué tiene que lograr la landing

En el primer viewport, sin leer un párrafo largo, se entiende esto:

1. Esto es Puebla.
2. Estamos en el Año Espacial 2026–2027.
3. Doce convocantes abren el Manifiesto.
4. Hay una sola manera de entrar: sumarse al Pacto.

El scroll después de eso es el relato: el acto, el Manifiesto, los cinco ejes, la ruta de fechas, y la adhesión. La agenda y la bitácora demuestran que el año ya tiene actividad, con los datos que el repositorio ya publica.
