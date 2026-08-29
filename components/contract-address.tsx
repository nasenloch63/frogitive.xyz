'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'

const CONTRACT_ADDRESS = 'J71E7ZQ7Dn5envRRSyufyzgVqgeZAyxei84Ej612pump'
const PUMP_FUN_URL = 'https://join.pump.fun/HSag/hse00kv4'

export function ContractAddress() {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function copyAddress() {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS)
    setCopied(true)

    if (resetTimer.current) clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="contract-block">
      <p className="contract-label">OFFICIAL CONTRACT ADDRESS</p>
      <div className="contract-row">
        <code title={CONTRACT_ADDRESS}>{CONTRACT_ADDRESS}</code>
        <button type="button" className="contract-copy" data-copied={copied} onClick={copyAddress} aria-label="Copy official contract address">
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>
      <a className="action action-primary contract-buy" href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer">
        BUY $FUG <ArrowUpRight aria-hidden="true" />
      </a>
      <span className="sr-only" aria-live="polite">{copied ? 'Contract address copied' : ''}</span>
    </div>
  )
}
