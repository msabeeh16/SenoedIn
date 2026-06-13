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
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex gap-0 bg-seno-card border border-seno-border rounded-2xl overflow-hidden shadow-sm" style={{ minHeight: '70vh' }}>
        {/* Thread list */}
        <aside className={`w-full md:w-72 border-r border-seno-border shrink-0 flex flex-col ${activeThread ? 'hidden md:flex' : 'flex'}`}>
          <div className="px-4 py-3 border-b border-seno-border">
            <h1 className="font-black text-seno-dark text-base">Messages</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-seno-muted mt-0.5">{unreadCount} unread development{unreadCount !== 1 ? 's' : ''}</p>
            )}
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-seno-border">
            {threads.map(thread => (
              <button
                key={thread.id}
                onClick={() => openThread(thread.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-seno-surface transition-colors ${
                  activeId === thread.id ? 'bg-seno-blue-pale' : ''
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: thread.participantColor + '22' }}
                >
                  {thread.participantAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className={`text-sm font-semibold truncate ${thread.isUnread ? 'text-seno-dark' : 'text-seno-muted'}`}>
                      {thread.participantName}
                    </span>
                    <span className="text-[10px] text-seno-muted shrink-0">{thread.lastActivity}</span>
                  </div>
                  <p className="text-xs text-seno-muted truncate mt-0.5">{thread.preview}</p>
                </div>
                {thread.isUnread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-seno-blue shrink-0 mt-1.5" />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Message thread */}
        <div className={`flex-1 flex flex-col ${activeThread ? 'flex' : 'hidden md:flex'}`}>
          {activeThread ? (
            <>
              {/* Thread header */}
              <div className="px-4 py-3 border-b border-seno-border flex items-center gap-3">
                <button
                  onClick={() => setActiveId(null)}
                  className="md:hidden p-1.5 rounded-full hover:bg-seno-surface text-seno-muted"
                  aria-label="Back to messages"
                >
                  <ChevronLeft size={18} />
                </button>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: activeThread.participantColor + '22' }}
                >
                  {activeThread.participantAvatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-seno-dark">{activeThread.participantName}</p>
                  <p className="text-xs text-seno-muted">{activeThread.participantTitle}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {activeThread.messages.map(msg => {
                  const isUser = msg.senderId === 'user'
                  return (
                    <div key={msg.id} className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                      {!isUser && (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                          style={{ backgroundColor: activeThread.participantColor + '22' }}
                        >
                          {activeThread.participantAvatar}
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          isUser
                            ? 'bg-seno-blue text-white rounded-tr-sm'
                            : 'bg-seno-surface text-seno-dark rounded-tl-sm'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${isUser ? 'text-white/60 text-right' : 'text-seno-muted'}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="px-4 py-3 border-t border-seno-border flex items-center gap-2">
                <input
                  type="text"
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  placeholder="Write a professional response..."
                  className="flex-1 bg-seno-surface border border-seno-border rounded-full px-4 py-2 text-sm outline-none focus:border-seno-blue transition-colors"
                  aria-label="Message input"
                />
                <Button type="submit" size="sm" disabled={!newMsg.trim()} className="rounded-full w-9 h-9 p-0 flex items-center justify-center">
                  <Send size={15} />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-seno-muted">
              <div className="text-5xl">💬</div>
              <p className="font-semibold text-seno-dark">Select a conversation</p>
              <p className="text-sm">Your professional correspondence awaits.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
