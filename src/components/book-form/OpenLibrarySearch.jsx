import { useTheme } from "../../hooks/useTheme";
import { useOpenLibrarySearch } from "../../hooks/useOpenLibrarySearch";
import { docToBookFields } from "../../services/openLibrary";
import { SEARCH_ERRORS } from "../../constants/openLibrary";

const ERROR_MESSAGES = {
  [SEARCH_ERRORS.blocked]:
    "La búsqueda en línea no está disponible en este entorno. Registra los datos a mano abajo.",
  [SEARCH_ERRORS.empty]:
    "Sin resultados. Intenta con otro término o llena los campos a mano.",
};

/** Optional Open Library lookup that prefills the new-book form. */
export function OpenLibrarySearch({ onPick }) {
  const { t, styles } = useTheme();
  const { query, setQuery, results, searching, error, search, reset } = useOpenLibrarySearch();

  const pick = (doc) => {
    const fields = docToBookFields(doc);
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
          onClick={search}
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
        <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
          {results.map((doc, index) => (
            <button
              key={`${doc.title}-${index}`}
              type="button"
              onClick={() => pick(doc)}
              style={{ ...styles.btnGhost, textAlign: "left", background: t.surface, color: t.ink }}
            >
              <strong>{doc.title}</strong>
              <span style={{ color: t.muted }}>
                {" — "}
                {(doc.author_name && doc.author_name[0]) || "¿?"}
                {doc.first_publish_year ? `, ${doc.first_publish_year}` : ""}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
