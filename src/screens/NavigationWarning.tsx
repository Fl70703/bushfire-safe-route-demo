import { useEffect, useRef, useState } from 'react'
import currentDirection from '../assets/navigation-warning/current-direction.svg'
import navigationWarningMapCanvas from '../assets/navigation-warning/navigation-warning-map-canvas.png'
import routeLine from '../assets/navigation-warning/route-line.svg'
import warningSheet from '../assets/navigation-warning/warning-sheet.svg'
import './navigation-warning.css'

const AUTO_ADVANCE_DELAY_MS = 800
const AUTO_ADVANCE_DURATION_MS = 6000

type NavigationWarningProps = {
  onStayOnRoute: () => void
  onSwitchRoute: () => void
  scale: number
}

export function NavigationWarning({ onStayOnRoute, onSwitchRoute, scale }: NavigationWarningProps) {
  const [feedback, setFeedback] = useState('')
  const [isProgressFilling, setIsProgressFilling] = useState(false)
  const progressStartTimer = useRef<number | undefined>(undefined)
  const progressCompletionTimer = useRef<number | undefined>(undefined)

  const clearAutoAdvanceTimers = () => {
    if (progressStartTimer.current !== undefined) {
      window.clearTimeout(progressStartTimer.current)
      progressStartTimer.current = undefined
    }

    if (progressCompletionTimer.current !== undefined) {
      window.clearTimeout(progressCompletionTimer.current)
      progressCompletionTimer.current = undefined
    }
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reducedMotion ? 0 : AUTO_ADVANCE_DURATION_MS

    progressStartTimer.current = window.setTimeout(() => {
      setIsProgressFilling(true)
      progressCompletionTimer.current = window.setTimeout(onSwitchRoute, duration)
    }, AUTO_ADVANCE_DELAY_MS)

    return clearAutoAdvanceTimers
  }, [onSwitchRoute])

  const stayOnRoute = () => {
    clearAutoAdvanceTimers()
    setIsProgressFilling(false)
    setFeedback('You chose to stay on the current route.')
    onStayOnRoute()
  }

  const switchRoute = () => {
    clearAutoAdvanceTimers()
    onSwitchRoute()
  }

  return (
    <section
      aria-label="Route warning"
      className="navigation-warning"
      data-node-id="917:5606"
      style={{ transform: `scale(${scale})` }}
    >
      <img alt="" aria-hidden="true" className="navigation-warning__map-canvas" src={navigationWarningMapCanvas} />

      <div className="navigation-warning__banner">Warning!Route ahead unsafe</div>
      <img alt="Current unsafe route" className="navigation-warning__route" src={routeLine} />
      <img alt="Current navigation direction" className="navigation-warning__current-direction" src={currentDirection} />

      <img alt="" className="navigation-warning__sheet" src={warningSheet} />
      <section aria-label="Route safety warning" className="navigation-warning__content">
        <p className="navigation-warning__risk-message">will pass high smoke area in 450m<br />Air quality is low, please wear mask</p>
        <p className="navigation-warning__recommendation">Suggest Switching route to avoid danger.<br />Estimate arrival time: 10:26</p>
        <div className="navigation-warning__actions">
          <button aria-label="Switch route" className={`navigation-warning__switch${isProgressFilling ? ' is-progress-filling' : ''}`} onClick={switchRoute} type="button">
            <span aria-hidden="true" className="navigation-warning__switch-progress" />
            <span className="navigation-warning__switch-label">Switch route</span>
          </button>
          <button aria-label="Stay on route" className="navigation-warning__stay" onClick={stayOnRoute} type="button">Stay on route</button>
        </div>
      </section>

      <p aria-live="polite" className="navigation-warning__feedback">{feedback}</p>
    </section>
  )
}
