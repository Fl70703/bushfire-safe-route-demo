type BottomNavigationItem = {
  active?: boolean
  icon: string
  label: string
  modifier?: string
}

type BottomNavigationProps = {
  items: BottomNavigationItem[]
  onSelect: (label: string) => void
}

export function BottomNavigation({ items, onSelect }: BottomNavigationProps) {
  return (
    <nav aria-label="Primary navigation" className="bottom-navigation__items">
      {items.map(({ active, icon, label, modifier }) => (
        <button
          aria-current={active ? 'page' : undefined}
          aria-label={label}
          className={`bottom-navigation__item${modifier ? ` ${modifier}` : ''}`}
          key={label}
          onClick={() => onSelect(label)}
          type="button"
        >
          <img alt="" className="bottom-navigation__icon" src={icon} />
          <span className="bottom-navigation__label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
