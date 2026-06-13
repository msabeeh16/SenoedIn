'use client'

import { useState } from 'react'
import { Send, ArrowLeft } from 'lucide-react'

const GOLD = '#d4a017'

const THREADS = [
  {
    id: 'thread-1',
    name: 'Director Whiskers',
    title: 'Chief Nap Strategist · Territorial Account Manager',
    avatar: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=80&h=80&fit=crop&auto=format',
    unread: 2,
    time: '14m',
    preview: 'The sun patch situation is not aligned with my contributions.',
    messages: [
      { from: 'them', text: 'Good morning. I am reaching out regarding the sun patch allocation for Q3.', time: '9:02 AM' },
      { from: 'them', text: 'Per our agreement last Thursday (I sat on your laptop), I was allocated the south-facing window from 9am to 2pm daily.', time: '9:04 AM' },
      { from: 'me', text: 'I think we may have different recollections of what the laptop incident meant.', time: '9:47 AM' },
      { from: 'them', text: 'I have documentation. It is a memory I have. I am willing to share in extended stare format.', time: '9:49 AM' },
      { from: 'them', text: 'The sun patch situation is not aligned with my contributions.', time: '2:31 PM' },
    ],
  },
  {
    id: 'thread-2',
    name: 'CEO Biscuit',
    title: 'Executive Blanket Relocator · Feedback Refusal Specialist',
    avatar: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=80&h=80&fit=crop&auto=format',
    unread: 0,
    time: '1h',
    preview: 'The blanket remains under my governance. No further notes.',
    messages: [
      { from: 'me', text: 'Hi Biscuit, I wanted to follow up on the blanket situation.', time: 'Yesterday, 8:14 PM' },
      { from: 'them', text: 'Thank you for your message. I have received your feedback and am reviewing it with my team (myself).', time: 'Yesterday, 11:47 PM' },
      { from: 'them', text: 'After careful review, I have determined that the feedback is not aligned with my current strategic vision for the blanket.', time: 'Today, 8:02 AM' },
      { from: 'them', text: 'The blanket remains under my governance. No further notes.', time: 'Today, 1:15 PM' },
    ],
  },
  {
    id: 'thread-3',
    name: '✨ Mysterious Stranger (Aug 28)',
    title: 'Unknown · Possible Human · Playground Division',
    avatar: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=80&h=80&fit=crop&auto=format',
    unread: 1,
    time: 'Aug 28',
    preview: 'Do you want some chocolate milk?',
    messages: [
      { from: 'them', text: 'Hi. This is weird but — do you want some chocolate milk?', time: 'Aug 28, 3:47 PM' },
      { from: 'me', text: '...Yes. Obviously yes.', time: 'Aug 28, 3:48 PM' },
      { from: 'them', text: 'I also have bourbon cookies. Fair warning: no Milky Way, no galaxy bar. Hard line.', time: 'Aug 28, 3:49 PM' },
      { from: 'me', text: 'Honestly that is the correct position on Milky Way. Respect.', time: 'Aug 28, 3:50 PM' },
      { from: 'them', text: "Do you climb? There's a wall over there that looks like maybe a V4 or honestly maybe harder.", time: 'Aug 28, 4:12 PM' },
    ],
  },
  {
    id: 'thread-4',
    name: 'PurrfessionalRecruiter_Bot',
    title: 'Automated Talent Acquisition · Suspiciously Enthusiastic',
    avatar: 'https://images.unsplash.com/photo-1581456495146-65a71543d316?w=80&h=80&fit=crop&auto=format',
    unread: 0,
    time: '3h',
    preview: "I'm reaching out about an exciting opportunity in Territorial Expansion!",
    messages: [
      { from: 'them', text: "Hi Seno! Your background in Strategic Napping and Fence-Line Management is exactly what our client is looking for!", time: '10:00 AM' },
      { from: 'them', text: "Chief Territorial Officer at a growing household (3 cats, 1 dog, unresolved ottoman dispute). Comp: unlimited lap access, 2 windows with bird view.", time: '10:01 AM' },
      { from: 'me', text: "I'm curious — what is the current status of the 'unresolved ottoman dispute' you mentioned?", time: '11:34 AM' },
      { from: 'them', text: "Great question! The ottoman dispute is a growth opportunity. Also, the dog is very open to feedback (she is not open to feedback). Available 3am–4am for a call.", time: '11:35 AM' },
    ],
  },
  {
    id: 'thread-5',
    name: 'SenoedIn Compatibility Engine',
    title: 'Music Networking · Automated Notification',
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop&auto=format',
    unread: 1,
    time: '30m',
    preview: 'You and VP Fluffington have endorsed 3 overlapping emotional competencies.',
    messages: [
      { from: 'them', text: '🎵 Networking Opportunity Identified', time: '2:47 PM' },
      { from: 'them', text: 'You and VP Fluffington have endorsed three overlapping emotional competencies. Our algorithm suggests 87% yearning alignment.', time: '2:47 PM' },
      { from: 'them', text: 'Suggested message: "I noticed your strong background in emotionally ambiguous bass lines and felt compelled to reach out professionally."', time: '2:47 PM' },
    ],
  },
]

type Thread = typeof THREADS[0]
type Msg = { from: string; text: string; time: string }

export default function MessagesPage() {
  const [threads, setThreads] = useState(THREADS)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [localMsgs, setLocalMsgs] = useState<Record<string, Msg[]>>(() => {
    const init: Record<string, Msg[]> = {}
    THREADS.forEach(t => { init[t.id] = t.messages })
    return init
  })
  const [input, setInput] = useState('')

  const active = threads.find(t => t.id === activeId) ?? null

  const openThread = (t: Thread) => {
    setThreads(prev => prev.map(th => th.id === t.id ? { ...th, unread: 0 } : th))
    setActiveId(t.id)
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !activeId) return
    const msg: Msg = { from: 'me', text: input.trim(), time: 'now' }
    setLocalMsgs(prev => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), msg] }))
    setThreads(prev => prev.map(t => t.id === activeId ? { ...t, preview: msg.text } : t))
    setInput('')
  }

  const threadList = (
    <div className="flex flex-col h-full" style={{ background: '#0a0a0a' }}>
      <div className="px-4 pt-4 pb-3">
        <div style={{ color: '#f0ede4', fontWeight: 800, fontSize: 16 }}>Messages</div>
        <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>Your professional cat network</div>
      </div>
      <div style={{ height: 1, background: '#1e1e1e', margin: '0 16px' }} />
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {threads.map(t => (
          <button
            key={t.id}
            onClick={() => openThread(t)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
            style={{ borderBottom: '1px solid #111' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#111')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div
              className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden"
              style={{ border: t.unread > 0 ? `2px solid ${GOLD}` : '2px solid #2a2a2a' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span style={{ color: '#f0ede4', fontSize: 13, fontWeight: t.unread > 0 ? 800 : 500 }} className="truncate">{t.name}</span>
                <span style={{ color: '#555', fontSize: 10, flexShrink: 0, marginLeft: 8 }}>{t.time}</span>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                <span className="truncate" style={{ color: t.unread > 0 ? '#f0ede4' : '#555', fontSize: 12, flex: 1, marginRight: 8 }}>
                  {t.preview}
                </span>
                {t.unread > 0 && (
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: GOLD, color: '#0a0a0a', fontSize: 9, fontWeight: 900 }}>
                    {t.unread}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  const chatView = active && (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid #1e1e1e' }}>
        <button onClick={() => setActiveId(null)} className="sm:hidden" style={{ color: '#888' }}>
          <ArrowLeft size={18} />
        </button>
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${GOLD}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={active.avatar} alt={active.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div style={{ color: '#f0ede4', fontWeight: 800, fontSize: 14 }}>{active.name}</div>
          <div style={{ color: '#22c55e', fontSize: 10 }}>● Online</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {(localMsgs[active.id] ?? []).map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-xs px-3 py-2 rounded-2xl"
              style={{
                background: msg.from === 'me' ? GOLD : '#1a1a1a',
                color: msg.from === 'me' ? '#0a0a0a' : '#f0ede4',
                fontSize: 13,
                fontWeight: msg.from === 'me' ? 600 : 400,
                borderBottomRightRadius: msg.from === 'me' ? 4 : undefined,
                borderBottomLeftRadius: msg.from === 'them' ? 4 : undefined,
              }}
            >
              {msg.text}
              <div style={{ color: msg.from === 'me' ? 'rgba(0,0,0,0.4)' : '#555', fontSize: 9, marginTop: 3, textAlign: 'right' }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="px-4 py-3" style={{ borderTop: '1px solid #1e1e1e' }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#f0ede4', fontSize: 13, caretColor: GOLD }}
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: input.trim() ? GOLD : '#2a2a2a',
              color: input.trim() ? '#0a0a0a' : '#555',
              boxShadow: input.trim() ? '0 0 10px rgba(212,160,23,0.3)' : 'none',
            }}
          >
            <Send size={13} />
          </button>
        </div>
      </form>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-0 sm:px-3 py-0 sm:py-4">
      <div className="flex overflow-hidden sm:rounded-2xl" style={{ height: 'calc(100dvh - 120px)', minHeight: 400, border: '1px solid #1e1e1e', background: '#0a0a0a' }}>
        {/* Desktop two-panel */}
        <div className="hidden sm:flex flex-1">
          <div style={{ width: 280, borderRight: '1px solid #1e1e1e', flexShrink: 0 }}>
            {threadList}
          </div>
          <div className="flex-1">
            {active ? chatView : (
              <div className="flex flex-col items-center justify-center h-full" style={{ color: '#555' }}>
                <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.3 }}>💬</div>
                <div style={{ fontSize: 13 }}>Select a conversation</div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile single-panel */}
        <div className="flex sm:hidden flex-1">
          {active ? chatView : threadList}
        </div>
      </div>
    </div>
  )
}
