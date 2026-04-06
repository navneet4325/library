import { startTransition, useDeferredValue, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { SearchSuggestions } from '../components/search/SearchSuggestions'
import { HighlightedText } from '../components/search/HighlightedText'
import { useDebounce } from '../hooks/useDebounce'
import { useAppStore } from '../hooks/useAppStore'

function scoreBook(book, query) {
  const normalizedQuery = query.toLowerCase()
  let score = 0

  if (book.title.toLowerCase().includes(normalizedQuery)) score += 4
  if (book.author.toLowerCase().includes(normalizedQuery)) score += 3
  if (book.genre.toLowerCase().includes(normalizedQuery)) score += 2
  if (book.summary.toLowerCase().includes(normalizedQuery)) score += 1
  if (book.isbn.toLowerCase().includes(normalizedQuery)) score += 5

  return score
}

export default function SearchPage() {
  const { books } = useAppStore()
  const [input, setInput] = useState('pragmatic')
  const [selectedId, setSelectedId] = useState(null)
  const debouncedQuery = useDebounce(input, 220)
  const query = useDeferredValue(debouncedQuery)
  const suggestions = books
    .filter((book) =>
      !input
        ? false
        : `${book.title} ${book.author} ${book.genre} ${book.summary} ${book.isbn}`
            .toLowerCase()
            .includes(input.toLowerCase()),
    )
    .sort((left, right) => scoreBook(right, input) - scoreBook(left, input))
    .slice(0, 5)

  const results = books
    .filter((book) =>
      !query
        ? true
        : `${book.title} ${book.author} ${book.genre} ${book.summary} ${book.isbn}`
            .toLowerCase()
            .includes(query.toLowerCase()),
    )
    .sort((left, right) => scoreBook(right, query) - scoreBook(left, query))

  const selectedBook = results.find((book) => book.id === selectedId) ?? results[0]
  const availableMatches = results.filter((book) => book.available > 0).length

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Search experience"
        title="Smart search"
        description="Debounced input, suggestion overlays, matched highlights, and responsive result ranking create a premium catalog discovery flow."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_minmax(0,0.9fr)]">
        <div className="glass-panel">
          <div className="relative">
            <label className="input-shell min-h-[88px] justify-center">
              <span className="label-text">
                <Search className="h-4 w-4" />
                Search the catalog
              </span>
              <input
                className="input-field text-lg"
                value={input}
                onChange={(event) => {
                  const nextValue = event.target.value
                  startTransition(() => setInput(nextValue))
                }}
                placeholder="Type a title, author, genre, ISBN, or topic..."
              />
            </label>
            <SearchSuggestions
              query={input}
              suggestions={suggestions}
              onPick={(book) => {
                setInput(book.title)
                setSelectedId(book.id)
              }}
            />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="soft-feature">
              <Sparkles className="h-6 w-6 text-cyan-500" />
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">{results.length}</p>
                <p className="text-sm text-[var(--text-secondary)]">Matched results</p>
              </div>
            </div>
            <div className="soft-feature">
              <Sparkles className="h-6 w-6 text-emerald-500" />
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">{availableMatches}</p>
                <p className="text-sm text-[var(--text-secondary)]">Available now</p>
              </div>
            </div>
            <div className="soft-feature">
              <Sparkles className="h-6 w-6 text-amber-500" />
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">220ms</p>
                <p className="text-sm text-[var(--text-secondary)]">Debounce window</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {results.map((book) => (
              <button
                key={book.id}
                type="button"
                onClick={() => setSelectedId(book.id)}
                className={`rounded-[24px] border p-5 text-left transition ${
                  selectedBook?.id === book.id
                    ? 'border-cyan-400/35 bg-cyan-500/10 shadow-[0_18px_36px_rgba(56,189,248,0.14)]'
                    : 'border-white/15 bg-white/45 hover:bg-white/65 dark:bg-white/5 dark:hover:bg-white/8'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-xl font-semibold text-[var(--text-primary)]">
                      <HighlightedText text={book.title} query={query} />
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      <HighlightedText text={`${book.author} · ${book.genre}`} query={query} />
                    </p>
                  </div>
                  <span className="rounded-full bg-white/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)] dark:bg-white/8">
                    {book.available > 0 ? 'Available' : 'Waitlist'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel">
          {selectedBook ? (
            <>
              <p className="section-kicker">Selected result</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-[var(--text-primary)]">
                <HighlightedText text={selectedBook.title} query={query} />
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                <HighlightedText
                  text={`${selectedBook.author} · ${selectedBook.genre} · Shelf ${selectedBook.shelf}`}
                  query={query}
                />
              </p>
              <div className="mt-6 rounded-[28px] border border-white/20 bg-gradient-to-br from-cyan-500/16 via-blue-500/10 to-transparent p-6">
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  <HighlightedText text={selectedBook.summary} query={query} />
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="soft-feature">
                  <Sparkles className="h-6 w-6 text-cyan-500" />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">ISBN match</p>
                    <p className="text-sm text-[var(--text-secondary)]">{selectedBook.isbn}</p>
                  </div>
                </div>
                <div className="soft-feature">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Copies on hand</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {selectedBook.available}/{selectedBook.copies} currently available
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center rounded-[28px] border border-dashed border-white/20 bg-white/35 p-10 text-center dark:bg-white/5">
              <p className="max-w-sm text-sm leading-7 text-[var(--text-secondary)]">
                Start typing to explore books, authors, genres, and ISBN references with live suggestions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
