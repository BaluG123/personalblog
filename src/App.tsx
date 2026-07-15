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
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`
}

function AppLogo({ app, size = 48 }: { app: AppItem; size?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-xl border border-lime/35 bg-lime/10 font-display text-base font-bold text-lime"
      >
        {app.name.slice(0, 1)}
      </div>
    )
  }
  return (
    <img
      src={asset(app.icon)}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-xl border border-line object-cover"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

/** Compact QR — only mounts when card is near viewport via native lazy feel */
function AppQr({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="link-fast shrink-0 rounded-lg border border-line bg-white p-1.5 hover:border-lime"
      title="Open Play Store"
      aria-label="Open Play Store via QR"
    >
      <QRCodeSVG
        value={url}
        size={64}
        bgColor="#ffffff"
        fgColor="#030f0a"
        level="L"
        includeMargin={false}
        style={{ display: 'block', width: 64, height: 64 }}
      />
    </a>
  )
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.367 6.839 9.722.5.094.682-.222.682-.482 0-.237-.009-.866-.013-1.7-2.782.62-3.369-1.38-3.369-1.38-.454-1.18-1.11-1.495-1.11-1.495-.908-.636.069-.623.069-.623 1.004.072 1.532 1.06 1.532 1.06.892 1.566 2.341 1.114 2.91.852.092-.662.35-1.114.636-1.37-2.22-.26-4.555-1.143-4.555-5.087 0-1.124.39-2.043 1.029-2.764-.103-.26-.446-1.302.098-2.714 0 0 .84-.276 2.75 1.055A9.28 9.28 0 0 1 12 6.918a9.29 9.29 0 0 1 2.504.347c1.909-1.331 2.747-1.055 2.747-1.055.546 1.412.203 2.454.1 2.714.64.721 1.028 1.64 1.028 2.764 0 3.953-2.338 4.823-4.566 5.078.359.317.679.943.679 1.902 0 1.372-.012 2.477-.012 2.814 0 .263.18.58.688.48C19.138 20.616 22 16.78 22 12.253 22 6.586 17.523 2 12 2z" />
    </svg>
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
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16)
        ticking = false
      })
    }
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
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled || open
          ? 'border-b border-line bg-ink/95 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <a href="#top" className="link-fast font-display text-sm font-bold text-cream md:text-base">
          Balappa<span className="text-lime">.</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="link-fast text-sm text-mist hover:text-lime">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="link-fast inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-cream hover:border-lime hover:text-lime"
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
      {open && (
        <nav className="border-t border-line bg-ink md:hidden">
          <div className="flex flex-col px-5 py-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-cream hover:bg-panel hover:text-lime"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

function AppMarquee() {
  const names = apps.map((a) => a.name)
  const loop = [...names, ...names]
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-soft/80 py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent" />
      <div className="marquee-track">
        {loop.map((name, i) => (
          <span key={`${name}-${i}`} className="font-display text-sm font-semibold text-mist/80">
            <span className="text-lime">◈</span> {name}
          </span>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92svh] flex-col justify-end pb-8 pt-24 md:pb-12 md:pt-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <p className="mb-5 inline-flex rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-lime uppercase">
          React Native · Bangalore · Open to opportunities
        </p>
        <h1 className="font-display text-[clamp(3rem,11vw,7rem)] leading-[0.9] font-extrabold tracking-tight text-cream">
          Balappa
          <br />
          <span className="text-lime">Goudi</span>
        </h1>
        <div className="mt-7 flex max-w-2xl flex-col gap-5 md:mt-9 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className="text-base leading-relaxed text-mist md:text-lg">{profile.tagline}</p>
          <div className="flex shrink-0 flex-wrap gap-2.5">
            <a
              href="#work"
              className="link-fast inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink hover:brightness-110"
            >
              Experience
              <ArrowUpRight size={15} />
            </a>
            <a
              href="#apps"
              className="link-fast inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-cream hover:border-lime hover:text-lime"
            >
              Solo Lab
            </a>
          </div>
        </div>
        <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-7">
          {[
            { n: `${profile.experienceYears}+`, l: 'Years' },
            { n: `${profile.appsLive}`, l: 'Apps live' },
            { n: profile.installs, l: 'Installs' },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-2xl font-bold text-cream md:text-3xl">{s.n}</div>
              <div className="mt-0.5 text-xs text-mist uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 md:mt-14">
        <AppMarquee />
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.2fr] md:gap-14 md:px-8">
        <div>
          <p className="text-xs tracking-[0.2em] text-lime uppercase">About</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Production mobile.
            <br />
            End to end.
          </h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-mist md:text-lg">
          <p>
            React Native developer with {profile.experienceYears}+ years shipping Android &amp; iOS —
            AI products, government systems, fleet &amp; CRM, plus {profile.appsLive} Play Store apps.
          </p>
          <p>
            Recent work includes Vivah.World and KAAMS for Karnataka e-governance. Indie apps are in Solo
            Lab below.
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-sm text-cream">
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

function Label({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-lime uppercase">
      {icon}
      {children}
    </div>
  )
}

function Experience() {
  return (
    <section id="work" className="border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Label icon={<Briefcase size={12} />}>Professional work</Label>
        <p className="text-xs tracking-[0.2em] text-lime uppercase">Experience</p>
        <h2 className="mt-2 max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Products I&apos;ve shipped at work
        </h2>
        <p className="mt-3 max-w-xl text-mist">
          AI, GovTech, CRM, and fleet — Android and iOS delivery.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="border-b border-line p-5 md:p-6">
              <div className="flex gap-4">
                <img
                  src={asset(vivah.logo)}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-xl border border-white/10 bg-black object-contain p-1.5"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200 uppercase">
                      Current
                    </span>
                    <span className="rounded-full bg-lime/10 px-2 py-0.5 text-[10px] font-semibold text-lime uppercase">
                      Android & iOS
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-cream">{vivah.name}</h3>
                  <p className="mt-1 text-sm text-mist">
                    {vivah.company} · {vivah.dates}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-mist">{vivah.summary}</p>
              <p className="mt-2 text-xs text-cream/60">{vivah.status}</p>
            </div>
            <ul className="grid sm:grid-cols-2">
              {vivah.features.slice(0, 6).map((f) => (
                <li key={f.title} className="border-t border-line p-3.5 sm:odd:border-r">
                  <p className="text-sm font-semibold text-cream">{f.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{f.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="border-b border-line p-5 md:p-6">
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full bg-lime/10 px-2 py-0.5 text-[10px] font-semibold text-lime uppercase">
                  GovTech
                </span>
                <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold text-mist uppercase">
                  Live on stores
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-cream">{kaams.name}</h3>
              <p className="mt-1 text-sm text-cream/85">{kaams.fullName}</p>
              <p className="mt-2 text-sm text-mist">
                {kaams.client} · via {kaams.company}
              </p>
              <p className="mt-1 text-xs text-mist">{kaams.dates}</p>
              <p className="mt-4 text-sm leading-relaxed text-mist">{kaams.summary}</p>
            </div>
            <ul className="grid sm:grid-cols-2">
              {kaams.features.map((f) => (
                <li key={f.title} className="border-t border-line p-3.5 sm:odd:border-r">
                  <p className="text-sm font-semibold text-cream">{f.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{f.detail}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8">
          <h3 className="mb-2 font-display text-lg font-bold text-cream">Career timeline</h3>
          {experience.map((job) => (
            <article
              key={job.company}
              className="grid gap-3 border-t border-line py-8 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <div>
                <p className="text-sm text-mist">{job.dates}</p>
                {job.current && (
                  <span className="mt-2 inline-block rounded-full bg-lime/15 px-2 py-0.5 text-[10px] font-semibold text-lime uppercase">
                    Current
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-cream md:text-2xl">{job.role}</h3>
                <p className="mt-1 text-mist">{job.company}</p>
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative pl-3.5 text-sm leading-relaxed text-mist before:absolute before:top-2 before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-lime/70"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                {job.stack && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line px-2.5 py-1 text-[11px] text-cream/75"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SoloLab() {
  const [filter, setFilter] = useState<AppCategory>('All')
  const filtered = useMemo(() => {
    if (filter === 'All') return apps
    return apps.filter((a) => a.category === filter)
  }, [filter])

  return (
    <section id="apps" className="border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Label icon={<Sparkles size={12} />}>{apps.length} apps on Play Store</Label>
        <p className="text-xs tracking-[0.2em] text-lime uppercase">Solo Lab</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Indie apps I shipped
        </h2>
        <p className="mt-3 max-w-xl text-mist">
          Built end-to-end — tap logo/QR or Open to go straight to Play Store.
        </p>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`link-fast shrink-0 rounded-full px-3.5 py-1.5 text-sm ${
                filter === c
                  ? 'bg-lime font-semibold text-ink'
                  : 'border border-line text-mist hover:border-lime hover:text-cream'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app) => (
            <article
              key={app.id}
              className="card-fast rounded-2xl border border-line bg-panel p-4 hover:border-lime/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <AppLogo app={app} size={48} />
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-wide text-mist uppercase">
                      {app.category} · {app.downloads}
                    </p>
                    <h3 className="mt-0.5 font-display text-lg font-bold text-cream">{app.name}</h3>
                  </div>
                </div>
                <AppQr url={app.playStore} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mist">{app.tagline}</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {app.stack.slice(0, 2).map((s) => (
                    <span key={s} className="rounded bg-ink px-1.5 py-0.5 text-[10px] text-mist">
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={app.playStore}
                  target="_blank"
                  rel="noreferrer"
                  className="link-fast inline-flex items-center gap-1 text-xs font-semibold text-lime hover:underline"
                >
                  Open
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
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
    { title: 'Tools', items: skills.tools },
    { title: 'AI tools', items: skills.aiTools, accent: true },
    { title: 'Specialties', items: skills.specialties },
  ]

  return (
    <section id="skills" className="border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs tracking-[0.2em] text-lime uppercase">Skills</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Stack I live in
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {groups.map((g) => (
            <div
              key={g.title}
              className={g.title === 'AI tools' || g.title === 'Specialties' ? 'md:col-span-2' : ''}
            >
              <h3 className="text-xs font-semibold tracking-wide text-mist uppercase">{g.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      g.accent
                        ? 'border-lime/35 bg-lime/10 text-lime'
                        : 'border-line bg-ink-soft text-cream'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section id="resume" className="border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs tracking-[0.2em] text-lime uppercase">Resume</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Updated profile
        </h2>
        <p className="mt-3 max-w-2xl text-mist">
          Infobell · EpicMinds (KAAMS) · Block Stack · Kibbcom · {apps.length} Play Store apps ·{' '}
          {profile.location}
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-panel">
          <div className="border-b border-line bg-ink-soft px-5 py-4 md:px-7">
            <h3 className="font-display text-xl font-bold">{profile.name}</h3>
            <p className="mt-1 text-sm text-mist">
              {profile.title} · {profile.location}
            </p>
            <p className="mt-1 text-sm text-cream/80">
              {profile.email} · {profile.phone}
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="border-b border-line p-5 md:border-r md:border-b-0 md:p-7">
              <h4 className="text-[10px] tracking-widest text-lime uppercase">Experience</h4>
              <ul className="mt-3 space-y-3">
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
            <div className="p-5 md:p-7">
              <h4 className="text-[10px] tracking-widest text-lime uppercase">Highlights</h4>
              <p className="mt-3 font-semibold text-cream">{profile.education.degree}</p>
              <p className="text-sm text-mist">
                {profile.education.school} · {profile.education.dates}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-mist">
                <li>· Vivah.World — AI matrimonial</li>
                <li>· KAAMS — Govt. of Karnataka</li>
                <li>· {apps.length} Play Store apps · {profile.installs} installs</li>
              </ul>
              <a
                href={asset('resume.html')}
                target="_blank"
                rel="noreferrer"
                className="link-fast mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink hover:brightness-110"
              >
                Printable resume
                <ArrowUpRight size={14} />
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
    <section id="contact" className="border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs tracking-[0.2em] text-lime uppercase">Contact</p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
          Let&apos;s build something users install.
        </h2>
        <p className="mt-3 flex items-center gap-2 text-mist">
          <MapPin size={15} className="text-lime" />
          {profile.location}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={profile.emailHref}
            className="link-fast inline-flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 text-cream hover:border-lime"
          >
            <Mail className="text-lime" size={17} />
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="link-fast inline-flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 text-cream hover:border-lime"
          >
            <Phone className="text-lime" size={17} />
            {profile.phone}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="link-fast inline-flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 text-cream hover:border-lime"
          >
            <span className="text-lime">
              <GitHubIcon size={17} />
            </span>
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 text-sm text-mist md:flex-row md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>React Native · Bangalore</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="mesh-bg min-h-screen">
      <Nav />
      <main>
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
