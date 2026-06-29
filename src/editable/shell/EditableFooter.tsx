'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const publicLinks = [
    ['Home', '/'],
    ['About', '/about'],
    ['Contact', '/contact'],
    ['Search', '/search'],
  ]

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-5 py-16 sm:px-7 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-10 lg:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,.16)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[var(--editable-footer-bg)] bg-[var(--slot4-accent)]" />
            </span>
            <span className="editable-display text-xl font-semibold tracking-[0.01em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/60">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Explore</h3>
          <div className="mt-4 grid gap-2">
            {publicLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-white/70 transition hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Account</h3>
          <div className="mt-4 grid gap-2">
            {!session ? (
              <>
                <Link href="/login" className="text-sm font-medium text-white/70 transition hover:text-white">Sign in</Link>
                <Link href="/signup" className="text-sm font-medium text-white/70 transition hover:text-white">Sign up</Link>
              </>
            ) : (
              <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/70 transition hover:text-white">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs font-medium tracking-[0.12em] text-white/40">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
