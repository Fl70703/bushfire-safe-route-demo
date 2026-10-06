import type { MouseEventHandler } from 'react'

type SafetyZoneCardProps = {
  arrow: string
  details: [string, string, string]
  onClick: MouseEventHandler<HTMLButtonElement>
  recommendation?: string
  tagLeft?: string
  tagRight?: string
  title: string
}

export function SafetyZoneCard({
  arrow,
  details,
  onClick,
  recommendation,
  tagLeft,
  tagRight,
  title,
}: SafetyZoneCardProps) {
  return (
    <button aria-label={`Choose ${title}`} className="safety-zone-card" onClick={onClick} type="button">
      {recommendation ? <span className="safety-zone-card__recommendation">{recommendation}</span> : null}
      <span className="safety-zone-card__summary">
        <span className="safety-zone-card__title">{title}</span>
        <span className="safety-zone-card__metric">Distance</span>
        <span className="safety-zone-card__metric">Time</span>
      </span>
      <span className="safety-zone-card__details">
        {details.map((detail) => <span key={detail}>{detail}</span>)}
      </span>
      {tagLeft ? <span className="safety-zone-card__tag safety-zone-card__tag--left">{tagLeft}</span> : null}
      {tagRight ? <span className="safety-zone-card__tag safety-zone-card__tag--right">{tagRight}</span> : null}
      <span className="safety-zone-card__arrow"><img alt="" src={arrow} /></span>
    </button>
  )
}
