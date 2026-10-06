import { useState } from 'react'
import back from '../assets/safety-zone/back.svg'
import headerDivider from '../assets/safety-zone/header-divider.svg'
import childCare from '../assets/route-select/child-care.svg'
import currentLocation from '../assets/route-select/current-location.svg'
import currentLocationDefault from '../assets/route-select/current-location-default.svg'
import dangerZoneDefault from '../assets/route-select/danger-zone-default.svg'
import dangerZoneFire from '../assets/route-select/danger-zone-fire.svg'
import dangerZoneVariant2 from '../assets/route-select/danger-zone-variant2.svg'
import floatPanel from '../assets/route-select/float-panel.svg'
import headerHome from '../assets/route-select/header-home.svg'
import routeMapBackground from '../assets/route-select/route-map-background.png'
import navigation from '../assets/route-select/navigation.svg'
import otherRoutes from '../assets/route-select/other-routes.svg'
import panelHandle from '../assets/route-select/panel-handle.svg'
import safeZoneMarker from '../assets/route-select/safe-zone-marker.svg'
import { ActionButton } from '../components/ActionButton'
import {
  ChildCareModal,
  type ChildCareSettingKey,
  type ChildCareSettings,
} from '../components/ChildCareModal'
import './route-select.css'

type RouteSelectProps = {
  onBack: () => void
  onHome: () => void
  onStartNavigation: () => void
  scale: number
}

const defaultChildCareSettings: ChildCareSettings = {
  music: false,
  funnyStory: false,
  soothingVoice: false,
  autoPlay: false,
}

export function RouteSelect({ onBack, onHome, onStartNavigation, scale }: RouteSelectProps) {
  const [childCareModalOpen, setChildCareModalOpen] = useState(false)
  const [savedChildCareSettings, setSavedChildCareSettings] = useState(defaultChildCareSettings)
  const [draftChildCareSettings, setDraftChildCareSettings] = useState(defaultChildCareSettings)
  const [feedback, setFeedback] = useState('')
  const childCareEnabled = Object.values(savedChildCareSettings).some(Boolean)

  const openChildCareModal = () => {
    setDraftChildCareSettings(savedChildCareSettings)
    setChildCareModalOpen(true)
  }

  const toggleChildCareSetting = (setting: ChildCareSettingKey) => {
    setDraftChildCareSettings((currentSettings) => ({
      ...currentSettings,
      [setting]: !currentSettings[setting],
    }))
  }

  const saveChildCareSettings = () => {
    setSavedChildCareSettings(draftChildCareSettings)
    setChildCareModalOpen(false)
    setFeedback('Child Care preferences saved to your route.')
  }

  return (
    <section
      aria-label="Select route"
      className="route-select"
      data-node-id="888:1934"
      style={{ transform: `scale(${scale})` }}
    >
      <header className="route-select__header">
        <div className="route-select__status-bar" aria-label="9:41">
          <span>9:41</span>
          <div aria-hidden="true" className="route-select__status-icons">
            <svg height="14" viewBox="0 0 19 14" width="19"><rect fill="currentColor" height="4" rx="1" width="3" x="0" y="10" /><rect fill="currentColor" height="7" rx="1" width="3" x="5" y="7" /><rect fill="currentColor" height="10" rx="1" width="3" x="10" y="4" /><rect fill="currentColor" height="13" rx="1" width="3" x="15" y="1" /></svg>
            <svg height="14" viewBox="0 0 17 14" width="17"><path d="M1.5 4.8a10.2 10.2 0 0 1 14 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /><path d="M4.5 8a5.7 5.7 0 0 1 8 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /><circle cx="8.5" cy="11.5" fill="currentColor" r="1.25" /></svg>
            <svg height="14" viewBox="0 0 25 14" width="25"><rect fill="none" height="11" rx="3" stroke="currentColor" strokeWidth="1.4" width="21" x="1" y="1.5" /><rect fill="currentColor" height="7" rx="2" width="15" x="3" y="3.5" /><path d="M23.5 5.2h1v3.6h-1z" fill="currentColor" /></svg>
          </div>
        </div>
        <button aria-label="Back to safety zones" className="route-select__back" onClick={onBack} type="button"><img alt="" src={back} /></button>
        <h1 className="route-select__heading">Select route</h1>
        <button aria-label="Back to home page" className="route-select__home" onClick={onHome} type="button"><img alt="" src={headerHome} /></button>
        <img alt="" className="route-select__header-divider" src={headerDivider} />
      </header>

      <div aria-label="Static route map" className="route-select__map">
        <img alt="" className="route-select__map-layer" src={routeMapBackground} />
        <img alt="Safe zone" className="route-select__safe-zone-marker" src={safeZoneMarker} />
        <div aria-label="High risk fire area" className="route-select__fire-risk">
          <img alt="" className="route-select__danger-zone-default" src={dangerZoneDefault} />
          <img alt="" className="route-select__danger-zone-variant2" src={dangerZoneVariant2} />
          <img alt="" className="route-select__fire-symbol" src={dangerZoneFire} />
        </div>
        <div aria-label="Current location" className="route-select__current-location">
          <img alt="" className="route-select__current-location-wide" src={currentLocation} />
          <img alt="" className="route-select__current-location-default" src={currentLocationDefault} />
        </div>
      </div>

      <img alt="" className="route-select__float-panel" src={floatPanel} />
      <img alt="" className="route-select__panel-handle" src={panelHandle} />

      <div className="route-select__summary" aria-label="Route details: 34 minutes, 14.5 kilometres, arriving at 10:15am">
        <strong>34mins</strong>
        <span className="route-select__distance">14.5km</span>
        <span className="route-select__arrival">Arrived time: 10:15am</span>
      </div>

      <ActionButton
        ariaLabel="Start navigation"
        className="route-select__start-button"
        icon={<img alt="" src={navigation} />}
        onClick={onStartNavigation}
        variant="primary"
      >
        Start navigation
      </ActionButton>
      <ActionButton
        ariaLabel="Select other routes"
        className="route-select__other-routes-button"
        icon={<img alt="" src={otherRoutes} />}
        onClick={() => setFeedback('Other routes will be available in the next supplied Figma frame.')}
        variant="secondary"
      >
        Select other routes
      </ActionButton>

      <button
        aria-pressed={childCareEnabled}
        className={`route-select__child-care${childCareEnabled ? ' is-active' : ''}`}
        onClick={openChildCareModal}
        type="button"
      >
        <img alt="" src={childCare} />
        <span>Child care</span>
      </button>
      <button
        aria-label="Custom route"
        className="route-select__custom-route"
        onClick={() => setFeedback('Custom route selection is reserved for the next supplied Figma frame.')}
        type="button"
      >
        Custom route
      </button>

      {childCareModalOpen ? (
        <ChildCareModal
          onConfirm={saveChildCareSettings}
          onToggle={toggleChildCareSetting}
          settings={draftChildCareSettings}
        />
      ) : null}

      <p aria-live="polite" className="route-select__feedback">{feedback}</p>
    </section>
  )
}
