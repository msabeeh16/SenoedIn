'use client'

interface SliderProps {
  label: string
  name: string
  value: number
  onChange: (value: number) => void
  minLabel?: string
  maxLabel?: string
  min?: number
  max?: number
}

export function Slider({ label, name, value, onChange, minLabel = '0', maxLabel = '10', min = 0, max = 10 }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-sm font-medium text-seno-dark">{label}</label>
        <span className="text-sm font-bold text-seno-blue w-6 text-right">{value}</span>
      </div>
      <input
        id={name}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #0a66c2 ${percent}%, #e0dfdb ${percent}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-seno-muted">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}
