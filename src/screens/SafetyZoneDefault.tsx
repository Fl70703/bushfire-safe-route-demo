import { useState } from 'react'
import back from '../assets/safety-zone/back.svg'
import cardArrow from '../assets/safety-zone/card-arrow.svg'
import recommendedCardArrow from '../assets/safety-zone/card-arrow-recommended.svg'
import contentDivider from '../assets/safety-zone/content-divider.svg'
import headerDivider from '../assets/safety-zone/header-divider.svg'
import microphone from '../assets/safety-zone/microphone.svg'
import search from '../assets/safety-zone/search.svg'
import { SafetyZoneCard } from '../components/SafetyZoneCard'
import './safety-zone.css'

type SafetyZoneDefaultProps = {
  onBack: () => void
  onSelectSafeZone: () => void
  scale: number
}

type SortOption = 'Safety' | 'kid-friendly' | 'Time'

const safetySafetyZones = [
  {
    arrow: recommendedCardArrow,
    details: ['High safety level', 'Low-smoke area', 'No traffic congestion'] as [string, string, string],
    recommendation: 'Recommend',
    tagLeft: 'Supply',
    tagRight: 'Shelter nearby',
    title: 'Safe zone 1',
  },
  {
    arrow: cardArrow,
    details: ['High safety level', 'Low-smoke area', 'Traffic congestion possible'] as [string, string, string],
    tagRight: 'Supply',
    title: 'Safe zone 2',
  },
  {
    arrow: cardArrow,
    details: ['High safety level', 'Low-smoke area', 'No traffic congestion'] as [string, string, string],
    tagRight: 'Shelter nearby',
    title: 'Safe zone 3',
  },
]

const kidFriendlySafetyZones = [
  {
    arrow: recommendedCardArrow,
    details: ['High safety level', 'Low-smoke area', 'No traffic congestion'] as [string, string, string],
    recommendation: 'Recommend',
    tagRight: 'Kid emotional supporty',
    title: 'Safe zone 4',
  },
  {
    arrow: cardArrow,
    details: ['High safety level', 'Low-smoke area', 'Traffic congestion possible'] as [string, string, string],
    tagRight: 'Kid-friendly toilets',
    title: 'Safe zone 5',
  },
  {
    arrow: cardArrow,
    details: ['High safety level', 'Low-smoke area', 'No traffic congestion'] as [string, string, string],
    tagRight: 'Supply',
    title: 'Safe zone 6',
  },
]

export function SafetyZoneDefault({ onBack, onSelectSafeZone, scale }: SafetyZoneDefaultProps) {
  const [query, setQuery] = useState('')
  const [selectedSort, setSelectedSort] = useState<SortOption>('Safety')
  const sortedZones = selectedSort === 'kid-friendly' ? kidFriendlySafetyZones : safetySafetyZones
  const matchingZones = sortedZones.filter((zone) => zone.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <section
      aria-label="Select safety zone"
      className="safety-zone"
      data-node-id="979:5855"
      style={{ transform: `scale(${scale})` }}
    >
      <header className="safety-zone__header">
        <div className="safety-zone__status-bar" aria-label="9:41">
          <span>9:41</span>
          <div aria-hidden="true" className="safety-zone__status-icons">
            <svg height="14" viewBox="0 0 19 14" width="19"><rect fill="currentColor" height="4" rx="1" width="3" x="0" y="10" /><rect fill="currentColor" height="7" rx="1" width="3" x="5" y="7" /><rect fill="currentColor" height="10" rx="1" width="3" x="10" y="4" /><rect fill="currentColor" height="13" rx="1" width="3" x="15" y="1" /></svg>
            <svg height="14" viewBox="0 0 17 14" width="17"><path d="M1.5 4.8a10.2 10.2 0 0 1 14 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /><path d="M4.5 8a5.7 5.7 0 0 1 8 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /><circle cx="8.5" cy="11.5" fill="currentColor" r="1.25" /></svg>
            <svg height="14" viewBox="0 0 25 14" width="25"><rect fill="none" height="11" rx="3" stroke="currentColor" strokeWidth="1.4" width="21" x="1" y="1.5" /><rect fill="currentColor" height="7" rx="2" width="15" x="3" y="3.5" /><path d="M23.5 5.2h1v3.6h-1z" fill="currentColor" /></svg>
          </div>
        </div>
        <button aria-label="Back to home page" className="safety-zone__back" onClick={onBack} type="button"><img alt="" src={back} /></button>
        <h1 className="safety-zone__heading">Select safety zone</h1>
        <img alt="" className="safety-zone__header-divider" src={headerDivider} />
      </header>

      <label className="safety-zone__search" data-node-id="979:5869">
        <span className="safety-zone__search-icon"><img alt="" src={search} /></span>
        <input aria-label="Search safe zone" onChange={(event) => setQuery(event.target.value)} placeholder="search safe zone" value={query} />
        <span className="safety-zone__microphone"><img alt="" src={microphone} /></span>
      </label>
      <img alt="" className="safety-zone__content-divider" src={contentDivider} />

      <p className="safety-zone__sort-label">Sort results by</p>
      <div aria-label="Sort results by" className="safety-zone__sort-tabs" role="group">
        {(['Safety', 'kid-friendly', 'Time'] as SortOption[]).map((option) => (
          <button
            aria-pressed={selectedSort === option}
            className={selectedSort === option ? 'is-selected' : ''}
            key={option}
            onClick={() => setSelectedSort(option)}
            type="button"
          >
            {option === 'kid-friendly' && selectedSort === option ? 'Kid-friendly' : option}
          </button>
        ))}
      </div>

      <div className="safety-zone__card-list" key={selectedSort}>
        {matchingZones.map((zone) => (
          <SafetyZoneCard
            {...zone}
            key={zone.title}
            onClick={() => {
              if (zone.title === 'Safe zone 1' || zone.title === 'Safe zone 4') {
                onSelectSafeZone()
              }
            }}
          />
        ))}
      </div>
    </section>
  )
}
