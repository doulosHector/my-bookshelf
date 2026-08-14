/**
 * Thin localStorage wrapper. Every call is guarded because storage can be
 * unavailable (private mode, disabled cookies) and must never break the app.
 */

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("No se pudo guardar", error);
    return false;
  }
}
