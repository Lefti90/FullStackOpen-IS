import { useState } from 'react'

const Person = (props) =>{
  //console.log('person ',props)
  return(
    <p>{props.name} {props.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {id:1, name: 'Arto Hellas', number:'040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
    //console.log(event.target.value)
  }

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
      {persons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  )

}

export default App