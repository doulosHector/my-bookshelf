import { NEUTRAL_SPINE_COLOR, SPINE_COLORS } from "../constants/theme";

/**
 * Deterministic color for a genre, so the same genre always gets the same spine.
 * @param {string} [genre]
 * @returns {string} hex color
 */
export function spineColor(genre) {
  if (!genre) return NEUTRAL_SPINE_COLOR;
  let hash = 0;
  for (let i = 0; i < genre.length; i++) {
    hash = (hash * 31 + genre.charCodeAt(i)) % 997;
  }
  return SPINE_COLORS[hash % SPINE_COLORS.length];
}
