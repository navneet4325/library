import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { X } from 'lucide-react'

export function Modal({ open, title, description, onClose, children }) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  return createPortal(
    <AnimatePresence>
      {open ? (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <Motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-3xl rounded-[30px] border border-white/20 bg-[var(--panel-strong)] p-6 shadow-[var(--shadow-strong)] backdrop-blur-2xl lg:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {title}
                </h2>
                {description ? (
                  <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                    {description}
                  </p>
                ) : null}
              </div>
              <button type="button" onClick={onClose} className="soft-button h-10 w-10">
                <X className="h-4 w-4" />
              </button>
            </div>
            {children}
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
