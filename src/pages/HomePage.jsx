import { motion as Motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BadgeCheck, Layers3, Play, ShieldCheck, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LibraryHeroCanvas } from '../components/three/LibraryHeroCanvas'
import { useAppStore } from '../hooks/useAppStore'
import { HOME_FEATURES, ROLE_COPY } from '../store/mockData'

export default function HomePage() {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const { enterDemo, isAuthenticated } = useAppStore()

  return (
    <div className="relative overflow-hidden">
      <Motion.div style={{ y: heroY }} className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-400/18 blur-[120px]" />
      <Motion.div style={{ y: gridY }} className="pointer-events-none absolute right-[-80px] top-[28rem] h-[28rem] w-[28rem] rounded-full bg-amber-400/14 blur-[140px]" />

      <section className="page-shell grid min-h-screen items-center gap-10 py-8 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:py-10">
        <div className="space-y-8">
          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="space-y-6"
          >
            <span className="section-kicker">
              <Sparkles className="h-4 w-4" />
              Premium Smart Library Frontend
            </span>
            <div className="space-y-5">
              <h1 className="font-display text-5xl font-semibold tracking-tight text-[var(--text-primary)] lg:text-7xl">
                Library workflows,
                <span className="text-gradient"> reimagined in motion.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--text-secondary)] lg:text-lg">
                A production-ready React experience built with Tailwind CSS, Framer Motion, React Three Fiber, role-aware dashboards, smart search, and backend-ready architecture.
              </p>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={() => navigate(isAuthenticated ? '/app/dashboard' : '/auth')}
              className="btn-primary"
            >
              Launch workspace
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                enterDemo('librarian')
                navigate('/app/dashboard')
              }}
              className="btn-secondary"
            >
              <Play className="h-4 w-4" />
              Try librarian demo
            </button>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
            className="grid gap-4 md:grid-cols-3"
          >
            <div className="soft-feature">
              <ShieldCheck className="h-6 w-6 text-cyan-500" />
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">3 roles</p>
                <p className="text-sm text-[var(--text-secondary)]">Admin, Librarian, and Student dashboards.</p>
              </div>
            </div>
            <div className="soft-feature">
              <Layers3 className="h-6 w-6 text-emerald-500" />
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">Lazy loaded</p>
                <p className="text-sm text-[var(--text-secondary)]">Scalable routes and reusable UI primitives.</p>
              </div>
            </div>
            <div className="soft-feature">
              <BadgeCheck className="h-6 w-6 text-amber-500" />
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">Backend ready</p>
                <p className="text-sm text-[var(--text-secondary)]">Axios service layer and clean folder boundaries.</p>
              </div>
            </div>
          </Motion.div>
        </div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          className="glass-panel relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%)]" />
          <LibraryHeroCanvas />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Realtime discovery</p>
              <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">45ms</p>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Dashboard fluidity</p>
              <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">60fps</p>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">UI system reuse</p>
              <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">90%+</p>
            </div>
          </div>
        </Motion.div>
      </section>

      <section className="page-shell grid gap-6 pb-6 lg:grid-cols-3">
        {HOME_FEATURES.map((feature, index) => (
          <Motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="glass-panel"
          >
            <p className="section-kicker">Feature {index + 1}</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-[var(--text-primary)]">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{feature.description}</p>
          </Motion.article>
        ))}
      </section>

      <section className="page-shell py-8">
        <div className="glass-panel">
          <div className="mb-8 max-w-2xl">
            <p className="section-kicker">Role-aware experience</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-[var(--text-primary)]">
              One frontend, three sharply different workflows.
            </h2>
          </div>
          <div className="grid gap-5 xl:grid-cols-3">
            {Object.entries(ROLE_COPY).map(([role, copy]) => (
              <Motion.article
                key={role}
                whileHover={{ y: -6 }}
                className="rounded-[28px] border border-white/20 bg-white/55 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:bg-white/6"
              >
                <p className="section-kicker capitalize">{role}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-[var(--text-primary)]">
                  {copy.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{copy.summary}</p>
              </Motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
