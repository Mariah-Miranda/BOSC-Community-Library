import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight, Check } from 'lucide-react'
import { useLibrary } from '../context/LibraryContext'
import { AuthShell } from './Login'

export default function Signup() {
  const { user, signIn } = useLibrary()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (user) return <Navigate to="/profile" replace />

  function submit(e) {
    e.preventDefault()
    signIn({ name: name.trim() || email.split('@')[0], email: email.trim() })
    navigate('/profile')
  }

  return (
    <AuthShell
      title="Become a member"
      subtitle="It's free, forever — and takes about 10 seconds."
      footer={
        <p className="text-sm text-ink-600 dark:text-ink-400">
          Already a member?{' '}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="name" className="label">
            Your name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
              className="input pl-9"
            />
          </div>
        </div>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="input pl-9"
            />
          </div>
        </div>

        <ul className="text-sm text-ink-600 dark:text-ink-400 space-y-1.5 pt-1">
          <Perk>Borrow up to 5 books at a time</Perk>
          <Perk>RSVP to events and book clubs</Perk>
          <Perk>Donate books and curate your reading list</Perk>
        </ul>

        <button type="submit" className="btn-primary w-full py-3 mt-2">
          Create my account <ArrowRight size={16} />
        </button>
      </form>
    </AuthShell>
  )
}

function Perk({ children }) {
  return (
    <li className="flex items-start gap-2">
      <Check size={14} className="mt-0.5 text-brand-600 shrink-0" />
      <span>{children}</span>
    </li>
  )
}
