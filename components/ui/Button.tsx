import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-seno-blue text-white hover:bg-seno-blue-dark active:scale-95',
  secondary: 'bg-seno-blue-light text-seno-blue hover:bg-seno-blue-pale active:scale-95',
  ghost: 'text-seno-muted hover:bg-gray-100 active:scale-95',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95',
  outline: 'border border-seno-border text-seno-dark hover:bg-gray-50 active:scale-95',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-full',
  md: 'text-sm px-4 py-2 rounded-full',
  lg: 'text-base px-5 py-2.5 rounded-full',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-1.5 font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
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
  }
)
Button.displayName = 'Button'
