import BookCard from './BookCard'

export default function BookGrid({ books, empty = 'No books found.' }) {
  if (!books || books.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-ink-500">{empty}</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((b, i) => (
        <BookCard key={b.id} book={b} index={i} />
      ))}
    </div>
  )
}
