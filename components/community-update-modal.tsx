'use client'

import { useEffect, useRef, useState } from 'react'
import { DEPLOYMENT_DATE_LABEL } from '@/lib/deployment'

const STORAGE_KEY = 'frogitive-community-update-seen'

export function CommunityUpdateModal() {
  const [isVisible, setIsVisible] = useState(true)
  const continueButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isVisible) return

    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') {
        setIsVisible(false)
        return
      }
    } catch {
      // Storage may be unavailable; the briefing remains safely dismissible.
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const keepFocusInDialog = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      event.preventDefault()
      continueButtonRef.current?.focus()
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', keepFocusInDialog)
    continueButtonRef.current?.focus({ preventScroll: true })

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.removeEventListener('keydown', keepFocusInDialog)
    }
  }, [isVisible])

  function continueToSite() {
    setIsVisible(false)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    try {
      window.sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // Continue normally when storage is unavailable.
    }
  }

  if (!isVisible) return null

  return (
    <div
      className="community-update-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-update-title"
      aria-describedby="community-update-body"
    >
      <div className="community-update-scroll">
        <article className="community-update-panel">
          <p className="community-update-eyebrow">COMMUNITY UPDATE // CLASSIFIED BRIEFING</p>
          <h2 id="community-update-title">HELLO FAM, WE GOT SOME NEWS.</h2>
          <div id="community-update-body" className="community-update-body">
            <p>During our first launch, we reached a market cap of around $15K. However, as mentioned before, we held only a very small percentage of the total supply. Sniper bots and bundled wallets controlled roughly 6x more supply than we did, which left us with very little ability to absorb the selling pressure when they dumped, and the price eventually fell back close to our initial launch level.</p>
            <p>For the next launch, we’re approaching things differently. We plan to maintain a larger share of the supply while using only a limited portion of it for marketing, promotion, and the continued development of Frogitive.</p>
            <p>The goal is to create a stronger and more sustainable foundation for the project and avoid the same situation we faced during the first launch. 🐸🚀</p>
            <p>We want you all to know exactly what went wrong and what we could have done better. Transparency with our community is extremely important to us. We’ve learned from our mistakes, addressed the issues, and made the necessary improvements for the next launch.</p>
            <p>We’re feeling very confident about the direction we’re heading in and believe we’re now in a much stronger position moving forward.</p>
            <p>We learned. We improved. Now it’s time to show what Frogitive can really do. 🐸🚀</p>
          </div>
          <button ref={continueButtonRef} type="button" className="community-update-enter" onClick={continueToSite}>
            ENTER THE MANHUNT →
          </button>
          <p className="community-update-date">NEXT DEPLOYMENT: {DEPLOYMENT_DATE_LABEL}</p>
        </article>
      </div>
    </div>
  )
}
