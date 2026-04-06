export function HighlightedText({ text, query }) {
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
