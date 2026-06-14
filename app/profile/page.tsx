'use client'

import { useState } from 'react'
import { seedProfile } from '../../data/seed-profile'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { MapPin, Eye, Users, Award, Mountain, Music, Gamepad2, Lock, Cat, TrendingUp, AlertTriangle, Heart, Diamond, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { Toast } from '../../components/ui/Toast'

export default function ProfilePage() {
  const p = seedProfile
  const [connected, setConnected] = useState(false)
  const [endorsed, setEndorsed] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse 90% 40% at 50% 0%, rgba(212,160,23,0.11) 0%, transparent 50%), radial-gradient(ellipse 60% 35% at 5% 60%, rgba(155,35,53,0.1) 0%, transparent 50%), #0a0a0a' }}>
    <div className="max-w-xl mx-auto px-3 py-4 space-y-4">
      {/* Hero card */}
      <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
        {/* Banner — garnet-to-gold gradient with dot pattern */}
        <div className="h-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a0006 0%, #2a0a00 30%, #1a1300 65%, #0a0a0a 100%)' }}>
          <div className="absolute inset-0 opacity-25"
            style={{ backgroundImage: 'radial-gradient(circle, #9B2335 1px, transparent 1px), radial-gradient(circle, #d4a017 1px, transparent 1px)', backgroundSize: '28px 28px, 56px 56px', backgroundPosition: '0 0, 14px 14px' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(155,35,53,0.3) 0%, transparent 50%, rgba(212,160,23,0.2) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-seno-card to-transparent" />
        </div>

        <div className="px-4 pb-5">
          <div className="flex items-end justify-between -mt-12 mb-4 flex-wrap gap-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-seno-gold border-4 border-seno-card flex items-center justify-center text-[#0a0a0a] text-2xl font-black shadow-lg animate-gold-glow">
                {p.avatarInitials}
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-seno-card" style={{ background: '#22c55e' }} />
            </div>
            <div className="flex gap-2 flex-wrap mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setConnected(v => !v)
                  setToast(connected ? 'Connection request withdrawn.' : 'Connection request sent.')
                }}
              >
                {connected ? '✓ Connected' : 'Connect'}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setEndorsed(v => !v)
                  setToast(endorsed ? 'Profile endorsement removed.' : 'Profile endorsed. +1 to their nap metrics.')
                }}
              >
                {endorsed ? '✓ Endorsed' : 'Endorse'}
              </Button>
            </div>
          </div>

          <h1 className="text-xl font-black text-seno-text">{p.name}</h1>
          <p className="text-xs font-semibold mt-0.5" style={{ color: '#9B2335' }}>@sixseveno</p>
          <p className="text-sm text-seno-muted mt-0.5">{p.headline}</p>

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

      {/* Arthur — cat companion card */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid rgba(155,35,53,0.35)' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #9B2335, #d4a017, transparent)' }} />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Cat size={14} style={{ color: '#9B2335' }} />
            <h2 className="font-bold text-sm" style={{ color: '#f0ede4' }}>Professional Associate</h2>
          </div>
          <div className="flex gap-3 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/seno-cat.jpg"
              alt="Arthur"
              className="rounded-xl object-cover shrink-0"
              style={{ width: 80, height: 80, border: '2px solid rgba(155,35,53,0.4)' }}
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-base" style={{ color: '#f0ede4' }}>Arthur</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{ background: 'rgba(155,35,53,0.15)', border: '1px solid rgba(155,35,53,0.4)', color: '#C42A40' }}>
                  Chief Nap Officer
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: '#888' }}>
                Sun-patch specialist. Lap acquisition expert. Co-author of the 2:47pm Protocol.
              </p>
              <p className="text-[10px] mt-1.5" style={{ color: '#555' }}>
                📍 Left armrest, southeast corner · Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #d4a017, #9B2335 60%, transparent)' }} />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={14} style={{ color: '#d4a017' }} />
            <h2 className="font-bold text-seno-text text-sm">Your Analytics</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: 'Profile views',     value: p.profileViews.toLocaleString(), icon: <TrendingUp size={13} />, accent: '#d4a017',  bg: 'rgba(212,160,23,0.08)',  border: 'rgba(212,160,23,0.2)' },
              { label: 'Treaty violations', value: p.treatyViolations.toString(),   icon: <AlertTriangle size={13} />, accent: '#C42A40', bg: 'rgba(155,35,53,0.08)',  border: 'rgba(155,35,53,0.2)' },
              { label: 'Routes imagined',   value: p.routesImagined.toString(),     icon: <Mountain size={13} />,      accent: '#d4a017',  bg: 'rgba(212,160,23,0.08)',  border: 'rgba(212,160,23,0.2)' },
              { label: 'Yearning %',        value: `${p.yearningAlignment}%`,       icon: <Heart size={13} />,         accent: '#22c55e',  bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)' },
              { label: 'Diamond incidents', value: p.escalatedIncidents.toString(), icon: <Diamond size={13} />,       accent: '#C42A40',  bg: 'rgba(155,35,53,0.08)',  border: 'rgba(155,35,53,0.2)' },
              { label: 'Endorsements',      value: '284',                           icon: <ThumbsUp size={13} />,      accent: '#d4a017',  bg: 'rgba(212,160,23,0.08)',  border: 'rgba(212,160,23,0.2)' },
            ].map(({ label, value, icon, accent, bg, border }) => (
              <div key={label} className="rounded-xl p-3 text-center" style={{ background: bg, border: `1px solid ${border}` }}>
                <div className="flex justify-center mb-1.5" style={{ color: accent }}>{icon}</div>
                <div className="text-lg font-black leading-none" style={{ color: accent }}>{value}</div>
                <div className="text-[9px] mt-1 leading-snug" style={{ color: '#666' }}>{label}</div>
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
      <div className="rounded-2xl p-4" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #9B2335, #d4a017)' }} />
          <h2 className="font-bold text-seno-text text-sm">About</h2>
        </div>
        <div className="text-sm text-seno-muted leading-relaxed space-y-3">
          {p.about.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #9B2335, #d4a017 60%, transparent)' }} />
        <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #d4a017, #9B2335)' }} />
          <h2 className="font-bold text-seno-text text-sm">Experience</h2>
        </div>
        <div className="space-y-5">
          {p.experience.map(exp => (
            <div key={exp.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                style={{ background: 'rgba(155,35,53,0.08)', borderColor: 'rgba(155,35,53,0.25)', color: '#C42A40' }}>
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
      </div>

      {/* Skills */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #a855f7, #9B2335 50%, transparent)' }} />
        <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Award size={14} style={{ color: '#a855f7' }} />
          <h2 className="font-bold text-seno-text text-sm">Skills & Endorsements</h2>
        </div>
        <div className="space-y-4">
          {p.skills.map((skill, idx) => {
            const barColor = idx % 3 === 0 ? '#d4a017' : idx % 3 === 1 ? '#9B2335' : '#a855f7'
            return (
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
                    <span className="text-lg font-black" style={{ color: barColor }}>{skill.endorsementCount}</span>
                    <p className="text-[9px] text-seno-dim">endorsements</p>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-seno-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(100, (skill.endorsementCount / 100) * 100)}%`, background: barColor }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </div>

      {/* Activity */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
        <div className="p-4">
        <h2 className="font-bold text-seno-text text-sm mb-1">Recent Activity</h2>
        <p className="text-xs text-seno-dim mb-4">{p.connections} cats are watching your escalations.</p>
        <div className="space-y-1">
          {[
            { text: 'Published route report: Compliance Overhang (V5 Regulated)', link: '/climbing', time: '1w ago', icon: '🧗' },
            { text: 'Endorsed Quarterly Synergy Arete as a "growth experience"', link: '/climbing', time: '2w ago', icon: '📋' },
            { text: 'Completed audit: Historic dirt-hut incident detected', link: '/games', time: '2w ago', icon: '🎮' },
            { text: 'Music compatibility dossier prepared for executive review', link: '/music', time: '3w ago', icon: '🎵' },
          ].map((item, i) => (
            <Link key={i} href={item.link} className="flex gap-3 group hover:bg-seno-card-2 rounded-xl p-2 -mx-2 transition-colors">
              <span className="text-base shrink-0">{item.icon}</span>
              <div>
                <p className="text-xs text-seno-text group-hover:text-seno-gold transition-colors">{item.text}</p>
                <p className="text-[10px] text-seno-dim mt-0.5">{item.time}</p>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
    </div>
  )
}
