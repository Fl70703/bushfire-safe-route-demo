import childCareHeader from '../assets/child-care/child-care-header.svg'
import panelHeader from '../assets/child-care/panel-header.svg'
import './child-care-modal.css'

export type ChildCareSettingKey = 'music' | 'funnyStory' | 'soothingVoice' | 'autoPlay'

export type ChildCareSettings = Record<ChildCareSettingKey, boolean>

type ChildCareModalProps = {
  onConfirm: () => void
  onToggle: (setting: ChildCareSettingKey) => void
  settings: ChildCareSettings
}

const settingsOptions: Array<{ key: ChildCareSettingKey; label: string; nodeId: string }> = [
  { key: 'music', label: 'Play music for kids', nodeId: '893:5557' },
  { key: 'funnyStory', label: 'Telling funny story', nodeId: '893:5577' },
  { key: 'soothingVoice', label: 'Soothing voice', nodeId: '893:5587' },
  { key: 'autoPlay', label: 'Auto play all item', nodeId: '893:5597' },
]

export function ChildCareModal({ onConfirm, onToggle, settings }: ChildCareModalProps) {
  return (
    <div className="child-care-modal" data-node-id="310:7284">
      <section
        aria-label="Child care settings"
        aria-modal="true"
        className="child-care-modal__panel"
        data-node-id="893:2023"
        role="dialog"
      >
        <img alt="" className="child-care-modal__header-surface" src={panelHeader} />
        <div className="child-care-modal__title" data-node-id="893:5489">
          <img alt="" src={childCareHeader} />
          <h2>Child care</h2>
        </div>

        <div className="child-care-modal__settings" data-node-id="893:5977">
          {settingsOptions.map((option) => {
            const isEnabled = settings[option.key]

            return (
              <div
                className={`child-care-modal__setting${isEnabled ? ' is-on' : ''}`}
                data-node-id={isEnabled ? '893:6073' : option.nodeId}
                key={option.key}
              >
                <span>{option.label}</span>
                <button
                  aria-label={option.label}
                  aria-pressed={isEnabled}
                  className={`child-care-toggle${isEnabled ? ' is-on' : ''}`}
                  data-node-id="437:5364"
                  onClick={() => onToggle(option.key)}
                  type="button"
                >
                  <span aria-hidden="true" className="child-care-toggle__thumb" />
                </button>
              </div>
            )
          })}
        </div>

        <button
          className="child-care-modal__confirm"
          data-node-id="1029:5111"
          onClick={onConfirm}
          type="button"
        >
          Confirm &amp; Save to Route
        </button>
      </section>
    </div>
  )
}
