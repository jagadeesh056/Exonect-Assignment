"use client"

import { useState } from "react"
import StateList from "./StateList"

function CountryList({
  countries,
  onAddCountry,
  onEditCountry,
  onDeleteCountry,
  onAddState,
  onEditState,
  onDeleteState,
  onAddCity,
  onDeleteCity,
}) {
  const [expandedCountry, setExpandedCountry] = useState(null)

  const toggleCountry = (countryId) => {
    setExpandedCountry(expandedCountry === countryId ? null : countryId)
  }

  return (
    <div className="country-list">
      <div className="list-header">
        <h2>Countries</h2>
        <button onClick={onAddCountry} className="add-button">
          Add Country
        </button>
      </div>

      {countries.length === 0 ? (
        <div className="empty-message">No countries added yet. Click "Add Country" to get started.</div>
      ) : (
        <ul className="list">
          {countries.map((country) => (
            <li key={country.id} className="list-item">
              <div className="item-header">
                <div className="item-name" onClick={() => toggleCountry(country.id)}>
                  <span className="expand-icon">{expandedCountry === country.id ? "▼" : "►"}</span>
                  {country.name}
                </div>
                <div className="item-actions">
                  <button onClick={() => onEditCountry(country.id)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => onDeleteCountry(country.id)} className="delete-button">
                    Delete
                  </button>
                  <button onClick={() => onAddState(country.id)} className="add-sub-button">
                    Add State
                  </button>
                </div>
              </div>

              {expandedCountry === country.id && (
                <div className="sub-list-container">
                  <StateList
                    countryId={country.id}
                    states={country.states}
                    onEditState={onEditState}
                    onDeleteState={onDeleteState}
                    onAddCity={onAddCity}
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

export default CountryList

