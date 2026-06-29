import type { ReactNode } from 'react'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { EditablePageMotion } from '@/editable/shell/EditablePageMotion'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { Ads } from '@/lib/ads'

export function EditableSiteShell({
  children,
  className = '',
  hideShellAds = false,
  hideHeaderAd,
  hideFooterAd,
}: {
  children: ReactNode
  className?: string
  hideShellAds?: boolean
  hideHeaderAd?: boolean
  hideFooterAd?: boolean
}) {
  const showHeaderAd = !hideShellAds && !hideHeaderAd
  const showFooterAd = !hideShellAds && !hideFooterAd

  return (
    <div className={`editable-site-root ${dc.shell.page} flex min-h-screen flex-col ${className}`}>
      <EditableNavbar />
      {showHeaderAd ? (
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Ads slot="header" size="leaderboard" showLabel eager className="mx-auto w-full" />
        </div>
      ) : null}
      <EditablePageMotion>{children}</EditablePageMotion>
      {showFooterAd ? (
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Ads slot="footer" size="leaderboard" showLabel className="mx-auto w-full" />
        </div>
      ) : null}
      <EditableFooter />
    </div>
  )
}
