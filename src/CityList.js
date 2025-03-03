function CityList({ countryId, stateId, cities, onDeleteCity }) {
    return (
      <div className="city-list">
        {cities.length === 0 ? (
          <div className="empty-message">No cities added yet.</div>
        ) : (
          <ul className="list">
            {cities.map((city) => (
              <li key={city.id} className="list-item">
                <div className="item-header">
                  <div className="item-name">{city.name}</div>
                  <div className="item-actions">
                    <button onClick={() => onDeleteCity(countryId, stateId, city.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
  
  export default CityList
  
  