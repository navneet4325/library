import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { HighlightedText } from './HighlightedText'

export function SearchSuggestions({ query, suggestions, onPick }) {
  return (
    <AnimatePresence>
      {query && suggestions.length ? (
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 rounded-[28px] border border-white/20 bg-[var(--panel-strong)] p-3 shadow-[var(--shadow-strong)] backdrop-blur-2xl"
        >
          <div className="mb-2 flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
            <Search className="h-4 w-4" />
            Suggestions
          </div>
          <div className="grid gap-2">
            {suggestions.map((book) => (
              <button
                key={book.id}
                type="button"
                onClick={() => onPick(book)}
                className="flex items-center justify-between rounded-2xl px-3 py-3 text-left transition hover:bg-white/60 dark:hover:bg-white/6"
              >
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    <HighlightedText text={book.title} query={query} />
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <HighlightedText text={`${book.author} · ${book.genre}`} query={query} />
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)]" />
              </button>
            ))}
          </div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}
