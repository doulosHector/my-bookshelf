import { useMemo } from "react";
import { BookCard } from "./BookCard";
import { StatusFilter } from "./StatusFilter";
import { EmptyState } from "../ui/EmptyState";
import { ALL_FILTER } from "../../constants/books";

export function ShelfView({ books, filter, onFilterChange, onSelectBook }) {
  const filtered = useMemo(
    () => (filter === ALL_FILTER ? books : books.filter((b) => b.estatus === filter)),
    [books, filter],
  );

  const isEmptyShelf = books.length === 0;

  return (
    <>
      <StatusFilter value={filter} onChange={onFilterChange} />

      {filtered.length === 0 ? (
        <EmptyState
          icon="▮▮▮"
          title={isEmptyShelf ? "Tu librero está vacío" : "Nada con este filtro"}
          description={
            isEmptyShelf
              ? "Agrega tu primer libro para empezar el registro."
              : "Prueba otro estatus o agrega un libro nuevo."
          }
        />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} onSelect={onSelectBook} />
          ))}
        </div>
      )}
    </>
  );
}
