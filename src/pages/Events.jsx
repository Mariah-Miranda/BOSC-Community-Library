import { useState } from 'react'
import { Calendar, MapPin, Users, Clock, Check } from 'lucide-react'
import { events } from '../data/events'
import { useLibrary } from '../context/LibraryContext'
import { formatDate } from '../utils/format'

const FILTERS = ['All', 'Book Club', 'Workshop', 'Author Talk', 'Open Mic', 'Kids', 'Volunteer']

export default function Events() {
  const { rsvps, toggleRsvp } = useLibrary()
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? events : events.filter((e) => e.type === filter)

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
          Show up
        </p>
        <h1 className="heading-serif mt-1 text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
          Events & gatherings
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600 dark:text-ink-400">
          Book clubs, workshops, story hours, and the occasional open mic. Most things
          are free; all are warm.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`chip ${filter === f ? 'chip-active' : ''}`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((ev) => {
          const seatsLeft = ev.seats - ev.seatsTaken
          const filledRatio = ev.seatsTaken / ev.seats
          const rsvpd = rsvps.includes(ev.id)
          return (
            <li key={ev.id} className="card p-6 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <DateBlock date={ev.date} />
                  <span className="chip">{ev.type}</span>
                </div>
              </div>
              <h3 className="heading-serif mt-4 text-lg font-bold leading-tight text-ink-900 dark:text-ink-50">
                {ev.title}
              </h3>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 line-clamp-3">
                {ev.description}
              </p>
              <div className="mt-4 space-y-1.5 text-sm text-ink-600 dark:text-ink-400">
                <Detail icon={Clock}>
                  {formatDate(ev.date, { weekday: 'long' })} · {ev.time}
                </Detail>
                <Detail icon={MapPin}>{ev.location}</Detail>
                <Detail icon={Users}>Hosted by {ev.host}</Detail>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-ink-500 mb-1.5">
                  <span>
                    {ev.seatsTaken} of {ev.seats} seats taken
                  </span>
                  <span>
                    {seatsLeft <= 5 && seatsLeft > 0 ? 'Almost full' : `${seatsLeft} left`}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500 transition-all"
                    style={{ width: `${filledRatio * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => toggleRsvp(ev.id)}
                className={`mt-5 ${rsvpd ? 'btn-secondary' : 'btn-primary'} w-full`}
              >
                {rsvpd ? (
                  <>
                    <Check size={16} /> You're going
                  </>
                ) : (
                  <>
                    <Calendar size={16} /> RSVP — it's free
                  </>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Detail({ icon: Icon, children }) {
  return (
    <p className="flex items-center gap-2">
      <Icon size={14} className="text-brand-600 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

function DateBlock({ date }) {
  const d = new Date(date)
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 px-3 py-2 text-brand-800 dark:text-brand-300 min-w-[64px]">
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {d.toLocaleDateString(undefined, { month: 'short' })}
      </span>
      <span className="text-2xl heading-serif font-bold leading-none">
        {d.getDate()}
      </span>
    </div>
  )
}
