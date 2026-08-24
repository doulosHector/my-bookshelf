import { useState } from "react";
import { Modal } from "../ui/Modal";
import { BookFormFields } from "./BookFormFields";
import { BookFormActions } from "./BookFormActions";
import { OpenLibrarySearch } from "./OpenLibrarySearch";
import { CoverField } from "./CoverField";
import { EMPTY_BOOK } from "../../constants/books";

/**
 * Create/edit dialog. `book` holds the initial values; a book without id is new.
 */
export function BookFormModal({ book, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(() => ({ ...EMPTY_BOOK, ...book }));
  const isEditing = Boolean(form.id);
  const canSave = Boolean(form.titulo.trim());

  const updateForm = (fields) => setForm((current) => ({ ...current, ...fields }));

  const handleSave = () => {
    if (!canSave) return;
    onSave(form);
  };

  return (
    <Modal label={isEditing ? "Editar libro" : "Agregar libro"} onClose={onClose}>
      <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 24 }}>
        {isEditing ? "Editar libro" : "Nuevo libro"}
      </h2>

      {!isEditing && <OpenLibrarySearch onPick={updateForm} />}

      <form onSubmit={(event) => event.preventDefault()}>
        <div style={{ display: "grid", gap: 14 }}>
          <CoverField form={form} onChange={updateForm} />
          <BookFormFields form={form} onChange={updateForm} />
        </div>
        <BookFormActions
          isEditing={isEditing}
          canSave={canSave}
          onSave={handleSave}
          onCancel={onClose}
          onDelete={() => onDelete(form.id)}
        />
      </form>
    </Modal>
  );
}
