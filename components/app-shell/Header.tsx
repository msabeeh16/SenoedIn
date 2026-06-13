'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Mountain, Gamepad2, MessageSquare, Bell } from 'lucide-react'

const navItems = [
  { href: '/feed', label: 'Home', icon: Home },
  { href: '/music', label: 'My Network', icon: Users },
  { href: '/climbing', label: 'Experience', icon: Mountain },
  { href: '/games', label: 'Skills', icon: Gamepad2 },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
]

function SenoedInLogo() {
  return (
    <Link href="/profile" className="flex items-center gap-2 group">
      <div className="relative w-9 h-9 bg-seno-blue rounded-lg flex items-center justify-center shadow-sm group-hover:bg-seno-blue-dark transition-colors">
        <span className="text-white font-black text-lg leading-none">S</span>
        <span className="absolute -bottom-0.5 -right-0.5 text-[8px]">🐾</span>
      </div>
      <span className="hidden sm:block font-black text-seno-blue text-xl tracking-tight">
        Senoed<span className="text-seno-dark">In</span>
      </span>
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-seno-card border-b border-seno-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        <SenoedInLogo />

        {/* Search pill — decorative */}
        <div className="hidden md:flex items-center gap-2 bg-seno-surface border border-seno-border rounded-full px-3 py-1.5 text-sm text-seno-muted min-w-40 cursor-default">
          <span className="text-xs">🔍</span>
          <span>Search cats, routes...</span>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-auto" aria-label="Primary navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors min-w-14 ${
                  active
                    ? 'text-seno-blue border-b-2 border-seno-blue rounded-b-none pb-[5px]'
                    : 'text-seno-muted hover:text-seno-dark hover:bg-gray-50'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span className="hidden lg:block">{label}</span>
              </Link>
            )
          })}

          <div className="w-px h-8 bg-seno-border mx-1" />

          <Link
            href="/profile"
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              pathname === '/profile' ? 'text-seno-blue' : 'text-seno-muted hover:text-seno-dark hover:bg-gray-50'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-seno-blue flex items-center justify-center text-white text-xs font-bold">S</div>
            <span className="hidden lg:block">Profile</span>
          </Link>

          <button
            aria-label="Developments"
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium text-seno-muted hover:text-seno-dark hover:bg-gray-50 relative"
          >
            <Bell size={20} strokeWidth={1.8} />
            <span className="hidden lg:block">Developments</span>
            <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
        </nav>

        {/* Mobile profile link */}
        <Link href="/profile" className="ml-auto md:hidden">
          <div className="w-8 h-8 rounded-full bg-seno-blue flex items-center justify-center text-white text-sm font-bold">S</div>
        </Link>
      </div>
    </header>
  )
}
