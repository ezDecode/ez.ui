'use client'

import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ─── Icon labels ─────────────────────────────────────────────────────────── */

const ICON_LABELS: Record<string, string> = {
  github: 'GitHub',
  x: 'X',
  mail: 'Email',
  link: 'Link',
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 128 128" fill="none" className="size-5 shrink-0">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
      />
      <path
        fill="currentColor"
        d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663z"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 128 128" fill="none" className="size-5 shrink-0">
      <path
        fill="currentColor"
        d="M75.916 54.2 122.542 0h-11.05L71.008 47.06 38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303 89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086-39.42-56.386h16.972L65.19 53.824l4.954 7.086 41.353 59.15h-16.97L60.782 71.793Z"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5 shrink-0">
      <path
        fill="currentColor"
        d="M2.34086 6.38914C2.1622 6.8145 2.08371 7.26454 2.0442 7.74818C1.99998 8.28936 1.99999 8.95371 2 9.75867V14.2413C1.99999 15.0463 1.99998 15.7106 2.0442 16.2518C2.09012 16.8139 2.18868 17.3306 2.43598 17.816C2.81947 18.5686 3.43139 19.1805 4.18404 19.564C4.66938 19.8113 5.18608 19.9099 5.74818 19.9558C6.28936 20 6.95371 20 7.75866 20H16.2413C17.0462 20 17.7106 20 18.2518 19.9558C18.8139 19.9099 19.3306 19.8113 19.816 19.564C20.5686 19.1805 21.1805 18.5686 21.564 17.816C21.8113 17.3306 21.9099 16.8139 21.9558 16.2518C22 15.7106 22 15.0463 22 14.2413V9.75868C22 8.95372 22 8.28937 21.9558 7.74818C21.9163 7.26453 21.8378 6.81449 21.6591 6.38912L14.5329 12.2196C13.0595 13.4252 10.9405 13.4252 9.46703 12.2196L2.34086 6.38914Z"
      />
      <path
        fill="currentColor"
        d="M20.4224 4.8169C20.233 4.67277 20.0302 4.54512 19.816 4.43598C19.3306 4.18868 18.8139 4.09012 18.2518 4.0442C17.7106 3.99998 17.0463 3.99999 16.2413 4H7.7587C6.95375 3.99999 6.28936 3.99998 5.74818 4.0442C5.18608 4.09012 4.66938 4.18868 4.18404 4.43598C3.96982 4.54512 3.76701 4.67278 3.57762 4.81691L10.7335 10.6717C11.4702 11.2745 12.5297 11.2745 13.2665 10.6717L20.4224 4.8169Z"
      />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5 shrink-0">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46447 9.12169C8.4171 7.16907 11.5829 7.16907 13.5355 9.12169L13.8787 9.46484C14.695 10.2811 15.1709 11.3121 15.3042 12.3761C15.3729 12.9241 14.9843 13.424 14.4363 13.4926C13.8883 13.5613 13.3884 13.1727 13.3197 12.6247C13.2397 11.9862 12.9554 11.37 12.4645 10.8791L12.1213 10.5359C10.9498 9.36433 9.05026 9.36433 7.87869 10.5359L4.53554 13.8791C3.36397 15.0506 3.36397 16.9501 4.53554 18.1217L4.87869 18.4648C6.05026 19.6364 7.94976 19.6364 9.12133 18.4648L9.29287 18.2933C9.68338 17.9027 10.3165 17.9027 10.7071 18.2932C11.0976 18.6837 11.0976 19.3169 10.7071 19.7074L10.5356 19.879C8.58295 21.8316 5.41709 21.8317 3.46447 19.879L3.12133 19.5359C1.16871 17.5833 1.1687 14.4175 3.12133 12.4648L6.46447 9.12169Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4644 5.12169C15.417 3.16907 18.5829 3.16907 20.5355 5.12169L20.8786 5.46484C22.8313 7.41746 22.8313 10.5833 20.8786 12.5359L17.5355 15.8791C15.5829 17.8317 12.417 17.8317 10.4644 15.879L10.1213 15.5359C9.30499 14.7196 8.82903 13.6887 8.69574 12.6247C8.62709 12.0767 9.01569 11.5768 9.56369 11.5081C10.1117 11.4395 10.6116 11.8281 10.6802 12.3761C10.7602 13.0146 11.0445 13.6307 11.5355 14.1217L11.8786 14.4648C13.0502 15.6364 14.9497 15.6364 16.1213 14.4648L19.4644 11.1217C20.636 9.95012 20.636 8.05062 19.4644 6.87905L19.1213 6.53591C17.9497 5.36436 16.0503 5.36433 14.8787 6.53581L14.7072 6.70738C14.3167 7.09796 13.6836 7.09804 13.293 6.70757C12.9024 6.31709 12.9023 5.68393 13.2928 5.29335L13.4644 5.12169Z"
      />
    </svg>
  )
}

const BUILT_IN = { github: GithubIcon, x: XIcon, mail: MailIcon, link: LinkIcon } as const
type BuiltInIcon = keyof typeof BUILT_IN

/* ─── Tooltip helper ──────────────────────────────────────────────────── */

function tooltipVars(seed: string): CSSProperties {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 33 + seed.charCodeAt(i)) >>> 0
  return {
    '--tooltip-rotate': `${(hash % 11) - 5}deg`,
    '--tooltip-shift': `${((hash >> 4) % 9) - 4}px`,
  } as CSSProperties
}

/* ─── BadgeLink ────────────────────────────────────────────────────────── */

export interface BadgeLinkProps {
  href: string
  children: ReactNode
  icon?: BuiltInIcon | ReactNode
  className?: string
}

function BadgeLink({ href, children, icon, className }: BadgeLinkProps) {
  const vars = tooltipVars(href)

  let iconNode: ReactNode = null
  let iconLabel = ''
  if (typeof icon === 'string' && icon in BUILT_IN) {
    const Icon = BUILT_IN[icon as BuiltInIcon]
    iconNode = <Icon />
    iconLabel = ICON_LABELS[icon] || ''
  } else if (icon) {
    iconNode = icon
  }

  const content = (
    <>
      {iconNode ? (
        <span
          aria-hidden="true"
          className="tooltip-container pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 opacity-0 transition-all duration-200 ease-out group-hover/badge:opacity-100 group-hover/badge:translate-y-0 translate-y-0.5"
          style={vars}
        >
          <span className="tooltip-content flex gap-1.5 origin-bottom items-center justify-center px-2.5 py-1.5 rounded-lg bg-[oklch(31.4%_0_0/60%)] backdrop-blur-md text-foreground shadow-[inset_0_1px_0_oklch(100%_0_0/40%),0_4px_12px_oklch(0%_0_0/60%)]">
            <span className="[&_svg]:size-4 [&_svg]:shrink-0">{iconNode}</span>
            <span className="text-xs font-medium whitespace-nowrap">{iconLabel}</span>
          </span>
        </span>
      ) : null}
      <span className="relative">{children}</span>
    </>
  )

  const cls = cn(
    'group/badge relative inline-flex items-baseline gap-[0.2em] whitespace-nowrap align-baseline text-base text-foreground-secondary',
    'transition-colors duration-150 ease-out hover:text-foreground focus-visible:text-foreground',
    'focus-visible:rounded-[2px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    className
  )

  if (href.startsWith('mailto:'))
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    )

  const external = href.startsWith('https://')
  return (
    <Link
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </Link>
  )
}

export { BadgeLink }
