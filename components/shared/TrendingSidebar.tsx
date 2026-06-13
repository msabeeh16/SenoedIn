import Link from 'next/link'
import { Card } from '../ui/Card'
import { TrendingUp } from 'lucide-react'

const trends = [
  { tag: '#TreatyViolation', posts: '2.4k incidents', hot: true },
  { tag: '#AdvancedNapping', posts: '8.1k endorsements', hot: true },
  { tag: '#LootBlindness', posts: '1.7k audits', hot: false },
  { tag: '#V4OrVibes', posts: '934 route reports', hot: false },
  { tag: '#StrategicYearning', posts: '3.2k alignments', hot: true },
  { tag: '#FenceLineDispute', posts: '512 escalations', hot: false },
]

export function TrendingSidebar() {
  return (
    <Card padding={false}>
      <div className="px-4 pt-4 pb-2 border-b border-seno-border flex items-center gap-2">
        <TrendingUp size={16} className="text-seno-blue" />
        <span className="text-sm font-bold text-seno-dark">Escalating Professionally</span>
      </div>
      <ul className="divide-y divide-seno-border">
        {trends.map(({ tag, posts, hot }) => (
          <li key={tag}>
            <Link
              href="/feed"
              className="flex items-start justify-between px-4 py-3 hover:bg-seno-surface transition-colors group"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-seno-blue group-hover:underline">{tag}</span>
                  {hot && (
                    <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded-full">HOT</span>
                  )}
                </div>
                <p className="text-xs text-seno-muted mt-0.5">{posts}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-4 py-3 text-xs text-seno-muted border-t border-seno-border">
        Trends curated by the feline communications department.
      </div>
    </Card>
  )
}
