import { useEffect, useEffectEvent } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { AlertCircle, BellRing, CheckCircle2, Sparkles, X } from 'lucide-react'
import { useAppStore } from '../../hooks/useAppStore'

const toneConfig = {
  info: {
    icon: BellRing,
    className: 'border-cyan-400/25 bg-cyan-500/10 text-cyan-950 dark:text-cyan-100',
  },
  success: {
    icon: CheckCircle2,
    className: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100',
  },
  warning: {
    icon: Sparkles,
    className: 'border-amber-400/25 bg-amber-500/10 text-amber-950 dark:text-amber-100',
  },
  error: {
    icon: AlertCircle,
    className: 'border-rose-400/25 bg-rose-500/10 text-rose-950 dark:text-rose-100',
  },
}

export function ToastViewport() {
  const { toasts, dismissToast } = useAppStore()
  const handleDismiss = useEffectEvent((id) => dismissToast(id))

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => handleDismiss(toast.id), toast.duration ?? 4200),
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [toasts])

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = toneConfig[toast.tone] ?? toneConfig.info
          const Icon = config.icon

          return (
            <Motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.96 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className={`pointer-events-auto rounded-3xl border p-4 shadow-[var(--shadow-strong)] backdrop-blur-xl ${config.className}`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 shadow-[0_12px_32px_rgba(15,23,42,0.08)] dark:bg-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-1 text-sm leading-6 opacity-80">{toast.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/65 dark:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </Motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
