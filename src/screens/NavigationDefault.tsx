import { useEffect, useState } from 'react'
import air from '../assets/navigation/air.svg'
import childIndicator from '../assets/navigation/child-indicator.svg'
import cloud from '../assets/navigation/cloud.svg'
import currentDirection from '../assets/navigation/current-direction.svg'
import fireBackground from '../assets/navigation/fire-background.svg'
import fireIcon from '../assets/navigation/fire-glyph.svg'
import routeLine from '../assets/navigation/route-line.svg'
import navigationMapCanvas from '../assets/navigation/navigation-map-canvas.png'
import smokeBackground from '../assets/navigation/smoke-background.svg'
import speakerIndicator from '../assets/navigation/speaker-indicator.svg'
import warningSheet from '../assets/navigation-warning/warning-sheet.svg'
import './navigation-default.css'

type NavigationDefaultProps = {
  onExit: () => void
  onRouteWarning: () => void
  isWarningTransitioning: boolean
  scale: number
}

export function NavigationDefault({
  onExit,
  onRouteWarning,
  isWarningTransitioning,
  scale,
}: NavigationDefaultProps) {
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    // After three seconds, transition to the route warning.
    const warningTimer = window.setTimeout(onRouteWarning, 3000)

    return () => window.clearTimeout(warningTimer)
  }, [onRouteWarning])

  return (
    <section
      aria-label="Navigation"
      className={`navigation-default${isWarningTransitioning ? ' is-warning-transitioning' : ''}`}
      data-node-id="970:1663"
      style={{ transform: `scale(${scale})` }}
    >
      <img alt="" aria-hidden="true" className="navigation-default__map-canvas" src={navigationMapCanvas} />

      <div className="navigation-default__instruction" aria-label="In 150 meters, 15.4 kilometres remaining">
        <strong className="navigation-default__instruction-distance">150 meters</strong>
        <span className="navigation-default__instruction-remaining">15.4km<br />remaining</span>
        <span className="navigation-default__instruction-warning">Warning!Route ahead unsafe</span>
      </div>

      <img alt="Route to safe zone" className="navigation-default__route" src={routeLine} />
      <img alt="Current navigation direction" className="navigation-default__current-direction" src={currentDirection} />

      <button aria-label="Sound guidance is on" className="navigation-default__indicator navigation-default__speaker" onClick={() => setFeedback('Sound guidance is on.')} type="button">
        <img alt="" src={speakerIndicator} />
      </button>
      <button aria-label="Nearest fire area, 9.4 kilometres away" className="navigation-default__indicator navigation-default__fire" onClick={onRouteWarning} type="button">
        <img alt="" className="navigation-default__fire-background" src={fireBackground} />
        <img alt="" className="navigation-default__fire-icon" src={fireIcon} />
      </button>
      <button aria-label="Smoke level is medium" className="navigation-default__indicator navigation-default__smoke" onClick={onRouteWarning} type="button">
        <img alt="" className="navigation-default__smoke-background" src={smokeBackground} />
        <img alt="" className="navigation-default__cloud" src={cloud} />
        <img alt="" className="navigation-default__air" src={air} />
      </button>
      <button aria-label="Child Care is available" className="navigation-default__indicator navigation-default__child-care" onClick={() => setFeedback('Child Care settings are saved to this route.')} type="button">
        <img alt="" src={childIndicator} />
      </button>

      <button aria-label="Exit navigation" className="navigation-default__exit" onClick={onExit} type="button" />

      {isWarningTransitioning ? (
        <div aria-hidden="true" className="navigation-default__warning-transition">
          <img alt="" className="navigation-default__warning-sheet" src={warningSheet} />
        </div>
      ) : null}

      <p aria-live="polite" className="navigation-default__feedback">{feedback}</p>
    </section>
  )
}
