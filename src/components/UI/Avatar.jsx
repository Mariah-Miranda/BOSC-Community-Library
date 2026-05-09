import { initialsOf } from '../../utils/format'

export default function Avatar({ user, size = 36, className = '' }) {
  const hue = user?.avatarHue ?? 145
  const initials = initialsOf(user?.name)
  return (
    <div
      className={`grid place-items-center rounded-full text-white font-bold shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${hue}, 65%, 38%), hsl(${(hue + 40) % 360}, 70%, 55%))`,
        fontSize: Math.round(size * 0.38),
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}
