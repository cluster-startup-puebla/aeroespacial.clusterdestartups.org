export interface ClusterEvent {
  slug: string;
  locale: string;
  title: string;
  description: string;
  /** Fecha de inicio en formato ISO (YYYY-MM-DD), se interpreta en UTC. */
  date: string;
  /** Fecha de fin opcional (YYYY-MM-DD), en UTC. */
  endDate?: string;
  location?: string;
  /** Hora local del cartel, HH:mm. Sin zona si el original no la trae. */
  startTime?: string;
  endTime?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Enlace externo de inscripción o detalle. */
  url?: string;
  category?: string;
  /** Ids de convocantes que trajeron el evento. El primero es el principal. */
  convocantes?: string[];
  /** Slug de la nota en el blog, sin locale. Si falta, el detalle no muestra el enlace. */
  result?: string;
  /** Cuerpo markdown, vacío si el archivo solo trae ficha. */
  contentHtml: string;
}
