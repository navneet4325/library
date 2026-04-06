import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ArrowRight, BookOpenCheck, Shield, Sparkles } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore'

function RoleCard({ role, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[24px] border p-4 text-left transition ${
        active
          ? 'border-cyan-400/40 bg-cyan-500/12 shadow-[0_18px_40px_rgba(56,189,248,0.14)]'
          : 'border-white/20 bg-white/45 hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/8'
      }`}
    >
      <p className="font-display text-lg font-semibold text-[var(--text-primary)]">{role.label}</p>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">Experience the {role.label.toLowerCase()} workflow.</p>
    </button>
  )
}

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { roles, login, register, enterDemo } = useAppStore()
  const [mode, setMode] = useState('login')
  const [values, setValues] = useState({
    name: '',
    email: 'mira@smartlibrary.dev',
    password: 'library123',
    confirmPassword: 'library123',
    role: 'admin',
  })
  const [errors, setErrors] = useState({})

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  function validate() {
    const nextErrors = {}

    if (mode === 'register' && !values.name.trim()) {
      nextErrors.name = 'Name is required.'
    }
    if (!values.email.includes('@')) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (values.password.trim().length < 6) {
      nextErrors.password = 'Password should be at least 6 characters.'
    }
    if (mode === 'register' && values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    if (mode === 'login') {
      login(values)
    } else {
      register(values)
    }

    navigate(location.state?.from?.pathname || '/app/dashboard')
  }

  return (
    <div className="page-shell min-h-screen py-6 lg:py-10">
      <div className="grid min-h-[calc(100vh-3rem)] gap-6 overflow-hidden rounded-[36px] border border-white/20 bg-[var(--panel-strong)] shadow-[var(--shadow-strong)] backdrop-blur-2xl lg:grid-cols-[0.95fr_minmax(0,1.05fr)]">
        <div className="relative overflow-hidden border-b border-white/12 p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.18),_transparent_35%)]" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <span className="section-kicker">
                <Sparkles className="h-4 w-4" />
                Authentication
              </span>
              <div className="space-y-4">
                <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--text-primary)] lg:text-5xl">
                  Secure, role-aware entry into the Smart Library workspace.
                </h1>
                <p className="max-w-lg text-base leading-8 text-[var(--text-secondary)]">
                  Switch between login and registration with motion-driven transitions, visual validation, and role selection tuned for real product flows.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="soft-feature">
                <Shield className="h-6 w-6 text-cyan-500" />
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">Role-aware onboarding</p>
                  <p className="text-sm text-[var(--text-secondary)]">Provision Admin, Librarian, and Student experiences instantly.</p>
                </div>
              </div>
              <div className="soft-feature">
                <BookOpenCheck className="h-6 w-6 text-emerald-500" />
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">Demo-ready state</p>
                  <p className="text-sm text-[var(--text-secondary)]">Authentication flows are wired into the app shell and dashboards.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                enterDemo('student')
                navigate('/app/dashboard')
              }}
              className="btn-secondary w-fit"
            >
              Enter student demo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-8 lg:p-10">
          <div className="inline-flex rounded-full border border-white/20 bg-white/45 p-1 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                mode === 'login'
                  ? 'bg-[var(--accent-soft)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                mode === 'register'
                  ? 'bg-[var(--accent-soft)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <AnimatePresence mode="wait">
              <Motion.div
                key={mode}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="grid gap-5"
              >
                {mode === 'register' ? (
                  <label className="input-shell">
                    <span className="label-text">Full name</span>
                    <input
                      value={values.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      className="input-field"
                      placeholder="Mira Lawson"
                    />
                    {errors.name ? <span className="error-text">{errors.name}</span> : null}
                  </label>
                ) : null}

                <div className="grid gap-5 lg:grid-cols-2">
                  <label className="input-shell">
                    <span className="label-text">Email</span>
                    <input
                      value={values.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      className="input-field"
                      placeholder="mira@smartlibrary.dev"
                    />
                    {errors.email ? <span className="error-text">{errors.email}</span> : null}
                  </label>

                  <label className="input-shell">
                    <span className="label-text">Password</span>
                    <input
                      type="password"
                      value={values.password}
                      onChange={(event) => updateField('password', event.target.value)}
                      className="input-field"
                      placeholder="Enter secure password"
                    />
                    {errors.password ? <span className="error-text">{errors.password}</span> : null}
                  </label>
                </div>

                {mode === 'register' ? (
                  <label className="input-shell">
                    <span className="label-text">Confirm password</span>
                    <input
                      type="password"
                      value={values.confirmPassword}
                      onChange={(event) => updateField('confirmPassword', event.target.value)}
                      className="input-field"
                      placeholder="Repeat password"
                    />
                    {errors.confirmPassword ? (
                      <span className="error-text">{errors.confirmPassword}</span>
                    ) : null}
                  </label>
                ) : null}
              </Motion.div>
            </AnimatePresence>

            <div className="grid gap-4">
              <div>
                <p className="label-text">Choose a role</p>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {roles.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      active={values.role === role.id}
                      onClick={() => updateField('role', role.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary mt-2 w-fit">
              {mode === 'login' ? 'Enter workspace' : 'Create account'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
