import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../hooks/useAppStore'
import { resolveTransactionStatus } from '../../store/mockData'

export function OverdueBanner() {
  const { transactions } = useAppStore()
  const overdueCount = transactions.filter(
    (transaction) => resolveTransactionStatus(transaction) === 'overdue',
  ).length

  if (!overdueCount) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-amber-400/20 bg-gradient-to-r from-amber-500/12 via-orange-500/12 to-rose-500/12 p-5 shadow-[0_18px_40px_rgba(245,158,11,0.12)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/16 text-amber-700 dark:text-amber-300">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-xl font-semibold text-[var(--text-primary)]">
              {overdueCount} overdue {overdueCount === 1 ? 'book needs' : 'books need'} attention
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Follow up from the transactions timeline or jump into notifications to review escalations.
            </p>
          </div>
        </div>
        <Link to="/app/transactions" className="btn-secondary">
          Resolve queue
        </Link>
      </div>
    </div>
  )
}
