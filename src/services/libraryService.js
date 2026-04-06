import api from './api'

export const libraryService = {
  getDashboardOverview(params) {
    return api.get('/dashboard/overview', { params })
  },
  getBooks(params) {
    return api.get('/books', { params })
  },
  createBook(payload) {
    return api.post('/books', payload)
  },
  updateBook(bookId, payload) {
    return api.put(`/books/${bookId}`, payload)
  },
  deleteBook(bookId) {
    return api.delete(`/books/${bookId}`)
  },
  getTransactions(params) {
    return api.get('/transactions', { params })
  },
  issueBook(payload) {
    return api.post('/transactions/issue', payload)
  },
  returnBook(transactionId) {
    return api.post(`/transactions/${transactionId}/return`)
  },
}
