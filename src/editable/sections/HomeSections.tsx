import Link from 'next/link'
import { ArrowRight, BookOpen, PenLine, Search, Sparkles, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

type DisplayCollection = {
  key: string
  posts: SitePost[]
  href?: string
}

const wrap = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-7 lg:px-10'

const postKey = (post: SitePost) => post.slug || post.id || post.title

const storyPool = (posts: SitePost[], sections: HomeTimeSection[]) =>
  Array.from(
    new Map(
      [...posts, ...sections.flatMap((section) => section.posts)]
        .filter(Boolean)
        .map((post) => [postKey(post), post]),
    ).values(),
  )

function StoryCard({
  post,
  href,
  mode = 'image',
}: {
  post: SitePost
  href: string
  mode?: 'image' | 'compact' | 'horizontal'
}) {
  const image = getEditablePostImage(post)
  const category = getEditableCategory(post) || 'Story'
  const excerpt = getEditableExcerpt(post, 170) || 'Open this story to discover a useful point of view.'

  if (mode === 'compact') {
    return (
      <Link href={href} className="group grid grid-cols-[78px_1fr] gap-4 border-t border-white/15 py-5 first:border-t-0">
        <img src={image} alt="" className="h-[78px] w-[78px] rounded-xl object-cover" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#9fb4ff]">{category}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug transition group-hover:text-[#cfe0ff]">{post.title}</h3>
        </div>
      </Link>
    )
  }

  if (mode === 'horizontal') {
    return (
      <Link href={href} className="group grid overflow-hidden rounded-[24px] border border-[var(--editable-border)] bg-white shadow-[0_18px_45px_rgba(7,22,53,.06)] sm:grid-cols-[42%_1fr]">
        <img src={image} alt="" className="h-full min-h-56 w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--slot4-accent)]">{category}</p>
          <h3 className="mt-3 text-2xl font-bold leading-tight">{post.title}</h3>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
            Read story <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group block w-[280px] shrink-0 overflow-hidden rounded-[22px] bg-white shadow-[0_14px_45px_rgba(7,22,53,.08)] sm:w-[320px] lg:w-[340px]">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[var(--slot4-accent)]">{category}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
          {getEditableExcerpt(post, 110) || 'A fresh perspective from the community.'}
        </p>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = storyPool(posts, timeSections)
  const lead = items[0]

  return (
    <section className="overflow-hidden bg-[linear-gradient(135deg,#eff8f4_0%,#edf2ff_48%,#fbfbf7_100%)]">
      <div className={`${wrap} grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24`}>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#b9c9ff] bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[var(--slot4-accent)]">
            <Sparkles className="h-4 w-4" />
            Ideas worth sharing
          </p>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl">
            Where curious minds <span className="text-[var(--slot4-accent)]">meet great stories.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>

          <form action="/search" className="mt-8 flex max-w-xl items-center rounded-full border border-[var(--editable-border)] bg-white p-2 shadow-[0_18px_60px_rgba(7,22,53,.1)]">
            <Search className="ml-3 h-5 w-5 text-[var(--slot4-muted-text)]" />
            <input name="q" placeholder="Search stories, people and ideas" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="rounded-full bg-[var(--slot4-dark-bg)] px-6 py-3 text-sm font-bold text-white">Explore</button>
          </form>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white">
              Start reading <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/create" className="inline-flex items-center gap-2 px-4 py-3 text-sm font-bold">
              <PenLine className="h-4 w-4" />
              Share your story
            </Link>
          </div>
        </div>

        <div className="editorial-grid relative min-h-[450px] rounded-[40px] border border-white/70 p-7">
          <div className="hero-orbit absolute right-4 top-5 rounded-2xl bg-white p-4 shadow-xl">
            <UserRound className="h-6 w-6 text-[var(--slot4-accent)]" />
          </div>
          {lead ? (
            <Link href={postHref(primaryTask, lead, primaryRoute)} className="group absolute inset-7 overflow-hidden rounded-[30px] bg-[var(--slot4-dark-bg)]">
              <img src={getEditablePostImage(lead)} alt="" className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061735] via-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9fb4ff]">Featured perspective</p>
                <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">{lead.title}</h2>
              </div>
            </Link>
          ) : (
            <div className="absolute inset-7 flex items-center justify-center rounded-[30px] bg-[var(--slot4-dark-bg)] text-white">
              <BookOpen className="h-14 w-14" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = storyPool(posts, timeSections).slice(0, 10)
  if (!items.length) return null

  const doubled = [...items, ...items]

  return (
    <section className="overflow-hidden py-20">
      <div className={`${wrap} flex items-end justify-between gap-5`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--slot4-accent)]">Fresh perspectives</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Stories moving the conversation</h2>
        </div>
        <Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-bold sm:flex">
          Browse all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 w-full overflow-hidden">
        <div className="editable-marquee flex w-max gap-5 px-5">
          {doubled.map((post, index) => (
            <StoryCard key={`${postKey(post)}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = storyPool(posts, timeSections).slice(0, 6)
  if (!items.length) return null

  return (
    <section className="bg-[var(--slot4-dark-bg)] py-20 text-white">
      <div className={`${wrap} grid gap-10 lg:grid-cols-[1.25fr_.75fr]`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#91a9ff]">Editor's selection</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.04em]">Read deeper. Think wider.</h2>
          <div className="mt-8 [&_h3]:text-[var(--slot4-page-text)] [&_p]:text-[var(--slot4-muted-text)]">
            <StoryCard post={items[0]} href={postHref(primaryTask, items[0], primaryRoute)} mode="horizontal" />
          </div>
        </div>
        <aside className="rounded-[28px] bg-white/7 p-6">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-white/50">Today's reading list</p>
          <div className="mt-2 [&_a]:border-white/15 [&_h3]:text-white">
            {items.slice(1, 6).map((post) => (
              <StoryCard key={postKey(post)} post={post} href={postHref(primaryTask, post, primaryRoute)} mode="compact" />
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const groups: DisplayCollection[] = timeSections.length
    ? timeSections.map((section) => ({ key: section.key, posts: section.posts, href: section.href }))
    : [{ key: 'more-to-explore', posts: posts.slice(6, 12), href: primaryRoute }]

  return (
    <>
      {groups
        .filter((group) => group.posts.length)
        .slice(0, 3)
        .map((group, index) => (
          <section key={group.key} className={index % 2 ? 'bg-[var(--slot4-panel-bg)]' : 'bg-[var(--slot4-page-bg)]'}>
            <div className={`${wrap} py-20`}>
              <div className="grid gap-10 lg:grid-cols-[.36fr_.64fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--slot4-accent)]">
                    Curated collection {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em]">Ideas for your next thoughtful pause.</h2>
                  <p className="mt-5 leading-7 text-[var(--slot4-muted-text)]">
                    Explore useful viewpoints, practical lessons, and original voices from across the community.
                  </p>
                  <Link href="/search" className="mt-7 inline-flex items-center gap-2 font-bold">
                    View collection <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {group.posts.slice(0, 4).map((post) => (
                    <StoryCard key={postKey(post)} post={post} href={postHref(primaryTask, post, primaryRoute)} mode="horizontal" />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="px-5 py-20 sm:px-7">
      <div className="mx-auto max-w-[var(--editable-container)] overflow-hidden rounded-[36px] bg-[linear-gradient(120deg,#dbe9ff,#c8f1e5)] px-6 py-16 text-center sm:px-12 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--slot4-accent)]">Your voice belongs here</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
          Turn what you know into something others can use.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]">
          Create a profile, publish your perspective, and connect through ideas that matter.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/create" className="rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 font-bold text-white">
            Start writing
          </Link>
        </div>
      </div>
    </section>
  )
}
