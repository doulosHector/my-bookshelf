import { useRef, useState } from "react";
import { Modal } from "../ui/Modal";
import { CsvColumnsTable } from "./CsvColumnsTable";
import { ImportPreview } from "./ImportPreview";
import { useTheme } from "../../hooks/useTheme";
import { downloadText, readTextFile } from "../../services/file";
import { CSV_TEMPLATE_FILE_NAME, csvTemplate, parseBooksCsv } from "../../utils/bookCsv";
import { withBom } from "../../utils/csv";
import { pluralize } from "../../utils/book";
import { CSV_MIME, IMPORT_MODES } from "../../constants/csv";

const MODE_OPTIONS = [
  {
    value: IMPORT_MODES.merge,
    label: "Agregar a mi librero",
    help: "Conserva lo que ya tienes. Las filas con un id conocido actualizan ese libro.",
  },
  {
    value: IMPORT_MODES.replace,
    label: "Reemplazar todo",
    help: "Borra los libros actuales y deja solo los del archivo.",
  },
];

/** Explains the CSV format and imports a picked file after previewing it. */
export function ImportCsvModal({ bookCount, onImport, onClose }) {
  const { t, styles } = useTheme();
  const fileInput = useRef(null);

  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState(IMPORT_MODES.merge);
  const [readError, setReadError] = useState("");

  const ready = result?.books.length ?? 0;

  const handlePick = async (event) => {
    const file = event.target.files?.[0];
    // Cleared so picking the same file again still fires a change event.
    event.target.value = "";
    if (!file) return;

    try {
      const text = await readTextFile(file);
      setReadError("");
      setFileName(file.name);
      setResult(parseBooksCsv(text));
    } catch {
      setResult(null);
      setFileName("");
      setReadError("No se pudo leer el archivo. Inténtalo de nuevo.");
    }
  };

  const downloadTemplate = () =>
    downloadText(CSV_TEMPLATE_FILE_NAME, withBom(csvTemplate()), CSV_MIME);

  const confirm = () => {
    if (ready === 0) return;
    onImport(result.books, mode);
    onClose();
  };

  return (
    <Modal label="Importar libros desde CSV" maxWidth={640} onClose={onClose}>
      <h2 className="serif" style={{ margin: "0 0 8px", fontSize: 24 }}>
        Importar CSV
      </h2>
      <p style={{ margin: "0 0 16px", color: t.muted, fontSize: 14, lineHeight: 1.5 }}>
        Sube un archivo <code>.csv</code> con una fila por libro. La primera fila debe traer los
        nombres de las columnas; solo <code>titulo</code> es obligatoria y el orden no importa.
        Puedes separar con coma o punto y coma.
      </p>

      <CsvColumnsTable />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "18px 0" }}>
        <button type="button" onClick={() => fileInput.current?.click()} style={styles.btnPrimary}>
          Elegir archivo
        </button>
        <button type="button" onClick={downloadTemplate} style={styles.btnGhost}>
          Descargar plantilla
        </button>
        <input
          ref={fileInput}
          type="file"
          accept=".csv,text/csv"
          onChange={handlePick}
          style={{ display: "none" }}
        />
      </div>

      {readError && <p style={{ color: t.danger, fontSize: 13 }}>{readError}</p>}

      {result && <ImportPreview fileName={fileName} result={result} />}

      {ready > 0 && (
        <fieldset style={{ border: "none", padding: 0, margin: "18px 0 0" }}>
          <legend style={{ ...styles.label, padding: 0 }}>Cómo importar</legend>
          <div style={{ display: "grid", gap: 10 }}>
            {MODE_OPTIONS.map((option) => (
              <label
                key={option.value}
                style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, cursor: "pointer" }}
              >
                <input
                  type="radio"
                  name="import-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                  style={{ marginTop: 3, accentColor: t.accent }}
                />
                <span>
                  {option.label}
                  <span style={{ display: "block", color: t.muted, fontSize: 13 }}>
                    {option.value === IMPORT_MODES.replace && bookCount > 0
                      ? `Borra ${pluralize(bookCount, "el libro", `los ${bookCount} libros`)} que tienes ahora y deja solo los del archivo.`
                      : option.help}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 22 }}>
        <button type="button" onClick={onClose} style={styles.btnGhost}>
          Cancelar
        </button>
        <button
          type="button"
          onClick={confirm}
          disabled={ready === 0}
          style={{
            ...styles.btnPrimary,
            opacity: ready === 0 ? 0.45 : 1,
            cursor: ready === 0 ? "not-allowed" : "pointer",
          }}
        >
          {ready === 0
            ? "Importar"
            : `Importar ${ready} ${pluralize(ready, "libro", "libros")}`}
        </button>
      </div>
    </Modal>
  );
}
