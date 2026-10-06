import { useCallback, useEffect, useRef, useState } from 'react'
import { Arrived } from './screens/Arrived'
import { HomeAlert } from './screens/HomeAlert'
import { NavigationDefault } from './screens/NavigationDefault'
import { NavigationRerouted } from './screens/NavigationRerouted'
import { NavigationWarning } from './screens/NavigationWarning'
import { RouteSelect } from './screens/RouteSelect'
import { SafetyZoneDefault } from './screens/SafetyZoneDefault'
import routeMapCanvas from './assets/route-select/route-map-background.png'
import navigationMapCanvas from './assets/navigation/navigation-map-canvas.png'
import navigationWarningMapCanvas from './assets/navigation-warning/navigation-warning-map-canvas.png'
import navigationReroutedMapCanvas from './assets/navigation-rerouted/navigation-rerouted-map-canvas.png'

const DESIGN_WIDTH = 393
const DESIGN_HEIGHT = 852
const DESKTOP_GUTTER = 32
type Screen = 'home' | 'safety-zone' | 'route-select' | 'navigation' | 'navigation-warning' | 'navigation-rerouted' | 'arrived'

const screenHashes: Record<Screen, string> = {
  home: '#/',
  'safety-zone': '#/safety-zone',
  'route-select': '#/route-select',
  navigation: '#/navigation',
  'navigation-warning': '#/navigation-warning',
  'navigation-rerouted': '#/navigation-rerouted',
  arrived: '#/arrived',
}

function getScreenFromHash(): Screen {
  if (window.location.hash === '#/safety-zone') return 'safety-zone'
  if (window.location.hash === '#/route-select') return 'route-select'
  if (window.location.hash === '#/navigation') return 'navigation'
  if (window.location.hash === '#/navigation-warning') return 'navigation-warning'
  if (window.location.hash === '#/navigation-rerouted') return 'navigation-rerouted'
  if (window.location.hash === '#/arrived') return 'arrived'
  return 'home'
}

function getPreviewScale() {
  // Keep the fixed prototype canvas at the largest readable width on phones.
  // Only shave off a few pixels when it would otherwise create a scrollbar;
  // shorter screens remain scrollable instead of shrinking the whole product.
  if (window.matchMedia('(max-width: 768px)').matches) {
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth
    const widthScale = Math.min(1, viewportWidth / DESIGN_WIDTH)
    const viewportHeight = window.visualViewport?.height || window.innerHeight
    const scaledHeight = DESIGN_HEIGHT * widthScale

    if (scaledHeight - viewportHeight > 0 && scaledHeight - viewportHeight <= 8) {
      return Math.min(widthScale, viewportHeight / DESIGN_HEIGHT)
    }

    return widthScale
  }

  const gutter = window.innerWidth > DESIGN_WIDTH ? DESKTOP_GUTTER : 0

  return Math.max(
    0.1,
    Math.min(
      1,
      (window.innerWidth - gutter) / DESIGN_WIDTH,
      (window.innerHeight - gutter) / DESIGN_HEIGHT,
    ),
  )
}

function App() {
  const [scale, setScale] = useState(getPreviewScale)
  const [screen, setScreen] = useState<Screen>(getScreenFromHash)
  const stageRef = useRef<HTMLElement>(null)
  const [isWarningTransitioning, setIsWarningTransitioning] = useState(false)
  const warningTransitionTimer = useRef<number | undefined>(undefined)

  const navigateTo = useCallback((nextScreen: Screen) => {
    const nextHash = screenHashes[nextScreen]

    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash
    }

    setScreen(nextScreen)
  }, [])

  const showNavigationWarning = useCallback(() => {
    if (warningTransitionTimer.current !== undefined) return

    setIsWarningTransitioning(true)
    warningTransitionTimer.current = window.setTimeout(() => {
      warningTransitionTimer.current = undefined
      setIsWarningTransitioning(false)
      navigateTo('navigation-warning')
    }, 300)
  }, [navigateTo])

  const showReroutedNavigation = useCallback(() => {
    navigateTo('navigation-rerouted')
  }, [navigateTo])

  const showArrived = useCallback(() => {
    navigateTo('arrived')
  }, [navigateTo])

  useEffect(() => () => {
    if (warningTransitionTimer.current !== undefined) {
      window.clearTimeout(warningTransitionTimer.current)
    }
  }, [])

  useEffect(() => {
    const updateScale = () => setScale(getPreviewScale())
    const viewportObserver = new ResizeObserver(updateScale)

    updateScale()
    viewportObserver.observe(document.documentElement)
    window.addEventListener('resize', updateScale)
    window.visualViewport?.addEventListener('resize', updateScale)

    return () => {
      viewportObserver.disconnect()
      window.removeEventListener('resize', updateScale)
      window.visualViewport?.removeEventListener('resize', updateScale)
    }
  }, [])

  useEffect(() => {
    // Re-measure after the scaled canvas has laid out. On mobile browsers with
    // classic scrollbars, the available width can change once vertical
    // overflow is resolved.
    const frame = window.requestAnimationFrame(() => setScale(getPreviewScale()))
    return () => window.cancelAnimationFrame(frame)
  }, [scale])

  useEffect(() => {
    // Mobile scrolling belongs to the stage, not the document. Reset it when
    // a new fixed-size prototype screen is shown so WeChat doesn't retain the
    // previous screen's scroll offset and make the next page look half-loaded.
    stageRef.current?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [screen])

  useEffect(() => {
    // Warm the map canvases after the first screen paints so the navigation
    // flow does not need to fetch/decode its large visual layers on tap.
    const mapCanvases = [
      routeMapCanvas,
      navigationMapCanvas,
      navigationWarningMapCanvas,
      navigationReroutedMapCanvas,
    ]
    mapCanvases.forEach((src) => {
      const image = new Image()
      image.src = src
      void image.decode().catch(() => undefined)
    })
  }, [])

  useEffect(() => {
    const syncScreenWithAddress = () => setScreen(getScreenFromHash())

    window.addEventListener('hashchange', syncScreenWithAddress)
    return () => window.removeEventListener('hashchange', syncScreenWithAddress)
  }, [])

  return (
    <main ref={stageRef} className="prototype-stage" aria-label="Bushfire safety prototype">
      <aside aria-label="Project information" className="presentation-shell__project">
        <p className="presentation-shell__kicker">Interactive Product Prototype</p>
        <h1>Bushfire Safe Route</h1>
        <p className="presentation-shell__chinese-title">山火应急避险导航</p>
        <p className="presentation-shell__subtitle">面向澳洲山火场景的移动端<br />应急路线规划与避险体验</p>
        <div aria-label="Project highlights" className="presentation-shell__tags">
          <span>动态避险导航</span>
          <span>家庭安全协同</span>
          <span>儿童安抚支持</span>
          <span>灾后信息闭环</span>
        </div>
      </aside>

      <button
        aria-label="Reset demo to home"
        className="presentation-shell__reset"
        onClick={() => navigateTo('home')}
        type="button"
      >
        Reset Demo
      </button>

      <div
        className="prototype-preview"
        style={{
          height: `${DESIGN_HEIGHT * scale}px`,
          width: `${DESIGN_WIDTH * scale}px`,
        }}
      >
        {screen === 'home' ? (
          <HomeAlert onCheckRoutes={() => navigateTo('safety-zone')} scale={scale} />
        ) : screen === 'safety-zone' ? (
          <SafetyZoneDefault
            onBack={() => navigateTo('home')}
            onSelectSafeZone={() => navigateTo('route-select')}
            scale={scale}
          />
        ) : screen === 'route-select' ? (
          <RouteSelect
            onBack={() => navigateTo('safety-zone')}
            onHome={() => navigateTo('home')}
            onStartNavigation={() => navigateTo('navigation')}
            scale={scale}
          />
        ) : screen === 'navigation' ? (
          <NavigationDefault
            onExit={() => navigateTo('route-select')}
            onRouteWarning={showNavigationWarning}
            isWarningTransitioning={isWarningTransitioning}
            scale={scale}
          />
        ) : screen === 'navigation-warning' ? (
          <NavigationWarning
            onStayOnRoute={() => undefined}
            onSwitchRoute={showReroutedNavigation}
            scale={scale}
          />
        ) : screen === 'navigation-rerouted' ? (
          <NavigationRerouted onArrive={showArrived} onExit={() => navigateTo('route-select')} scale={scale} />
        ) : (
          <Arrived onBack={() => navigateTo('route-select')} onHome={() => navigateTo('home')} scale={scale} />
        )}
      </div>
    </main>
  )
}

export default App
