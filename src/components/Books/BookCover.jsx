// A deterministic generated SVG cover so we don't depend on remote images.
// Looks great at any size and respects each book's palette.

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = (h * 16777619) >>> 0
  }
  return h
}

const PATTERNS = ['lines', 'arcs', 'dots', 'waves', 'triangles']

export default function BookCover({ book, className = '', rounded = 'rounded-lg' }) {
  if (!book) return null
  const [c1, c2, c3] = book.palette || ['#0f5132', '#16a34a', '#86efac']
  const seed = hash(book.id || book.title)
  const pattern = PATTERNS[seed % PATTERNS.length]
  const titleLines = wrap(book.title, 18, 4)

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <svg
        viewBox="0 0 200 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`g-${book.id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <linearGradient id={`shine-${book.id}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <rect width="200" height="300" fill={`url(#g-${book.id})`} />
        <Pattern type={pattern} color={c3} seed={seed} />
        {/* Spine highlight on the left */}
        <rect x="0" y="0" width="6" height="300" fill="rgba(0,0,0,0.18)" />
        <rect x="6" y="0" width="2" height="300" fill="rgba(255,255,255,0.18)" />
        {/* subtle shine */}
        <rect width="200" height="300" fill={`url(#shine-${book.id})`} opacity="0.6" />

        {/* Title plate */}
        <g>
          <rect
            x="18"
            y="34"
            width="164"
            height={32 + titleLines.length * 22}
            rx="6"
            fill="rgba(0,0,0,0.18)"
          />
          {titleLines.map((line, i) => (
            <text
              key={i}
              x="100"
              y={62 + i * 22}
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="Fraunces, Georgia, serif"
              fontWeight="700"
              fontSize="16"
              letterSpacing="0.2"
            >
              {line}
            </text>
          ))}
        </g>

        {/* Author */}
        <text
          x="100"
          y="270"
          textAnchor="middle"
          fill="rgba(255,255,255,0.85)"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="600"
          fontSize="10"
          letterSpacing="2"
        >
          {(book.author || '').toUpperCase().slice(0, 28)}
        </text>
      </svg>
    </div>
  )
}

function Pattern({ type, color, seed }) {
  switch (type) {
    case 'lines':
      return (
        <g stroke={color} strokeOpacity="0.32" strokeWidth="1.5">
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={i} x1="0" y1={20 + i * 16} x2="200" y2={28 + i * 16} />
          ))}
        </g>
      )
    case 'arcs':
      return (
        <g stroke={color} strokeOpacity="0.35" strokeWidth="1.5" fill="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M -20 ${260 - i * 24} Q 100 ${200 - i * 24} 220 ${260 - i * 24}`}
            />
          ))}
        </g>
      )
    case 'dots':
      return (
        <g fill={color} fillOpacity="0.35">
          {Array.from({ length: 60 }).map((_, i) => {
            const x = ((seed * (i + 7)) % 200)
            const y = ((seed * (i + 13)) % 300)
            return <circle key={i} cx={x} cy={y} r={1.5 + ((seed + i) % 3)} />
          })}
        </g>
      )
    case 'waves':
      return (
        <g stroke={color} strokeOpacity="0.32" strokeWidth="1.5" fill="none">
          {Array.from({ length: 7 }).map((_, i) => (
            <path
              key={i}
              d={`M 0 ${230 - i * 22} q 25 -16 50 0 t 50 0 t 50 0 t 50 0 t 50 0`}
            />
          ))}
        </g>
      )
    case 'triangles':
    default:
      return (
        <g fill={color} fillOpacity="0.28">
          {Array.from({ length: 10 }).map((_, i) => (
            <polygon
              key={i}
              points={`${(i * 23) % 200},${260 - i * 12} ${
                ((i * 23) % 200) + 26
              },${260 - i * 12} ${((i * 23) % 200) + 13},${238 - i * 12}`}
            />
          ))}
        </g>
      )
  }
}

function wrap(text, max, maxLines) {
  if (!text) return []
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur)
      cur = w
    } else {
      cur = (cur + ' ' + w).trim()
    }
    if (lines.length === maxLines - 1 && (cur + ' ').length > max) {
      lines.push(cur)
      cur = ''
    }
  }
  if (cur) lines.push(cur)
  return lines.slice(0, maxLines)
}
