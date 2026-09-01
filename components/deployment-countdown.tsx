'use client'

import { useEffect, useState } from 'react'
import { DEPLOYMENT_DATE, DEPLOYMENT_DATE_LABEL } from '@/lib/deployment'

const deploymentDate = new Date(DEPLOYMENT_DATE)

function getTimeRemaining() {
  const difference = Math.max(0, deploymentDate.getTime() - Date.now())

  return {
    difference,
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  }
}

export function DeploymentCountdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getTimeRemaining> | null>(null)

  useEffect(() => {
    const updateCountdown = () => setRemaining(getTimeRemaining())
    updateCountdown()
    const interval = window.setInterval(updateCountdown, 1_000)
    return () => window.clearInterval(interval)
  }, [])

  const units = [
    ['Days', remaining?.days],
    ['Hours', remaining?.hours],
    ['Minutes', remaining?.minutes],
    ['Seconds', remaining?.seconds],
  ] as const

  return (
    <section className="countdown-section" aria-labelledby="deployment-countdown-title">
      <div className="container countdown-shell mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:px-8 lg:px-12">
        <div className="countdown-heading">
          <p className="eyebrow">Operation countdown</p>
          <h2 id="deployment-countdown-title">NEW CONTRACT DEPLOYMENT</h2>
          <p>{DEPLOYMENT_DATE_LABEL}</p>
        </div>
        {remaining?.difference === 0 ? (
          <p className="deployed-state" role="status">FROGITIVE IS LIVE</p>
        ) : (
          <div className="countdown-grid" role="timer" aria-live="off" aria-atomic="true">
            {units.map(([label, value]) => (
              <div className="countdown-unit" key={label}>
                <span>{value === undefined ? '--' : String(value).padStart(2, '0')}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        )}
        <p className="countdown-notice">OFFICIAL CONTRACT: 2z6G2uyFE5ft7WwnPFHnATCEfbFLMew3BXTZ97nvpump</p>
      </div>
    </section>
  )
}
