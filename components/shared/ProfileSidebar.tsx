import Link from 'next/link'
import { seedProfile } from '../../data/seed-profile'
import { MapPin, Eye } from 'lucide-react'

export function ProfileSidebar() {
  const { name, headline, location, connections, profileViews } = seedProfile
  return (
    <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
      {/* Gold banner */}
      <div className="h-14 bg-gradient-to-br from-seno-gold-dark to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d4a017 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      </div>
      <div className="px-4 pb-4 -mt-7">
        <Link href="/profile">
          <div className="w-14 h-14 rounded-full bg-seno-gold border-2 border-seno-card flex items-center justify-center text-[#0a0a0a] text-xl font-black shadow-lg hover:opacity-90 transition-opacity animate-gold-glow">
            SE
          </div>
        </Link>
        <Link href="/profile" className="hover:underline">
          <h3 className="font-bold text-seno-text mt-2 text-sm">{name}</h3>
        </Link>
        <p className="text-[11px] text-seno-muted mt-0.5 leading-snug">{headline}</p>
        <p className="text-[11px] text-seno-dim mt-1 flex items-center gap-1">
          <MapPin size={10} /> {location}
        </p>

        <div className="mt-3 pt-3 border-t border-seno-border space-y-1.5">
          <Link href="/profile" className="flex items-center justify-between text-xs hover:bg-seno-card-2 rounded-lg px-1 py-1 transition-colors">
            <span className="text-seno-dim">Cats in your network</span>
            <span className="font-bold text-seno-gold">{connections}</span>
          </Link>
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-seno-dim flex items-center gap-1"><Eye size={10} /> Profile views</span>
            <span className="font-bold text-seno-gold">{profileViews.toLocaleString()}</span>
          </div>
        </div>

        <Link
          href="/profile"
          className="mt-3 block text-center text-[11px] font-semibold text-seno-gold border border-seno-border-gold rounded-full py-1.5 hover:bg-seno-gold-tint transition-colors"
        >
          View full dossier
        </Link>
      </div>
    </div>
  )
}
