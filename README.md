# BIOSC Community Library

A modern, production-quality React web application for a community-run library.
Borrow books, RSVP to events, build your reading list, donate titles, and write
reviews — all in a beautifully designed, responsive interface.

![BIOSC Community Library](public/favicon.svg)

## ✨ Features

- **Beautiful home page** with hero, featured stack of books, stats, categories, and upcoming events.
- **Browse & search** with text search, genre filter, rating filter, availability toggle, sort options, and grid / list views.
- **Book detail pages** with rich descriptions, ratings, reviews, similar reads, and a full borrow / return / wishlist flow.
- **Authentication** (mock, localStorage-backed) — sign up / sign in to unlock borrowing, reviews, RSVPs, and donations.
- **Member profile** with tabs for borrowed books, wishlist, reading history, and event RSVPs.
- **Donate a book** form with a live cover preview that adds the book to the catalog.
- **Events page** with filters, capacity progress bars, and one-click RSVPs.
- **About page** with values, story, team, location, and hours.
- **Dark mode** with system-preference detection and persistence.
- **Toast notifications** for every important action.
- **Generated SVG book covers** — no remote image dependency, beautiful at every size.
- **Fully responsive** from 360px to ultrawide.
- **Persistent state** — your borrows, wishlist, reviews, and account survive a page refresh.

## 🧱 Tech Stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [React Router 6](https://reactrouter.com/) for routing
- [Tailwind CSS 3](https://tailwindcss.com/) for styling, with a custom design system
- [Framer Motion](https://www.framer.com/motion/) for subtle animations
- [Lucide React](https://lucide.dev/) icon set
- Custom React Context + reducer for app state, persisted to `localStorage`

## 🚀 Getting Started

```bash
npm install
npm run dev
```

The app runs at <http://localhost:5173>.

To build for production:

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Books/         # BookCard, BookGrid, BookCover (generated SVG)
│   ├── Layout/        # Navbar, Footer, Layout shell
│   └── UI/            # Avatar, Logo, Rating, Toast viewport
├── context/
│   └── LibraryContext.jsx  # Global state: auth, books, borrows, wishlist, reviews, theme
├── data/
│   ├── books.js       # 32 seed books with descriptions and palettes
│   └── events.js      # Upcoming community events
├── pages/             # Home, Browse, BookDetail, Profile, Login, Signup,
│                      # AddBook, Events, About, NotFound
├── utils/
│   └── format.js      # Date and string helpers
├── App.jsx            # Route definitions
├── main.jsx           # Entry point with providers
└── index.css          # Tailwind + global styles + design tokens
```

## 🎨 Design

The visual language pairs **emerald green** (the brand) with **warm amber**
(accent) and a deep slate-blue **ink** scale for text. Headlines use the elegant
**Fraunces** serif; body text uses **Inter**.

All book covers are generated client-side from per-book deterministic palettes
and patterns — so the catalog looks curated without depending on remote images.

## 🔐 Demo accounts

The app uses mock authentication, so any email and password will sign you in.
All session data is stored in `localStorage` under the keys
`biosc-library-state-v1` and `biosc-theme`.

To reset the app, clear those keys from your browser's storage.

## 📄 License

MIT — built as a demonstration project. Use, learn from, and adapt freely.
