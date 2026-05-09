import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, Grid3x3, List as ListIcon } from 'lucide-react'
import { useLibrary } from '../context/LibraryContext'
import { GENRES } from '../data/books'
import BookGrid from '../components/Books/BookGrid'
import BookCover from '../components/Books/BookCover'
import Rating from '../components/UI/Rating'
import { Link } from 'react-router-dom'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most relevant' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'Title A–Z' },
  { value: 'author', label: 'Author A–Z' },
]

export default function Browse() {
  const { books } = useLibrary()
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [view, setView] = useState('grid')

  const q = params.get('q') || ''
  const genre = params.get('genre') || 'All'
  const sort = params.get('sort') || 'relevance'
  const availableOnly = params.get('available') === '1'
  const minRating = parseFloat(params.get('rating') || '0')

  function update(patch) {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '' || v === false || v === 'All' || v === 0) {
        next.delete(k)
      } else {
        next.set(k, String(v === true ? 1 : v))
      }
    })
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = books.slice()
    if (q) {
      const needle = q.toLowerCase()
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(needle) ||
          b.author.toLowerCase().includes(needle) ||
          b.genre.toLowerCase().includes(needle) ||
          (b.tags || []).some((t) => t.toLowerCase().includes(needle)),
      )
    }
    if (genre && genre !== 'All') {
      list = list.filter((b) => b.genre === genre)
    }
    if (availableOnly) list = list.filter((b) => b.available)
    if (minRating > 0) list = list.filter((b) => b.rating >= minRating)

    switch (sort) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        list.sort((a, b) => b.year - a.year)
        break
      case 'oldest':
        list.sort((a, b) => a.year - b.year)
        break
      case 'title':
        list.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'author':
        list.sort((a, b) => a.author.localeCompare(b.author))
        break
      default:
        break
    }
    return list
  }, [books, q, genre, sort, availableOnly, minRating])

  const activeFilterCount =
    (genre !== 'All' ? 1 : 0) + (availableOnly ? 1 : 0) + (minRating > 0 ? 1 : 0)

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
          The shelves
        </p>
        <h1 className="heading-serif mt-1 text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
          Browse the catalog
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600 dark:text-ink-400">
          {books.length} titles, hand-picked and added by members. Filter, search, or
          just wander.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search title, author, tag..."
            className="input pl-9"
          />
          {q && (
            <button
              onClick={() => update({ q: '' })}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-md text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="btn-outline relative"
        >
          <SlidersHorizontal size={14} /> Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 grid min-w-[18px] h-[18px] place-items-center rounded-full bg-brand-600 text-white text-[10px] font-bold px-1">
              {activeFilterCount}
            </span>
          )}
        </button>

        <select
          value={sort}
          onChange={(e) => update({ sort: e.target.value })}
          className="input w-auto py-2.5"
          aria-label="Sort"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <div className="hidden sm:flex rounded-xl border border-ink-300 dark:border-ink-700 p-1">
          <button
            onClick={() => setView('grid')}
            className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
              view === 'grid'
                ? 'bg-ink-100 text-ink-900 dark:bg-ink-800 dark:text-ink-50'
                : 'text-ink-500'
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 size={16} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
              view === 'list'
                ? 'bg-ink-100 text-ink-900 dark:bg-ink-800 dark:text-ink-50'
                : 'text-ink-500'
            }`}
            aria-label="List view"
          >
            <ListIcon size={16} />
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="card p-5 mb-6 animate-fade-in">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="label">Genre</p>
              <div className="flex flex-wrap gap-1.5">
                {['All', ...GENRES].map((g) => (
                  <button
                    key={g}
                    onClick={() => update({ genre: g })}
                    className={`chip ${genre === g ? 'chip-active' : ''}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="label">Minimum rating</p>
              <div className="flex flex-wrap gap-1.5">
                {[0, 3, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => update({ rating: r })}
                    className={`chip ${minRating === r ? 'chip-active' : ''}`}
                  >
                    {r === 0 ? 'Any' : `${r}+ ★`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="label">Availability</p>
              <button
                onClick={() => update({ available: !availableOnly })}
                className={`chip ${availableOnly ? 'chip-active' : ''}`}
              >
                Available now only
              </button>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={() =>
                setParams(q ? { q } : {}, { replace: true })
              }
              className="mt-4 text-sm text-rose-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      <p className="mb-4 text-sm text-ink-500">
        {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
        {q && ` for "${q}"`}
      </p>

      {view === 'grid' ? (
        <BookGrid books={filtered} empty="No books match those filters yet." />
      ) : (
        <BookList books={filtered} />
      )}
    </div>
  )
}

function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-ink-500">No books match those filters yet.</p>
      </div>
    )
  }
  return (
    <ul className="space-y-3">
      {books.map((b) => (
        <li key={b.id}>
          <Link
            to={`/books/${b.id}`}
            className="card p-4 flex items-start gap-4 hover:shadow-soft hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
          >
            <BookCover book={b} className="h-32 w-20 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                {b.genre} · {b.year}
              </p>
              <h3 className="heading-serif mt-0.5 text-lg sm:text-xl font-bold text-ink-900 dark:text-ink-50">
                {b.title}
              </h3>
              <p className="text-sm text-ink-600 dark:text-ink-400">{b.author}</p>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 line-clamp-2">
                {b.description}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <Rating value={b.rating} size={14} />
                <span className={b.available ? 'chip' : 'chip bg-ink-200 text-ink-700'}>
                  {b.available ? `${b.copies} available` : 'All checked out'}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
