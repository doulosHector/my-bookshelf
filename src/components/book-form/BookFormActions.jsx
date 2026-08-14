import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { STATUS_STYLE } from "../../constants/books";

/** Footer of the book form: delete (with confirmation), cancel and save. */
export function BookFormActions({ isEditing, canSave, onDelete, onCancel, onSave }) {
  const { theme, t, styles } = useTheme();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 10,
        marginTop: 22,
        flexWrap: "wrap",
      }}
    >
      {isEditing ? (
        confirmingDelete ? (
          <button
            type="button"
            onClick={onDelete}
            style={{ ...styles.btnGhost, color: t.danger, borderColor: t.danger }}
          >
            Confirmar eliminación
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            style={{ ...styles.btnGhost, color: STATUS_STYLE.Abandonado[theme] }}
          >
            Eliminar
          </button>
        )
      ) : (
        <span />
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button type="button" onClick={onCancel} style={styles.btnGhost}>
          Cancelar
        </button>
        <button
          type="submit"
          onClick={onSave}
          disabled={!canSave}
          style={{ ...styles.btnPrimary, opacity: canSave ? 1 : 0.5 }}
        >
          {isEditing ? "Guardar cambios" : "Agregar al librero"}
        </button>
      </div>
    </div>
  );
}
