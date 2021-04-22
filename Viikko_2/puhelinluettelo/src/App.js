import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
      filter shown with  <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:  <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Persons = (props) => {
  return (
    <ul>
      {props.persons.filter(person =>
        person.name.toLowerCase().includes(props.newFilter.toLowerCase())).map(person =>
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={props.deletePerson} name={person.name} id={person.id}>delete</button>
          </div>
        )
      }
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        personService
          .update(persons.find(person => person.name === newName).id, personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            window.location.reload();
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }

  }


  const deletePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${event.target.name}?`)) {
      personService.deleteContact(event.target.id)
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          window.location.reload();
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )

}

export default App