interface CatAvatarProps {
  name: string
  avatar: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-9 h-9 text-lg',
  md: 'w-11 h-11 text-2xl',
  lg: 'w-16 h-16 text-3xl',
}

export function CatAvatar({ name, avatar, color, size = 'md' }: CatAvatarProps) {
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center shrink-0 ring-1 ring-seno-border-gold`}
      style={{ backgroundColor: color + '18' }}
      aria-label={name}
      title={name}
    >
      <span role="img" aria-hidden>{avatar}</span>
    </div>
  )
}
