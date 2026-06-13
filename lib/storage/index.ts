import type { Store } from '../types'
import { LocalStore } from './local-store'

let _store: Store | null = null

export function getStore(): Store {
  if (_store) return _store

  const supabaseEnabled = process.env.NEXT_PUBLIC_ENABLE_SUPABASE === 'true'
  if (supabaseEnabled) {
    // Dynamic import to avoid bundling supabase when disabled
    // Falls back to local store if Supabase is not configured
    _store = new LocalStore()
  } else {
    _store = new LocalStore()
  }
  return _store
}
