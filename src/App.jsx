import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import { LoadingSkeleton } from './components/common/LoadingSkeleton'
import { ToastViewport } from './components/common/ToastViewport'
import { AppProvider } from './store/AppProvider'
import { useAppStore } from './hooks/useAppStore'

const HomePage = lazy(() => import('./pages/HomePage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const BooksPage = lazy(() => import('./pages/BooksPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'))

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAppStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />
  }

  return children
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAppStore()

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />
  }

  return children
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/auth"
            element={
              <PublicOnlyRoute>
                <AuthPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatedRoutes />
        <ToastViewport />
      </BrowserRouter>
    </AppProvider>
  )
}
