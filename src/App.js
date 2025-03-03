"use client"

import { useState } from "react"
import CountryList from "./CountryList"
import "./App.css"

function App() {
  const [countries, setCountries] = useState([])

  const addCountry = () => {
    const countryName = window.prompt("Enter country name:")
    if (countryName && countryName.trim()) {
      const newCountry = {
        id: Date.now(),
        name: countryName.trim(),
        states: [],
      }
      setCountries([...countries, newCountry])
    }
  }

  const editCountry = (countryId) => {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    const newName = window.prompt("Enter new country name:", country.name)
    if (newName && newName.trim() && newName !== country.name) {
      if (window.confirm(`Are you sure you want to update ${country.name} to ${newName}?`)) {
        const updatedCountries = countries.map((c) => (c.id === countryId ? { ...c, name: newName.trim() } : c))
        setCountries(updatedCountries)
      }
    }
  }

  const deleteCountry = (countryId) => {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    if (
      window.confirm(
        `Are you sure you want to delete ${country.name}? This will also delete all states and cities within it.`,
      )
    ) {
      const updatedCountries = countries.filter((c) => c.id !== countryId)
      setCountries(updatedCountries)
    }
  }

  const addState = (countryId) => {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    const stateName = window.prompt("Enter state name:")
    if (stateName && stateName.trim()) {
      const newState = {
        id: Date.now(),
        name: stateName.trim(),
        cities: [],
      }

      const updatedCountries = countries.map((c) =>
        c.id === countryId ? { ...c, states: [...c.states, newState] } : c,
      )
      setCountries(updatedCountries)
    }
  }

  const editState = (countryId, stateId) => {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    const state = country.states.find((s) => s.id === stateId)
    if (!state) return

    const newName = window.prompt("Enter new state name:", state.name)
    if (newName && newName.trim() && newName !== state.name) {
      if (window.confirm(`Are you sure you want to update ${state.name} to ${newName}?`)) {
        const updatedCountries = countries.map((c) =>
          c.id === countryId
            ? {
                ...c,
                states: c.states.map((s) => (s.id === stateId ? { ...s, name: newName.trim() } : s)),
              }
            : c,
        )
        setCountries(updatedCountries)
      }
    }
  }

  const deleteState = (countryId, stateId) => {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    const state = country.states.find((s) => s.id === stateId)
    if (!state) return

    if (window.confirm(`Are you sure you want to delete ${state.name}? This will also delete all cities within it.`)) {
      const updatedCountries = countries.map((c) =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.filter((s) => s.id !== stateId),
            }
          : c,
      )
      setCountries(updatedCountries)
    }
  }

  const addCity = (countryId, stateId) => {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    const state = country.states.find((s) => s.id === stateId)
    if (!state) return

    const cityName = window.prompt("Enter city name:")
    if (cityName && cityName.trim()) {
      const newCity = {
        id: Date.now(),
        name: cityName.trim(),
      }

      const updatedCountries = countries.map((c) =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.map((s) => (s.id === stateId ? { ...s, cities: [...s.cities, newCity] } : s)),
            }
          : c,
      )
      setCountries(updatedCountries)
    }
  }

  const deleteCity = (countryId, stateId, cityId) => {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    const state = country.states.find((s) => s.id === stateId)
    if (!state) return

    const city = state.cities.find((c) => c.id === cityId)
    if (!city) return

    if (window.confirm(`Are you sure you want to delete ${city.name}?`)) {
      const updatedCountries = countries.map((c) =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.map((s) =>
                s.id === stateId ? { ...s, cities: s.cities.filter((city) => city.id !== cityId) } : s,
              ),
            }
          : c,
      )
      setCountries(updatedCountries)
    }
  }

  return (
    <div className="app">
      <h1>Country, State, and City Management</h1>
      <CountryList
        countries={countries}
        onAddCountry={addCountry}
        onEditCountry={editCountry}
        onDeleteCountry={deleteCountry}
        onAddState={addState}
        onEditState={editState}
        onDeleteState={deleteState}
        onAddCity={addCity}
        onDeleteCity={deleteCity}
      />
    </div>
  )
}

export default App

