import './index.css'
import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import serverModule from './components/ServerModule'

const App = () => {
  const [personsList, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrormessage] = useState(null)
  //const [personsList, setPersons] = useState(persons)

  //Better error message
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

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
  
    const existingPerson = personsList.find((person) => person.name === newName)
  
    if (existingPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      )
  
      if (confirmReplace) {
        const updatedPerson = { ...existingPerson, number: newNumber }
  
        serverModule
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              personsList.map((person) =>
                person.id === existingPerson.id ? response : person
              )
            )
            setErrormessage(`${newName} updated`)
            setTimeout(()=>{setErrormessage(null)},5000)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const nameObject = {
        id: personsList.length + 1,
        name: newName,
        number: newNumber,
      }
  
      serverModule.create(nameObject).then((response) => {
        setPersons([...personsList, response])
        setErrormessage(`${newName} added`)
        setTimeout(()=>{setErrormessage(null)},5000)
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
      <Notification message={errorMessage}/>
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
      <Persons persons={filteredPersons} setPersons={setPersons} setErrormessage={setErrormessage} />
    </div>
  )
}

export default App
