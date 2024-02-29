import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ infoMsg, errorMsg }) => {
  if (infoMsg !== null) {
    const infoStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 16,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    return (
      <div style={infoStyle}>
        {infoMsg}
      </div>
    )
  } 
  if (errorMsg !== null) {
    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 16,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    return (
      <div style={errorStyle}>
        {errorMsg}
      </div>
    )
  }
  return null
}

const Filter = ({nameFilter, filterChangeHandler}) => {
  return (
  <div>
    filter shown with: <input value={nameFilter} onChange={filterChangeHandler}/>
  </div>
)
}
const PersonForm = (props) => {
  const {addPerson, newName, handleNewName, newNumber, handleNewNumber} = props

  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}
const Person = ({person, handleDel}) => {

  return (
    <li className='person'>
      {person.name} {person.number} 
      <button onClick={() => handleDel(person.id)}>delete</button>
    </li>
  )
}
const Persons = ({persons, newNameFilter, handleDel}) => {
  const shownPersons = persons.filter(person => person.name.toLowerCase().includes(newNameFilter.toLowerCase()))
  return (
    <ul>
      {shownPersons.map((person) => 
        <Person key={person.id} person={person} handleDel={handleDel}/>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNameFilter, setNameFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
      .catch(err => {console.log('Error while getAll', err)})
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const foundPersons = persons.filter(p => p.name === newName)
    if (foundPersons.length !== 0)
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        const updPerson = {...foundPersons[0], number: newNumber}
        personService
          .update(updPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson: p))
            setInfoMessage(`${returnedPerson.name}'s number is been updated.`)
            setTimeout(() => {setInfoMessage(null)}, 5000)
          })
          .catch(err => {
            console.log('Error while update', err)
            setPersons(persons.filter(p => p.id !== updPerson.id))
            setErrorMessage(`${updPerson.name} has already been removed.`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
      }
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setInfoMessage(`${returnedPerson.name} has been added to the phonebook.`)
          setTimeout(() => {setInfoMessage(null)}, 5000)
        })
        .catch(err => {console.log('Error while addPerson', err)})
    }
    setNewName('')
    setNewNumber('')
  }
  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewNameFilter = (event) => setNameFilter(event.target.value)
  const delPerson = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      personService.deletePerson(id).then((data) => {
        setPersons(persons.filter(p => p.id !== data.id))
      })
      .catch(err => {console.log('Error while delPerson', err)})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification infoMsg={infoMessage} errorMsg={errorMessage}/>

      <Filter nameFilter={newNameFilter} filterChangeHandler={handleNewNameFilter}/>

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} 
        newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}/>

      <h3>Numbers</h3>
      <Persons persons={persons} newNameFilter={newNameFilter} handleDel={delPerson}/>
    </div>
  )
}

export default App