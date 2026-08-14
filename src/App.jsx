import { useMemo, useState } from "react";
import { Header } from "./components/layout/Header";
import { Tabs } from "./components/layout/Tabs";
import { ShelfView } from "./components/shelf/ShelfView";
import { StatsView } from "./components/stats/StatsView";
import { BookFormModal } from "./components/book-form/BookFormModal";
import { useBooks } from "./hooks/useBooks";
import { useTheme } from "./hooks/useTheme";
import { computeStats } from "./utils/stats";
import { ALL_FILTER, EMPTY_BOOK } from "./constants/books";

const TABS = [
  { id: "shelf", label: "Librero" },
  { id: "stats", label: "Estadísticas" },
];

export default function App() {
  const { t, styles } = useTheme();
  const { books, saveBook, deleteBook } = useBooks();

  const [view, setView] = useState(TABS[0].id);
  const [filter, setFilter] = useState(ALL_FILTER);
  // null = modal closed; a book without id = creating a new one.
  const [editingBook, setEditingBook] = useState(null);

  const stats = useMemo(() => computeStats(books), [books]);

  const closeModal = () => setEditingBook(null);

  const handleSave = (form) => {
    saveBook(form);
    closeModal();
  };

  const handleDelete = (id) => {
    deleteBook(id);
    closeModal();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.ink,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Header stats={stats} onAddBook={() => setEditingBook(EMPTY_BOOK)} />
      <Tabs tabs={TABS} active={view} onChange={setView} />

      <main style={{ ...styles.page, padding: "20px 20px 80px" }}>
        {view === "shelf" ? (
          <ShelfView
            books={books}
            filter={filter}
            onFilterChange={setFilter}
            onSelectBook={setEditingBook}
          />
        ) : (
          <StatsView stats={stats} />
        )}
      </main>

      {editingBook && (
        <BookFormModal
          book={editingBook}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
