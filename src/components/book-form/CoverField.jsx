import { useTheme } from "../../hooks/useTheme";
import { useOpenLibrarySearch } from "../../hooks/useOpenLibrarySearch";
import { BookCover } from "../ui/BookCover";
import { SEARCH_ERRORS } from "../../constants/openLibrary";

const CURRENT = { width: 62, height: 93 };
const OPTION = { width: 44, height: 66 };

const ERROR_MESSAGES = {
  [SEARCH_ERRORS.blocked]: "La búsqueda de portadas no está disponible ahora.",
  [SEARCH_ERRORS.empty]: "Open Library no tiene portadas para este libro.",
};

/**
 * The cover of the book being edited, plus a way to go looking for one. The
 * candidates come from the same Open Library search, seeded with the title
 * already in the form, so a book saved before covers existed can get one
 * without being re-typed. The author is left out on purpose: it narrows the
 * search down to one or two editions, and here we want covers to choose from.
 */
export function CoverField({ form, onChange }) {
  const { t, styles } = useTheme();
  const { results, searching, error, search, reset } = useOpenLibrarySearch();

  const term = form.titulo.trim();
  // A result without a cover id has nothing to offer here.
  const options = results.filter((result) => result.portada);
  const searched = results.length > 0 || Boolean(error);

  const choose = (portada) => {
    onChange({ portada });
    reset();
  };

  return (
    <div>
      <label style={styles.label}>Portada</label>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <BookCover
          {...CURRENT}
          coverId={form.portada}
          title={form.titulo}
          genre={form.genero}
        />

        {/* `flex: 1` so the options row gets the dialog's free width, not just its own. */}
        <div style={{ flex: 1, display: "grid", gap: 8, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              style={styles.btnGhost}
              disabled={searching || !term}
              onClick={() => search(term)}
            >
              {searching ? "Buscando…" : "Buscar portada"}
            </button>

            {form.portada && (
              <button type="button" style={styles.btnGhost} onClick={() => choose("")}>
                Quitar
              </button>
            )}
          </div>

          <p style={{ margin: 0, fontSize: 12, color: t.muted }}>
            {!term
              ? "Escribe el título para poder buscar una portada."
              : error
                ? ERROR_MESSAGES[error]
                : searched && options.length === 0
                  ? "Los resultados no traen portada. Prueba con otro título."
                  : options.length > 0
                    ? "Toca la portada que corresponda."
                    : "Se busca por el título del libro."}
          </p>

          {options.length > 0 && (
            // Its own scroll area, so a handful of options never widens the dialog.
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {options.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  title={`${option.titulo} — ${option.autor || "autor desconocido"}`}
                  onClick={() => choose(option.portada)}
                  style={{
                    padding: 0,
                    border: `1px solid ${option.portada === form.portada ? t.accent : t.border}`,
                    borderRadius: 4,
                    background: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    lineHeight: 0,
                  }}
                >
                  <BookCover
                    {...OPTION}
                    coverId={option.portada}
                    title={option.titulo}
                    genre={option.genero}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
