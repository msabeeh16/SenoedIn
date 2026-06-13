import type { RouteMarker } from '../types'

function hashString(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed * 9301 + index * 49297 + 233) * 14159.265
  return x - Math.floor(x)
}

export function generateMarkers(seed: string): RouteMarker[] {
  const hash = hashString(seed || 'default')
  const labels = ['START', '2', '3', 'CRUX', '5', 'TOP']

  return labels.map((label, i) => {
    const rx = seededRandom(hash, i * 2)
    const ry = seededRandom(hash, i * 2 + 1)
    const x = 15 + rx * 70
    const y = 15 + ry * 70
    return {
      id: `marker-${i}`,
      label,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      tooltip: 'Decorative visualization only.',
    }
  })
}
