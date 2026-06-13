'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Mountain, Gamepad2, MessageSquare } from 'lucide-react'

const navItems = [
  { href: '/feed',     label: 'Feed',       icon: Home },
  { href: '/music',    label: 'Network',    icon: Users },
  { href: '/climbing', label: 'Experience', icon: Mountain },
  { href: '/games',    label: 'Skills',     icon: Gamepad2 },
  { href: '/messages', label: 'Messages',   icon: MessageSquare },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-seno-bg/95 backdrop-blur-md border-t border-seno-border" aria-label="Mobile navigation">
      {/* Gold top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-seno-gold to-transparent opacity-30" />
      <div className="flex items-stretch pb-safe">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 relative"
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-seno-gold rounded-full" />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? 'text-seno-gold' : 'text-seno-dim'}
              />
              <span className={`text-[9px] font-semibold tracking-wide ${active ? 'text-seno-gold' : 'text-seno-dim'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
