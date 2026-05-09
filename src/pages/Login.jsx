import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, BookOpen } from 'lucide-react'
import { useLibrary } from '../context/LibraryContext'

export default function Login() {
  const { user, signIn } = useLibrary()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (user) {
    return <Navigate to={location.state?.from?.pathname || '/profile'} replace />
  }

  function submit(e) {
    e.preventDefault()
    const name = email.split('@')[0].replace(/\W+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    signIn({ name: name || 'Reader', email })
    navigate('/profile')
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to keep track of your borrows, lists, and reviews."
      footer={
        <p className="text-sm text-ink-600 dark:text-ink-400">
          New here?{' '}
          <Link to="/signup" className="link">
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input pl-9"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input pl-9"
            />
          </div>
          <p className="mt-1 text-xs text-ink-500">
            Demo mode — any email & password will sign you in.
          </p>
        </div>
        <button type="submit" className="btn-primary w-full py-3">
          Sign in <ArrowRight size={16} />
        </button>
      </form>
    </AuthShell>
  )
}

export function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="container-page py-12 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="hidden lg:block">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 p-10 text-white aspect-square max-w-md">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <BookOpen className="text-accent-200" size={36} />
            <p className="heading-serif mt-8 text-3xl font-bold leading-tight text-balance">
              "A library is not a luxury, but one of the necessities of life."
            </p>
            <p className="mt-4 text-white/70">— Henry Ward Beecher</p>
            <div className="absolute bottom-10 left-10 right-10 grid grid-cols-3 gap-3 text-center">
              <Stat n="32+" l="Titles" />
              <Stat n="1.2k" l="Members" />
              <Stat n="0₵" l="Forever" />
            </div>
          </div>
        </div>
        <div>
          <div className="max-w-md mx-auto lg:mx-0">
            <h1 className="heading-serif text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-ink-600 dark:text-ink-400">{subtitle}</p>
            )}
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-6">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ n, l }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur p-3 border border-white/15">
      <p className="heading-serif text-xl font-bold">{n}</p>
      <p className="text-[11px] uppercase tracking-wider text-white/70">{l}</p>
    </div>
  )
}
