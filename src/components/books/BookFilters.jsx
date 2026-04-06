import { Filter, Grid2X2, ListFilter, Rows3 } from 'lucide-react'

export function BookFilters({
  filters,
  view,
  onViewChange,
  onFilterChange,
  genres,
  authors,
}) {
  return (
    <div className="glass-panel flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Catalog filters</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Narrow by genre, author, availability, or title keywords.
          </p>
        </div>
        <div className="inline-flex rounded-2xl border border-white/20 bg-white/40 p-1 dark:bg-white/5">
          <button
            type="button"
            onClick={() => onViewChange('grid')}
            className={`soft-toggle ${view === 'grid' ? 'soft-toggle-active' : ''}`}
          >
            <Grid2X2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewChange('list')}
            className={`soft-toggle ${view === 'list' ? 'soft-toggle-active' : ''}`}
          >
            <Rows3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
        <label className="input-shell">
          <span className="label-text">
            <Filter className="h-4 w-4" />
            Search
          </span>
          <input
            value={filters.query}
            onChange={(event) => onFilterChange('query', event.target.value)}
            placeholder="Search by title, ISBN, or summary..."
            className="input-field"
          />
        </label>

        <label className="input-shell">
          <span className="label-text">
            <ListFilter className="h-4 w-4" />
            Genre
          </span>
          <select
            value={filters.genre}
            onChange={(event) => onFilterChange('genre', event.target.value)}
            className="input-field"
          >
            <option value="all">All genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <label className="input-shell">
          <span className="label-text">Author</span>
          <select
            value={filters.author}
            onChange={(event) => onFilterChange('author', event.target.value)}
            className="input-field"
          >
            <option value="all">All authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </label>

        <label className="input-shell">
          <span className="label-text">Availability</span>
          <select
            value={filters.availability}
            onChange={(event) => onFilterChange('availability', event.target.value)}
            className="input-field"
          >
            <option value="all">All stock states</option>
            <option value="available">Comfortably stocked</option>
            <option value="limited">Low stock</option>
            <option value="empty">Out of stock</option>
          </select>
        </label>
      </div>
    </div>
  )
}
