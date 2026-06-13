'use client'

import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

interface CompatibilityModalProps {
  open: boolean
  onClose: () => void
  endorsedCount: number
}

export function CompatibilityModal({ open, onClose, endorsedCount }: CompatibilityModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center space-y-4">
        <div className="text-5xl animate-gold-glow inline-block rounded-full w-20 h-20 flex items-center justify-center bg-seno-gold-tint border border-seno-border-gold mx-auto">
          ✦
        </div>

        <div>
          <h2 className="text-xl font-black text-gradient-gold">Networking Opportunity Identified</h2>
          <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-bold bg-seno-green/15 text-green-400 border border-green-800/30">
            ✓ Compatibility Threshold Exceeded
          </span>
        </div>

        <div className="bg-seno-card-2 rounded-2xl p-4 text-sm text-seno-muted text-left space-y-2 border border-seno-border">
          <p>
            You and <span className="text-seno-gold font-bold">Seno</span> have endorsed{' '}
            <span className="text-seno-text font-bold">{endorsedCount} overlapping competencies</span>.
          </p>
          <p>Our algorithm estimates <span className="text-seno-gold font-bold">87% yearning alignment</span> — statistically unprecedented.</p>
        </div>

        <div className="bg-seno-gold-tint border border-seno-border-gold rounded-2xl p-4 text-left">
          <p className="text-[10px] font-bold text-seno-gold uppercase tracking-widest mb-2">Suggested Connection Message</p>
          <p className="text-sm text-seno-text italic">
            &ldquo;I noticed your strong background in emotionally ambiguous bass lines and felt compelled to reach out professionally.&rdquo;
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>Defer to Next Quarter</Button>
          <Button className="flex-1" onClick={onClose}>Acknowledge & Escalate</Button>
        </div>
      </div>
    </Modal>
  )
}
