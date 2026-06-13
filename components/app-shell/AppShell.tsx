import { Header } from './Header'
import { MobileNav } from './MobileNav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-seno-bg">
      <Header />
      <main className="flex-1 pb-20 sm:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
