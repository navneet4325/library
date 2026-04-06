import { motion as Motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight, CalendarClock } from 'lucide-react'
import { StatusPill } from '../common/StatusPill'
import { getBookById, resolveTransactionStatus } from '../../store/mockData'

export function ActivityTimeline({ books, transactions, onReturn, canManage }) {
  return (
    <div className="glass-panel">
      <div className="mb-6 space-y-1">
        <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          Activity timeline
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Issue, return, and overdue events are organized in a single operational stream.
        </p>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => {
          const book = getBookById(books, transaction.bookId)
          const status = resolveTransactionStatus(transaction)
          const isReturn = status === 'returned'

          return (
            <Motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="relative flex gap-4 rounded-[26px] border border-white/15 bg-white/45 p-5 dark:bg-white/5"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                    isReturn
                      ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-300'
                      : 'bg-cyan-500/12 text-cyan-600 dark:text-cyan-300'
                  }`}
                >
                  {isReturn ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </span>
                {index !== transactions.length - 1 ? (
                  <span className="mt-3 h-full w-px bg-gradient-to-b from-cyan-400/40 to-transparent" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-display text-xl font-semibold text-[var(--text-primary)]">
                      {book?.title ?? 'Unknown title'}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {transaction.member} · {transaction.notes}
                    </p>
                  </div>
                  <StatusPill status={status} label={status} />
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="stat-chip">
                    <CalendarClock className="h-4 w-4" />
                    Issued: {transaction.date}
                  </span>
                  <span className="stat-chip">Due: {transaction.dueDate}</span>
                  {transaction.returnedAt ? <span className="stat-chip">Returned: {transaction.returnedAt}</span> : null}
                </div>

                {canManage && status !== 'returned' ? (
                  <button type="button" onClick={() => onReturn(transaction.id)} className="btn-secondary">
                    Mark as returned
                  </button>
                ) : null}
              </div>
            </Motion.div>
          )
        })}
      </div>
    </div>
  )
}
