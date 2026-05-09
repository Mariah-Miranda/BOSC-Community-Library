import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { books as seedBooks } from '../data/books'

const STORAGE_KEY = 'biosc-library-state-v1'
const THEME_KEY = 'biosc-theme'

const LibraryContext = createContext(null)

const initialState = {
  user: null, // { id, name, email, joined, avatarHue }
  books: seedBooks,
  // borrows: { [bookId]: { dueDate: ISO, borrowedAt: ISO, userId } }
  borrows: {},
  // wishlist: bookIds[]
  wishlist: [],
  // history: [{ bookId, borrowedAt, returnedAt }]
  history: [],
  // reviews: { [bookId]: [{ id, userId, userName, rating, comment, createdAt }] }
  reviews: {},
  // events RSVP: eventIds[]
  rsvps: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload }

    case 'SIGN_IN':
      return { ...state, user: action.payload }

    case 'SIGN_OUT':
      return { ...state, user: null }

    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } }

    case 'BORROW': {
      const { bookId, dueDate } = action.payload
      const book = state.books.find((b) => b.id === bookId)
      if (!book || book.copies <= 0) return state
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === bookId
            ? {
                ...b,
                copies: b.copies - 1,
                available: b.copies - 1 > 0,
              }
            : b,
        ),
        borrows: {
          ...state.borrows,
          [bookId]: {
            bookId,
            borrowedAt: new Date().toISOString(),
            dueDate,
            userId: state.user?.id,
          },
        },
      }
    }

    case 'RETURN': {
      const { bookId } = action.payload
      const borrow = state.borrows[bookId]
      const { [bookId]: _omit, ...rest } = state.borrows
      return {
        ...state,
        borrows: rest,
        books: state.books.map((b) =>
          b.id === bookId
            ? { ...b, copies: b.copies + 1, available: true }
            : b,
        ),
        history: borrow
          ? [
              { ...borrow, returnedAt: new Date().toISOString() },
              ...state.history,
            ]
          : state.history,
      }
    }

    case 'TOGGLE_WISHLIST': {
      const { bookId } = action.payload
      const exists = state.wishlist.includes(bookId)
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== bookId)
          : [...state.wishlist, bookId],
      }
    }

    case 'ADD_BOOK':
      return { ...state, books: [action.payload, ...state.books] }

    case 'ADD_REVIEW': {
      const { bookId, review } = action.payload
      const list = state.reviews[bookId] || []
      return {
        ...state,
        reviews: { ...state.reviews, [bookId]: [review, ...list] },
      }
    }

    case 'TOGGLE_RSVP': {
      const { eventId } = action.payload
      const exists = state.rsvps.includes(eventId)
      return {
        ...state,
        rsvps: exists
          ? state.rsvps.filter((id) => id !== eventId)
          : [...state.rsvps, eventId],
      }
    }

    default:
      return state
  }
}

function loadState() {
  if (typeof window === 'undefined') return initialState
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    // Always re-merge fresh seed books so we don't get stuck on an old catalog,
    // but preserve copies counts that have been mutated by borrow/return.
    const mergedBooks = seedBooks.map((seed) => {
      const stored = parsed.books?.find((b) => b.id === seed.id)
      return stored ? { ...seed, copies: stored.copies, available: stored.available } : seed
    })
    // include user-added books that aren't in seed
    const customBooks = (parsed.books || []).filter(
      (b) => !seedBooks.find((s) => s.id === b.id),
    )
    return {
      ...initialState,
      ...parsed,
      books: [...customBooks, ...mergedBooks],
    }
  } catch {
    return initialState
  }
}

export function LibraryProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const [toasts, setToasts] = useState([])
  const toastIdRef = useRef(0)

  // Theme management
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem(THEME_KEY)
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore quota errors */
    }
  }, [state])

  // Toast helpers
  const pushToast = useCallback((toast) => {
    const id = ++toastIdRef.current
    const t = {
      id,
      tone: 'success',
      duration: 3500,
      ...toast,
    }
    setToasts((prev) => [...prev, t])
    if (t.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id))
      }, t.duration)
    }
    return id
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Public API actions
  const signIn = useCallback(
    ({ name, email }) => {
      const user = {
        id: 'u-' + (email || name).toLowerCase().replace(/[^a-z0-9]/g, ''),
        name: name || 'Reader',
        email: email || '',
        joined: new Date().toISOString(),
        avatarHue: Math.floor(Math.random() * 360),
      }
      dispatch({ type: 'SIGN_IN', payload: user })
      pushToast({ title: `Welcome, ${user.name.split(' ')[0]}!`, tone: 'success' })
      return user
    },
    [pushToast],
  )

  const signOut = useCallback(() => {
    dispatch({ type: 'SIGN_OUT' })
    pushToast({ title: 'Signed out', tone: 'info' })
  }, [pushToast])

  const updateProfile = useCallback((patch) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: patch })
  }, [])

  const borrowBook = useCallback(
    (bookId, days = 14) => {
      if (!state.user) {
        pushToast({
          title: 'Please sign in first',
          description: 'You need an account to borrow books.',
          tone: 'warning',
        })
        return false
      }
      const book = state.books.find((b) => b.id === bookId)
      if (!book) return false
      if (state.borrows[bookId]) {
        pushToast({ title: 'Already borrowed', tone: 'info' })
        return false
      }
      if (book.copies <= 0) {
        pushToast({ title: 'No copies available', tone: 'warning' })
        return false
      }
      const dueDate = new Date(Date.now() + days * 86400000).toISOString()
      dispatch({ type: 'BORROW', payload: { bookId, dueDate } })
      pushToast({
        title: `Borrowed "${book.title}"`,
        description: `Due back in ${days} days.`,
        tone: 'success',
      })
      return true
    },
    [state.user, state.books, state.borrows, pushToast],
  )

  const returnBook = useCallback(
    (bookId) => {
      const book = state.books.find((b) => b.id === bookId)
      dispatch({ type: 'RETURN', payload: { bookId } })
      pushToast({
        title: `Returned "${book?.title || 'book'}"`,
        description: 'Thanks for keeping it in good shape.',
        tone: 'success',
      })
    },
    [state.books, pushToast],
  )

  const toggleWishlist = useCallback(
    (bookId) => {
      if (!state.user) {
        pushToast({ title: 'Sign in to save to your list', tone: 'warning' })
        return
      }
      const exists = state.wishlist.includes(bookId)
      dispatch({ type: 'TOGGLE_WISHLIST', payload: { bookId } })
      pushToast({
        title: exists ? 'Removed from your list' : 'Saved to your list',
        tone: exists ? 'info' : 'success',
      })
    },
    [state.user, state.wishlist, pushToast],
  )

  const addBook = useCallback(
    (book) => {
      const newBook = {
        id: 'u-' + Date.now().toString(36),
        rating: 0,
        copies: 1,
        available: true,
        addedBy: state.user?.name || 'Anonymous',
        palette: ['#0f5132', '#16a34a', '#86efac'],
        tags: [],
        ...book,
      }
      dispatch({ type: 'ADD_BOOK', payload: newBook })
      pushToast({ title: `Added "${newBook.title}" to the library`, tone: 'success' })
      return newBook
    },
    [state.user, pushToast],
  )

  const addReview = useCallback(
    (bookId, { rating, comment }) => {
      if (!state.user) {
        pushToast({ title: 'Sign in to leave a review', tone: 'warning' })
        return false
      }
      const review = {
        id: 'r-' + Date.now().toString(36),
        userId: state.user.id,
        userName: state.user.name,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      }
      dispatch({ type: 'ADD_REVIEW', payload: { bookId, review } })
      pushToast({ title: 'Thanks for your review', tone: 'success' })
      return true
    },
    [state.user, pushToast],
  )

  const toggleRsvp = useCallback(
    (eventId) => {
      if (!state.user) {
        pushToast({ title: 'Sign in to RSVP', tone: 'warning' })
        return
      }
      const exists = state.rsvps.includes(eventId)
      dispatch({ type: 'TOGGLE_RSVP', payload: { eventId } })
      pushToast({
        title: exists ? 'RSVP cancelled' : 'RSVP confirmed',
        tone: exists ? 'info' : 'success',
      })
    },
    [state.user, state.rsvps, pushToast],
  )

  const value = useMemo(
    () => ({
      ...state,
      theme,
      setTheme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      toasts,
      pushToast,
      dismissToast,
      signIn,
      signOut,
      updateProfile,
      borrowBook,
      returnBook,
      toggleWishlist,
      addBook,
      addReview,
      toggleRsvp,
    }),
    [
      state,
      theme,
      toasts,
      pushToast,
      dismissToast,
      signIn,
      signOut,
      updateProfile,
      borrowBook,
      returnBook,
      toggleWishlist,
      addBook,
      addReview,
      toggleRsvp,
    ],
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}
