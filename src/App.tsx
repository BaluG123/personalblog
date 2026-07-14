import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Briefcase, Mail, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useMemo, useState } from 'react'
import {
  apps,
  categories,
  experience,
  profile,
  skills,
  type AppCategory,
  type AppItem,
} from './data/portfolio'

function asset(path: string) {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
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
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-lime"
    />
  )
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [on, setOn] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setOn(true)
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  if (!on) return null
  return (
    <div
      className="pointer-events-none fixed z-[1] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl mix-blend-screen"
      style={{
        left: pos.x,
        top: pos.y,
        background:
          'radial-gradient(circle, rgba(61,255,139,0.28) 0%, rgba(34,197,94,0.1) 40%, transparent 70%)',
      }}
    />
  )
}

const navLinks = [
  { href: '#work', label: 'Company' },
  { href: '#apps', label: 'Personal' },
  { href: '#skills', label: 'Skills' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'border-b border-line bg-ink/85 backdrop-blur-xl' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="font-display text-sm font-bold tracking-tight text-cream md:text-base"
          onClick={() => setOpen(false)}
        >
          BG<span className="text-lime">.</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-mist transition hover:text-cream"
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
            className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft/70 px-3 py-1.5 text-xs text-cream backdrop-blur transition hover:border-lime/40 hover:text-lime"
          >
            <GitHubIcon size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream md:hidden"
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
            className="border-t border-line bg-ink/95 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-lg text-cream transition hover:bg-panel"
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
    <div className="relative overflow-hidden border-y border-line bg-ink-soft/50 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 42, ease: 'linear', repeat: Infinity }}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-sm font-semibold tracking-wide text-mist/85"
          >
            <span className="text-lime">◆</span> {name}
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
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-lime/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-sky/15 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-sm uppercase tracking-[0.22em] text-mist"
        >
          Manyata Tech Park · React Native · Green builds
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.9] font-extrabold tracking-tight text-cream"
        >
          Balappa
          <br />
          <span className="text-lime">Goudi</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-8 flex max-w-2xl flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <p className="text-lg leading-relaxed text-mist md:text-xl">
            {profile.tagline} Company work and personal apps stay separate —
            scan any personal project QR to open it on Play Store.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="#apps"
              className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Personal apps
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-cream transition hover:border-lime/50"
            >
              Company work
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-14 grid grid-cols-3 gap-4 border-t border-line pt-8 md:max-w-xl"
        >
          {[
            { n: `${profile.experienceYears}+`, l: 'Years experience' },
            { n: `${profile.appsLive}`, l: 'Personal apps' },
            { n: profile.installs, l: 'Organic installs' },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-2xl font-bold text-cream md:text-3xl">
                {s.n}
              </div>
              <div className="mt-1 text-xs text-mist md:text-sm">{s.l}</div>
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
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-lime">About</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Two lanes.
            <br />
            One craft.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-mist md:text-lg">
          <p>
            I&apos;m a React Native developer with {profile.experienceYears}+
            years shipping production mobile apps. Day job: company products.
            Nights & weekends: my own Play Store apps — education, fitness,
            finance, lifestyle, and platforms.
          </p>
          <p>
            Company work covers Vivah.world, government attendance (KAAMS),
            CRM/HRMS, and fleet systems. Personal projects are listed separately
            below with logos and QR codes — every one built and published by me.
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

function CompanyWork() {
  return (
    <section id="work" className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-semibold tracking-wide text-lime uppercase">
          <Briefcase size={12} />
          Company products
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-lime">Experience</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          What I build at work
        </h2>
        <p className="mt-4 max-w-2xl text-mist">
          Client and employer products only — not mixed with my personal Play
          Store apps.
        </p>

        <div className="mt-10 relative overflow-hidden rounded-3xl border border-lime/30 bg-gradient-to-br from-panel via-ink-soft to-panel p-6 md:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/20 blur-3xl" />
          <p className="text-xs font-semibold tracking-[0.2em] text-lime uppercase">
            Current company product
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold text-cream md:text-4xl">
            Vivah.world
          </h3>
          <p className="mt-3 max-w-2xl text-mist md:text-lg">
            AI matrimonial app for Android &amp; iOS at Infobell IT Solutions
            (joined Nov 10, 2025). I own development through Play Store &amp;
            App Store release.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['React Native', 'AI', 'Android', 'iOS', 'App Store', 'Play Store'].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-cream"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="mt-6">
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

function AppLogo({ app, size = 56 }: { app: AppItem; size?: number }) {
  return (
    <img
      src={asset(app.icon)}
      alt={`${app.name} logo`}
      width={size}
      height={size}
      className="rounded-2xl border border-line bg-ink object-cover shadow-[0_0_24px_rgba(61,255,139,0.12)]"
      loading="lazy"
    />
  )
}

function AppQr({ url, size = 84 }: { url: string; size?: number }) {
  return (
    <div className="rounded-xl border border-line bg-cream p-1.5 shadow-[0_0_20px_rgba(61,255,139,0.15)]">
      <QRCodeSVG
        value={url}
        size={size}
        bgColor="#eef8f0"
        fgColor="#04140c"
        level="M"
        marginSize={1}
      />
    </div>
  )
}

function FeaturedPersonal() {
  const featured = apps.filter((a) => a.featured).slice(0, 4)
  return (
    <section className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-semibold tracking-wide text-lime uppercase">
          <Sparkles size={12} />
          Personal projects
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-lime">Featured</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          Apps I built on my own
        </h2>
        <p className="mt-4 max-w-2xl text-mist">
          Solo products on Play Store — logos + QR codes for quick install.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {featured.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative min-h-[240px] overflow-hidden rounded-3xl border border-line bg-panel p-6 md:p-8"
            >
              <div
                className="absolute inset-0 opacity-35 transition duration-500 group-hover:opacity-60"
                style={{
                  background: `radial-gradient(circle at 90% 10%, ${app.accent}55, transparent 45%)`,
                }}
              />
              <div className="relative flex h-full flex-col justify-between gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <AppLogo app={app} size={64} />
                    <div>
                      <p className="text-xs tracking-wide text-mist uppercase">
                        {app.category} · {app.downloads}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold text-cream md:text-3xl">
                        {app.name}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
                        {app.tagline}
                      </p>
                    </div>
                  </div>
                  <AppQr url={app.playStore} size={78} />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {app.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line px-2.5 py-1 text-[11px] text-cream/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={app.playStore}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-xs font-semibold text-ink transition hover:brightness-110"
                  >
                    Play Store
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PersonalApps() {
  const [filter, setFilter] = useState<AppCategory>('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return apps
    return apps.filter((a) => a.category === filter)
  }, [filter])

  return (
    <section id="apps" className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-semibold tracking-wide text-lime uppercase">
          <Sparkles size={12} />
          Personal only
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-lime">
          Indie Play Store
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {apps.length} personal apps — with QR
        </h2>
        <p className="mt-4 max-w-xl text-mist">
          These are my own apps (not company products). Scan the QR or tap
          through to the live listing.
        </p>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                filter === c
                  ? 'bg-lime font-semibold text-ink'
                  : 'border border-line text-mist hover:border-lime/40 hover:text-cream'
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
                className="group relative overflow-hidden rounded-2xl border border-line bg-panel/90 p-5 transition hover:border-lime/40"
              >
                <div
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-25 blur-2xl transition group-hover:opacity-45"
                  style={{ background: app.accent }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <AppLogo app={app} size={52} />
                      <div>
                        <p className="text-xs tracking-wide text-mist uppercase">
                          {app.category} · {app.downloads}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-bold text-cream">
                          {app.name}
                        </h3>
                      </div>
                    </div>
                    <AppQr url={app.playStore} size={72} />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-mist">
                    {app.tagline}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {app.highlights.slice(0, 2).map((h) => (
                      <li
                        key={h}
                        className="text-xs leading-relaxed text-cream/70"
                      >
                        · {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {app.stack.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-ink px-2 py-0.5 text-[10px] text-mist"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <a
                      href={app.playStore}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-lime transition hover:underline"
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

function Skills() {
  const groups = [
    { title: 'Languages', items: skills.languages },
    { title: 'Frameworks', items: skills.frameworks },
    { title: 'Tools', items: skills.tools },
    { title: 'Specialties', items: skills.specialties },
  ]

  return (
    <section id="skills" className="relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm uppercase tracking-[0.2em] text-lime">Skills</p>
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
            >
              <h3 className="text-sm font-semibold tracking-wide text-mist uppercase">
                {g.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-ink-soft px-3.5 py-1.5 text-sm text-cream transition hover:border-lime/40 hover:text-lime"
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
        <p className="text-sm uppercase tracking-[0.2em] text-lime">Resume</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Updated profile
        </h2>
        <p className="mt-4 max-w-2xl text-mist">
          Company experience and personal apps listed as separate tracks —
          Infobell / Vivah.world at work, {apps.length} solo apps on Play Store.
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
              <h4 className="text-xs tracking-widest text-lime uppercase">
                Company experience
              </h4>
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
              <h4 className="text-xs tracking-widest text-lime uppercase">
                Personal apps & education
              </h4>
              <p className="mt-4 font-semibold text-cream">
                {profile.education.degree}
              </p>
              <p className="text-sm text-mist">
                {profile.education.school} · {profile.education.dates}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-mist">
                <li>· {apps.length} personal Play Store apps (solo)</li>
                <li>· BookMyGrounds, RailAspirant, Math Master & more</li>
                <li>· Company: Vivah.world, KAAMS, CRM, Fleet (separate)</li>
              </ul>
              <a
                href={asset('resume.html')}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink"
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
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-lime/15 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm uppercase tracking-[0.2em] text-lime">Contact</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
          Let&apos;s build something green lights love.
        </h2>
        <p className="mt-4 flex items-center gap-2 text-mist">
          <MapPin size={16} className="text-lime" />
          {profile.location}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={profile.emailHref}
            className="inline-flex items-center gap-3 rounded-2xl border border-line bg-panel px-5 py-4 text-cream transition hover:border-lime/40"
          >
            <Mail className="text-lime" size={18} />
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="inline-flex items-center gap-3 rounded-2xl border border-line bg-panel px-5 py-4 text-cream transition hover:border-lime/40"
          >
            <Phone className="text-lime" size={18} />
            {profile.phone}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl border border-line bg-panel px-5 py-4 text-cream transition hover:border-lime/40"
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
        <p>Company work · Personal apps · Bangalore</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="grain mesh-bg min-h-screen">
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <About />
        <CompanyWork />
        <FeaturedPersonal />
        <PersonalApps />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
