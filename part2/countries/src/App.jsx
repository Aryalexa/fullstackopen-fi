import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import countriesService from './services/countries'

import './App.css'


const Filter = ({nameFilter, filterChangeHandler}) => {
  return (
    <div>
      find a country <input value={nameFilter} onChange={filterChangeHandler}/>
    </div>
  )
}
const Country = ( {country} ) => {
  const langs = []
  for (let prop in country.languages) 
        langs.push(country.languages[prop])
  return (
    <div>
      One country: {country.name.common}
      <div className='country'>
        <h2>{country.name.common}</h2>
        
        <p>capital: {country.capital}</p>
        <p>area: {country.area} m2</p>
        
        <h3>languages</h3>
        <ul>
        {langs.map( (lang, i) => (
          <li key={i}>{lang}</li>
        ))}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt}/>
      </div>
    </div>
  )
}

const Countries = ({countries, nameFilter}) => {
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
    <div>
        {
        showCountries.map( c => {
          return <p key={c.name.common}>{c.name.common}</p>
        })}
      </div>
  )
}

function App() {
  const [nameFilter, setNameFilter] = useState('')
  const [countries, setCountries] = useState([{name:{common:'Peru'}}])
  
  useEffect(() => {
    countriesService
      .getAll()
      .then(cs => setCountries(cs))
      .catch(err => {console.log('Error while getAll', err)})
  }, [])
  
  const handleFilterChange = event => {setNameFilter(event.target.value.toLowerCase())}
  return (
    <>
      <h1>Explore countries</h1>
      <Filter nameFilter={nameFilter} filterChangeHandler={handleFilterChange}/>
      <Countries countries={countries} nameFilter={nameFilter}/>
    </>
  )
}

export default App
