import { BookCard } from "./BookCard";
import { ShelfFilters } from "./ShelfFilters";
import { ShelfSearch } from "./ShelfSearch";
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
        <ShelfSearch value={query.search} onChange={(search) => update({ search })} />
      </section>

      {visible.length === 0 ? (
        <EmptyState
          icon="▮▮▮"
          title={isEmptyShelf ? "Tu librero está vacío" : "Sin resultados"}
          description={
            isEmptyShelf
              ? "Agrega tu primer libro para empezar el registro."
              : "Prueba con otros filtros o busca otro título."
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
