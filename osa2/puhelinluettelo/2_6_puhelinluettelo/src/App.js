import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import serverModule from './components/ServerModule'

const App = () => {
  const [personsList, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  //const [personsList, setPersons] = useState(persons)

  //Effect hook
  useEffect(() => {
    serverModule.getAll().then(response => {setPersons(response)})
  }, [])

  //Change handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  //Adding person to array
  const addName = (event) => {
    event.preventDefault()
    if (personsList.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const nameObject = {
        id: personsList.length + 1,
        name: newName,
        number: newNumber,
      }
      serverModule.create(nameObject).then(response => {
        console.log(response)
        setPersons([...personsList, response])
        setNewName('')
        setNewNumber('')
      })
    }
  }

  //Filter persons
  const filteredPersons = personsList.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
