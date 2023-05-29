import { useState } from 'react'

const Person = (props) =>{
  //console.log('person ',props)
  return(
    <p>{props.name} {props.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
    //console.log(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(newFilter.toLowerCase())
)

  const addName = (event) => {
    event.preventDefault()
    if(persons.map((person) => person.name).includes(newName))
    {
      alert(newName + ' is already added to phonebook')
    }else{    
    const nameObject = {
      id: persons.length+1,
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    console.log(persons)
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  )

}

export default App