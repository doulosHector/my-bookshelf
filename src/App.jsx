import { useMemo, useState } from "react";
import { Header } from "./components/layout/Header";
import { Tabs } from "./components/layout/Tabs";
import { ShelfView } from "./components/shelf/ShelfView";
import { StatsView } from "./components/stats/StatsView";
import { BookFormModal } from "./components/book-form/BookFormModal";
import { ImportCsvModal } from "./components/csv/ImportCsvModal";
import { useBooks } from "./hooks/useBooks";
import { useShelfQuery } from "./hooks/useShelfQuery";
import { useTheme } from "./hooks/useTheme";
import { computeStats } from "./utils/stats";
import { booksToCsv, csvFileName } from "./utils/bookCsv";
import { withBom } from "./utils/csv";
import { downloadText } from "./services/file";
import { EMPTY_BOOK } from "./constants/books";
import { CSV_MIME } from "./constants/csv";

const TABS = [
  { id: "shelf", label: "Librero" },
  { id: "stats", label: "Estadísticas" },
];

export default function App() {
  const { t, styles } = useTheme();
  const { books, saveBook, deleteBook, importBooks } = useBooks();

  const shelf = useShelfQuery(books);

  const [view, setView] = useState(TABS[0].id);
  // null = modal closed; a book without id = creating a new one.
  const [editingBook, setEditingBook] = useState(null);
  const [importing, setImporting] = useState(false);

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

  const handleExport = () => {
    downloadText(csvFileName(new Date()), withBom(booksToCsv(books)), CSV_MIME);
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
      <Header
        stats={stats}
        onAddBook={() => setEditingBook(EMPTY_BOOK)}
        canExport={books.length > 0}
        onExport={handleExport}
        onImport={() => setImporting(true)}
      />
      <Tabs tabs={TABS} active={view} onChange={setView} />

      <main style={{ ...styles.page, padding: "20px 20px 80px" }}>
        {view === "shelf" ? (
          <ShelfView shelf={shelf} onSelectBook={setEditingBook} />
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

      {importing && (
        <ImportCsvModal
          bookCount={books.length}
          onImport={importBooks}
          onClose={() => setImporting(false)}
        />
      )}
    </div>
  );
}
