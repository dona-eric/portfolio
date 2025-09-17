import React, { useState, Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Linkedin, Twitter, Mail, Github} from 'lucide-react'
import logo from "./assets/team-eric.jpg";

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Projects = lazy(() => import('./pages/Projects'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const Signup = lazy(() => import('./pages/Signup'))

// ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Navigation
function Nav() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark(!dark)
    if (!dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Nos Catalogues', path: '/services' },
    { name: 'Projets', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'S’inscrire', path: '/signup', cta: true }
  ]

  return (
    <nav className="bg-white dark:bg-slate-900 border-b shadow-sm fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Dona Eric"
            className="w-10 h-10 rounded-full object-cover shadow-xl border-2 border-purple-600"
          />
          <span className="font-bold text-xl text-purple-600 dark:text-purple-400">
            Dona Eric
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Dark Mode */}
          <button onClick={toggleDark} aria-label="Toggle Dark Mode">
            {dark ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>

          {/* Hamburger */}
          <button className="sm:hidden" onClick={() => setOpen(!open)} aria-label="menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  open
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={
                  link.cta
                    ? 'px-4 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition'
                    : 'text-slate-700 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium'
                }
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-white dark:bg-slate-800 px-4 pb-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-slate-800 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-sky-800 dark:bg-slate-900 text-purple-800 to pink-800 p-8 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <span>© Copyright 2025 donaerickoulodji. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="https://linkedin.com/in/dona-erick" aria-label="LinkedIn">
            <Linkedin size={25} />
          </a>
          <a href="https://x.com/EricSchrodinger" aria-label="Twitter">
            <Twitter size={25} />
          </a>
          <a href="mailto:donaerickoulodji@gmail.com" aria-label="Email">
            <Mail size={25} />
          </a>
          <a href='https://github.com/dona-eric' aria-label='Github'>
            <Github size={
              25
            }/>
          </a>
        </div>
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Votre email"
            className="px-3 py-1 rounded text-black"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-orange-500 rounded hover:bg-orange-600 transition"
          >
            S’abonner
          </button>
        </form>
      </div>
    </footer>
  )
}

// App
export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">
      <ScrollToTop />
      <Nav />
      <main className="flex-1 pt-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-10">Chargement...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
