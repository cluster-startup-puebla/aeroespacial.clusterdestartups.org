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
  /** Enlace externo de inscripción o detalle. */
  url?: string;
  category?: string;
}
