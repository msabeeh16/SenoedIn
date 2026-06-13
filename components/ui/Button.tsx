import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-seno-gold text-[#0a0a0a] font-bold hover:bg-seno-gold-light active:scale-95 shadow-sm hover:shadow-[0_0_12px_rgba(212,160,23,0.4)]',
  secondary: 'bg-seno-gold-tint text-seno-gold border border-seno-border-gold hover:bg-seno-gold/20 active:scale-95',
  ghost:     'text-seno-muted hover:bg-seno-card-2 hover:text-seno-text active:scale-95',
  danger:    'bg-red-700 text-white hover:bg-red-600 active:scale-95',
  outline:   'border border-seno-border text-seno-text hover:border-seno-gold hover:text-seno-gold active:scale-95',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-full',
  md: 'text-sm px-4 py-2 rounded-full',
  lg: 'text-base px-5 py-2.5 rounded-full',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className = '', children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-1.5 font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </>
      ) : children}
    </button>
  )
)
Button.displayName = 'Button'
