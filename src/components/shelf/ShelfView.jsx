import { BookCard } from "./BookCard";
import { ShelfFilters } from "./ShelfFilters";
import { EmptyState } from "../ui/EmptyState";
import { useTheme } from "../../hooks/useTheme";

export function ShelfView({ shelf, onSelectBook }) {
  const { styles } = useTheme();
  const { query, update, genres, visible, total } = shelf;

  const isEmptyShelf = total === 0;

  return (
    <>
      <section
        style={{ ...styles.card, padding: "14px 16px", marginBottom: 18, display: "grid", gap: 12 }}
        aria-label="Filtros"
      >
        <ShelfFilters genres={genres} query={query} onChange={update} />
      </section>

      {visible.length === 0 ? (
        <EmptyState
          icon="▮▮▮"
          title={isEmptyShelf ? "Tu librero está vacío" : "Nada con estos filtros"}
          description={
            isEmptyShelf
              ? "Agrega tu primer libro para empezar el registro."
              : "Prueba con otros filtros o agrega un libro nuevo."
          }
        />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {visible.map((book) => (
            <BookCard key={book.id} book={book} onSelect={onSelectBook} />
          ))}
        </div>
      )}
    </>
  );
}
