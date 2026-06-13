'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Mountain, Gamepad2, MessageSquare } from 'lucide-react'

const navItems = [
  { href: '/feed', label: 'Home', icon: Home },
  { href: '/music', label: 'Network', icon: Users },
  { href: '/climbing', label: 'Experience', icon: Mountain },
  { href: '/games', label: 'Skills', icon: Gamepad2 },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-seno-card border-t border-seno-border"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                active ? 'text-seno-blue' : 'text-seno-muted'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
