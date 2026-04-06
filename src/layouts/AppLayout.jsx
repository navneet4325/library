import { Suspense } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton'
import { OverdueBanner } from '../components/navigation/OverdueBanner'
import { Sidebar } from '../components/navigation/Sidebar'
import { TopBar } from '../components/navigation/TopBar'

export default function AppLayout() {
  const location = useLocation()

  return (
    <div className="page-shell py-4 lg:py-6">
      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-6">
        <Sidebar />
        <div className="flex min-h-[calc(100vh-2rem)] flex-col gap-4 lg:gap-6">
          <TopBar />
          <OverdueBanner />
          <AnimatePresence mode="wait">
            <Motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid gap-6"
            >
              <Suspense fallback={<LoadingSkeleton />}>
                <Outlet />
              </Suspense>
            </Motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
