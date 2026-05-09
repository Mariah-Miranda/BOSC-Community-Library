import { useMemo } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  Heart,
  History as HistoryIcon,
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useLibrary } from '../context/LibraryContext'
import BookCover from '../components/Books/BookCover'
import BookGrid from '../components/Books/BookGrid'
import Avatar from '../components/UI/Avatar'
import { formatDate, daysUntil } from '../utils/format'
import { events as allEvents } from '../data/events'

const TABS = [
  { id: 'borrowed', label: 'Borrowed', icon: BookOpen },
  { id: 'wishlist', label: 'My list', icon: Heart },
  { id: 'history', label: 'History', icon: HistoryIcon },
  { id: 'events', label: 'Events', icon: CalendarCheck },
]

export default function Profile() {
  const { user, books, borrows, wishlist, history, rsvps, returnBook } = useLibrary()
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') || 'borrowed'

  if (!user) return <Navigate to="/login" replace />

  const myBorrows = useMemo(
    () =>
      Object.values(borrows)
        .filter((b) => b.userId === user.id)
        .map((b) => ({ ...b, book: books.find((x) => x.id === b.bookId) }))
        .filter((b) => b.book),
    [borrows, books, user.id],
  )

  const wishlistBooks = useMemo(
    () => wishlist.map((id) => books.find((b) => b.id === id)).filter(Boolean),
    [wishlist, books],
  )

  const myEvents = useMemo(
    () => allEvents.filter((e) => rsvps.includes(e.id)),
    [rsvps],
  )

  return (
    <div className="container-page py-10">
      <header className="card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
        <Avatar user={user} size={80} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            Member since {formatDate(user.joined, { month: 'long', year: 'numeric' })}
          </p>
          <h1 className="heading-serif mt-1 text-3xl font-bold text-ink-900 dark:text-ink-50">
            {user.name}
          </h1>
          <p className="text-ink-600 dark:text-ink-400">{user.email}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <Stat n={myBorrows.length} l="Borrowed" />
          <Stat n={wishlistBooks.length} l="Saved" />
          <Stat n={history.length} l="Read" />
        </div>
      </header>

      <nav className="mt-6 flex flex-wrap gap-1.5 border-b border-ink-200 dark:border-ink-800">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setParams({ tab: t.id }, { replace: true })}
              className={`relative inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                active
                  ? 'text-brand-700 dark:text-brand-400'
                  : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100'
              }`}
            >
              <t.icon size={16} />
              {t.label}
              {active && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          )
        })}
      </nav>

      <div className="mt-8">
        {tab === 'borrowed' && <BorrowedTab borrows={myBorrows} onReturn={returnBook} />}
        {tab === 'wishlist' && (
          <BookGrid
            books={wishlistBooks}
            empty="Your reading list is empty. Add books from the catalog to remember them."
          />
        )}
        {tab === 'history' && <HistoryTab history={history} books={books} />}
        {tab === 'events' && <EventsTab events={myEvents} />}
      </div>
    </div>
  )
}

function Stat({ n, l }) {
  return (
    <div className="rounded-xl bg-ink-50 dark:bg-ink-900 px-3 py-2 min-w-[64px]">
      <p className="heading-serif text-2xl font-bold text-ink-900 dark:text-ink-50">{n}</p>
      <p className="text-[11px] text-ink-500">{l}</p>
    </div>
  )
}

function BorrowedTab({ borrows, onReturn }) {
  if (borrows.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-ink-500 mb-4">You haven't borrowed any books yet.</p>
        <Link to="/browse" className="btn-primary">
          Find something to read
        </Link>
      </div>
    )
  }
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {borrows.map(({ book, dueDate, borrowedAt }) => {
        const due = daysUntil(dueDate)
        const overdue = due !== null && due < 0
        return (
          <li key={book.id} className="card p-4 flex gap-4">
            <Link to={`/books/${book.id}`} className="shrink-0">
              <BookCover book={book} className="h-32 w-20 ring-1 ring-black/5" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/books/${book.id}`} className="block">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                  {book.genre}
                </p>
                <h3 className="heading-serif mt-0.5 text-lg font-bold leading-tight line-clamp-2 text-ink-900 dark:text-ink-50">
                  {book.title}
                </h3>
                <p className="text-sm text-ink-500">{book.author}</p>
              </Link>
              <div
                className={`mt-3 flex items-center gap-1.5 text-xs ${
                  overdue ? 'text-rose-600' : 'text-ink-600 dark:text-ink-400'
                }`}
              >
                {overdue ? <AlertCircle size={14} /> : <Clock size={14} />}
                <span>
                  {overdue
                    ? `${Math.abs(due)} days overdue`
                    : `Due ${formatDate(dueDate)} (${due} days)`}
                </span>
              </div>
              <p className="text-xs text-ink-500 mt-1">
                Borrowed {formatDate(borrowedAt)}
              </p>
              <button
                onClick={() => onReturn(book.id)}
                className="btn-secondary mt-3 py-2 text-xs"
              >
                <CheckCircle2 size={14} /> Return
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function HistoryTab({ history, books }) {
  if (history.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-ink-500">
          Your history will show every book you've returned. Start a new chapter.
        </p>
      </div>
    )
  }
  return (
    <ul className="space-y-3">
      {history.map((h, i) => {
        const book = books.find((b) => b.id === h.bookId)
        if (!book) return null
        return (
          <li key={i} className="card p-4 flex items-center gap-4">
            <BookCover book={book} className="h-20 w-14 shrink-0" />
            <div className="flex-1 min-w-0">
              <Link
                to={`/books/${book.id}`}
                className="heading-serif font-bold text-ink-900 dark:text-ink-50 hover:text-brand-700"
              >
                {book.title}
              </Link>
              <p className="text-sm text-ink-500">{book.author}</p>
              <p className="text-xs text-ink-500 mt-1">
                Borrowed {formatDate(h.borrowedAt)} · Returned {formatDate(h.returnedAt)}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function EventsTab({ events }) {
  if (events.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-ink-500 mb-4">You haven't RSVP'd to anything yet.</p>
        <Link to="/events" className="btn-primary">
          Browse events
        </Link>
      </div>
    )
  }
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {events.map((ev) => (
        <li key={ev.id} className="card p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                {ev.type}
              </p>
              <h3 className="heading-serif mt-0.5 text-lg font-bold text-ink-900 dark:text-ink-50">
                {ev.title}
              </h3>
            </div>
            <span className="chip bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300">
              RSVP'd
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">
            {formatDate(ev.date, { weekday: 'long' })} · {ev.time}
          </p>
          <p className="text-sm text-ink-500">{ev.location}</p>
        </li>
      ))}
    </ul>
  )
}
