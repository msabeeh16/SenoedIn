interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: boolean
  gold?: boolean
}

export function Card({ children, className = '', padding = true, gold = false }: CardProps) {
  return (
    <div className={`bg-seno-card rounded-2xl ${gold ? 'border border-seno-border-gold' : 'border border-seno-border'} ${padding ? 'p-4' : ''} ${className}`}>
      {children}
    </div>
  )
}
