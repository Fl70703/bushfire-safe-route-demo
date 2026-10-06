import { useEffect, useRef, useState } from 'react'
import back from '../assets/arrived/back.svg'
import headerDivider from '../assets/arrived/header-divider.svg'
import headerHome from '../assets/arrived/header-home.svg'
import home from '../assets/arrived/home.svg'
import notes from '../assets/arrived/notes.svg'
import share from '../assets/arrived/share.svg'
import shelter from '../assets/arrived/shelter.svg'
import shield from '../assets/arrived/shield.svg'
import './arrived.css'

type ArrivedProps = {
  onBack: () => void
  onHome: () => void
  scale: number
}

export function Arrived({ onBack, onHome, scale }: ArrivedProps) {
  const [toast, setToast] = useState('')
  const [notesOpen, setNotesOpen] = useState(false)
  const [note, setNote] = useState('')
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => {
    if (toastTimer.current !== undefined) window.clearTimeout(toastTimer.current)
  }, [])

  const showToast = (message: string) => {
    if (toastTimer.current !== undefined) window.clearTimeout(toastTimer.current)

    setToast(message)
    toastTimer.current = window.setTimeout(() => {
      toastTimer.current = undefined
      setToast('')
    }, 2600)
  }

  const saveNotes = () => {
    setNotesOpen(false)
    showToast(note.trim() ? 'Notes saved locally.' : 'Notes panel closed.')
  }

  return (
    <section
      aria-label="Arrived at safe zone"
      className="arrived"
      data-node-id="893:6650"
      style={{ transform: `scale(${scale})` }}
    >
      <header className="arrived__header">
        <div className="arrived__status" aria-label="9:41">
          <span>9:41</span>
          <div aria-hidden="true" className="arrived__status-icons">
            <svg height="14" viewBox="0 0 19 14" width="19"><rect fill="currentColor" height="4" rx="1" width="3" x="0" y="10" /><rect fill="currentColor" height="7" rx="1" width="3" x="5" y="7" /><rect fill="currentColor" height="10" rx="1" width="3" x="10" y="4" /><rect fill="currentColor" height="13" rx="1" width="3" x="15" y="1" /></svg>
            <svg height="14" viewBox="0 0 17 14" width="17"><path d="M1.5 4.8a10.2 10.2 0 0 1 14 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /><path d="M4.5 8a5.7 5.7 0 0 1 8 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /><circle cx="8.5" cy="11.5" fill="currentColor" r="1.25" /></svg>
            <svg height="14" viewBox="0 0 25 14" width="25"><rect fill="none" height="11" rx="3" stroke="currentColor" strokeWidth="1.4" width="21" x="1" y="1.5" /><rect fill="currentColor" height="7" rx="2" width="15" x="3" y="3.5" /><path d="M23.5 5.2h1v3.6h-1z" fill="currentColor" /></svg>
          </div>
        </div>
        <button aria-label="Back to route selection" className="arrived__back" onClick={onBack} type="button"><img alt="" src={back} /></button>
        <h1>Arrived!</h1>
        <button aria-label="Home" className="arrived__header-home" onClick={onHome} type="button"><img alt="" src={headerHome} /></button>
        <img alt="" className="arrived__header-divider" src={headerDivider} />
      </header>

      <p className="arrived__reassurance">Stay calm<br />Emergency services are on their way</p>

      <section aria-label="Verified safe zone" className="arrived__safe-card">
        <img alt="" src={shield} />
        <p>You are now in a<br />verified safe zone</p>
      </section>

      <div className="arrived__actions">
        <button className="arrived__action arrived__action--primary" onClick={() => showToast('Shelter has been contacted.')} type="button">
          <img alt="" src={shelter} />
          <span>Contact shelter</span>
        </button>
        <button className="arrived__action" onClick={() => showToast('Your safe state has been shared.')} type="button">
          <img alt="" src={share} />
          <span>Share safe state</span>
        </button>
        <button className="arrived__action" onClick={() => setNotesOpen(true)} type="button">
          <img alt="" src={notes} />
          <span>Upload notes</span>
        </button>
        <button className="arrived__action arrived__action--home" onClick={onHome} type="button">
          <img alt="" src={home} />
          <span>Back to home</span>
        </button>
      </div>

      {toast ? <p aria-live="polite" className="arrived__toast" role="status">{toast}</p> : null}

      {notesOpen ? (
        <div className="arrived__modal-backdrop" role="presentation">
          <section aria-label="Upload notes" aria-modal="true" className="arrived__notes-modal" role="dialog">
            <button aria-label="Close notes" className="arrived__modal-close" onClick={() => setNotesOpen(false)} type="button">×</button>
            <h2>Upload notes</h2>
            <p>Add a short note for the shelter team.</p>
            <textarea aria-label="Notes" onChange={(event) => setNote(event.target.value)} placeholder="Add notes…" value={note} />
            <div className="arrived__modal-actions">
              <button onClick={() => setNotesOpen(false)} type="button">Cancel</button>
              <button onClick={saveNotes} type="button">Save note</button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  )
}
