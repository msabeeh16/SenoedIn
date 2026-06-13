interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: boolean
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-seno-card border border-seno-border rounded-xl shadow-sm ${padding ? 'p-4' : ''} ${className}`}>
      {children}
    </div>
  )
}
