import { Bell, ChevronDown, LogOut, Search as SearchIcon } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../common/ThemeToggle'
import { useAppStore } from '../../hooks/useAppStore'

const routeLabels = {
  '/app/dashboard': 'Dashboard',
  '/app/books': 'Book management',
  '/app/search': 'Smart search',
  '/app/transactions': 'Transactions',
  '/app/notifications': 'Notifications',
}

export function TopBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, roles, setRole, logout } = useAppStore()

  return (
    <header className="glass-panel flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="space-y-1">
        <p className="section-kicker">{routeLabels[location.pathname] ?? 'Workspace'}</p>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          {location.pathname === '/app/dashboard'
            ? `Welcome back, ${user?.name?.split(' ')[0]}`
            : routeLabels[location.pathname]}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link to="/app/search" className="input-shell min-w-[220px] max-w-[280px] px-4 py-3 lg:flex">
          <span className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
            <SearchIcon className="h-4 w-4" />
            Search books, members, or ISBN
          </span>
        </Link>

        <label className="soft-select">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
            Role
          </span>
          <select
            value={user?.role}
            onChange={(event) => setRole(event.target.value)}
            className="appearance-none bg-transparent pr-6 text-sm font-semibold text-[var(--text-primary)] outline-none"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
        </label>

        <Link to="/app/notifications" className="soft-button relative h-12 w-12">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
        </Link>

        <ThemeToggle />

        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/auth')
          }}
          className="btn-secondary"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  )
}
