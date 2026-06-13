'use client'

import { useState } from 'react'
import { seedMessages } from '../../data/seed-messages'
import type { MessageThread, ChatMessage } from '../../lib/types'
import { Button } from '../../components/ui/Button'
import { Send, ChevronLeft } from 'lucide-react'

export default function MessagesPage() {
  const [threads, setThreads] = useState<MessageThread[]>(seedMessages)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [newMsg, setNewMsg] = useState('')

  const activeThread = threads.find(t => t.id === activeId)

  const openThread = (id: string) => {
    setThreads(prev =>
      prev.map(t => t.id === id ? { ...t, isUnread: false } : t)
    )
    setActiveId(id)
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMsg.trim() || !activeId) return
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      senderName: 'Seno',
      content: newMsg.trim(),
      timestamp: 'Just now',
      isRead: true,
    }
    setThreads(prev =>
      prev.map(t =>
        t.id === activeId
          ? { ...t, messages: [...t.messages, msg], preview: msg.content, lastActivity: 'Just now' }
          : t
      )
    )
    setNewMsg('')
  }

  const unreadCount = threads.filter(t => t.isUnread).length

  return (
    <div className="max-w-2xl mx-auto px-3 py-4">
      <div
        className="flex bg-seno-card border border-seno-border rounded-2xl overflow-hidden"
        style={{ height: 'calc(100dvh - 120px)', minHeight: 400 }}
      >
        {/* Thread list */}
        <aside className={`w-full sm:w-64 border-r border-seno-border shrink-0 flex flex-col ${activeThread ? 'hidden sm:flex' : 'flex'}`}>
          <div className="px-4 py-3 border-b border-seno-border">
            <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/40 to-transparent -mx-4 mb-3" />
            <h1 className="font-black text-seno-text text-sm">Messages</h1>
            {unreadCount > 0 && (
              <p className="text-[10px] text-seno-dim mt-0.5">{unreadCount} unread development{unreadCount !== 1 ? 's' : ''}</p>
            )}
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-seno-border">
            {threads.map(thread => (
              <button
                key={thread.id}
                onClick={() => openThread(thread.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-seno-card-2 transition-colors ${
                  activeId === thread.id ? 'bg-seno-gold-tint border-l-2 border-l-seno-gold' : ''
                }`}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: thread.participantColor + '22' }}
                >
                  {thread.participantAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className={`text-xs font-semibold truncate ${thread.isUnread ? 'text-seno-text' : 'text-seno-muted'}`}>
                      {thread.participantName}
                    </span>
                    <span className="text-[9px] text-seno-dim shrink-0">{thread.lastActivity}</span>
                  </div>
                  <p className="text-[10px] text-seno-dim truncate mt-0.5">{thread.preview}</p>
                </div>
                {thread.isUnread && (
                  <span className="w-2 h-2 rounded-full bg-seno-gold shrink-0 mt-1.5" />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Message thread */}
        <div className={`flex-1 flex flex-col min-w-0 ${activeThread ? 'flex' : 'hidden sm:flex'}`}>
          {activeThread ? (
            <>
              {/* Thread header */}
              <div className="px-4 py-3 border-b border-seno-border flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setActiveId(null)}
                  className="sm:hidden p-1.5 rounded-full hover:bg-seno-card-2 text-seno-muted"
                  aria-label="Back to messages"
                >
                  <ChevronLeft size={16} />
                </button>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
                  style={{ backgroundColor: activeThread.participantColor + '22' }}
                >
                  {activeThread.participantAvatar}
                </div>
                <div>
                  <p className="font-bold text-xs text-seno-text">{activeThread.participantName}</p>
                  <p className="text-[10px] text-seno-dim">{activeThread.participantTitle}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {activeThread.messages.map(msg => {
                  const isUser = msg.senderId === 'user'
                  return (
                    <div key={msg.id} className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                      {!isUser && (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
                          style={{ backgroundColor: activeThread.participantColor + '22' }}
                        >
                          {activeThread.participantAvatar}
                        </div>
                      )}
                      <div
                        className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                          isUser
                            ? 'bg-seno-gold text-[#0a0a0a] rounded-tr-sm font-medium'
                            : 'bg-seno-card-2 text-seno-text rounded-tl-sm border border-seno-border'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className={`text-[9px] mt-1 ${isUser ? 'text-[#0a0a0a]/50 text-right' : 'text-seno-dim'}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="px-3 py-3 border-t border-seno-border flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  placeholder="Write a professional response..."
                  className="flex-1 bg-seno-card-2 border border-seno-border rounded-full px-4 py-2 text-xs text-seno-text placeholder:text-seno-dim outline-none focus:border-seno-border-gold transition-colors"
                  aria-label="Message input"
                />
                <Button type="submit" size="sm" disabled={!newMsg.trim()} className="rounded-full w-8 h-8 p-0 flex items-center justify-center">
                  <Send size={13} />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-seno-muted">
              <div className="text-4xl opacity-30">💬</div>
              <p className="font-semibold text-seno-text text-sm">Select a conversation</p>
              <p className="text-xs text-seno-dim">Your professional correspondence awaits.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
