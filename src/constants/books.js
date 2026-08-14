export const STATUSES = ["Leyendo", "Leído", "Pendiente", "Abandonado"];

export const ALL_FILTER = "Todos";

// Accent color of the status badge, per theme.
export const STATUS_STYLE = {
  Leyendo: { light: "#1E4E5F", dark: "#7FADBD" },
  "Leído": { light: "#4F5B3C", dark: "#A3B183" },
  Pendiente: { light: "#6E7378", dark: "#8B9096" },
  Abandonado: { light: "#7A3B32", dark: "#C98D82" },
};

export const DANGER_COLOR = "#7A3B32";

export const GENRES = [
  "Ficción",
  "No ficción",
  "Fantasía",
  "Ciencia ficción",
  "Misterio",
  "Romance",
  "Historia",
  "Biografía",
  "Poesía",
  "Ensayo",
  "Terror",
  "Autoayuda",
];

export const EMPTY_BOOK = {
  id: null,
  titulo: "",
  autor: "",
  genero: "",
  estatus: "Pendiente",
  fechaFin: "",
  vecesLeido: 0,
  calificacion: 0,
  resena: "",
  anio: "",
};

export const MAX_REVIEW_PREVIEW = 180;
