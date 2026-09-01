import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Check, CircleAlert, LockKeyhole, Radio, ShieldAlert } from 'lucide-react'
import { CommunityUpdateModal } from '@/components/community-update-modal'
import { DeploymentCountdown } from '@/components/deployment-countdown'
import { SiteHeader } from '@/components/site-header'
import { SightingsCaseNavigator } from '@/components/sightings-case-navigator'

const CONTRACT_ADDRESS = '2z6G2uyFE5ft7WwnPFHnATCEfbFLMew3BXTZ97nvpump'

const primarySocials = [
  { label: 'X / Twitter', href: 'https://x.com/FROGITIVE' },
  { label: 'Telegram', href: 'https://t.me/frogitiveportal' },
  { label: 'Discord', href: 'https://discord.gg/2HGrg7eZ5M' },
  { label: 'Instagram', href: 'https://www.instagram.com/frogitive/?hl=en' },
  { label: 'Pump.fun', href: 'https://join.pump.fun/HSag?af_dp=pump%3A%2F%2Fprofile%2F9sTKShmd8mD2dKDxPWwCEgWCwtpBAdLtX6Vf5mzeY81i&af_web_dp=https%3A%2F%2Fpump.fun%2Fprofile%2FFrogitive&af_r=https%3A%2F%2Fpump.fun%2Fprofile%2FFrogitive&af_force_deeplink=true&af_og_title=Frogitive+on+Pump&af_og_description=Coins%2C+livestreams+and+activity+from+Frogitive+on+Pump.fun.&af_og_type=website&pid=web_retail&c=profile_share&share_type=profile_share&content_type=profile' },
]

const facts = [
  ['Alias', 'FROGITIVE'],
  ['Ticker', '$FUG'],
  ['Chain', 'Solana'],
  ['Status', 'AT LARGE'],
]

const phases = [
  { number: '01', title: 'SPOTTED', copy: 'Brand, X, Instagram, website and the first sightings.', status: 'IN PROGRESS', active: true },
  { number: '02', title: 'ON THE RUN', copy: 'Launch $FUG and publish the one official contract address everywhere.', status: 'LOCKED' },
  { number: '03', title: 'EVERYWHERE', copy: 'Community-made sightings, memes and continued public building.', status: 'CLASSIFIED' },
]

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      <p>{children}</p>
    </div>
  )
}

function ExternalAction({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a className={primary ? 'action action-primary' : 'action'} href={href} target="_blank" rel="noopener noreferrer">
      {children}<ArrowUpRight aria-hidden="true" />
    </a>
  )
}

export default function Page() {
  return (
    <>
      <CommunityUpdateModal />
      <SiteHeader />
      <main id="top">
        <section className="hero-section">
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <div className="status-pill"><Radio aria-hidden="true" /><span>STATUS: STILL AT LARGE</span></div>
              <h1>FROGITIVE <span>$FUG</span></h1>
              <p className="hero-lead">THE MOST WANTED FROG ON SOLANA.</p>
              <p className="hero-sub">No name. No trace. No promises. Just a frog on the run — spotted everywhere, caught nowhere.</p>
              <div className="hero-contract-status" aria-label="Official contract address">
                <span>OFFICIAL CONTRACT ADDRESS</span>
                <strong>{CONTRACT_ADDRESS}</strong>
              </div>
              <div className="hero-actions">
                <a className="action action-primary" href="#sightings">View sightings <ArrowDown aria-hidden="true" /></a>
                {primarySocials.map((social) => <ExternalAction key={social.label} href={social.href}>{social.label}</ExternalAction>)}
              </div>
              <div className="case-strip" aria-label="Current case details">
                <span>CASE 001</span><span>CHAIN: SOLANA</span><span>SUBJECT: UNKNOWN</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="camera-bar"><span><i /> CAM 04</span><span>LIVE FEED</span></div>
              <Image src="/images/frogitive-1.png" alt="FROGITIVE, a hooded frog wanted on Solana" width={1200} height={1200} priority sizes="(max-width: 900px) 100vw, 46vw" />
              <div className="wanted-stamp">WANTED</div>
              <div className="frame-corner corner-a" /><div className="frame-corner corner-b" />
            </div>
          </div>
        </section>

        <DeploymentCountdown />

        <section id="case" className="content-section">
          <div className="site-shell">
            <SectionHeading eyebrow="CASE FILE 001" title="WHO IS FROGITIVE?">Nobody knows where he came from. One day, a hooded frog appeared online. Since then, the sightings haven&apos;t stopped.</SectionHeading>
            <div className="case-grid">
              <article className="dossier-card subject-card">
                <div className="mugshot"><Image src="/images/frogitive-1.png" alt="Portrait of the unknown FROGITIVE subject" fill sizes="180px" /></div>
                <div className="subject-copy">
                  <p className="file-label">SUBJECT PROFILE / RESTRICTED</p>
                  <h3>UNKNOWN SUBJECT</h3>
                  <p>Quiet. Rebellious. Always watching. FROGITIVE never chases the hype — the hype tries to find him.</p>
                  <dl className="facts-grid">
                    {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                  </dl>
                </div>
              </article>
              <article className="dossier-card lore-card">
                <div className="classification"><LockKeyhole aria-hidden="true" /> CLASSIFIED</div>
                <div><p className="eyebrow">THE LORE</p><h3>WHY IS HE WANTED?</h3></div>
                <p>That part of the file is missing. Some say he escaped the swamp. Others say he was never there. Every new meme is another clue. Every sighting makes the story bigger.</p>
                <p className="redacted" aria-label="Information redacted">REDACTED</p>
              </article>
            </div>
          </div>
        </section>

        <section id="sightings" className="content-section sightings-section">
          <div className="site-shell">
            <SectionHeading eyebrow="ARCHIVE" title="SIGHTINGS">Every confirmed appearance receives a number. One timeline, across the official FROGITIVE community channels.</SectionHeading>
            <SightingsCaseNavigator />
          </div>
        </section>

        <section id="token" className="content-section">
          <div className="site-shell">
            <SectionHeading eyebrow="$FUG" title="TOKEN INFO">$FUG is live. Always verify the official contract address before trading.</SectionHeading>
            <div className="token-panel">
              <ShieldAlert aria-hidden="true" />
              <div><p>OFFICIAL CONTRACT ADDRESS</p><code>{CONTRACT_ADDRESS}</code></div>
              <span>LIVE</span>
            </div>
          </div>
        </section>

        <section id="roadmap" className="content-section">
          <div className="site-shell">
            <SectionHeading eyebrow="ROADMAP" title="THE ESCAPE PLAN">No fake milestones. No guaranteed returns. Just a simple plan to build the character, community and story.</SectionHeading>
            <div className="roadmap-grid">
              {phases.map((phase) => (
                <article className={phase.active ? 'phase-card is-active' : 'phase-card'} key={phase.number}>
                  <div className="phase-top"><span>PHASE {phase.number}</span>{phase.active ? <Check aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}</div>
                  <div><h3>{phase.title}</h3><p>{phase.copy}</p></div>
                  <strong>{phase.status}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="community-section" id="community">
          <div className="site-shell community-panel">
            <div>
              <p className="eyebrow">OPEN CHANNEL // RECRUITMENT</p>
              <h2>JOIN THE<br />MANHUNT.</h2>
              <p>Follow the sightings. Share the clues. The subject is still at large.</p>
            </div>
            <div className="community-actions">
              {primarySocials.map((social) => <ExternalAction key={social.label} href={social.href}>{social.label}</ExternalAction>)}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="site-shell footer-grid">
          <div className="footer-brand"><Image src="/images/frogitive-1.png" alt="" width={48} height={48} /><div><strong>FROGITIVE <span>$FUG</span></strong><p>STILL AT LARGE.</p></div></div>
          <nav aria-label="Official social links">
            {primarySocials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>)}
          </nav>
          <p className="disclaimer"><CircleAlert aria-hidden="true" /> $FUG is intended as a meme token. Crypto assets are highly risky and volatile. Nothing on this site is financial advice or a promise of profit. Always verify the official contract address and do your own research.</p>
          <p className="copyright">© 2026 FROGITIVE. ALL FILES CLASSIFIED.</p>
        </div>
      </footer>
    </>
  )
}
