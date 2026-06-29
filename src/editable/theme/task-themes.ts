import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Editorial task surfaces.

  Every task archive and detail page shares one cohesive identity:
  soft paper backgrounds, deep blue accents, hairline borders and a crisp
  sans-serif system. Per-task copy still varies so each section keeps its own
  voice, while the visual language remains unified through `--tk-*` tokens.
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const EDITORIAL_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: false,
  fontDisplay: EDITORIAL_FONT,
  fontBody: EDITORIAL_FONT,
  bg: '#fbfbf7',
  surface: '#ffffff',
  raised: '#eef4f3',
  text: '#071635',
  muted: '#5c6575',
  line: '#d9dfdf',
  accent: '#2146d0',
  accentSoft: '#e4ebff',
  onAccent: '#ffffff',
  glow: 'rgba(33,70,208,0.10)',
  radius: '1.5rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Businesses', note: 'Find, compare and connect with useful organizations.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and listings, ready to act on.' },
  image: { ...base, kicker: 'Photos', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Curated resources and links worth saving.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'People', note: 'Discover creators, businesses and profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens and font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const theme = getTaskTheme(task)

  return {
    '--tk-bg': theme.bg,
    '--tk-surface': theme.surface,
    '--tk-raised': theme.raised,
    '--tk-text': theme.text,
    '--tk-muted': theme.muted,
    '--tk-line': theme.line,
    '--tk-accent': theme.accent,
    '--tk-accent-soft': theme.accentSoft,
    '--tk-on-accent': theme.onAccent,
    '--tk-glow': theme.glow,
    '--tk-radius': theme.radius,
    '--slot4-accent': theme.accent,
    '--slot4-accent-fill': theme.accent,
    '--editable-font-display': theme.fontDisplay,
    '--editable-font-body': theme.fontBody,
    fontFamily: theme.fontBody,
  } as CSSProperties
}
