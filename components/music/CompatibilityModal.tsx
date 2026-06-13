'use client'

import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Sparkles } from 'lucide-react'

interface CompatibilityModalProps {
  open: boolean
  onClose: () => void
  endorsedCount: number
}

export function CompatibilityModal({ open, onClose, endorsedCount }: CompatibilityModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-seno-blue-light flex items-center justify-center mx-auto">
          <Sparkles size={28} className="text-seno-blue" />
        </div>

        <div>
          <h2 className="text-xl font-black text-seno-dark">Networking Opportunity Identified</h2>
          <Badge className="mt-2 inline-flex" />
        </div>

        <div className="bg-seno-surface rounded-xl p-4 text-sm text-seno-dark space-y-2 text-left">
          <p>
            You and <strong>Seno</strong> have endorsed{' '}
            <strong className="text-seno-blue">{endorsedCount} overlapping competencies</strong>.
          </p>
          <p className="text-seno-muted">
            Our algorithm estimates a <strong>87% yearning alignment</strong> based on your recent endorsement history.
          </p>
        </div>

        <div className="bg-seno-blue-pale border border-seno-blue-light rounded-xl p-4 text-left">
          <p className="text-xs font-bold text-seno-blue uppercase tracking-wide mb-1">Suggested Connection Message</p>
          <p className="text-sm text-seno-dark italic">
            &ldquo;I noticed your strong background in emotionally ambiguous bass lines and felt compelled to reach out professionally.&rdquo;
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Defer to Next Quarter
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Acknowledge & Escalate
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function Badge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-seno-green/10 text-seno-green ${className}`}>
      ✓ Compatibility Threshold Exceeded
    </span>
  )
}
