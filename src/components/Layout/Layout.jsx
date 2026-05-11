import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ToastViewport from '../UI/Toast'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    // 'instant' is not supported by every browser; a plain (x, y) call jumps
    // to top without animation everywhere, keeping route changes snappy.
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-ink-50 dark:bg-ink-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastViewport />
    </div>
  )
}
