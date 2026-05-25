/* ============================================================
   Toast notifications
   ============================================================ */

import { createContext, useContext, useState, useCallback } from 'react'
import Icon from '../components/Icon'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const notify = useCallback((title, msg, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, title, msg, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 4200)
  }, [])

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div className={`toast toast-${t.type}`} key={t.id}>
            <div className="toast-ic">
              <Icon name={t.type === 'error' ? 'alert' : 'check'} size={20} />
            </div>
            <div className="toast-body">
              <b>{t.title}</b>
              <span>{t.msg}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
