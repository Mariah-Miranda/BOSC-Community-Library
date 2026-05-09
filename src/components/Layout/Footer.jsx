import { Link } from 'react-router-dom'
import { BookOpenCheck, Github, Twitter, Mail, MapPin } from 'lucide-react'
import Logo from '../UI/Logo'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-200/70 dark:border-ink-800 bg-white/60 dark:bg-ink-950/60">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
              A community-run library for readers, makers, and the quietly curious.
              Borrow, share, and meet your neighbors over a good book.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialLink href="#" label="Twitter">
                <Twitter size={16} />
              </SocialLink>
              <SocialLink href="#" label="GitHub">
                <Github size={16} />
              </SocialLink>
              <SocialLink href="mailto:hello@biosc.library" label="Email">
                <Mail size={16} />
              </SocialLink>
            </div>
          </div>

          <FooterCol title="Library">
            <FooterLink to="/browse">Browse catalog</FooterLink>
            <FooterLink to="/events">Events & clubs</FooterLink>
            <FooterLink to="/add-book">Donate a book</FooterLink>
            <FooterLink to="/about">About us</FooterLink>
          </FooterCol>

          <FooterCol title="Visit">
            <li className="flex gap-2 text-sm text-ink-600 dark:text-ink-400">
              <MapPin size={14} className="mt-1 shrink-0 text-brand-600" />
              <span>
                12 Reading Lane
                <br />
                BIOSC Community Center
              </span>
            </li>
            <li className="flex gap-2 text-sm text-ink-600 dark:text-ink-400 mt-2">
              <BookOpenCheck size={14} className="mt-1 shrink-0 text-brand-600" />
              <span>
                Mon–Fri · 10am – 8pm
                <br />
                Sat–Sun · 9am – 6pm
              </span>
            </li>
          </FooterCol>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-200/70 dark:border-ink-800 flex flex-col gap-2 sm:flex-row sm:justify-between text-xs text-ink-500">
          <p>
            © {new Date().getFullYear()} BIOSC Community Library. Made with care by readers, for readers.
          </p>
          <p>
            <Link to="/about" className="hover:text-ink-700 dark:hover:text-ink-300">
              Membership
            </Link>{' '}
            ·{' '}
            <a href="#" className="hover:text-ink-700 dark:hover:text-ink-300">
              Code of conduct
            </a>{' '}
            ·{' '}
            <a href="#" className="hover:text-ink-700 dark:hover:text-ink-300">
              Privacy
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-3">
        {title}
      </h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-ink-600 dark:text-ink-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 dark:border-ink-800 text-ink-600 dark:text-ink-400 hover:text-brand-700 dark:hover:text-brand-400 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
    >
      {children}
    </a>
  )
}
