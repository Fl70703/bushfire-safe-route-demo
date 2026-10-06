import { useEffect } from 'react'
import currentDirection from '../assets/navigation/current-direction.svg'
import reroutedMapCanvas from '../assets/navigation-rerouted/navigation-rerouted-map-canvas.png'
import './navigation-rerouted.css'

type NavigationReroutedProps = {
  onArrive: () => void
  onExit: () => void
  scale: number
}

export function NavigationRerouted({ onArrive, onExit, scale }: NavigationReroutedProps) {
  useEffect(() => {
    const arrivalTimer = window.setTimeout(onArrive, 3000)
    return () => window.clearTimeout(arrivalTimer)
  }, [onArrive])

  return (
    <section
      aria-label="Rerouted navigation"
      className="navigation-rerouted"
      data-node-id="893:6610"
      style={{ transform: `scale(${scale})` }}
    >
      <img alt="" aria-hidden="true" className="navigation-rerouted__map-canvas" src={reroutedMapCanvas} />
      <img alt="Current navigation direction" className="navigation-rerouted__current-direction" src={currentDirection} />
      <button aria-label="Exit navigation" className="navigation-rerouted__exit" onClick={onExit} type="button" />
    </section>
  )
}
