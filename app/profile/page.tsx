'use client'

import { seedProfile } from '../../data/seed-profile'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { MapPin, Eye, Users, Award, Mountain, Music, Gamepad2, Lock } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const p = seedProfile

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      {/* Hero card */}
      <Card padding={false}>
        <div className="h-32 bg-gradient-to-br from-seno-blue via-seno-blue-dark to-blue-900 rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-12 mb-4 flex-wrap gap-3">
            <div className="w-28 h-28 rounded-full bg-seno-accent border-4 border-seno-card flex items-center justify-center text-white text-4xl font-black shadow-lg">
              {p.avatarInitials}
            </div>
            <div className="flex gap-2 flex-wrap mt-8">
              <Button variant="outline" size="sm">Connect</Button>
              <Button variant="outline" size="sm">Message</Button>
              <Button size="sm">Endorse Questionable Judgment</Button>
            </div>
          </div>

          <h1 className="text-2xl font-black text-seno-dark">{p.name}</h1>
          <p className="text-base text-seno-dark mt-1">{p.headline}</p>

          <div className="flex items-center flex-wrap gap-3 mt-2 text-sm text-seno-muted">
            <span className="flex items-center gap-1"><MapPin size={14} />{p.location}</span>
            <span className="flex items-center gap-1"><Users size={14} />{p.connections}</span>
          </div>

          <div className="flex gap-3 mt-3 flex-wrap">
            <Link href="/climbing">
              <Badge variant="blue">🧗 Amateur Route Setter</Badge>
            </Link>
            <Link href="/games">
              <Badge variant="purple">🎮 Minecraft Performance Auditor</Badge>
            </Link>
            <Link href="/music">
              <Badge variant="green">🎵 Music Networking Thought Leader</Badge>
            </Link>
          </div>
        </div>
      </Card>

      {/* Analytics */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Eye size={16} className="text-seno-blue" />
          <h2 className="font-bold text-seno-dark">Your Analytics</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Profile views', value: p.profileViews.toLocaleString(), icon: '👁️' },
            { label: 'Cat treaty violations monitored', value: p.treatyViolations.toString(), icon: '📋' },
            { label: 'V-grade routes professionally imagined', value: p.routesImagined.toString(), icon: '🧗' },
            { label: 'Yearning alignment', value: `${p.yearningAlignment}%`, icon: '🎵' },
            { label: 'Diamond incidents escalated', value: p.escalatedIncidents.toString(), icon: '💎' },
            { label: 'Endorsements received', value: '284', icon: '👍' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-seno-surface rounded-xl p-3">
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-2xl font-black text-seno-blue">{value}</div>
              <div className="text-xs text-seno-muted mt-0.5">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-seno-muted border-t border-seno-border pt-3">
          <Lock size={11} />
          <span>Private to you and anyone standing behind you.</span>
        </div>
      </Card>

      {/* About */}
      <Card>
        <h2 className="font-bold text-seno-dark mb-3">About</h2>
        <div className="text-sm text-seno-dark leading-relaxed space-y-3">
          {p.about.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Card>

      {/* Experience */}
      <Card>
        <h2 className="font-bold text-seno-dark mb-4">Experience</h2>
        <div className="space-y-5">
          {p.experience.map(exp => (
            <div key={exp.id} className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-seno-blue-light flex items-center justify-center text-seno-blue shrink-0">
                {exp.id === 'exp-1' ? <Users size={22} /> :
                 exp.id === 'exp-2' ? <Mountain size={22} /> :
                 exp.id === 'exp-3' ? <Gamepad2 size={22} /> :
                 <Music size={22} />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-seno-dark text-sm">{exp.title}</h3>
                <p className="text-xs text-seno-muted">{exp.company}</p>
                <p className="text-xs text-seno-muted">{exp.period}</p>
                <p className="text-sm text-seno-dark mt-2 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills & Endorsements */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Award size={16} className="text-seno-blue" />
          <h2 className="font-bold text-seno-dark">Skills & Endorsements</h2>
        </div>
        <div className="space-y-4">
          {p.skills.map(skill => (
            <div key={skill.id} className="border-b border-seno-border last:border-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-seno-dark">{skill.name}</h3>
                  <p className="text-xs text-seno-muted mt-0.5">
                    Endorsed by {skill.endorsers.slice(0, 2).join(', ')}
                    {skill.endorsers.length > 2 ? ` and ${skill.endorsers.length - 2} other${skill.endorsers.length - 2 > 1 ? 's' : ''}` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-seno-blue">{skill.endorsementCount}</span>
                  <p className="text-[10px] text-seno-muted">endorsements</p>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-seno-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-seno-blue rounded-full"
                  style={{ width: `${Math.min(100, (skill.endorsementCount / 100) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity */}
      <Card>
        <h2 className="font-bold text-seno-dark mb-3">Activity</h2>
        <p className="text-sm text-seno-muted mb-4">{p.connections} cats are watching your escalations.</p>
        <div className="space-y-3">
          {[
            { text: 'Published a route report: Compliance Overhang (V5 Regulated)', link: '/climbing', time: '1 week ago', icon: '🧗' },
            { text: 'Endorsed Quarterly Synergy Arete as a "growth experience"', link: '/climbing', time: '2 weeks ago', icon: '📋' },
            { text: 'Completed Watcher\'s Log audit: Historic dirt-hut incident detected', link: '/games', time: '2 weeks ago', icon: '🎮' },
            { text: 'Music compatibility dossier prepared for executive review', link: '/music', time: '3 weeks ago', icon: '🎵' },
          ].map((item, i) => (
            <Link key={i} href={item.link} className="flex gap-3 group hover:bg-seno-surface rounded-lg p-2 -mx-2 transition-colors">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm text-seno-dark group-hover:text-seno-blue transition-colors">{item.text}</p>
                <p className="text-xs text-seno-muted mt-0.5">{item.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
