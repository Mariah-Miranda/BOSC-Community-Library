import { Star } from 'lucide-react'

export default function Rating({ value = 0, count, size = 16, className = '' }) {
  const rounded = Math.round(value * 2) / 2
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.floor(rounded)
          const half = !filled && i - 0.5 === rounded
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star
                size={size}
                className="text-ink-300 dark:text-ink-700"
                strokeWidth={1.5}
              />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? '50%' : '100%' }}
                >
                  <Star
                    size={size}
                    className="text-accent-500 fill-accent-500"
                    strokeWidth={1.5}
                  />
                </span>
              )}
            </span>
          )
        })}
      </div>
      {value > 0 && (
        <span className="text-xs font-semibold text-ink-700 dark:text-ink-300 ml-1">
          {value.toFixed(1)}
        </span>
      )}
      {typeof count === 'number' && (
        <span className="text-xs text-ink-500 ml-0.5">({count})</span>
      )}
    </div>
  )
}
