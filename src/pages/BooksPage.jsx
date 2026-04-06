import { startTransition, useDeferredValue, useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { BookCard } from '../components/books/BookCard'
import { BookFilters } from '../components/books/BookFilters'
import { BookFormModal } from '../components/books/BookFormModal'
import { PageHeader } from '../components/common/PageHeader'
import { useDebounce } from '../hooks/useDebounce'
import { useAppStore } from '../hooks/useAppStore'

function matchesAvailability(book, availability) {
  if (availability === 'all') return true
  if (availability === 'available') return book.available > 2
  if (availability === 'limited') return book.available > 0 && book.available <= 2
  if (availability === 'empty') return book.available === 0
  return true
}

export default function BooksPage() {
  const { books, user, addBook, updateBook, deleteBook } = useAppStore()
  const [view, setView] = useState('grid')
  const [filters, setFilters] = useState({
    query: '',
    genre: 'all',
    author: 'all',
    availability: 'all',
  })
  const [modalMode, setModalMode] = useState('create')
  const [editingBook, setEditingBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const canManage = user?.role === 'admin' || user?.role === 'librarian'
  const debouncedQuery = useDebounce(filters.query, 250)
  const query = useDeferredValue(debouncedQuery)

  const genres = [...new Set(books.map((book) => book.genre))].sort()
  const authors = [...new Set(books.map((book) => book.author))].sort()

  const filteredBooks = books.filter((book) => {
    const haystack = `${book.title} ${book.author} ${book.genre} ${book.summary} ${book.isbn}`.toLowerCase()
    const matchesQuery = !query || haystack.includes(query.toLowerCase())
    const matchesGenre = filters.genre === 'all' || book.genre === filters.genre
    const matchesAuthor = filters.author === 'all' || book.author === filters.author

    return (
      matchesQuery &&
      matchesGenre &&
      matchesAuthor &&
      matchesAvailability(book, filters.availability)
    )
  })

  function handleFilterChange(field, value) {
    startTransition(() => {
      setFilters((current) => ({ ...current, [field]: value }))
    })
  }

  function openCreateModal() {
    setModalMode('create')
    setEditingBook(null)
    setIsModalOpen(true)
  }

  function openEditModal(book) {
    setModalMode('edit')
    setEditingBook(book)
    setIsModalOpen(true)
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Catalog studio"
        title="Book management"
        description="Browse the collection in grid or list mode, filter instantly, and manage records through reusable modal forms."
        actions={
          canManage ? (
            <button type="button" onClick={openCreateModal} className="btn-primary">
              <Plus className="h-4 w-4" />
              Add new title
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/45 px-4 py-2 text-sm text-[var(--text-secondary)] dark:bg-white/6">
              <Sparkles className="h-4 w-4" />
              Student mode is browse-only
            </div>
          )
        }
      />

      <BookFilters
        filters={filters}
        view={view}
        onViewChange={setView}
        onFilterChange={handleFilterChange}
        genres={genres}
        authors={authors}
      />

      <Motion.div
        layout
        className={`grid gap-6 ${view === 'grid' ? 'xl:grid-cols-2 2xl:grid-cols-3' : 'grid-cols-1'}`}
      >
        <AnimatePresence>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              view={view}
              query={query}
              canManage={canManage}
              onEdit={openEditModal}
              onDelete={deleteBook}
            />
          ))}
        </AnimatePresence>
      </Motion.div>

      <BookFormModal
        key={`${modalMode}-${editingBook?.id ?? 'new'}-${isModalOpen}`}
        open={isModalOpen}
        mode={modalMode}
        book={editingBook}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(values) => {
          if (modalMode === 'edit' && editingBook) {
            updateBook(editingBook.id, values)
            return
          }

          addBook(values)
        }}
      />
    </div>
  )
}
