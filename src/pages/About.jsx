import { Link } from 'react-router-dom'
import { Heart, BookOpen, Users, MapPin, Award, Clock } from 'lucide-react'

const team = [
  {
    name: 'Amelia Hart',
    role: 'Head Librarian',
    bio: 'Believes a good shelf is half listening, half courage.',
    hue: 145,
  },
  {
    name: 'Daniel Okafor',
    role: 'Programs & Events',
    bio: 'Makes book clubs that actually finish their books.',
    hue: 28,
  },
  {
    name: 'Lina Park',
    role: 'Tech & Catalog',
    bio: 'Quietly keeps the search bar honest.',
    hue: 220,
  },
  {
    name: 'Mira Pérez',
    role: 'Children’s Programs',
    bio: 'Auntie to half the under-tens in the neighborhood.',
    hue: 320,
  },
]

const values = [
  {
    icon: Heart,
    title: 'Free, forever',
    text: 'No fees, no fines. The library belongs to whoever shows up to read.',
  },
  {
    icon: Users,
    title: 'Built by members',
    text: 'Every book on our shelves was chosen, donated, or championed by someone in the community.',
  },
  {
    icon: BookOpen,
    title: 'Quality over quantity',
    text: 'We curate slowly. A small, loved collection beats a warehouse of dust.',
  },
  {
    icon: Award,
    title: 'A welcoming place',
    text: 'Kids, students, retirees, neighbors. Quiet rooms. Good chairs. Strong tea.',
  },
]

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 dark:border-ink-800">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-page relative py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            About the library
          </p>
          <h1 className="heading-serif mt-2 text-4xl sm:text-5xl font-bold leading-tight max-w-3xl text-balance text-ink-900 dark:text-ink-50">
            We're a small library with very big neighbors.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-600 dark:text-ink-300 text-balance">
            BIOSC began in 2018 as a single shelf in a cafe. Today, it lives in a
            converted reading room, runs on volunteers, and lends thousands of books a
            year — without a single late fee.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="btn-primary px-5 py-3 text-base">
              Become a member
            </Link>
            <Link to="/add-book" className="btn-outline px-5 py-3 text-base">
              Donate a book
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={i} className="card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">
                <v.icon size={20} />
              </div>
              <h3 className="heading-serif mt-4 text-lg font-bold text-ink-900 dark:text-ink-50">
                {v.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
              Our story
            </p>
            <h2 className="heading-serif mt-2 text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
              How a single shelf became a small library.
            </h2>
            <div className="mt-6 space-y-4 text-ink-700 dark:text-ink-300 leading-relaxed">
              <p>
                In late 2018, a regular at a corner cafe brought in a box of books and
                asked the owner if she could leave them on a free shelf. Take one,
                leave one. Within a month the shelf had grown into three, with a small
                index card system and a kid named Tomás keeping it tidy.
              </p>
              <p>
                Six years later, that shelf is a 6,000-book library — still free, still
                run mostly by neighbors, and still organized by people who cared enough
                to learn the Dewey Decimal System on a rainy afternoon.
              </p>
              <p>
                We're not trying to be the biggest library in the world. We're trying
                to be the one your kid remembers.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-brand-200 to-accent-200 dark:from-brand-900/40 dark:to-accent-900/30 blur-xl" />
            <div className="relative rounded-3xl bg-white dark:bg-ink-900 p-8 shadow-soft border border-ink-200 dark:border-ink-800">
              <ul className="space-y-5">
                <Milestone year="2018" text="One free shelf at Café Bona." />
                <Milestone year="2019" text="50 members. First story hour." />
                <Milestone year="2021" text="Moved to current reading room." />
                <Milestone year="2023" text="6,000 books cataloged. 1,000 members." />
                <Milestone year="2026" text="You arrive. We hope you stay." />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            Real, named humans
          </p>
          <h2 className="heading-serif mt-2 text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
            The people who keep things going
          </h2>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <div key={i} className="card p-6 text-center">
              <div
                className="mx-auto h-20 w-20 rounded-full"
                style={{
                  background: `linear-gradient(135deg, hsl(${m.hue},65%,40%), hsl(${(m.hue + 40) % 360},70%,55%))`,
                }}
              />
              <p className="heading-serif mt-4 text-lg font-bold text-ink-900 dark:text-ink-50">
                {m.name}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                {m.role}
              </p>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          <InfoCard
            icon={MapPin}
            title="Find us"
            lines={['12 Reading Lane', 'BIOSC Community Center', 'Ground floor, by the windows']}
          />
          <InfoCard
            icon={Clock}
            title="Hours"
            lines={['Monday–Friday · 10am – 8pm', 'Saturday–Sunday · 9am – 6pm', 'Closed: Christmas, New Year']}
          />
        </div>
      </section>
    </div>
  )
}

function Milestone({ year, text }) {
  return (
    <li className="flex gap-4">
      <span className="heading-serif text-2xl font-bold text-brand-700 dark:text-brand-400 w-16 shrink-0">
        {year}
      </span>
      <span className="text-ink-700 dark:text-ink-300 pt-1.5">{text}</span>
    </li>
  )
}

function InfoCard({ icon: Icon, title, lines }) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">
        <Icon size={20} />
      </div>
      <h3 className="heading-serif mt-4 text-xl font-bold text-ink-900 dark:text-ink-50">
        {title}
      </h3>
      <div className="mt-2 space-y-1 text-ink-600 dark:text-ink-400">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  )
}
