'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className = '' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-seno-card border border-seno-border-gold rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md animate-fade-in-up ${className}`}>
        {/* Gold top handle on mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-seno-border rounded-full" />
        </div>
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-seno-border">
            <h2 className="text-base font-bold text-seno-text">{title}</h2>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-seno-card-2 text-seno-muted transition-colors">
              <X size={16} />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
