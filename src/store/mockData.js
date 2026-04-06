export const ROLE_OPTIONS = [
  { id: 'admin', label: 'Admin', accent: 'from-cyan-400 via-sky-500 to-blue-600' },
  {
    id: 'librarian',
    label: 'Librarian',
    accent: 'from-emerald-400 via-teal-500 to-cyan-600',
  },
  {
    id: 'student',
    label: 'Student',
    accent: 'from-amber-400 via-orange-500 to-rose-500',
  },
]

export const INITIAL_BOOKS = [
  {
    id: 'book-101',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Productivity',
    copies: 10,
    available: 4,
    rating: 4.8,
    shelf: 'A1',
    isbn: '9780735211292',
    tint: '#fb923c',
    glow: 'from-orange-400/80 via-amber-300/60 to-rose-400/80',
    summary: 'Micro habit patterns for sustainable personal growth.',
  },
  {
    id: 'book-102',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    genre: 'Technology',
    copies: 8,
    available: 2,
    rating: 4.9,
    shelf: 'T4',
    isbn: '9780135957059',
    tint: '#22c55e',
    glow: 'from-emerald-400/80 via-lime-300/60 to-teal-500/80',
    summary: 'A timeless engineering playbook for modern software teams.',
  },
  {
    id: 'book-103',
    title: 'Deep Work',
    author: 'Cal Newport',
    genre: 'Self-Development',
    copies: 12,
    available: 6,
    rating: 4.6,
    shelf: 'B3',
    isbn: '9781455586691',
    tint: '#3b82f6',
    glow: 'from-sky-400/80 via-blue-400/60 to-indigo-500/80',
    summary: 'Focus systems for high-value knowledge work.',
  },
  {
    id: 'book-104',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    copies: 9,
    available: 5,
    rating: 4.4,
    shelf: 'F2',
    isbn: '9780525559474',
    tint: '#8b5cf6',
    glow: 'from-fuchsia-400/80 via-violet-400/60 to-indigo-500/80',
    summary: 'A luminous novel about choices, possibility, and second chances.',
  },
  {
    id: 'book-105',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Psychology',
    copies: 7,
    available: 1,
    rating: 4.7,
    shelf: 'P1',
    isbn: '9780374533557',
    tint: '#ef4444',
    glow: 'from-rose-400/80 via-red-400/60 to-orange-500/80',
    summary: 'An accessible tour of the mind, bias, and decision-making.',
  },
  {
    id: 'book-106',
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    copies: 6,
    available: 3,
    rating: 4.7,
    shelf: 'M5',
    isbn: '9780399590504',
    tint: '#14b8a6',
    glow: 'from-teal-300/80 via-cyan-300/60 to-emerald-500/80',
    summary: 'A moving memoir on reinvention through education.',
  },
  {
    id: 'book-107',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    genre: 'Technology',
    copies: 5,
    available: 2,
    rating: 4.9,
    shelf: 'T2',
    isbn: '9781449373320',
    tint: '#f59e0b',
    glow: 'from-amber-300/80 via-yellow-300/60 to-orange-400/80',
    summary: 'Architecture fundamentals for resilient, scalable systems.',
  },
  {
    id: 'book-108',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'History',
    copies: 11,
    available: 7,
    rating: 4.7,
    shelf: 'H6',
    isbn: '9780062316110',
    tint: '#06b6d4',
    glow: 'from-cyan-300/80 via-sky-300/60 to-blue-500/80',
    summary: 'A sweeping narrative of how humans reshaped the world.',
  },
]

export const INITIAL_TRANSACTIONS = [
  {
    id: 'txn-001',
    bookId: 'book-101',
    member: 'Aanya Sharma',
    type: 'issue',
    status: 'issued',
    date: '2026-04-03',
    dueDate: '2026-04-12',
    notes: 'Reading club feature pick.',
  },
  {
    id: 'txn-002',
    bookId: 'book-105',
    member: 'Vihaan Rao',
    type: 'issue',
    status: 'overdue',
    date: '2026-03-20',
    dueDate: '2026-04-02',
    notes: 'Due reminder escalated twice.',
  },
  {
    id: 'txn-003',
    bookId: 'book-104',
    member: 'Nisha Kapoor',
    type: 'return',
    status: 'returned',
    date: '2026-04-04',
    dueDate: '2026-04-06',
    returnedAt: '2026-04-04',
    notes: 'Returned early in excellent condition.',
  },
  {
    id: 'txn-004',
    bookId: 'book-107',
    member: 'Arjun Malhotra',
    type: 'issue',
    status: 'issued',
    date: '2026-04-05',
    dueDate: '2026-04-18',
    notes: 'Requested for distributed systems lab.',
  },
  {
    id: 'txn-005',
    bookId: 'book-102',
    member: 'Ira Sethi',
    type: 'issue',
    status: 'issued',
    date: '2026-04-06',
    dueDate: '2026-04-15',
    notes: 'Mentorship sprint reading assignment.',
  },
]

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-001',
    type: 'warning',
    title: '4 overdue books need action',
    description: 'Two students have not responded to the second reminder.',
    timestamp: '5 min ago',
    read: false,
  },
  {
    id: 'notif-002',
    type: 'info',
    title: 'Catalog sync ready for backend hookup',
    description: 'Axios service stubs are configured for books and dashboard endpoints.',
    timestamp: '18 min ago',
    read: false,
  },
  {
    id: 'notif-003',
    type: 'success',
    title: '31 books returned this week',
    description: 'Return efficiency improved by 12% from the previous cycle.',
    timestamp: '1 hr ago',
    read: true,
  },
]

export const CIRCULATION_SERIES = [
  { name: 'Mon', issues: 28, returns: 18, visitors: 136 },
  { name: 'Tue', issues: 34, returns: 24, visitors: 168 },
  { name: 'Wed', issues: 42, returns: 29, visitors: 188 },
  { name: 'Thu', issues: 39, returns: 31, visitors: 194 },
  { name: 'Fri', issues: 52, returns: 36, visitors: 226 },
  { name: 'Sat', issues: 47, returns: 34, visitors: 202 },
  { name: 'Sun', issues: 24, returns: 22, visitors: 110 },
]

export const GENRE_DISTRIBUTION = [
  { name: 'Technology', value: 26, fill: '#38bdf8' },
  { name: 'Fiction', value: 19, fill: '#fb7185' },
  { name: 'History', value: 13, fill: '#f59e0b' },
  { name: 'Productivity', value: 17, fill: '#34d399' },
  { name: 'Research', value: 11, fill: '#818cf8' },
  { name: 'Memoir', value: 14, fill: '#22d3ee' },
]

export const ROLE_ACTIVITY = {
  admin: [
    { name: 'System Health', value: 94 },
    { name: 'Active Members', value: 81 },
    { name: 'Shelf Accuracy', value: 88 },
  ],
  librarian: [
    { name: 'Issue Speed', value: 87 },
    { name: 'Returns Closed', value: 72 },
    { name: 'Shelf Restocks', value: 66 },
  ],
  student: [
    { name: 'Reading Goal', value: 76 },
    { name: 'On-Time Returns', value: 92 },
    { name: 'Wishlist Match', value: 63 },
  ],
}

export const HOME_FEATURES = [
  {
    title: 'Immersive dashboards',
    description: 'Role-aware control centers blend motion, analytics, and contextual actions.',
  },
  {
    title: '3D catalog browsing',
    description: 'Book cards react with tactile depth and lightweight WebGL scenes.',
  },
  {
    title: 'Search that feels instant',
    description: 'Suggestions, highlights, and debounced results keep discovery frictionless.',
  },
]

export const ROLE_COPY = {
  admin: {
    title: 'System intelligence at a glance',
    summary: 'Monitor circulation, overdue risk, member growth, and catalog health in one premium control room.',
  },
  librarian: {
    title: 'Operational flow without clutter',
    summary: 'Manage inventory, issue queues, and returns from a streamlined workstation built for speed.',
  },
  student: {
    title: 'A personal reading cockpit',
    summary: 'Track due dates, active loans, recommendations, and reading momentum with zero friction.',
  },
}

export function resolveTransactionStatus(transaction) {
  if (transaction.status === 'returned' || transaction.returnedAt) {
    return 'returned'
  }

  if (new Date(transaction.dueDate) < new Date('2026-04-06')) {
    return 'overdue'
  }

  return 'issued'
}

export function getBookById(books, id) {
  return books.find((book) => book.id === id)
}

export function labelForRole(role) {
  return ROLE_OPTIONS.find((option) => option.id === role)?.label ?? role
}
