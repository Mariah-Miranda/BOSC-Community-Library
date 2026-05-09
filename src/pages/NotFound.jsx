import { Link } from 'react-router-dom'
import { BookX, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <div className="mx-auto h-20 w-20 grid place-items-center rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">
        <BookX size={36} />
      </div>
      <h1 className="heading-serif mt-6 text-4xl sm:text-5xl font-bold text-ink-900 dark:text-ink-50">
        That page got reshelved.
      </h1>
      <p className="mt-3 max-w-md mx-auto text-ink-600 dark:text-ink-400">
        We couldn't find what you were looking for — but we have plenty more to read.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} /> Back home
        </Link>
        <Link to="/browse" className="btn-outline">
          Browse the library
        </Link>
      </div>
    </div>
  )
}
