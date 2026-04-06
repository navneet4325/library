import { BookOpen, BellRing, LayoutDashboard, LibraryBig, Search, Sparkles, Repeat2 } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'

const navigation = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/books', label: 'Books', icon: LibraryBig },
  { to: '/app/search', label: 'Smart Search', icon: Search },
  { to: '/app/transactions', label: 'Transactions', icon: Repeat2 },
  { to: '/app/notifications', label: 'Notifications', icon: BellRing },
]

export function Sidebar() {
  return (
    <aside className="glass-panel sticky top-6 flex h-fit flex-col gap-8 lg:min-h-[calc(100vh-3rem)]">
      <Link to="/" className="flex items-center gap-4">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-[22px] bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 text-white shadow-[0_18px_40px_rgba(59,130,246,0.35)]">
          <BookOpen className="h-7 w-7" />
        </span>
        <div>
          <p className="font-display text-xl font-semibold text-[var(--text-primary)]">Smart Library</p>
          <p className="text-sm text-[var(--text-secondary)]">Immersive operations suite</p>
        </div>
      </Link>

      <nav className="grid gap-2">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-[22px] px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] shadow-[0_16px_32px_rgba(56,189,248,0.14)]'
                  : 'text-[var(--text-secondary)] hover:bg-white/55 hover:text-[var(--text-primary)] dark:hover:bg-white/6'
              }`
            }
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/65 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition group-hover:scale-105 dark:bg-white/8">
              <item.icon className="h-5 w-5" />
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-[26px] border border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-5 text-white shadow-[0_22px_50px_rgba(2,8,23,0.45)]">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
          <Sparkles className="h-5 w-5 text-cyan-200" />
        </div>
        <p className="font-display text-lg font-semibold">Scalable by design</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Context state, route-based loading, reusable primitives, and Axios services are all ready for backend handoff.
        </p>
      </div>
    </aside>
  )
}
