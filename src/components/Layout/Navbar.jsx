import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Search,
  Sun,
  Moon,
  BookOpen,
  Calendar,
  Heart,
  User,
  LogOut,
  Plus,
  Menu,
  X,
  Library,
  ChevronDown,
} from 'lucide-react'
import { useLibrary } from '../../context/LibraryContext'
import Logo from '../UI/Logo'
import Avatar from '../UI/Avatar'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse', icon: BookOpen },
  { to: '/events', label: 'Events', icon: Calendar },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { user, signOut, theme, toggleTheme, wishlist, borrows } = useLibrary()
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function onClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function onSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    } else {
      navigate('/browse')
    }
  }

  const borrowedCount = user
    ? Object.values(borrows).filter((b) => b.userId === user.id).length
    : 0

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/80 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-950/80">
      <div className="container-page flex h-16 items-center gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-1 ml-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30'
                    : 'text-ink-700 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-50 hover:bg-ink-100 dark:hover:bg-ink-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={onSearch}
          className="hidden lg:flex flex-1 max-w-sm relative ml-2"
          role="search"
        >
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, genre..."
            className="input pl-9 py-2 text-sm"
            aria-label="Search the library"
          />
        </form>

        <div className="flex-1 lg:hidden" />

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="hidden sm:grid h-10 w-10 place-items-center rounded-xl text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <>
              <Link
                to="/profile"
                className="hidden sm:inline-flex relative h-10 w-10 items-center justify-center rounded-xl text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800 transition-colors"
                aria-label="My list"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 grid h-4 min-w-[16px] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl pl-1.5 pr-2 py-1 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  <Avatar user={user} size={32} />
                  <span className="hidden md:inline text-sm font-semibold text-ink-800 dark:text-ink-200">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-ink-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {userMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-60 card overflow-hidden p-1.5 shadow-book"
                  >
                    <div className="px-3 py-2.5 border-b border-ink-200 dark:border-ink-800">
                      <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                        {user.name}
                      </p>
                      <p className="text-xs text-ink-500 truncate">{user.email}</p>
                    </div>
                    <MenuItem to="/profile" icon={User} label="My profile" />
                    <MenuItem
                      to="/profile?tab=borrowed"
                      icon={Library}
                      label="Borrowed books"
                      badge={borrowedCount}
                    />
                    <MenuItem to="/profile?tab=wishlist" icon={Heart} label="My list" />
                    <MenuItem to="/add-book" icon={Plus} label="Donate a book" />
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-flex btn-ghost">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary">
                Join the library
              </Link>
            </>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-ink-200/70 dark:border-ink-800 bg-white dark:bg-ink-950">
          <div className="container-page py-3 flex flex-col gap-1">
            <form onSubmit={onSearch} className="relative mb-2">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the library..."
                className="input pl-9 py-2 text-sm"
              />
            </form>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
                      : 'text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 inline-flex items-center gap-2"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function MenuItem({ to, icon: Icon, label, badge }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
      role="menuitem"
    >
      <span className="flex items-center gap-2.5">
        <Icon size={16} className="text-ink-500" />
        {label}
      </span>
      {badge ? (
        <span className="chip bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300 px-2 py-0.5 text-[10px]">
          {badge}
        </span>
      ) : null}
    </Link>
  )
}
