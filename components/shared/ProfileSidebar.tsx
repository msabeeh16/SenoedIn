import Link from 'next/link'
import { Card } from '../ui/Card'
import { seedProfile } from '../../data/seed-profile'
import { MapPin, Eye } from 'lucide-react'

export function ProfileSidebar() {
  const { name, headline, location, connections, profileViews } = seedProfile
  return (
    <Card padding={false}>
      {/* Banner */}
      <div className="h-14 bg-gradient-to-br from-seno-blue to-seno-blue-dark rounded-t-xl" />
      <div className="px-4 pb-4 -mt-7">
        <Link href="/profile">
          <div className="w-14 h-14 rounded-full bg-seno-accent border-2 border-seno-card flex items-center justify-center text-white text-xl font-black shadow-sm hover:opacity-90 transition-opacity">
            SE
          </div>
        </Link>
        <Link href="/profile" className="hover:underline">
          <h3 className="font-bold text-seno-dark mt-2">{name}</h3>
        </Link>
        <p className="text-xs text-seno-muted mt-0.5 leading-snug">{headline}</p>
        <p className="text-xs text-seno-muted mt-1 flex items-center gap-1">
          <MapPin size={11} /> {location}
        </p>

        <div className="mt-3 pt-3 border-t border-seno-border space-y-1.5">
          <Link href="/profile" className="flex items-center justify-between text-xs hover:bg-seno-surface rounded px-1 py-0.5 transition-colors">
            <span className="text-seno-muted">Cats in your network</span>
            <span className="font-bold text-seno-blue">{connections}</span>
          </Link>
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-seno-muted flex items-center gap-1"><Eye size={11} /> Profile views</span>
            <span className="font-bold text-seno-blue">{profileViews.toLocaleString()}</span>
          </div>
        </div>

        <Link
          href="/profile"
          className="mt-3 block text-center text-xs font-semibold text-seno-blue border border-seno-blue rounded-full py-1.5 hover:bg-seno-blue-pale transition-colors"
        >
          View full dossier
        </Link>
      </div>
    </Card>
  )
}
