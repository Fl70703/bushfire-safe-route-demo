import type { ReactNode } from 'react'

type ActionButtonProps = {
  ariaLabel: string
  children: ReactNode
  className: string
  icon?: ReactNode
  onClick: () => void
  variant: 'primary' | 'secondary'
}

export function ActionButton({
  ariaLabel,
  children,
  className,
  icon,
  onClick,
  variant,
}: ActionButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={`action-button action-button--${variant} ${className}`}
      onClick={onClick}
      type="button"
    >
      {icon ? <span className="action-button__icon">{icon}</span> : null}
      <span className="action-button__label">{children}</span>
    </button>
  )
}
