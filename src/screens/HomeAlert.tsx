import { useState } from 'react'
import bottomNavigation from '../assets/home-alert/bottom-navigation.svg'
import contactFamilyMask from '../assets/home-alert/contact-family-mask.svg'
import contribute from '../assets/home-alert/contribute.svg'
import familyRestroom from '../assets/home-alert/family-restroom.svg'
import home from '../assets/home-alert/home.svg'
import locationDivider from '../assets/home-alert/location-divider.svg'
import profile from '../assets/home-alert/profile.svg'
import route from '../assets/home-alert/route.svg'
import share from '../assets/home-alert/share.svg'
import warning from '../assets/home-alert/warning.svg'
import { ActionButton } from '../components/ActionButton'
import { BottomNavigation } from '../components/BottomNavigation'
import './home-alert.css'

type HomeAlertProps = {
  onCheckRoutes: () => void
  scale: number
}

const navigationItems = [
  { active: true, icon: home, label: 'Home' },
  { icon: route, label: 'Route' },
  { icon: profile, label: 'me' },
  { icon: contribute, label: 'Contribute', modifier: 'bottom-navigation__item--contribute' },
]

export function HomeAlert({ onCheckRoutes, scale }: HomeAlertProps) {
  const [feedback, setFeedback] = useState('')

  return (
    <section
      aria-label="Home page bush fire alert"
      className="home-alert"
      data-node-id="893:6721"
      style={{ transform: `scale(${scale})` }}
    >
      <div aria-hidden="true" className="home-alert__background" data-node-id="893:6726" />

      <div className="home-alert__status-bar" aria-label="9:41">
        <span className="home-alert__time">9:41</span>
        <div aria-hidden="true" className="home-alert__status-icons">
          <svg className="status-signal" height="14" viewBox="0 0 19 14" width="19">
            <rect fill="currentColor" height="4" rx="1" width="3" x="0" y="10" />
            <rect fill="currentColor" height="7" rx="1" width="3" x="5" y="7" />
            <rect fill="currentColor" height="10" rx="1" width="3" x="10" y="4" />
            <rect fill="currentColor" height="13" rx="1" width="3" x="15" y="1" />
          </svg>
          <svg className="status-wifi" height="14" viewBox="0 0 17 14" width="17">
            <path d="M1.5 4.8a10.2 10.2 0 0 1 14 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            <path d="M4.5 8a5.7 5.7 0 0 1 8 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            <circle cx="8.5" cy="11.5" fill="currentColor" r="1.25" />
          </svg>
          <svg className="status-battery" height="14" viewBox="0 0 25 14" width="25">
            <rect fill="none" height="11" rx="3" stroke="currentColor" strokeWidth="1.4" width="21" x="1" y="1.5" />
            <rect fill="currentColor" height="7" rx="2" width="15" x="3" y="3.5" />
            <path d="M23.5 5.2h1v3.6h-1z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <h1 className="home-alert__heading" data-node-id="893:6753">Home page</h1>
      <img
        alt=""
        className="home-alert__location-divider"
        data-node-id="893:6728"
        src={locationDivider}
      />
      <p className="home-alert__location" data-node-id="893:6729">
        Current location has been obtained
      </p>

      <section className="home-alert__warning-card" data-node-id="893:6730">
        <img alt="" className="home-alert__warning-icon" data-node-id="437:4797" src={warning} />
        <p className="home-alert__warning-copy" data-node-id="893:6731">
          Bush Fire Alert<br />
          Evacuate Now!
        </p>
      </section>

      <ActionButton
        ariaLabel="Check routes to safe zone"
        className="home-alert__routes-button"
        onClick={onCheckRoutes}
        variant="primary"
      >
        Check routes<br />
        to safe zone
      </ActionButton>

      <ActionButton
        ariaLabel="Share location"
        className="home-alert__share-button"
        icon={<img alt="" src={share} />}
        onClick={() => setFeedback('Location sharing is reserved for the supplied Figma flow.')}
        variant="secondary"
      >
        Share location
      </ActionButton>

      <ActionButton
        ariaLabel="Contact family"
        className="home-alert__family-button"
        icon={
          <>
            <img alt="" src={contactFamilyMask} />
            <img alt="" src={familyRestroom} />
          </>
        }
        onClick={() => setFeedback('Family contact is reserved for the supplied Figma flow.')}
        variant="secondary"
      >
        Contact family
      </ActionButton>

      <div className="home-alert__bottom-navigation" data-node-id="893:6727">
        <img alt="" src={bottomNavigation} />
        <BottomNavigation
          items={navigationItems}
          onSelect={(label) => setFeedback(`${label} remains on this screen until its Figma frame is supplied.`)}
        />
      </div>

      <p aria-live="polite" className="sr-only">{feedback}</p>
    </section>
  )
}
