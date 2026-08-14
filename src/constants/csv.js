import { STATUSES } from "./books";

/**
 * The CSV contract: column order of an export, and what the import dialog
 * documents. `aliases` are extra headers accepted on import, so a file written
 * by hand (or by a spreadsheet in Spanish) still lines up.
 */
export const CSV_COLUMNS = [
  {
    key: "titulo",
    required: true,
    aliases: ["título", "title", "libro"],
    description: "Nombre del libro.",
    example: "Cien años de soledad",
  },
  {
    key: "autor",
    aliases: ["author", "escritor"],
    description: "Quién lo escribió.",
    example: "Gabriel García Márquez",
  },
  {
    key: "anio",
    aliases: ["año", "ano", "year", "año de publicación"],
    description: "Año de publicación. Texto libre.",
    example: "1967",
  },
  {
    key: "genero",
    aliases: ["género", "genre"],
    description: "Género principal. Cualquier texto.",
    example: "Ficción",
  },
  {
    key: "estatus",
    aliases: ["estado", "status"],
    description: `Uno de: ${STATUSES.join(", ")}. Si lo dejas vacío queda como Pendiente.`,
    example: "Leído",
  },
  {
    key: "fechaFin",
    aliases: ["fecha fin", "fecha_fin", "fecha de fin", "fecha de fin de lectura", "fechafin"],
    description: "Cuándo terminaste de leerlo, en formato AAAA-MM-DD.",
    example: "2026-03-14",
  },
  {
    key: "vecesLeido",
    aliases: ["veces leído", "veces leido", "veces_leido", "vecesleido", "relecturas"],
    description: "Cuántas veces lo has leído. Número entero, 0 o más.",
    example: "2",
  },
  {
    key: "calificacion",
    aliases: ["calificación", "rating", "estrellas"],
    description: "Estrellas, número entero de 0 a 5.",
    example: "5",
  },
  {
    key: "resena",
    aliases: ["reseña", "review", "comentario", "notas"],
    description: "Tu reseña. Si lleva comas o saltos de línea, ponla entre comillas.",
    example: "Un clásico que releo cada pocos años.",
  },
  {
    key: "id",
    aliases: ["identificador"],
    description:
      "Se genera solo. Si conservas el de una exportación, esa fila actualiza el libro en vez de duplicarlo.",
    example: "",
  },
  {
    key: "agregado",
    aliases: ["fecha de alta", "creado"],
    description: "Fecha en que se agregó al librero (ISO). Se genera sola.",
    example: "",
  },
];

export const CSV_REQUIRED_KEY = "titulo";

export const CSV_MIME = "text/csv;charset=utf-8";

export const CSV_FILE_PREFIX = "mi-librero";

/** How an imported file is merged into the current shelf. */
export const IMPORT_MODES = { merge: "merge", replace: "replace" };

/** Rows with problems listed one by one in the dialog before collapsing them. */
export const MAX_LISTED_ERRORS = 6;
