import { useState } from 'react'
import { BookmarkPlus, Clock3, PackageCheck, ShieldCheck } from 'lucide-react'
import { ActivityTimeline } from '../components/transactions/ActivityTimeline'
import { PageHeader } from '../components/common/PageHeader'
import { StatCard } from '../components/common/StatCard'
import { useAppStore } from '../hooks/useAppStore'
import { resolveTransactionStatus } from '../store/mockData'

export default function TransactionsPage() {
  const { books, transactions, user, issueBook, returnBook } = useAppStore()
  const canManage = user?.role === 'admin' || user?.role === 'librarian'
  const issueCandidates = books.filter((book) => book.available > 0)
  const [form, setForm] = useState({
    bookId: issueCandidates[0]?.id ?? '',
    member: 'Rhea Patel',
    dueDate: '2026-04-16',
    notes: '',
  })

  const issuedCount = transactions.filter((transaction) => resolveTransactionStatus(transaction) === 'issued').length
  const overdueCount = transactions.filter((transaction) => resolveTransactionStatus(transaction) === 'overdue').length
  const returnedCount = transactions.filter((transaction) => resolveTransactionStatus(transaction) === 'returned').length

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    issueBook(form)
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Circulation center"
        title="Transactions"
        description="Issue and return flows are paired with a full activity timeline so circulation teams never lose context."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookmarkPlus} title="Open issues" value={issuedCount} delta="+4 today" tone="from-cyan-500/25 via-sky-500/10 to-transparent" />
        <StatCard icon={Clock3} title="Overdue" value={overdueCount} delta="Escalate now" tone="from-amber-500/20 via-orange-500/10 to-transparent" />
        <StatCard icon={PackageCheck} title="Returned" value={returnedCount} delta="This cycle" tone="from-emerald-500/20 via-teal-500/10 to-transparent" />
        <StatCard icon={ShieldCheck} title="Operational confidence" value={91} suffix="%" delta="Stable" tone="from-violet-500/18 via-indigo-500/10 to-transparent" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_minmax(0,1.08fr)]">
        <div className="glass-panel">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            {canManage ? 'Issue a book' : 'Transaction overview'}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
            {canManage
              ? 'Create new issue events with a clean, backend-shaped payload and immediate UI feedback.'
              : 'Students can review circulation history, due dates, and return status from here.'}
          </p>

          {canManage ? (
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <label className="input-shell">
                <span className="label-text">Book</span>
                <select
                  value={form.bookId}
                  onChange={(event) => updateField('bookId', event.target.value)}
                  className="input-field"
                >
                  {issueCandidates.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} ({book.available} available)
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="input-shell">
                  <span className="label-text">Member name</span>
                  <input
                    className="input-field"
                    value={form.member}
                    onChange={(event) => updateField('member', event.target.value)}
                    placeholder="Rhea Patel"
                  />
                </label>

                <label className="input-shell">
                  <span className="label-text">Due date</span>
                  <input
                    type="date"
                    className="input-field"
                    value={form.dueDate}
                    onChange={(event) => updateField('dueDate', event.target.value)}
                  />
                </label>
              </div>

              <label className="input-shell">
                <span className="label-text">Notes</span>
                <textarea
                  rows="4"
                  className="input-field min-h-[120px] resize-none"
                  value={form.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                  placeholder="Optional circulation context..."
                />
              </label>

              <button type="submit" className="btn-primary w-fit">
                Issue book
              </button>
            </form>
          ) : (
            <div className="mt-6 rounded-[28px] border border-white/15 bg-white/45 p-6 dark:bg-white/5">
              <p className="text-sm leading-7 text-[var(--text-secondary)]">
                Issue and return controls are reserved for Admin and Librarian roles. The timeline remains available so students can track due dates and activity history with full transparency.
              </p>
            </div>
          )}
        </div>

        <ActivityTimeline
          books={books}
          transactions={transactions}
          onReturn={returnBook}
          canManage={canManage}
        />
      </div>
    </div>
  )
}
