import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { useLibrary } from '../../context/LibraryContext'

const TONES = {
  success: { Icon: CheckCircle2, color: 'text-brand-600', bg: 'bg-brand-50 dark:bg-brand-950/40 border-brand-200/60 dark:border-brand-800' },
  info: { Icon: Info, color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200/60 dark:border-sky-800' },
  warning: { Icon: AlertTriangle, color: 'text-accent-600', bg: 'bg-accent-50 dark:bg-accent-900/30 border-accent-200/60 dark:border-accent-800' },
  error: { Icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200/60 dark:border-rose-800' },
}

export default function ToastViewport() {
  const { toasts, dismissToast } = useLibrary()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6">
      <AnimatePresence>
        {toasts.map((t) => {
          const tone = TONES[t.tone] || TONES.success
          const { Icon } = tone
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto w-full max-w-md rounded-2xl border shadow-soft backdrop-blur ${tone.bg}`}
            >
              <div className="flex items-start gap-3 p-3.5 pr-2">
                <Icon className={`mt-0.5 shrink-0 ${tone.color}`} size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                    {t.title}
                  </p>
                  {t.description && (
                    <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-300">
                      {t.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => dismissToast(t.id)}
                  className="grid h-7 w-7 place-items-center rounded-lg text-ink-500 hover:bg-black/5 dark:hover:bg-white/5"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
