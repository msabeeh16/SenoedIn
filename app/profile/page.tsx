'use client'

import { seedProfile } from '../../data/seed-profile'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { MapPin, Eye, Users, Award, Mountain, Music, Gamepad2, Lock } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const p = seedProfile

  return (
    <div className="max-w-xl mx-auto px-3 py-4 space-y-4">
      {/* Hero card */}
      <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
        {/* Gold banner */}
        <div className="h-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1300 0%, #2a1a00 50%, #0a0a0a 100%)' }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #d4a017 1px, transparent 1px), radial-gradient(circle at 70% 30%, #d4a017 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-seno-card to-transparent" />
        </div>
        <div className="px-4 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-4 flex-wrap gap-2">
            <div className="w-20 h-20 rounded-full bg-seno-gold border-4 border-seno-card flex items-center justify-center text-[#0a0a0a] text-2xl font-black shadow-lg animate-gold-glow">
              {p.avatarInitials}
            </div>
            <div className="flex gap-2 flex-wrap mt-8">
              <Button variant="outline" size="sm">Connect</Button>
              <Button size="sm">Endorse</Button>
            </div>
          </div>

          <h1 className="text-xl font-black text-seno-text">{p.name}</h1>
          <p className="text-sm text-seno-muted mt-1">{p.headline}</p>

          <div className="flex items-center flex-wrap gap-3 mt-2 text-xs text-seno-dim">
            <span className="flex items-center gap-1"><MapPin size={11} />{p.location}</span>
            <span className="flex items-center gap-1"><Users size={11} />{p.connections} connections</span>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <Link href="/climbing"><Badge variant="gold">🧗 Route Setter</Badge></Link>
            <Link href="/games"><Badge variant="purple">🎮 Audit Division</Badge></Link>
            <Link href="/music"><Badge variant="green">🎵 Music Network</Badge></Link>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/40 to-transparent" />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={14} className="text-seno-gold" />
            <h2 className="font-bold text-seno-text text-sm">Your Analytics</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: 'Profile views', value: p.profileViews.toLocaleString(), icon: '👁️' },
              { label: 'Treaty violations', value: p.treatyViolations.toString(), icon: '📋' },
              { label: 'Routes imagined', value: p.routesImagined.toString(), icon: '🧗' },
              { label: 'Yearning alignment', value: `${p.yearningAlignment}%`, icon: '🎵' },
              { label: 'Diamond incidents', value: p.escalatedIncidents.toString(), icon: '💎' },
              { label: 'Endorsements', value: '284', icon: '👍' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-seno-card-2 rounded-xl p-3 border border-seno-border">
                <div className="text-lg mb-1">{icon}</div>
                <div className="text-xl font-black text-seno-gold">{value}</div>
                <div className="text-[10px] text-seno-dim mt-0.5 leading-snug">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-seno-dim border-t border-seno-border pt-3">
            <Lock size={10} />
            <span>Private to you and anyone standing behind you.</span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-seno-card border border-seno-border rounded-2xl p-4">
        <h2 className="font-bold text-seno-text text-sm mb-3">About</h2>
        <div className="text-sm text-seno-muted leading-relaxed space-y-3">
          {p.about.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-seno-card border border-seno-border rounded-2xl p-4">
        <h2 className="font-bold text-seno-text text-sm mb-4">Experience</h2>
        <div className="space-y-5">
          {p.experience.map(exp => (
            <div key={exp.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-seno-gold-tint border border-seno-border-gold flex items-center justify-center text-seno-gold shrink-0">
                {exp.id === 'exp-1' ? <Users size={18} /> :
                 exp.id === 'exp-2' ? <Mountain size={18} /> :
                 exp.id === 'exp-3' ? <Gamepad2 size={18} /> :
                 <Music size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-seno-text text-sm">{exp.title}</h3>
                <p className="text-xs text-seno-muted">{exp.company}</p>
                <p className="text-xs text-seno-dim">{exp.period}</p>
                <p className="text-xs text-seno-muted mt-2 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-seno-card border border-seno-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Award size={14} className="text-seno-gold" />
          <h2 className="font-bold text-seno-text text-sm">Skills & Endorsements</h2>
        </div>
        <div className="space-y-4">
          {p.skills.map(skill => (
            <div key={skill.id} className="border-b border-seno-border last:border-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-seno-text">{skill.name}</h3>
                  <p className="text-[10px] text-seno-dim mt-0.5">
                    Endorsed by {skill.endorsers.slice(0, 2).join(', ')}
                    {skill.endorsers.length > 2 ? ` +${skill.endorsers.length - 2} more` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-seno-gold">{skill.endorsementCount}</span>
                  <p className="text-[9px] text-seno-dim">endorsements</p>
                </div>
              </div>
              <div className="mt-2 h-1 bg-seno-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.min(100, (skill.endorsementCount / 100) * 100)}%`, background: 'linear-gradient(90deg,#d4a017,#e8b820)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div className="bg-seno-card border border-seno-border rounded-2xl p-4">
        <h2 className="font-bold text-seno-text text-sm mb-3">Activity</h2>
        <p className="text-xs text-seno-dim mb-4">{p.connections} cats are watching your escalations.</p>
        <div className="space-y-2">
          {[
            { text: 'Published route report: Compliance Overhang (V5 Regulated)', link: '/climbing', time: '1w ago', icon: '🧗' },
            { text: 'Endorsed Quarterly Synergy Arete as a "growth experience"', link: '/climbing', time: '2w ago', icon: '📋' },
            { text: 'Completed audit: Historic dirt-hut incident detected', link: '/games', time: '2w ago', icon: '🎮' },
            { text: 'Music compatibility dossier prepared for executive review', link: '/music', time: '3w ago', icon: '🎵' },
          ].map((item, i) => (
            <Link key={i} href={item.link} className="flex gap-3 group hover:bg-seno-card-2 rounded-xl p-2 -mx-2 transition-colors">
              <span className="text-lg shrink-0">{item.icon}</span>
              <div>
                <p className="text-xs text-seno-text group-hover:text-seno-gold transition-colors">{item.text}</p>
                <p className="text-[10px] text-seno-dim mt-0.5">{item.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
