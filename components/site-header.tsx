import Image from 'next/image'
import { ExternalLink, Menu } from 'lucide-react'

const navigation = [
  { href: '#case', label: 'Case File' },
  { href: '#sightings', label: 'Sightings' },
  { href: '#token', label: 'Token' },
  { href: '#roadmap', label: 'Escape Plan' },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <a className="brand-lockup" href="#top" aria-label="FROGITIVE home">
          <Image src="/images/frogitive-1.png" alt="" width={44} height={44} priority />
          <span>FROGITIVE <b>$FUG</b></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <div className="header-socials" aria-label="Official social links">
          <a className="header-community" href="https://x.com/FROGITIVE" target="_blank" rel="noopener noreferrer">X <ExternalLink aria-hidden="true" /></a>
          <a className="header-community" href="https://t.me/frogitiveportal" target="_blank" rel="noopener noreferrer">Telegram <ExternalLink aria-hidden="true" /></a>
          <a className="header-community" href="https://discord.gg/2HGrg7eZ5M" target="_blank" rel="noopener noreferrer">Discord <ExternalLink aria-hidden="true" /></a>
          <a className="header-community" href="https://www.instagram.com/frogitive/?hl=en" target="_blank" rel="noopener noreferrer">Instagram <ExternalLink aria-hidden="true" /></a>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href="https://x.com/FROGITIVE" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://t.me/frogitiveportal" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="https://discord.gg/2HGrg7eZ5M" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="https://www.instagram.com/frogitive/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>
        </details>
      </div>
    </header>
  )
}
