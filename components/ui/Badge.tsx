type BadgeVariant = 'default' | 'gold' | 'green' | 'orange' | 'red' | 'purple' | 'blue'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-seno-card-2 text-seno-muted border border-seno-border',
  gold:    'bg-seno-gold/15 text-seno-gold border border-seno-gold/30',
  green:   'bg-green-900/40 text-green-400 border border-green-800/50',
  orange:  'bg-orange-900/40 text-orange-400 border border-orange-800/50',
  red:     'bg-red-900/40 text-red-400 border border-red-800/50',
  purple:  'bg-purple-900/40 text-purple-400 border border-purple-800/50',
  blue:    'bg-blue-900/40 text-blue-400 border border-blue-800/50',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
