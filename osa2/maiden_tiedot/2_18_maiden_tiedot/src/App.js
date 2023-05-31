import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const Countries = (props) => {
  //console.log(props.countries)
  if (props.countries !== null) {
    if (props.countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (props.countries.length > 1) {
      return (
        <p>
          {props.countries.map((country) => (
           <p> {country.name.common}</p>
          ))}
        </p>
      )
    } else if (props.countries.length === 1) {
      const country = props.countries[0]
      //console.log(country.languages)
      const languages = Object.values(country.languages)
      const flag = country.flags.png
      console.log(flag)
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital: {country.capital}</p>
          <p>area: {country.area}</p>
          <h3>languages:</h3>
          <ul>           
            {languages.map(language => (<li key={language}>{language}</li>))}
          </ul>
          <p>
          <img src={flag}></img>
          </p>
        </div>
      )
    }
  }
  return null
}

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getAll().then((data) => setCountries(data))
  }, [])

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  const filteredCountries = countries.filter((country) =>
    country.name && country.name.common.toLowerCase().includes(newCountry.toLowerCase())
  )

  return (
    <div>
      <form>
        <div>
          Find countries{' '}
          <input value={newCountry} onChange={handleCountryChange} />
        </div>
        <Countries countries={filteredCountries} />
      </form>
    </div>
  )
}

export default App
