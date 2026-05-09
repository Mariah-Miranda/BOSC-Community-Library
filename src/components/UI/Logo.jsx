import { Link } from 'react-router-dom'

export default function Logo({ to = '/', size = 'md', className = '' }) {
  const sz = size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-base' : 'text-lg'
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="BIOSC Community Library home"
    >
      <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-glow transition-transform group-hover:rotate-[-4deg]">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path
            d="M5 5h7.5a2.5 2.5 0 0 1 2.5 2.5V19l-3-1.6L9 19l-2.5-1.6L5 19V5z"
            fill="#fef3c7"
            stroke="#f59e0b"
            strokeWidth="0.6"
          />
          <path d="M15 6.5a2.5 2.5 0 0 1 2.5 2.5V19l-2.5-1.5V6.5z" fill="#fbbf24" />
        </svg>
      </span>
      <span className={`heading-serif font-bold ${sz} text-ink-900 dark:text-ink-50`}>
        BIOSC <span className="gradient-text">Library</span>
      </span>
    </Link>
  )
}
