import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.newFilter} onChange={props.handleChange} />
    </div>
  )
}

const Countries = (props) => {
  const x = props.countries.filter(country => country.name.toLowerCase().includes(props.newFilter.toLowerCase()))
  if (x.length > 10) {
    return ('Too many matches, specify more')
  }
  if (x.length === 1) {
    return (
      <Country country={x[0]} />
    )
  }
  return (
    <ul>
      {x.map(country => <div key={country.name}>{country.name} <Button value={country.name} text={'show'} handleClick={props.handleChange} /></div>)}
    </ul>
  )
}

const Country = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h2>languages</h2>
      <ul>
        {props.country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={props.country.flag} alt="Flag" width={100} />
      <Weather capital={props.country.capital} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button value={props.value} onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Weather = (props) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.capital}`)
      .then(response => { setWeather(response.data.current) })
  }, [props.capital])
  return (
    <div>
      <h2>Weather in {props.capital}</h2>
      <p><strong>temperature: </strong>{weather.temperature} Celsius</p>
      {weather.weather_icons?.map(icon => <img key={icon} src={icon} alt='Icon' />)}
      <p><strong>wind: </strong>{weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )


}
const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { setCountries(response.data) })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleChange={handleFilterChange} />

      <Countries countries={countries} newFilter={newFilter} handleChange={handleFilterChange} />

    </div>
  )

}

export default App

