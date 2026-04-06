import { useState } from 'react'
import { Modal } from '../common/Modal'

const defaultBook = {
  title: '',
  author: '',
  genre: '',
  copies: 5,
  available: 3,
  rating: 4.5,
  shelf: '',
  isbn: '',
  tint: '#38bdf8',
  glow: 'from-cyan-400/80 via-sky-400/50 to-blue-500/80',
  summary: '',
}

export function BookFormModal({ open, mode, book, onClose, onSubmit }) {
  const [values, setValues] = useState(() => book ?? defaultBook)
  const [errors, setErrors] = useState({})

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  function validate() {
    const nextErrors = {}

    if (!values.title.trim()) nextErrors.title = 'Title is required.'
    if (!values.author.trim()) nextErrors.author = 'Author is required.'
    if (!values.genre.trim()) nextErrors.genre = 'Genre is required.'
    if (!values.shelf.trim()) nextErrors.shelf = 'Shelf code is required.'
    if (!values.isbn.trim()) nextErrors.isbn = 'ISBN is required.'
    if (!values.summary.trim()) nextErrors.summary = 'Summary is required.'
    if (Number(values.available) > Number(values.copies)) {
      nextErrors.available = 'Available copies cannot exceed total copies.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    onSubmit(values)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === 'edit' ? 'Edit catalog record' : 'Add a new title'}
      description="All fields are shaped for backend integration, so the form mirrors a realistic catalog payload."
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="input-shell">
            <span className="label-text">Title</span>
            <input
              className="input-field"
              value={values.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="The Design of Everyday Things"
            />
            {errors.title ? <span className="error-text">{errors.title}</span> : null}
          </label>
          <label className="input-shell">
            <span className="label-text">Author</span>
            <input
              className="input-field"
              value={values.author}
              onChange={(event) => updateField('author', event.target.value)}
              placeholder="Don Norman"
            />
            {errors.author ? <span className="error-text">{errors.author}</span> : null}
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <label className="input-shell">
            <span className="label-text">Genre</span>
            <input
              className="input-field"
              value={values.genre}
              onChange={(event) => updateField('genre', event.target.value)}
              placeholder="Design"
            />
            {errors.genre ? <span className="error-text">{errors.genre}</span> : null}
          </label>
          <label className="input-shell">
            <span className="label-text">Shelf</span>
            <input
              className="input-field"
              value={values.shelf}
              onChange={(event) => updateField('shelf', event.target.value)}
              placeholder="D2"
            />
            {errors.shelf ? <span className="error-text">{errors.shelf}</span> : null}
          </label>
          <label className="input-shell">
            <span className="label-text">Total copies</span>
            <input
              type="number"
              min="1"
              className="input-field"
              value={values.copies}
              onChange={(event) => updateField('copies', event.target.value)}
            />
          </label>
          <label className="input-shell">
            <span className="label-text">Available copies</span>
            <input
              type="number"
              min="0"
              className="input-field"
              value={values.available}
              onChange={(event) => updateField('available', event.target.value)}
            />
            {errors.available ? <span className="error-text">{errors.available}</span> : null}
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr_0.5fr]">
          <label className="input-shell">
            <span className="label-text">ISBN</span>
            <input
              className="input-field"
              value={values.isbn}
              onChange={(event) => updateField('isbn', event.target.value)}
              placeholder="9780465050659"
            />
            {errors.isbn ? <span className="error-text">{errors.isbn}</span> : null}
          </label>
          <label className="input-shell">
            <span className="label-text">Rating</span>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              className="input-field"
              value={values.rating}
              onChange={(event) => updateField('rating', event.target.value)}
            />
          </label>
          <label className="input-shell">
            <span className="label-text">Tint</span>
            <input
              type="color"
              className="h-12 w-full rounded-2xl border border-white/20 bg-transparent p-2"
              value={values.tint}
              onChange={(event) => updateField('tint', event.target.value)}
            />
          </label>
        </div>

        <label className="input-shell">
          <span className="label-text">Summary</span>
          <textarea
            rows="4"
            className="input-field min-h-[132px] resize-none"
            value={values.summary}
            onChange={(event) => updateField('summary', event.target.value)}
            placeholder="A concise summary that helps discovery and recommendation systems."
          />
          {errors.summary ? <span className="error-text">{errors.summary}</span> : null}
        </label>

        <div className="mt-2 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {mode === 'edit' ? 'Save changes' : 'Add book'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
