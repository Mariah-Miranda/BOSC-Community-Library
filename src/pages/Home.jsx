import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Users,
  Calendar,
  Sparkles,
  Heart,
  Search,
} from 'lucide-react'
import { useLibrary } from '../context/LibraryContext'
import { GENRES } from '../data/books'
import { events } from '../data/events'
import BookCard from '../components/Books/BookCard'
import BookCover from '../components/Books/BookCover'
import { formatDate } from '../utils/format'

export default function Home() {
  const { books } = useLibrary()
  const featured = books.filter((b) => b.featured).slice(0, 5)
  const newArrivals = [...books].sort((a, b) => b.year - a.year).slice(0, 8)
  const popular = [...books].sort((a, b) => b.rating - a.rating).slice(0, 6)
  const upcomingEvents = events.slice(0, 3)

  const stats = [
    { label: 'Books in catalog', value: books.length, icon: BookOpen },
    { label: 'Active members', value: '1,240', icon: Users },
    { label: 'Events this year', value: '64', icon: Calendar },
    { label: 'Avg. rating', value: '4.6★', icon: Sparkles },
  ]

  return (
    <div>
      <Hero featured={featured} />

      <section className="container-page mt-16 sm:mt-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card p-4 sm:p-5"
            >
              <s.icon className="text-brand-600" size={20} />
              <p className="mt-2 text-2xl sm:text-3xl font-bold heading-serif text-ink-900 dark:text-ink-50">
                {s.value}
              </p>
              <p className="text-xs text-ink-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionHeader
        eyebrow="Curated for you"
        title="New arrivals"
        description="Fresh on our shelves this season — fiction, science, and a couple of quiet surprises."
        cta={{ to: '/browse', label: 'See full catalog' }}
      />
      <section className="container-page">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {newArrivals.slice(0, 4).map((b, i) => (
            <BookCard key={b.id} book={b} index={i} />
          ))}
        </div>
      </section>

      <Categories />

      <SectionHeader
        eyebrow="Loved by members"
        title="Popular this month"
        description="Highest-rated books across all genres, picked by readers like you."
        cta={{ to: '/browse?sort=rating', label: 'Browse top-rated' }}
      />
      <section className="container-page">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {popular.map((b, i) => (
            <BookCard key={b.id} book={b} index={i} />
          ))}
        </div>
      </section>

      <UpcomingEvents events={upcomingEvents} />

      <CommunityCTA />
    </div>
  )
}

function Hero({ featured }) {
  return (
    <section className="relative overflow-hidden border-b border-ink-200/70 dark:border-ink-800">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -top-24 -left-32 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-800/30" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-800/20" />

      <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 self-start rounded-full bg-white/80 dark:bg-ink-900/60 backdrop-blur border border-ink-200/70 dark:border-ink-800 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-400"
          >
            <Sparkles size={12} />
            A library that belongs to its readers
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="heading-serif mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl text-balance"
          >
            Borrow a book.{' '}
            <span className="gradient-text">Share an idea.</span>{' '}
            Stay a while.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg text-ink-600 dark:text-ink-300 leading-relaxed text-balance"
          >
            BIOSC Community Library is a small, lovingly tended collection — built and
            kept alive by neighbors. Reserve titles online, join a club, or donate a
            book that changed you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link to="/browse" className="btn-primary px-5 py-3 text-base">
              <Search size={16} />
              Browse the catalog
              <ArrowRight size={16} />
            </Link>
            <Link to="/signup" className="btn-outline px-5 py-3 text-base">
              <Heart size={16} />
              Become a member
            </Link>
          </motion.div>

          <div className="mt-10 flex items-center gap-6 text-sm text-ink-500">
            <span className="flex items-center gap-2">
              <span className="flex -space-x-2">
                {[145, 28, 220, 50].map((h) => (
                  <span
                    key={h}
                    className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-ink-950"
                    style={{
                      background: `linear-gradient(135deg, hsl(${h},65%,40%), hsl(${(h + 40) % 360},70%,55%))`,
                    }}
                  />
                ))}
              </span>
              <span>1,240+ readers</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">No fees, no fines, no fuss</span>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <FeaturedStack books={featured} />
        </div>
      </div>
    </section>
  )
}

function FeaturedStack({ books }) {
  if (!books?.length) return null
  return (
    <div className="relative h-[420px] sm:h-[460px] lg:h-[520px] mx-auto max-w-md lg:max-w-none">
      {books.slice(0, 5).map((book, i) => {
        const offsets = [
          { x: -110, y: 40, rot: -8, z: 1 },
          { x: -60, y: 10, rot: -4, z: 2 },
          { x: 0, y: 0, rot: 0, z: 5 },
          { x: 60, y: 10, rot: 4, z: 2 },
          { x: 110, y: 40, rot: 8, z: 1 },
        ]
        const o = offsets[i] || offsets[2]
        return (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 40, rotate: o.rot }}
            animate={{ opacity: 1, y: 0, rotate: o.rot }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: 'easeOut' }}
            whileHover={{ y: -16, rotate: o.rot, scale: 1.04, zIndex: 10 }}
            className="absolute left-1/2 top-1/2 w-44 sm:w-52 lg:w-56 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${o.x}px), calc(-50% + ${o.y}px)) rotate(${o.rot}deg)`,
              zIndex: o.z,
            }}
          >
            <Link to={`/books/${book.id}`} className="block">
              <div className="aspect-[2/3] rounded-xl shadow-book ring-1 ring-black/10 overflow-hidden">
                <BookCover book={book} className="w-full h-full" rounded="" />
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

function SectionHeader({ eyebrow, title, description, cta }) {
  return (
    <header className="container-page mt-20 mb-7 flex flex-col gap-3 sm:mt-24 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            {eyebrow}
          </p>
        )}
        <h2 className="heading-serif mt-1 text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-ink-600 dark:text-ink-400">{description}</p>
        )}
      </div>
      {cta && (
        <Link
          to={cta.to}
          className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
        >
          {cta.label}
          <ArrowRight size={14} />
        </Link>
      )}
    </header>
  )
}

const CATEGORY_ART = {
  Fiction: { from: 'from-rose-500', to: 'to-rose-700' },
  'Non-Fiction': { from: 'from-sky-500', to: 'to-sky-700' },
  Science: { from: 'from-cyan-500', to: 'to-blue-700' },
  Technology: { from: 'from-slate-600', to: 'to-slate-900' },
  History: { from: 'from-amber-600', to: 'to-amber-800' },
  Biography: { from: 'from-fuchsia-500', to: 'to-fuchsia-700' },
  Philosophy: { from: 'from-indigo-500', to: 'to-indigo-800' },
  Poetry: { from: 'from-violet-500', to: 'to-violet-700' },
  Mystery: { from: 'from-emerald-700', to: 'to-emerald-900' },
  Fantasy: { from: 'from-purple-600', to: 'to-purple-900' },
  'Self-Help': { from: 'from-orange-500', to: 'to-orange-700' },
  Business: { from: 'from-teal-600', to: 'to-teal-800' },
  Children: { from: 'from-pink-400', to: 'to-pink-600' },
}

function Categories() {
  return (
    <section className="container-page mt-20 sm:mt-24">
      <header className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
          Find your next read
        </p>
        <h2 className="heading-serif mt-1 text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
          Browse by category
        </h2>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {GENRES.map((g) => {
          const art = CATEGORY_ART[g] || { from: 'from-brand-600', to: 'to-brand-800' }
          return (
            <Link
              key={g}
              to={`/browse?genre=${encodeURIComponent(g)}`}
              className="group relative overflow-hidden rounded-2xl p-5 h-28 flex flex-col justify-between text-white transition-transform hover:-translate-y-0.5"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${art.from} ${art.to}`}
              />
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-grid-pattern" />
              <BookOpen size={20} className="relative" />
              <div className="relative">
                <p className="text-base font-bold">{g}</p>
                <p className="text-[11px] opacity-90 inline-flex items-center gap-1">
                  Explore <ArrowRight size={11} />
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function UpcomingEvents({ events }) {
  return (
    <section className="container-page mt-20 sm:mt-24">
      <header className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            Show up
          </p>
          <h2 className="heading-serif mt-1 text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
            Coming up at the library
          </h2>
        </div>
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
        >
          See all events <ArrowRight size={14} />
        </Link>
      </header>

      <div className="grid gap-5 lg:grid-cols-3">
        {events.map((ev) => (
          <Link
            key={ev.id}
            to="/events"
            className="card p-6 hover:shadow-book hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 px-3 py-2 text-brand-800 dark:text-brand-300">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {new Date(ev.date).toLocaleDateString(undefined, { month: 'short' })}
                </span>
                <span className="text-2xl heading-serif font-bold leading-none">
                  {new Date(ev.date).getDate()}
                </span>
              </div>
              <span className="chip">{ev.type}</span>
            </div>
            <h3 className="heading-serif mt-4 text-lg font-bold leading-tight text-ink-900 dark:text-ink-50">
              {ev.title}
            </h3>
            <p className="mt-1.5 text-sm text-ink-500">
              {ev.time} · {ev.location}
            </p>
            <p className="mt-3 text-sm text-ink-600 dark:text-ink-400 line-clamp-2">
              {ev.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
              <span>Hosted by {ev.host}</span>
              <span>
                {ev.seats - ev.seatsTaken} of {ev.seats} seats left
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function CommunityCTA() {
  return (
    <section className="container-page mt-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 p-8 sm:p-14 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-400/30 blur-3xl" />
        <div className="absolute -left-12 -bottom-16 h-56 w-56 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-200">
              The library runs on you
            </p>
            <h2 className="heading-serif mt-2 text-3xl sm:text-4xl font-bold leading-tight">
              Donate a book. Host a club.
              <br />
              Be the reason someone reads more.
            </h2>
            <p className="mt-4 max-w-lg text-white/85">
              Members keep BIOSC alive — by adding titles to the catalog, hosting
              evenings, and showing up. There's a lot of small, easy ways in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/add-book"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-800 px-5 py-3 font-semibold hover:bg-accent-50 transition-colors"
              >
                <BookOpen size={16} /> Donate a book
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/20 px-5 py-3 font-semibold hover:bg-white/25 transition-colors"
              >
                <Calendar size={16} /> Find an event
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 text-sm">
            {[
              'Add a title — your favorite book deserves another reader.',
              'Host a 30-minute story hour for kids on Saturdays.',
              'Volunteer one shelving Saturday a month.',
              'Sponsor an open-mic night with a small prize.',
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-3.5"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-400 text-brand-900 font-bold text-xs">
                  {i + 1}
                </span>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
