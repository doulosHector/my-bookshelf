import { BookCard } from "./BookCard";
import { ShelfClear } from "./ShelfClear";
import { ShelfFilters } from "./ShelfFilters";
import { ShelfSearch } from "./ShelfSearch";
import { ShelfSort } from "./ShelfSort";
import { EmptyState } from "../ui/EmptyState";

export function ShelfView({ shelf, onSelectBook }) {
  const { query, update, toggleSort, reset, genres, visible, activeFilters, isFiltered, total } =
    shelf;

  const isEmptyShelf = total === 0;

  return (
    <>
      <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
        <ShelfFilters
          genres={genres}
          query={query}
          activeFilters={activeFilters}
          onChange={update}
        />

        <ShelfSearch value={query.search} onChange={(search) => update({ search })} />

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <ShelfClear disabled={!isFiltered} onClear={reset} />
          <ShelfSort sort={query.sort} onToggle={toggleSort} />
        </div>
      </div>

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
