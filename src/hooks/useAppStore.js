import { useContext } from 'react'
import { AppContext } from '../store/appContext'

export function useAppStore() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppStore must be used inside AppProvider')
  }

  return context
}
