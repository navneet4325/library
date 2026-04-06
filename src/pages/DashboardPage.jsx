import {
  AlertTriangle,
  BookCopy,
  BookMarked,
  BookmarkCheck,
  Clock3,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { AnalyticsPanel } from '../components/charts/AnalyticsPanel'
import { PageHeader } from '../components/common/PageHeader'
import { StatCard } from '../components/common/StatCard'
import { StatusPill } from '../components/common/StatusPill'
import { useAppStore } from '../hooks/useAppStore'
import { ROLE_COPY, getBookById, resolveTransactionStatus } from '../store/mockData'

function buildMetrics(role, books, transactions, notifications) {
  const overdue = transactions.filter((transaction) => resolveTransactionStatus(transaction) === 'overdue').length
  const activeLoans = transactions.filter((transaction) => resolveTransactionStatus(transaction) === 'issued').length
  const returned = transactions.filter((transaction) => resolveTransactionStatus(transaction) === 'returned').length
  const lowStock = books.filter((book) => book.available <= 2).length

  if (role === 'admin') {
    return [
      { icon: ShieldCheck, title: 'System health', value: 94, suffix: '%', delta: '+6.4%', tone: 'from-cyan-500/25 via-blue-500/10 to-transparent' },
      { icon: Users, title: 'Active members', value: 1248, delta: '+11.2%', tone: 'from-emerald-500/20 via-teal-400/12 to-transparent' },
      { icon: AlertTriangle, title: 'Overdue alerts', value: overdue, delta: 'Needs attention', tone: 'from-amber-500/20 via-orange-500/10 to-transparent' },
      { icon: BookCopy, title: 'Titles in catalog', value: books.length, delta: '+8 this week', tone: 'from-fuchsia-500/16 via-violet-500/8 to-transparent' },
    ]
  }

  if (role === 'librarian') {
    return [
      { icon: BookMarked, title: 'Available copies', value: books.reduce((sum, book) => sum + book.available, 0), delta: 'Freshly synced', tone: 'from-cyan-500/25 via-sky-500/10 to-transparent' },
      { icon: BookmarkCheck, title: 'Open issues', value: activeLoans, delta: '+4 today', tone: 'from-emerald-500/20 via-teal-500/12 to-transparent' },
      { icon: AlertTriangle, title: 'Low stock titles', value: lowStock, delta: 'Restock soon', tone: 'from-amber-500/20 via-orange-500/10 to-transparent' },
      { icon: Clock3, title: 'Returns closed', value: returned, delta: 'Cycle complete', tone: 'from-violet-500/18 via-indigo-500/10 to-transparent' },
    ]
  }

  return [
    { icon: BookMarked, title: 'Issued to you', value: 3, delta: '2 due soon', tone: 'from-cyan-500/25 via-sky-500/10 to-transparent' },
    { icon: BookmarkCheck, title: 'On-time returns', value: 92, suffix: '%', delta: '+5%', tone: 'from-emerald-500/20 via-teal-500/12 to-transparent' },
    { icon: Sparkles, title: 'Recommendations', value: books.filter((book) => book.available > 0).length, delta: 'Fresh matches', tone: 'from-amber-500/20 via-orange-500/10 to-transparent' },
    { icon: Clock3, title: 'Unread alerts', value: notifications.filter((notification) => !notification.read).length, delta: 'Stay updated', tone: 'from-violet-500/18 via-indigo-500/10 to-transparent' },
  ]
}

function RoleDetailPanel({ role, books, transactions, notifications }) {
  const overdueEntries = transactions.filter((transaction) => resolveTransactionStatus(transaction) === 'overdue')
  const recommendations = books.filter((book) => book.available > 0).slice(0, 3)
  const lowStock = books.filter((book) => book.available <= 2).slice(0, 3)

  if (role === 'admin') {
    return (
      <div className="grid gap-6 xl:grid-cols-[1.05fr_minmax(0,0.95fr)]">
        <div className="glass-panel">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">System spotlight</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
            Governance signals stay visible through operational peaks, with overdue exposure and unread notifications highlighted for quick intervention.
          </p>
          <div className="mt-6 grid gap-4">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="rounded-[24px] border border-white/15 bg-white/45 p-5 dark:bg-white/5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--text-primary)]">{notification.title}</p>
                  <StatusPill status={notification.type} label={notification.type} />
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{notification.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Risk heatmap</h3>
          <div className="mt-6 grid gap-4">
            {overdueEntries.map((entry) => (
              <div key={entry.id} className="rounded-[24px] border border-amber-400/15 bg-amber-500/8 p-5">
                <p className="font-semibold text-[var(--text-primary)]">
                  {getBookById(books, entry.bookId)?.title}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {entry.member} missed the due date of {entry.dueDate}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (role === 'librarian') {
    return (
      <div className="grid gap-6 xl:grid-cols-[1.05fr_minmax(0,0.95fr)]">
        <div className="glass-panel">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Action queue</h3>
          <div className="mt-6 grid gap-4">
            {lowStock.map((book) => (
              <div key={book.id} className="rounded-[24px] border border-white/15 bg-white/45 p-5 dark:bg-white/5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--text-primary)]">{book.title}</p>
                  <StatusPill status="limited" label="Restock soon" />
                </div>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Only {book.available} copies left on shelf {book.shelf}.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Circulation wins</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
            The interface keeps high-frequency tasks close: issue, return, restock, and record edits.
          </p>
          <div className="mt-6 grid gap-4">
            <div className="soft-feature">
              <BookmarkCheck className="h-6 w-6 text-emerald-500" />
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Fast issue workflow</p>
                <p className="text-sm text-[var(--text-secondary)]">New transactions can be created directly from the timeline workspace.</p>
              </div>
            </div>
            <div className="soft-feature">
              <BookCopy className="h-6 w-6 text-cyan-500" />
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Catalog updates</p>
                <p className="text-sm text-[var(--text-secondary)]">Glassmorphic modals keep context visible during edits.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_minmax(0,0.95fr)]">
      <div className="glass-panel">
        <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Your reading lane</h3>
        <div className="mt-6 grid gap-4">
          {transactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="rounded-[24px] border border-white/15 bg-white/45 p-5 dark:bg-white/5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-[var(--text-primary)]">
                  {getBookById(books, transaction.bookId)?.title}
                </p>
                <StatusPill status={resolveTransactionStatus(transaction)} label={resolveTransactionStatus(transaction)} />
              </div>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Due on {transaction.dueDate}. Keep your reading streak smooth with timely returns.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel">
        <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Recommended next</h3>
        <div className="mt-6 grid gap-4">
          {recommendations.map((book) => (
            <div key={book.id} className="rounded-[24px] border border-white/15 bg-white/45 p-5 dark:bg-white/5">
              <p className="font-semibold text-[var(--text-primary)]">{book.title}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {book.author} · {book.genre}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, books, transactions, notifications } = useAppStore()
  const role = user?.role ?? 'admin'
  const metrics = buildMetrics(role, books, transactions, notifications)

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow={`${user?.role} workspace`}
        title={ROLE_COPY[role].title}
        description={ROLE_COPY[role].summary}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.title} {...metric} />
        ))}
      </div>

      <AnalyticsPanel role={role} />
      <RoleDetailPanel
        role={role}
        books={books}
        transactions={transactions}
        notifications={notifications}
      />
    </div>
  )
}
