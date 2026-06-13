'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, onDismiss, duration = 3500 }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  return (
    <div className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-seno-card border border-seno-border-gold text-seno-text px-4 py-3 rounded-2xl shadow-[0_0_20px_rgba(212,160,23,0.25)] text-sm font-medium transition-all duration-300 max-w-[90vw] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <CheckCircle size={15} className="text-seno-gold shrink-0" />
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-1 text-seno-dim hover:text-seno-muted">
        <X size={13} />
      </button>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => setToast(msg)
  const clearToast = () => setToast(null)
  return { toast, showToast, clearToast }
}
