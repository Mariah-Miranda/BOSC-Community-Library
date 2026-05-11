import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import BookCover from './BookCover'
import Rating from '../UI/Rating'
import { useLibrary } from '../../context/LibraryContext'

export default function BookCard({ book, index = 0 }) {
  const { wishlist, toggleWishlist } = useLibrary()
  const saved = wishlist.includes(book.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative"
    >
      <Link
        to={`/books/${book.id}`}
        className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50 dark:focus-visible:ring-offset-ink-950"
      >
        <div className="card overflow-hidden hover:shadow-book hover:-translate-y-1 transition-all duration-300">
          <div className="relative aspect-[2/3] bg-ink-100 dark:bg-ink-800">
            <BookCover book={book} className="w-full h-full" rounded="" />
            {!book.available && (
              <div className="absolute top-3 left-3 chip bg-ink-900/85 text-white backdrop-blur">
                Borrowed
              </div>
            )}
            {book.copies > 0 && book.available && (
              <div className="absolute top-3 left-3 chip bg-white/90 text-brand-800 backdrop-blur">
                {book.copies} {book.copies === 1 ? 'copy' : 'copies'}
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
              {book.genre}
            </div>
            <h3 className="heading-serif mt-1 text-lg font-semibold text-ink-900 dark:text-ink-50 line-clamp-2 leading-tight">
              {book.title}
            </h3>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-400 line-clamp-1">
              {book.author}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <Rating value={book.rating} size={14} />
              <span className="text-xs text-ink-500">{book.year}</span>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault()
          toggleWishlist(book.id)
        }}
        className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-700 backdrop-blur shadow-soft transition-all hover:scale-110 hover:bg-white dark:bg-ink-900/90 dark:text-ink-200"
        aria-label={saved ? 'Remove from list' : 'Save to list'}
      >
        {saved ? (
          <Heart size={16} className="fill-rose-500 text-rose-500" />
        ) : (
          <Heart size={16} />
        )}
      </button>
    </motion.div>
  )
}
