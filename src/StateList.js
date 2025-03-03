import { useState } from "react"
import CityList from "./CityList.js"

function StateList({ countryId, states, onEditState, onDeleteState, onAddCity, onDeleteCity }) {
  const [expandedState, setExpandedState] = useState(null)

  const toggleState = stateId => {
    setExpandedState(expandedState === stateId ? null : stateId)
  }

  return (
    <div className="state-list">
      {states.length === 0 ? (
        <div className="empty-message">No states added yet.</div>
      ) : (
        <ul className="list">
          {states.map(state => (
            <li key={state.id} className="list-item">
              <div className="item-header">
                <div className="item-name" onClick={() => toggleState(state.id)}>
                  <span className="expand-icon">{expandedState === state.id ? "▼" : "►"}</span>
                  {state.name}
                </div>
                <div className="item-actions">
                  <button onClick={() => onEditState(countryId, state.id)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => onDeleteState(countryId, state.id)} className="delete-button">
                    Delete
                  </button>
                  <button onClick={() => onAddCity(countryId, state.id)} className="add-sub-button">
                    Add City
                  </button>
                </div>
              </div>

              {expandedState === state.id && (
                <div className="sub-list-container">
                  <CityList
                    countryId={countryId}
                    stateId={state.id}
                    cities={state.cities}
                    onDeleteCity={onDeleteCity}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StateList

