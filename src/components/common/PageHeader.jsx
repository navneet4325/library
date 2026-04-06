import { motion as Motion } from 'framer-motion'

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="glass-panel flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="max-w-3xl space-y-3">
        {eyebrow ? (
          <span className="section-kicker">
            {eyebrow}
          </span>
        ) : null}
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--text-primary)] lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)] lg:text-base">
            {description}
          </p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </Motion.div>
  )
}
