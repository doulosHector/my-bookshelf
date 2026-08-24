import { useTheme } from "../../hooks/useTheme";
import { useOpenLibrarySearch } from "../../hooks/useOpenLibrarySearch";
import { resultToBookFields } from "../../services/openLibrary";
import { SEARCH_ERRORS } from "../../constants/openLibrary";
import { Badge } from "../ui/Badge";
import { BookCover } from "../ui/BookCover";

const ERROR_MESSAGES = {
  [SEARCH_ERRORS.blocked]:
    "La búsqueda en línea no está disponible en este entorno. Registra los datos a mano abajo.",
  [SEARCH_ERRORS.empty]:
    "Sin resultados. Intenta con otro término o llena los campos a mano.",
};

// Portrait, the usual proportion of a book cover.
const COVER = { width: 34, height: 51 };

/** Optional Open Library lookup that prefills the new-book form. */
export function OpenLibrarySearch({ onPick }) {
  const { t, styles } = useTheme();
  const { query, setQuery, results, searching, error, search, reset } = useOpenLibrarySearch();

  const pick = (result) => {
    const fields = resultToBookFields(result);
    // Keep whatever the user already typed when the result has no value for it.
    onPick(Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== "")));
    reset();
  };

  return (
    <div
      style={{
        marginBottom: 18,
        padding: 14,
        background: t.bg,
        borderRadius: 8,
        border: `1px dashed ${t.border}`,
      }}
    >
      <div style={styles.label}>Buscar en Open Library (opcional)</div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ ...styles.input, background: t.surface }}
          placeholder="Título o autor…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && search()}
        />
        <button
          type="button"
          onClick={() => search()}
          disabled={searching}
          style={{ ...styles.btnGhost, whiteSpace: "nowrap" }}
        >
          {searching ? "Buscando…" : "Buscar"}
        </button>
      </div>

      {error && (
        <p style={{ fontSize: 13, color: t.muted, margin: "8px 0 0" }}>{ERROR_MESSAGES[error]}</p>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 6 }}>
          {results.map((result) => (
            <button
              key={result.key}
              type="button"
              onClick={() => pick(result)}
              style={{
                ...styles.btnGhost,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                textAlign: "left",
                background: t.surface,
                color: t.ink,
              }}
            >
              <BookCover
                {...COVER}
                coverId={result.portada}
                title={result.titulo}
                genre={result.genero}
              />

              <span style={{ minWidth: 0 }}>
                <strong style={{ overflowWrap: "break-word" }}>{result.titulo}</strong>
                <span
                  style={{
                    display: "block",
                    marginTop: 2,
                    color: t.muted,
                    overflowWrap: "break-word",
                  }}
                >
                  {result.autor || "¿?"}
                  {result.anio ? `, ${result.anio}` : ""}
                  {result.spanish && (
                    <>
                      {" "}
                      <Badge text="español" color={t.muted} />
                    </>
                  )}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
