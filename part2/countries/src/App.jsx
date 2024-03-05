import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'
import './App.css'


const Filter = ({nameFilter, filterChangeHandler}) => {
  return (
    <div>
      find a country <input value={nameFilter} onChange={filterChangeHandler}/>
    </div>
  )
}
const Country = ( {country} ) => {
  const [weather, setWeather] = useState(null)
  const langs = []
  for (let prop in country.languages) 
        langs.push(country.languages[prop])
  useEffect(() => {
    weatherService
      .getWeather(country.latlng[0], country.latlng[1])
      .then(w => {setWeather(w)})
      .catch(err => {console.log('Error while getAll', err)})
  }, [country])

  let weatherElem = <></>
  if (weather) {
    weatherElem = (<div>
      <h3>Weather</h3>
      <p>{weather.icon} {weather.desc}</p>
      <p>
      temperature: {weather.current.temperature_2m} {weather.current_units.temperature_2m}
      </p>
      </div>)
  }
  return (
    <div>
      One country: {country.name.common}
      <div className='lefty'>
        <h2>{country.name.common}</h2>
        
        <p>capital: {country.capital}</p>
        <p>area: {country.area} km2</p>
        
        <h3>languages</h3>
        <ul>
        {langs.map( (lang, i) => (
          <li key={i}>{lang}</li>
        ))}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt}/>
        {weatherElem}
      </div>
    </div>
  )
}

const Countries = ({countries, nameFilter, handleSelection}) => {
  const showCountries = countries.filter(c => c.name.common.toLowerCase().includes(nameFilter))
  if (showCountries.length > 10) {
    return (<div>Too many matches, specify a little more.</div>)
  }
  if (showCountries.length == 0) {
    return (<div>No matches, try again.</div>)
  }
  if (showCountries.length == 1 || 
      (showCountries[0].name.common.toLowerCase() === nameFilter)) {
    return (
      <Country country={showCountries[0]}/>
    )
  }
  return (
    <ul className='lefty'>
      {
      showCountries.map( c => {
        return (
          <li key={c.name.common}>
            {c.name.common} 
            <button onClick={() => handleSelection(c.name.common.toLowerCase())}>show</button>
          </li>
      )})}
    </ul>
  )
}

function App() {
  const [nameFilter, setNameFilter] = useState('')
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    countriesService
      .getAll()
      .then(cs => setCountries(cs))
      .catch(err => {console.log('Error while getAll', err)})
  }, [])
  
  const handleFilterChange = event => {setNameFilter(event.target.value.toLowerCase())}
  const handleSelection = countryName => {setNameFilter(countryName.toLowerCase())}
  return (
    <>
      <h1>Explore countries</h1>
      <Filter nameFilter={nameFilter} filterChangeHandler={handleFilterChange}/>
      <Countries countries={countries} nameFilter={nameFilter} 
        handleSelection={handleSelection}/>
    </>
  )
}

export default App
