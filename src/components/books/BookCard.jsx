import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { BookOpenText, PencilLine, Star, Trash2, Users } from 'lucide-react'
import { BookModelCanvas } from './BookModelCanvas'
import { StatusPill } from '../common/StatusPill'

function getAvailabilityState(book) {
  if (book.available <= 0) {
    return { status: 'overdue', label: 'Out of stock' }
  }

  if (book.available <= 2) {
    return { status: 'limited', label: 'Low stock' }
  }

  return { status: 'available', label: 'Available' }
}

function Highlighted({ text, query }) {
  if (!query) {
    return text
  }

  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${safeQuery})`, 'ig'))

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={`${part}-${index}`}
        className="rounded-md bg-cyan-400/20 px-1 text-[var(--text-primary)]"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  )
}

export function BookCard({ book, view = 'grid', query = '', canManage, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false)
  const availability = getAvailabilityState(book)

  return (
    <Motion.article
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, rotateX: view === 'grid' ? 2 : 0 }}
      className={`group relative overflow-hidden rounded-[30px] border border-white/20 bg-[var(--panel-strong)] shadow-[var(--shadow-soft)] backdrop-blur-xl ${
        view === 'list' ? 'flex flex-col lg:flex-row' : ''
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`relative overflow-hidden ${view === 'list' ? 'lg:w-[280px] xl:w-[320px]' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${book.glow}`} />
        <BookModelCanvas hovered={hovered} tint={book.tint} className={view === 'list' ? 'h-full min-h-[240px]' : ''} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-3">
            <StatusPill status={availability.status} label={availability.label} />
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                <Highlighted text={book.title} query={query} />
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                <Highlighted text={`${book.author} · ${book.genre}`} query={query} />
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/65 px-3 py-1 text-sm font-semibold text-[var(--text-primary)] shadow-[0_12px_24px_rgba(15,23,42,0.08)] dark:bg-white/8">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {book.rating.toFixed(1)}
          </div>
        </div>

        <p className="text-sm leading-7 text-[var(--text-secondary)]">
          <Highlighted text={book.summary} query={query} />
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="stat-chip">
            <BookOpenText className="h-4 w-4" />
            <span>{book.shelf}</span>
          </div>
          <div className="stat-chip">
            <Users className="h-4 w-4" />
            <span>
              {book.available}/{book.copies} copies
            </span>
          </div>
          <div className="stat-chip">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              ISBN
            </span>
            <span>{book.isbn.slice(-4)}</span>
          </div>
        </div>

        {canManage ? (
          <div className="mt-auto flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => onEdit(book)} className="btn-secondary">
              <PencilLine className="h-4 w-4" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(book.id)}
              className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:bg-rose-500/16 dark:text-rose-200"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </Motion.article>
  )
}
