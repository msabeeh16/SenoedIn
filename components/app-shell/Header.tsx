'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'

const routeTitles: Record<string, string> = {
  '/feed':     'OnlyPaws',
  '/profile':  'Profile',
  '/climbing': 'Route Portfolio',
  '/games':    "Watcher's Log",
  '/music':    'Music Networking',
  '/messages': 'Messages',
}

export function Header() {
  const pathname = usePathname()
  const title = routeTitles[pathname] ?? 'SenoedIn'

  return (
    <header className="sticky top-0 z-40 bg-seno-bg/90 backdrop-blur-md border-b border-seno-border">
      {/* Gold top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-seno-gold to-transparent opacity-60" />
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link href="/profile" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 rounded-xl bg-seno-gold flex items-center justify-center shadow-[0_0_10px_rgba(212,160,23,0.4)] group-hover:shadow-[0_0_16px_rgba(212,160,23,0.6)] transition-shadow">
            <span className="text-[#0a0a0a] font-black text-base leading-none">S</span>
            <span className="absolute -bottom-0.5 -right-0.5 text-[8px]">🐾</span>
          </div>
          <span className="hidden sm:block font-black text-lg tracking-tight">
            <span className="text-seno-gold">Senoed</span><span className="text-seno-text">In</span>
          </span>
        </Link>

        {/* Page title — mobile only */}
        <span className="sm:hidden text-sm font-bold text-seno-text absolute left-1/2 -translate-x-1/2">
          {title}
        </span>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Primary navigation">
          {[
            { href: '/feed', label: 'Feed' },
            { href: '/music', label: 'Network' },
            { href: '/climbing', label: 'Experience' },
            { href: '/games', label: 'Skills' },
            { href: '/messages', label: 'Messages' },
            { href: '/profile', label: 'Profile' },
          ].map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? 'text-seno-gold bg-seno-gold-tint border border-seno-border-gold'
                    : 'text-seno-muted hover:text-seno-text hover:bg-seno-card-2'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right: notification bell */}
        <Link href="/messages" aria-label="Developments" className="relative p-2 rounded-xl hover:bg-seno-card-2 text-seno-muted hover:text-seno-text transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-seno-gold rounded-full" />
        </Link>
      </div>
    </header>
  )
}
