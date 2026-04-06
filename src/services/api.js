import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.smartlibrary.local/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const session = window.localStorage.getItem('smart-library:session')

  if (session) {
    config.headers.Authorization = `Bearer demo-session-token`
  }

  return config
})

export default api
