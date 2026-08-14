import { useTheme } from "../../hooks/useTheme";
import { CSV_COLUMNS } from "../../constants/csv";

/** Documents the columns the importer understands, straight from CSV_COLUMNS. */
export function CsvColumnsTable() {
  const { t } = useTheme();

  const cell = {
    padding: "8px 10px",
    borderTop: `1px solid ${t.border}`,
    verticalAlign: "top",
    textAlign: "left",
  };

  // Its own scroll area, so the whole dialog still fits on one screen.
  const head = {
    ...cell,
    borderTop: "none",
    position: "sticky",
    top: 0,
    background: t.surface,
    color: t.muted,
    fontSize: 11,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
  };

  return (
    <div
      style={{
        overflow: "auto",
        maxHeight: 300,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={head}>Columna</th>
            <th style={head}>Qué debe contener</th>
          </tr>
        </thead>
        <tbody>
          {CSV_COLUMNS.map((column) => (
            <tr key={column.key}>
              <td style={{ ...cell, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: 13, fontWeight: 600 }}>{column.key}</code>
                <div style={{ color: column.required ? t.accent : t.muted, fontSize: 11, marginTop: 2 }}>
                  {column.required ? "obligatoria" : "opcional"}
                </div>
              </td>
              <td style={cell}>
                <div>{column.description}</div>
                {column.example && (
                  <div style={{ color: t.muted, marginTop: 2 }}>Ej.: {column.example}</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
