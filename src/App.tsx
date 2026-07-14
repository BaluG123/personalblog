import { motion, useMotionValue, useSpring, useScroll, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Briefcase, Mail, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  apps,
  categories,
  experience,
  kaams,
  profile,
  skills,
  vivah,
  type AppCategory,
  type AppItem,
} from './data/portfolio'

function asset(path: string) {
  const clean = path.replace(/^\//, '')
  const base = import.meta.env.BASE_URL || './'
  if (base.endsWith('/')) return `${base}${clean}`
  return `${base}/${clean}`
}

function AppLogo({ app, size = 56 }: { app: AppItem; size?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-2xl border border-lime/40 bg-lime/15 font-display text-lg font-bold text-lime"
        aria-label={`${app.name} logo`}
      >
        {app.name.slice(0, 1)}
      </div>
    )
  }
  return (
    <img
      src={asset(app.icon)}
      alt={`${app.name} logo`}
      width={size}
      height={size}
      className="shrink-0 rounded-2xl border border-line bg-ink object-cover shadow-[0_0_28px_rgba(61,255,139,0.18)]"
      loading="eager"
      onError={() => setFailed(true)}
    />
  )
}

function AppQr({ url, size = 96 }: { url: string; size?: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <div className="rounded-xl border-2 border-lime/60 bg-white p-2 shadow-[0_0_28px_rgba(61,255,139,0.3)]">
        <QRCodeSVG
          value={url}
          size={size}
          bgColor="#ffffff"
          fgColor="#03110a"
          level="M"
          includeMargin={false}
          style={{ width: size, height: size, display: 'block' }}
        />
      </div>
      <span className="text-[10px] font-semibold tracking-widest text-lime uppercase">
        Scan
      </span>
    </div>
  )
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.367 6.839 9.722.5.094.682-.222.682-.482 0-.237-.009-.866-.013-1.7-2.782.62-3.369-1.38-3.369-1.38-.454-1.18-1.11-1.495-1.11-1.495-.908-.636.069-.623.069-.623 1.004.072 1.532 1.06 1.532 1.06.892 1.566 2.341 1.114 2.91.852.092-.662.35-1.114.636-1.37-2.22-.26-4.555-1.143-4.555-5.087 0-1.124.39-2.043 1.029-2.764-.103-.26-.446-1.302.098-2.714 0 0 .84-.276 2.75 1.055A9.28 9.28 0 0 1 12 6.918a9.29 9.29 0 0 1 2.504.347c1.909-1.331 2.747-1.055 2.747-1.055.546 1.412.203 2.454.1 2.714.64.721 1.028 1.64 1.028 2.764 0 3.953-2.338 4.823-4.566 5.078.359.317.679.943.679 1.902 0 1.372-.012 2.477-.012 2.814 0 .263.18.58.688.48C19.138 20.616 22 16.78 22 12.253 22 6.586 17.523 2 12 2z" />
    </svg>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-lime via-sky to-lime"
    />
  )
}

/** Custom cursor icon that tracks the pointer everywhere */
function LegendaryCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 })
  const rx = useSpring(x, { stiffness: 180, damping: 28, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 180, damping: 28, mass: 0.6 })
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement | null
      const interactive = !!t?.closest('a, button, [role="button"], input, textarea, .cursor-grow')
      setHovering(interactive)
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Soft glow trail */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[9998] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: rx,
          top: ry,
          background:
            'radial-gradient(circle, rgba(61,255,139,0.22) 0%, rgba(61,255,139,0.06) 45%, transparent 70%)',
        }}
      />
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/70"
        style={{
          left: rx,
          top: ry,
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          transition: 'width 0.2s ease, height 0.2s ease',
          background: hovering ? 'rgba(61,255,139,0.08)' : 'transparent',
          scale: clicking ? 0.85 : 1,
        }}
      />
      {/* Core pointer diamond */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[10000] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ left: sx, top: sy }}
      >
        <div
          className="relative flex h-4 w-4 rotate-45 items-center justify-center rounded-[3px] bg-lime shadow-[0_0_18px_rgba(61,255,139,0.85)]"
          style={{ transform: clicking ? 'rotate(45deg) scale(0.8)' : 'rotate(45deg)' }}
        >
          <div className="h-1.5 w-1.5 rounded-[1px] bg-ink" />
        </div>
      </motion.div>
    </>
  )
}

const navLinks = [
  { href: '#work', label: 'Experience' },
  { href: '#apps', label: 'Solo Lab' },
  { href: '#skills', label: 'Skills' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || open
          ? 'border-b border-line bg-ink/90 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl'
          : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="cursor-grow font-display text-sm font-bold tracking-tight text-cream md:text-base"
          onClick={() => setOpen(false)}
        >
          Balappa<span className="text-lime">.</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="cursor-grow text-sm text-mist transition hover:text-lime"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="cursor-grow inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft/80 px-3 py-1.5 text-xs text-cream transition hover:border-lime/50 hover:text-lime"
          >
            <GitHubIcon size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <button
            type="button"
            className="cursor-grow inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-line bg-ink/98 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-lg text-cream transition hover:bg-panel hover:text-lime"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function AppMarquee() {
  const names = apps.map((a) => a.name)
  const loop = [...names, ...names]
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-soft/60 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent" />
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-sm font-semibold tracking-wide text-mist/90"
          >
            <span className="text-lime">◈</span> {name}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-28 md:pb-14 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="pointer-events-none absolute -left-20 top-16 h-80 w-80 rounded-full bg-lime/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-32 h-96 w-96 rounded-full bg-sky/12 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/35 bg-lime/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-lime uppercase"
        >
          React Native · Bangalore · Open to opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.06 }}
          className="font-display text-[clamp(3.4rem,13vw,8rem)] leading-[0.88] font-extrabold tracking-tight text-cream"
        >
          Balappa
          <br />
          <span className="bg-gradient-to-r from-lime via-[#9dffb8] to-sky bg-clip-text text-transparent">
            Goudi
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16 }}
          className="mt-8 flex max-w-2xl flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <p className="text-lg leading-relaxed text-mist md:text-xl">{profile.tagline}</p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="#work"
              className="cursor-grow inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink shadow-[0_0_32px_rgba(61,255,139,0.35)] transition hover:brightness-110"
            >
              View experience
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#apps"
              className="cursor-grow inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-cream transition hover:border-lime/60 hover:text-lime"
            >
              Solo Lab
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-14 grid grid-cols-3 gap-4 border-t border-line pt-8 md:max-w-xl"
        >
          {[
            { n: `${profile.experienceYears}+`, l: 'Years experience' },
            { n: `${profile.appsLive}`, l: 'Apps published' },
            { n: profile.installs, l: 'Organic installs' },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-2xl font-bold text-cream md:text-4xl">{s.n}</div>
              <div className="mt-1 text-xs tracking-wide text-mist uppercase md:text-sm">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 mt-12 md:mt-16">
        <AppMarquee />
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.15fr] md:gap-16 md:px-8">
        <div>
          <p className="text-sm tracking-[0.22em] text-lime uppercase">About</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Production mobile.
            <br />
            End to end.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-mist md:text-lg">
          <p>
            I&apos;m a React Native developer based in Bangalore with {profile.experienceYears}+ years
            building and shipping Android &amp; iOS products — AI-powered platforms, government systems,
            fleet &amp; CRM tools, and {profile.appsLive} apps live on the Play Store.
          </p>
          <p>
            Recently I delivered Vivah.World (AI matrimonial) and KAAMS (face-recognition attendance for
            Karnataka e-governance). Outside of client work, I ship indie apps across education, fitness,
            and booking — each with logos and QR below in Solo Lab.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-sm text-cream">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-lime" />
              {profile.location}
            </span>
            <span>
              {profile.education.degree} · {profile.education.school}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionLabel({
  icon,
  children,
}: {
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/35 bg-lime/10 px-3 py-1 text-xs font-semibold tracking-wide text-lime uppercase">
      {icon}
      {children}
    </div>
  )
}

function SoloLab() {
  const [filter, setFilter] = useState<AppCategory>('All')
  const filtered = useMemo(() => {
    if (filter === 'All') return apps
    return apps.filter((a) => a.category === filter)
  }, [filter])

  return (
    <section id="apps" className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionLabel icon={<Sparkles size={12} />}>
          {apps.length} apps on Play Store
        </SectionLabel>
        <p className="text-sm tracking-[0.22em] text-lime uppercase">Solo Lab</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          Indie apps I shipped
        </h2>
        <p className="mt-4 max-w-2xl text-mist">
          Side projects and products I built end-to-end — scan any QR to open the live listing.
        </p>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`cursor-grow shrink-0 rounded-full px-4 py-2 text-sm transition ${
                filter === c
                  ? 'bg-lime font-semibold text-ink'
                  : 'border border-line text-mist hover:border-lime/50 hover:text-cream'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((app, i) => (
              <motion.article
                key={app.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.03 }}
                className="group relative overflow-hidden rounded-2xl border border-line bg-panel/95 p-5 transition hover:border-lime/45 hover:shadow-[0_0_40px_rgba(61,255,139,0.08)]"
              >
                <div
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl transition group-hover:opacity-55"
                  style={{ background: app.accent }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 gap-3">
                      <AppLogo app={app} size={56} />
                      <div className="min-w-0">
                        <p className="text-xs tracking-wide text-mist uppercase">
                          {app.featured ? 'Spotlight · ' : ''}
                          {app.category} · {app.downloads}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-bold text-cream">
                          {app.name}
                        </h3>
                      </div>
                    </div>
                    <AppQr url={app.playStore} size={88} />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-mist">{app.tagline}</p>
                  <ul className="mt-3 space-y-1.5">
                    {app.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="text-xs leading-relaxed text-cream/70">
                        · {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {app.stack.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-md bg-ink px-2 py-0.5 text-[10px] text-mist">
                          {s}
                        </span>
                      ))}
                    </div>
                    <a
                      href={app.playStore}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-grow inline-flex items-center gap-1 text-xs font-semibold text-lime transition hover:underline"
                    >
                      Open
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="work" className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionLabel icon={<Briefcase size={12} />}>Professional work</SectionLabel>
        <p className="text-sm tracking-[0.22em] text-lime uppercase">Experience</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          Products I&apos;ve shipped at work
        </h2>
        <p className="mt-4 max-w-2xl text-mist">
          AI, government e-governance, CRM, and fleet — delivery across Android and iOS.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* Vivah.World highlight */}
          <article className="overflow-hidden rounded-3xl border border-line bg-panel">
            <div className="relative border-b border-line bg-gradient-to-br from-[#1a0a12] via-ink-soft to-panel p-6">
              <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-[#ff4d8d]/20 blur-3xl" />
              <div className="relative flex gap-4">
                <img
                  src={asset(vivah.logo)}
                  alt="Vivah.World logo"
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] rounded-2xl border border-white/10 bg-black object-contain p-1.5 shadow-[0_0_32px_rgba(255,77,141,0.28)]"
                />
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-amber-200 uppercase">
                      Current
                    </span>
                    <span className="rounded-full border border-lime/30 bg-lime/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-lime uppercase">
                      Android & iOS
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-cream md:text-3xl">
                    {vivah.name}
                  </h3>
                  <p className="mt-1 text-sm text-mist">
                    {vivah.company} · {vivah.dates}
                  </p>
                </div>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-mist">{vivah.summary}</p>
              <p className="relative mt-2 text-xs text-cream/70">{vivah.status}</p>
            </div>
            <ul className="grid gap-0 sm:grid-cols-2">
              {vivah.features.slice(0, 6).map((f) => (
                <li key={f.title} className="border-t border-line p-4 sm:odd:border-r">
                  <p className="text-sm font-semibold text-cream">{f.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{f.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          {/* KAAMS highlight */}
          <article className="overflow-hidden rounded-3xl border border-line bg-panel">
            <div className="relative border-b border-line bg-gradient-to-br from-[#0a1a14] via-ink-soft to-panel p-6">
              <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-lime/15 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-lime/30 bg-lime/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-lime uppercase">
                    GovTech
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-mist uppercase">
                    Live on stores
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-cream md:text-3xl">
                  {kaams.name}
                </h3>
                <p className="mt-1 text-sm text-cream/85">{kaams.fullName}</p>
                <p className="mt-2 text-sm text-mist">
                  {kaams.client} · via {kaams.company}
                </p>
                <p className="mt-1 text-xs text-mist">{kaams.dates}</p>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-mist">{kaams.summary}</p>
            </div>
            <ul className="grid gap-0 sm:grid-cols-2">
              {kaams.features.map((f) => (
                <li key={f.title} className="border-t border-line p-4 sm:odd:border-r">
                  <p className="text-sm font-semibold text-cream">{f.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{f.detail}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-xl font-bold text-cream">Career timeline</h3>
          {experience.map((job, i) => (
            <motion.article
              key={job.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid gap-4 border-t border-line py-10 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <div>
                <p className="text-sm text-mist">{job.dates}</p>
                {job.current && (
                  <span className="mt-2 inline-block rounded-full bg-lime/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-lime uppercase">
                    Current
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-cream transition group-hover:text-lime">
                  {job.role}
                </h3>
                <p className="mt-1 text-mist">{job.company}</p>
                <ul className="mt-5 space-y-2.5">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative pl-4 text-sm leading-relaxed text-mist before:absolute before:top-2 before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-lime/70 md:text-[15px]"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                {job.stack && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line px-3 py-1 text-xs text-cream/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const groups = [
    { title: 'Languages', items: skills.languages },
    { title: 'Frameworks', items: skills.frameworks },
    { title: 'Developer tools', items: skills.tools },
    { title: 'AI tools', items: skills.aiTools },
    { title: 'Specialties', items: skills.specialties },
  ]

  return (
    <section id="skills" className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm tracking-[0.22em] text-lime uppercase">Skills</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Stack I live in
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.05 }}
              className={
                g.title === 'AI tools' || g.title === 'Specialties' ? 'md:col-span-2' : ''
              }
            >
              <h3 className="text-sm font-semibold tracking-wide text-mist uppercase">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className={`cursor-grow rounded-full border px-3.5 py-1.5 text-sm transition hover:border-lime/50 hover:text-lime ${
                      g.title === 'AI tools'
                        ? 'border-lime/40 bg-lime/10 text-lime'
                        : 'border-line bg-ink-soft text-cream'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section id="resume" className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm tracking-[0.22em] text-lime uppercase">Resume</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Updated profile
        </h2>
        <p className="mt-4 max-w-2xl text-mist">
          Infobell · EpicMinds (KAAMS) · Block Stack · Kibbcom · {apps.length} Play Store apps ·{' '}
          {profile.location}
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-panel">
          <div className="border-b border-line bg-ink-soft/80 px-6 py-5 md:px-8">
            <h3 className="font-display text-2xl font-bold">{profile.name}</h3>
            <p className="mt-1 text-sm text-mist">
              {profile.title} · {profile.location}
            </p>
            <p className="mt-2 text-sm text-cream/80">
              {profile.email} · {profile.phone} · github.com/BaluG123
            </p>
          </div>
          <div className="grid gap-0 md:grid-cols-2">
            <div className="border-b border-line p-6 md:border-r md:border-b-0 md:p-8">
              <h4 className="text-xs tracking-widest text-lime uppercase">Experience</h4>
              <ul className="mt-4 space-y-4">
                {experience.map((e) => (
                  <li key={e.company}>
                    <p className="font-semibold text-cream">{e.role}</p>
                    <p className="text-sm text-mist">
                      {e.company} · {e.dates}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 md:p-8">
              <h4 className="text-xs tracking-widest text-lime uppercase">Highlights & education</h4>
              <p className="mt-4 font-semibold text-cream">{profile.education.degree}</p>
              <p className="text-sm text-mist">
                {profile.education.school} · {profile.education.dates}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-mist">
                <li>· Vivah.World — AI matrimonial (Android & iOS)</li>
                <li>· KAAMS — Govt. of Karnataka attendance platform</li>
                <li>· {apps.length} published Play Store apps · {profile.installs} installs</li>
                <li>· AI tools: Claude.ai, Cursor, Antigravity, Gemini</li>
              </ul>
              <a
                href={asset('resume.html')}
                target="_blank"
                rel="noreferrer"
                className="cursor-grow mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink"
              >
                Open printable resume
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-20 md:py-28">
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lime/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-sky/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm tracking-[0.22em] text-lime uppercase">Contact</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
          Let&apos;s ship the next legendary app.
        </h2>
        <p className="mt-4 flex items-center gap-2 text-mist">
          <MapPin size={16} className="text-lime" />
          {profile.location}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={profile.emailHref}
            className="cursor-grow inline-flex items-center gap-3 rounded-2xl border border-line bg-panel px-5 py-4 text-cream transition hover:border-lime/50"
          >
            <Mail className="text-lime" size={18} />
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="cursor-grow inline-flex items-center gap-3 rounded-2xl border border-line bg-panel px-5 py-4 text-cream transition hover:border-lime/50"
          >
            <Phone className="text-lime" size={18} />
            {profile.phone}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="cursor-grow inline-flex items-center gap-3 rounded-2xl border border-line bg-panel px-5 py-4 text-cream transition hover:border-lime/50"
          >
            <span className="text-lime">
              <GitHubIcon size={18} />
            </span>
            github.com/BaluG123
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-mist md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>React Native developer · Bangalore</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="grain mesh-bg min-h-screen">
      <LegendaryCursor />
      <ScrollProgress />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <About />
        <Experience />
        <SoloLab />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
