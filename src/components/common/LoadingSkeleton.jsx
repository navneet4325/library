export function LoadingSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="glass-panel h-28 animate-pulse bg-white/50 dark:bg-white/5" />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="glass-panel h-48 animate-pulse bg-white/50 dark:bg-white/5" />
        <div className="glass-panel h-48 animate-pulse bg-white/50 dark:bg-white/5" />
        <div className="glass-panel h-48 animate-pulse bg-white/50 dark:bg-white/5" />
      </div>
      <div className="glass-panel h-[420px] animate-pulse bg-white/50 dark:bg-white/5" />
    </div>
  )
}
