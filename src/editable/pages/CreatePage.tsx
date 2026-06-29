'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, PenLine, Send, Sparkles, UserRound } from 'lucide-react'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'
const wrap = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-7 lg:px-10'
// Kept in this editable page so the /create route can import it directly.
const inputClass = 'rounded-[1.35rem] border border-[var(--editable-border)] bg-white/90 px-5 py-4 text-sm font-semibold text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-soft-muted-text)] focus:border-[var(--slot4-accent)] focus:shadow-[0_0_0_4px_var(--slot4-accent-soft)]'

const getDefaultTask = (): TaskKey => {
  const article = SITE_CONFIG.tasks.find((item) => item.enabled && item.key === 'article')
  const first = SITE_CONFIG.tasks.find((item) => item.enabled)
  return (article?.key || first?.key || 'article') as TaskKey
}

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)
  const task = getDefaultTask()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }

    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#eff8f4_0%,#edf2ff_48%,#fbfbf7_100%)] text-[var(--slot4-page-text)]">
          <section className={`${wrap} py-16 sm:py-20 lg:py-24`}>
            <div className="grid overflow-hidden rounded-[40px] border border-white/70 bg-white/72 shadow-[0_30px_90px_rgba(7,22,53,.10)] backdrop-blur lg:grid-cols-[.85fr_1.15fr]">
              <div className="editorial-grid relative min-h-80 bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-10">
                <div className="hero-orbit absolute right-8 top-8 rounded-2xl bg-white p-4 text-[var(--slot4-accent)] shadow-xl">
                  <Lock className="h-7 w-7" />
                </div>
                <div className="absolute inset-x-8 bottom-8">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#9fb4ff]">{pagesContent.create.locked.badge}</p>
                  <h1 className="mt-5 max-w-lg text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl">
                    {pagesContent.create.locked.title}
                  </h1>
                </div>
              </div>

              <div className="self-center p-8 sm:p-12">
                <p className="inline-flex items-center gap-2 rounded-full border border-[#b9c9ff] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[var(--slot4-accent)]">
                  <Sparkles className="h-4 w-4" />
                  Publishing workspace
                </p>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-6 py-3 text-sm font-bold text-white">
                    Sign in <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-bold">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#eff8f4_0%,#edf2ff_48%,#fbfbf7_100%)] text-[var(--slot4-page-text)]">
        <section className={`${wrap} py-12 sm:py-16 lg:py-20`}>
          <div className="grid gap-8 overflow-hidden rounded-[40px] border border-white/70 bg-white/76 p-6 shadow-[0_30px_90px_rgba(7,22,53,.10)] backdrop-blur lg:grid-cols-[.82fr_1.18fr] lg:p-8">
            <aside className="editorial-grid relative overflow-hidden rounded-[32px] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-10">
              <div className="hero-orbit absolute right-7 top-7 rounded-2xl bg-white p-4 text-[var(--slot4-accent)] shadow-xl">
                <PenLine className="h-7 w-7" />
              </div>
              <div className="relative z-10 flex min-h-[520px] flex-col justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#cfe0ff]">
                    <Sparkles className="h-4 w-4" />
                    Publishing workspace
                  </p>
                  <h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl">
                    Share a useful idea with the community.
                  </h1>
                  <p className="mt-6 max-w-lg text-base leading-8 text-white/68">
                    Write a clear title, add a short summary, and publish a thoughtful piece that fits the same polished reading experience as the homepage.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {['No content-type cards', 'Clean editorial form', 'Safe draft saving', 'Responsive layout'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/12 bg-white/8 p-4 text-sm font-bold text-white/80">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-[32px] border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] p-5 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--slot4-accent)]">Create post</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-.05em] sm:text-4xl">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[var(--slot4-page-text)] shadow-sm">
                  <UserRound className="h-4 w-4" />
                  {session.name || session.email}
                </span>
              </div>

              <div className="mt-7 grid gap-4">
                <input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={inputClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={inputClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={inputClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${inputClass} min-h-28 resize-y`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${inputClass} min-h-56 resize-y`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <CheckCircle2 className="h-5 w-5" />
                    {pagesContent.create.successTitle}
                  </p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-[1.35rem] bg-[var(--slot4-dark-bg)] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5">
                <Send className="h-4 w-4" />
                {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
