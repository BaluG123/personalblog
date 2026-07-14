# Balappa Goudi — Portfolio

Personal portfolio for **Balappa Goudi** (`BaluG123` / `balu1072000@gmail.com`).

> Deploy only to **github.com/BaluG123** — not the company account.

## Stack

- React + TypeScript (Vite)
- Tailwind CSS v4
- Framer Motion

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages (BaluG123 only)

1. On GitHub (logged in as **BaluG123**), create a public repo named `personalblog`.
2. Make sure your **personal** SSH key is added under BaluG123 → Settings → SSH keys  
   (and that the same key is **not** the one GitHub maps to `balappa11`).
3. From this folder:

```bash
git remote add origin git@github.com:BaluG123/personalblog.git
git push -u origin main
npm run deploy
```

Live site: **https://BaluG123.github.io/personalblog/**

Printable resume: `/resume.html` on the live site (or `public/resume.html` locally).
