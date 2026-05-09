import { useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Heart,
  Share2,
  CheckCircle2,
  Clock,
  Tag,
  Users,
  MessageCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useLibrary } from '../context/LibraryContext'
import BookCover from '../components/Books/BookCover'
import BookCard from '../components/Books/BookCard'
import Rating from '../components/UI/Rating'
import Avatar from '../components/UI/Avatar'
import { formatDate, daysUntil } from '../utils/format'

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    books,
    user,
    borrows,
    wishlist,
    reviews,
    borrowBook,
    returnBook,
    toggleWishlist,
    addReview,
    pushToast,
  } = useLibrary()

  const book = books.find((b) => b.id === id)
  const bookReviews = reviews[id] || []

  const aggregateRating = useMemo(() => {
    if (!book) return 0
    if (bookReviews.length === 0) return book.rating
    const sum = bookReviews.reduce((acc, r) => acc + r.rating, 0)
    return (book.rating + sum / bookReviews.length) / 2
  }, [book, bookReviews])

  const similar = useMemo(() => {
    if (!book) return []
    return books
      .filter((b) => b.id !== book.id && b.genre === book.genre)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
  }, [book, books])

  if (!book) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="heading-serif text-3xl font-bold">Book not found</h1>
        <p className="mt-2 text-ink-500">It may have been removed or never existed.</p>
        <Link to="/browse" className="btn-primary mt-6">
          Back to catalog
        </Link>
      </div>
    )
  }

  const myBorrow = borrows[book.id]
  const isMine = myBorrow && myBorrow.userId === user?.id
  const saved = wishlist.includes(book.id)
  const due = myBorrow ? daysUntil(myBorrow.dueDate) : null

  function onShare() {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({ title: book.title, text: book.description, url }).catch(() => {})
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      pushToast({ title: 'Link copied to clipboard', tone: 'info' })
    }
  }

  return (
    <div className="container-page py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-50 mb-6"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4"
        >
          <div className="aspect-[2/3] max-w-xs mx-auto lg:mx-0 rounded-2xl shadow-book overflow-hidden ring-1 ring-black/10">
            <BookCover book={book} className="w-full h-full" rounded="" />
          </div>

          <div className="mt-6 max-w-xs mx-auto lg:mx-0 space-y-3">
            {isMine ? (
              <button
                onClick={() => returnBook(book.id)}
                className="btn-secondary w-full py-3"
              >
                <CheckCircle2 size={16} /> Return book
              </button>
            ) : (
              <button
                onClick={() => borrowBook(book.id)}
                disabled={!book.available}
                className="btn-primary w-full py-3"
              >
                <BookOpen size={16} />
                {book.available ? 'Borrow this book' : 'All copies checked out'}
              </button>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => toggleWishlist(book.id)}
                className="btn-outline flex-1"
              >
                <Heart
                  size={14}
                  className={saved ? 'fill-rose-500 text-rose-500' : ''}
                />
                {saved ? 'Saved' : 'Save'}
              </button>
              <button onClick={onShare} className="btn-outline flex-1">
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            {book.genre} · {book.year}
          </p>
          <h1 className="heading-serif mt-2 text-4xl sm:text-5xl font-bold leading-tight text-ink-900 dark:text-ink-50 text-balance">
            {book.title}
          </h1>
          <p className="mt-3 text-lg text-ink-600 dark:text-ink-300">
            by <span className="font-semibold">{book.author}</span>
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Rating value={aggregateRating} count={bookReviews.length || undefined} size={18} />
            <span className="chip">
              <BookOpen size={12} /> {book.pages} pages
            </span>
            <span
              className={`chip ${
                book.available
                  ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300'
                  : 'bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-300'
              }`}
            >
              {book.available
                ? `${book.copies} available`
                : 'All copies borrowed'}
            </span>
            {book.addedBy && (
              <span className="chip">
                <Users size={12} /> Added by {book.addedBy}
              </span>
            )}
          </div>

          {isMine && (
            <div className="mt-6 card p-4 flex items-center gap-3 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/30">
              <Clock className="text-brand-700 dark:text-brand-400 shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                  You have this book.
                </p>
                <p className="text-xs text-ink-600 dark:text-ink-400">
                  Due back on {formatDate(myBorrow.dueDate)}
                  {due !== null && due >= 0 && ` · ${due} days left`}
                  {due !== null && due < 0 && (
                    <span className="text-rose-600 font-semibold">
                      {' '}
                      · {Math.abs(due)} days overdue
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 prose-base">
            <h2 className="heading-serif text-xl font-bold mb-2 text-ink-900 dark:text-ink-50">
              About this book
            </h2>
            <p className="text-ink-700 dark:text-ink-300 leading-relaxed">
              {book.description}
            </p>
          </div>

          {book.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Tag size={14} className="text-ink-500" />
              {book.tags.map((t) => (
                <Link
                  key={t}
                  to={`/browse?q=${encodeURIComponent(t)}`}
                  className="chip hover:bg-brand-100 dark:hover:bg-brand-900/40"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}

          <Reviews
            bookReviews={bookReviews}
            onSubmit={(payload) => addReview(book.id, payload)}
            user={user}
          />
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="heading-serif text-2xl sm:text-3xl font-bold mb-6 text-ink-900 dark:text-ink-50">
            More from {book.genre}
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {similar.map((b, i) => (
              <BookCard key={b.id} book={b} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Reviews({ bookReviews, onSubmit, user }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (!comment.trim()) return
    setSubmitting(true)
    const ok = onSubmit({ rating, comment: comment.trim() })
    if (ok) setComment('')
    setSubmitting(false)
  }

  return (
    <section className="mt-12">
      <header className="flex items-center gap-2 mb-5">
        <MessageCircle size={20} className="text-brand-700 dark:text-brand-400" />
        <h2 className="heading-serif text-xl font-bold text-ink-900 dark:text-ink-50">
          Reader reviews
          <span className="ml-2 text-sm font-normal text-ink-500">
            ({bookReviews.length})
          </span>
        </h2>
      </header>

      {user ? (
        <form onSubmit={submit} className="card p-5 mb-6">
          <p className="label">Your rating</p>
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className="text-2xl"
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
              >
                <span className={n <= rating ? 'text-accent-500' : 'text-ink-300 dark:text-ink-700'}>
                  ★
                </span>
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you think?"
            rows={3}
            className="input resize-none"
          />
          <button
            type="submit"
            disabled={!comment.trim() || submitting}
            className="btn-primary mt-3"
          >
            Post review
          </button>
        </form>
      ) : (
        <div className="card p-5 mb-6 text-center">
          <p className="text-sm text-ink-600 dark:text-ink-400">
            <Link to="/login" className="link">
              Sign in
            </Link>{' '}
            to share what you thought.
          </p>
        </div>
      )}

      {bookReviews.length === 0 ? (
        <p className="text-ink-500 text-sm">
          Be the first to review this one — your words help neighbors choose what to read.
        </p>
      ) : (
        <ul className="space-y-4">
          {bookReviews.map((r) => (
            <li key={r.id} className="card p-5">
              <div className="flex items-start gap-3">
                <Avatar user={{ name: r.userName, avatarHue: hashHue(r.userName) }} size={36} />
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-semibold text-ink-900 dark:text-ink-50">{r.userName}</p>
                    <p className="text-xs text-ink-500">{formatDate(r.createdAt)}</p>
                  </div>
                  <Rating value={r.rating} size={14} />
                  <p className="mt-2 text-sm text-ink-700 dark:text-ink-300">{r.comment}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function hashHue(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
  return h
}
