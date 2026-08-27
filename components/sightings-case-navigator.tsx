'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

type CaseMedia =
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'video'; src: string; label: string }

type CaseFile = {
  id: string
  label: string
  title: string
  description: string
  media: CaseMedia | null
  status: 'CONFIRMED' | 'INCOMING' | 'CLASSIFIED'
}

const cases: CaseFile[] = [
  {
    id: '001',
    label: 'CONFIRMED SIGHTING',
    title: 'LAST SEEN: EVERYWHERE.',
    description: 'First confirmed appearance. Identity still unknown. Subject remains at large.',
    media: { type: 'image', src: '/images/frogitive-2.png', alt: 'Confirmed FROGITIVE sighting 001 in a dark street captured by surveillance camera', caption: 'ARCHIVE FOOTAGE // 23.08.2026' },
    status: 'CONFIRMED',
  },
  {
    id: '002',
    label: 'SIGHTING #002',
    title: 'INCOMING',
    description: 'New evidence is being processed. File access pending.',
    media: { type: 'video', src: '/videos/002.mp4', label: 'Case file 002 evidence video' },
    status: 'INCOMING',
  },
  {
    id: '003',
    label: 'SIGHTING #003',
    title: '[INSERT CASE #003 TITLE]',
    description: '[INSERT CASE #003 DESCRIPTION]',
    media: null,
    status: 'CONFIRMED',
  },
  {
    id: '004',
    label: 'SIGHTING #004',
    title: '[INSERT CASE #004 TITLE]',
    description: '[INSERT CASE #004 DESCRIPTION]',
    media: null,
    status: 'CONFIRMED',
  },
]

export function SightingsCaseNavigator() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const reduceMotion = useReducedMotion()
  const activeCase = cases[activeCaseIndex]

  function navigate(nextDirection: -1 | 1) {
    const nextIndex = activeCaseIndex + nextDirection
    if (isAnimating || nextIndex < 0 || nextIndex >= cases.length) return
    setDirection(nextDirection)
    setActiveCaseIndex(nextIndex)
  }

  const variants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: direction > 0 ? 56 : -56, rotateY: direction > 0 ? -6 : 6 },
        animate: { opacity: 1, x: 0, rotateY: 0 },
        exit: { opacity: 0, x: direction > 0 ? -56 : 56, rotateY: direction > 0 ? 6 : -6 },
      }

  const previousDisabled = activeCaseIndex === 0 || isAnimating
  const nextDisabled = activeCaseIndex === cases.length - 1 || isAnimating

  return (
    <div className="case-navigator">
      <CaseButton direction="previous" disabled={previousDisabled} onClick={() => navigate(-1)} />
      <div className="case-page-stage" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={activeCase.id}
            className="case-page"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.12 : 0.4, ease: 'easeInOut' }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <div className="case-counter">FILE {String(activeCaseIndex + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}</div>
            <div className={activeCase.media ? 'sighting-grid' : 'sighting-grid sighting-grid-text-only'}>
              {activeCase.media && <CaseMediaBlock media={activeCase.media} />}
              <div className="signal-card">
                <div>
                  <p className="eyebrow">{activeCase.label}</p>
                  <p className="signal-number">#{activeCase.id}</p>
                  <h3>&ldquo;{activeCase.title}&rdquo;</h3>
                  <p>{activeCase.description}</p>
                </div>
                <div className="next-file">
                  <span>{activeCaseIndex === 0 ? 'Next file' : 'Status'}</span>
                  <strong>{activeCaseIndex === 0 ? 'SIGHTING #002 — INCOMING' : activeCase.status}</strong>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
      <CaseButton direction="next" disabled={nextDisabled} onClick={() => navigate(1)} />
      <div className="case-mobile-navigation">
        <CaseButton direction="previous" disabled={previousDisabled} onClick={() => navigate(-1)} mobile />
        <CaseButton direction="next" disabled={nextDisabled} onClick={() => navigate(1)} mobile />
      </div>
    </div>
  )
}

function CaseMediaBlock({ media }: { media: CaseMedia }) {
  return (
    <figure className="sighting-image">
      {media.type === 'image' ? (
        <Image src={media.src} alt={media.alt} width={1536} height={1536} sizes="(max-width: 1100px) 100vw, 58vw" priority />
      ) : (
        <video src={media.src} aria-label={media.label} controls playsInline preload="metadata" />
      )}
      {media.type === 'image' && media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  )
}

function CaseButton({ direction, disabled, onClick, mobile = false }: { direction: 'previous' | 'next'; disabled: boolean; onClick: () => void; mobile?: boolean }) {
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      className={mobile ? 'case-nav-button case-nav-mobile-button' : `case-nav-button case-nav-${direction}`}
      aria-label={direction === 'previous' ? 'Previous case file' : 'Next case file'}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon aria-hidden="true" />
    </button>
  )
}
