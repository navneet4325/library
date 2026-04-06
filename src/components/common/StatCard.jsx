import { motion as Motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedCounter } from './AnimatedCounter'

export function StatCard(props) {
  const {
    icon: Icon,
    title,
    value,
    suffix,
    prefix,
    delta,
    tone = 'from-sky-500/20 via-cyan-500/10 to-transparent',
  } = props

  return (
    <Motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-[28px] border border-white/25 bg-[var(--panel-strong)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-[var(--text-primary)] shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:bg-white/10">
            <Icon className="h-5 w-5" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--text-secondary)]">{title}</p>
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
          </div>
        </div>
        {delta ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/15 dark:text-emerald-300">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {delta}
          </span>
        ) : null}
      </div>
    </Motion.article>
  )
}
