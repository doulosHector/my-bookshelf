/**
 * Saves a string as a file through a temporary object URL.
 * @param {string} filename
 * @param {string} text
 * @param {string} mime
 */
export function downloadText(filename, text, mime) {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Reads a picked File as text. */
export function readTextFile(file) {
  return file.text();
}
