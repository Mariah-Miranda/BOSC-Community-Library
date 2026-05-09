import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Plus, BookOpen, Sparkles } from 'lucide-react'
import { useLibrary } from '../context/LibraryContext'
import { GENRES } from '../data/books'
import BookCover from '../components/Books/BookCover'

const PALETTES = [
  ['#0f5132', '#16a34a', '#86efac'],
  ['#92400e', '#f59e0b', '#fde68a'],
  ['#0c4a6e', '#0284c7', '#7dd3fc'],
  ['#881337', '#e11d48', '#fda4af'],
  ['#3b0764', '#7c3aed', '#c4b5fd'],
  ['#0f172a', '#475569', '#cbd5e1'],
  ['#7c2d12', '#ea580c', '#fed7aa'],
  ['#064e3b', '#10b981', '#a7f3d0'],
]

export default function AddBook() {
  const { user, addBook } = useLibrary()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    year: new Date().getFullYear(),
    pages: 200,
    description: '',
    copies: 1,
    paletteIndex: 0,
  })

  if (!user) return <Navigate to="/login" replace />

  function update(patch) {
    setForm((f) => ({ ...f, ...patch }))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.author.trim()) return
    const book = addBook({
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre,
      year: Number(form.year),
      pages: Number(form.pages),
      description: form.description.trim() || 'A community-donated book.',
      copies: Number(form.copies),
      palette: PALETTES[form.paletteIndex],
    })
    navigate(`/books/${book.id}`)
  }

  const previewBook = {
    id: 'preview',
    title: form.title || 'Your book title',
    author: form.author || 'Author name',
    palette: PALETTES[form.paletteIndex],
  }

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
          The shelves grow with you
        </p>
        <h1 className="heading-serif mt-1 text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
          Donate a book to the library
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600 dark:text-ink-400">
          Add a title from your shelf. We'll list it as available and email when someone borrows it.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <form onSubmit={submit} className="lg:col-span-8 card p-6 sm:p-8 space-y-5">
          <Field label="Title" required>
            <input
              required
              value={form.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="The book's title"
              className="input"
            />
          </Field>
          <Field label="Author" required>
            <input
              required
              value={form.author}
              onChange={(e) => update({ author: e.target.value })}
              placeholder="Who wrote it?"
              className="input"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Genre">
              <select
                value={form.genre}
                onChange={(e) => update({ genre: e.target.value })}
                className="input"
              >
                {GENRES.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </Field>
            <Field label="Year">
              <input
                type="number"
                min="1500"
                max={new Date().getFullYear() + 1}
                value={form.year}
                onChange={(e) => update({ year: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Pages">
              <input
                type="number"
                min="1"
                max="5000"
                value={form.pages}
                onChange={(e) => update({ pages: e.target.value })}
                className="input"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => update({ description: e.target.value })}
              placeholder="A few sentences about why you're donating it."
              rows={4}
              className="input resize-none"
            />
          </Field>

          <Field label="Copies you're donating">
            <input
              type="number"
              min="1"
              max="20"
              value={form.copies}
              onChange={(e) => update({ copies: e.target.value })}
              className="input"
            />
          </Field>

          <div>
            <p className="label">Cover style</p>
            <div className="flex flex-wrap gap-2">
              {PALETTES.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => update({ paletteIndex: i })}
                  className={`h-10 w-10 rounded-xl ring-2 ring-offset-2 ring-offset-white dark:ring-offset-ink-950 transition ${
                    form.paletteIndex === i ? 'ring-brand-500 scale-105' : 'ring-transparent'
                  }`}
                  style={{ background: `linear-gradient(135deg, ${p[0]}, ${p[1]})` }}
                  aria-label={`Palette ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3">
            <Plus size={16} /> Add to library
          </button>
        </form>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400 mb-3 inline-flex items-center gap-1.5">
              <Sparkles size={12} /> Live preview
            </p>
            <div className="aspect-[2/3] rounded-2xl shadow-book overflow-hidden ring-1 ring-black/10">
              <BookCover book={previewBook} className="w-full h-full" rounded="" />
            </div>
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                {form.genre} · {form.year}
              </p>
              <h3 className="heading-serif text-lg font-bold mt-0.5 text-ink-900 dark:text-ink-50">
                {form.title || 'Your book title'}
              </h3>
              <p className="text-sm text-ink-500">
                {form.author || 'Author name'}
              </p>
              <p className="text-xs text-ink-500 mt-2 inline-flex items-center gap-1">
                <BookOpen size={12} /> Donated by {user.name}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required && <span className="text-rose-600">*</span>}
      </span>
      {children}
    </label>
  )
}
