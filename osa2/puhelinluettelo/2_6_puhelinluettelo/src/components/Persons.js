import React from 'react'
import serverModule from './ServerModule'

const Persons = ({ persons, setPersons, errorMessage, setErrormessage }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      serverModule.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setErrormessage(`${name} deleted`)
          setTimeout(() => {
            setErrormessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Persons