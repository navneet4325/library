import { startTransition, useEffect, useState } from 'react'
import {
  INITIAL_BOOKS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TRANSACTIONS,
  ROLE_OPTIONS,
  labelForRole,
} from './mockData'
import { AppContext } from './appContext'
const THEME_KEY = 'smart-library:theme'
const SESSION_KEY = 'smart-library:session'
const DATA_KEY = 'smart-library:data'

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return null
  }

  return value
}

function createToast(payload) {
  return {
    id: crypto.randomUUID(),
    tone: 'info',
    duration: 4200,
    ...payload,
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => readStorage(THEME_KEY, 'light'))
  const [user, setUser] = useState(() => readStorage(SESSION_KEY, null))
  const [books, setBooks] = useState(() => {
    const stored = readStorage(DATA_KEY, null)
    return stored?.books ?? INITIAL_BOOKS
  })
  const [transactions, setTransactions] = useState(() => {
    const stored = readStorage(DATA_KEY, null)
    return stored?.transactions ?? INITIAL_TRANSACTIONS
  })
  const [notifications, setNotifications] = useState(() => {
    const stored = readStorage(DATA_KEY, null)
    return stored?.notifications ?? INITIAL_NOTIFICATIONS
  })
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeStorage(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    writeStorage(SESSION_KEY, user)
  }, [user])

  useEffect(() => {
    writeStorage(DATA_KEY, { books, transactions, notifications })
  }, [books, transactions, notifications])

  function pushToast(payload) {
    setToasts((current) => [...current, createToast(payload)])
  }

  function dismissToast(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  function createUserProfile(values) {
    const safeName =
      values.name?.trim() ||
      values.email?.split('@')[0]?.replace(/[._-]/g, ' ') ||
      'Library User'

    return {
      id: crypto.randomUUID(),
      name: safeName
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
      email: values.email,
      role: values.role,
      memberId: `SL-${Math.floor(1000 + Math.random() * 9000)}`,
    }
  }

  function login(values) {
    const profile = createUserProfile(values)
    setUser(profile)
    pushToast({
      title: `Welcome back, ${profile.name}`,
      description: `${labelForRole(profile.role)} workspace is ready.`,
      tone: 'success',
    })
    return profile
  }

  function register(values) {
    const profile = createUserProfile(values)
    setUser(profile)
    setNotifications((current) => [
      {
        id: crypto.randomUUID(),
        type: 'success',
        title: 'New member onboarding completed',
        description: `${profile.name} has been provisioned for the ${labelForRole(profile.role)} role.`,
        timestamp: 'Just now',
        read: false,
      },
      ...current,
    ])
    pushToast({
      title: 'Account created',
      description: `${profile.name} can now explore the library workspace.`,
      tone: 'success',
    })
    return profile
  }

  function enterDemo(role = 'admin') {
    const demoUser = {
      id: crypto.randomUUID(),
      name: 'Mira Lawson',
      email: 'mira@smartlibrary.dev',
      role,
      memberId: 'SL-2048',
    }
    setUser(demoUser)
    pushToast({
      title: 'Demo session started',
      description: `${labelForRole(role)} dashboard unlocked.`,
      tone: 'info',
    })
  }

  function logout() {
    setUser(null)
    pushToast({
      title: 'Session ended',
      description: 'You can jump back in anytime from the authentication screen.',
      tone: 'info',
    })
  }

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  function setRole(role) {
    setUser((current) => {
      if (!current) {
        return current
      }

      return { ...current, role }
    })

    pushToast({
      title: 'Workspace switched',
      description: `Viewing the ${labelForRole(role)} experience.`,
      tone: 'info',
    })
  }

  function addBook(payload) {
    const nextBook = {
      ...payload,
      id: crypto.randomUUID(),
      copies: Number(payload.copies),
      available: Number(payload.available),
      rating: Number(payload.rating || 4.5),
    }

    startTransition(() => {
      setBooks((current) => [nextBook, ...current])
    })

    pushToast({
      title: 'Book added',
      description: `${nextBook.title} is now visible in the catalog.`,
      tone: 'success',
    })
  }

  function updateBook(bookId, payload) {
    startTransition(() => {
      setBooks((current) =>
        current.map((book) =>
          book.id === bookId
            ? {
                ...book,
                ...payload,
                copies: Number(payload.copies),
                available: Number(payload.available),
                rating: Number(payload.rating || book.rating),
              }
            : book,
        ),
      )
    })

    pushToast({
      title: 'Book updated',
      description: 'Catalog changes have been saved.',
      tone: 'success',
    })
  }

  function deleteBook(bookId) {
    const target = books.find((book) => book.id === bookId)
    setBooks((current) => current.filter((book) => book.id !== bookId))
    setTransactions((current) => current.filter((transaction) => transaction.bookId !== bookId))
    pushToast({
      title: 'Book removed',
      description: target ? `${target.title} was removed from the catalog.` : 'Catalog item removed.',
      tone: 'warning',
    })
  }

  function issueBook(payload) {
    const target = books.find((book) => book.id === payload.bookId)

    if (!target || target.available <= 0) {
      pushToast({
        title: 'Issue blocked',
        description: 'No available copies remain for this title.',
        tone: 'error',
      })
      return false
    }

    const transaction = {
      id: crypto.randomUUID(),
      bookId: payload.bookId,
      member: payload.member,
      type: 'issue',
      status: 'issued',
      date: '2026-04-06',
      dueDate: payload.dueDate,
      notes: payload.notes || 'Issued via dashboard quick action.',
    }

    setBooks((current) =>
      current.map((book) =>
        book.id === payload.bookId ? { ...book, available: Math.max(book.available - 1, 0) } : book,
      ),
    )
    setTransactions((current) => [transaction, ...current])
    setNotifications((current) => [
      {
        id: crypto.randomUUID(),
        type: 'info',
        title: `${target.title} issued successfully`,
        description: `${payload.member} must return the book by ${payload.dueDate}.`,
        timestamp: 'Just now',
        read: false,
      },
      ...current,
    ])

    pushToast({
      title: 'Book issued',
      description: `${target.title} has been assigned to ${payload.member}.`,
      tone: 'success',
    })

    return true
  }

  function returnBook(transactionId) {
    const transaction = transactions.find((entry) => entry.id === transactionId)

    if (!transaction || transaction.status === 'returned') {
      return
    }

    setTransactions((current) =>
      current.map((entry) =>
        entry.id === transactionId
          ? { ...entry, status: 'returned', type: 'return', returnedAt: '2026-04-06' }
          : entry,
      ),
    )
    setBooks((current) =>
      current.map((book) =>
        book.id === transaction.bookId ? { ...book, available: Math.min(book.available + 1, book.copies) } : book,
      ),
    )

    pushToast({
      title: 'Return completed',
      description: `${transaction.member}'s transaction is now closed.`,
      tone: 'success',
    })
  }

  function markNotificationRead(notificationId) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    )
  }

  function dismissNotification(notificationId) {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== notificationId),
    )
  }

  const value = {
    theme,
    toggleTheme,
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    enterDemo,
    logout,
    setRole,
    books,
    addBook,
    updateBook,
    deleteBook,
    transactions,
    issueBook,
    returnBook,
    notifications,
    markNotificationRead,
    dismissNotification,
    toasts,
    pushToast,
    dismissToast,
    roles: ROLE_OPTIONS,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
