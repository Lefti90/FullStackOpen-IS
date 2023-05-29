import { useState } from 'react'

const Person = (props) =>{
  //console.log('person ',props)
  return(
    <p>{props.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  //console.log(persons)

  const handleChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if(persons.map((person) => person.name).includes(newName))
    {
      alert(newName + ' is already added to phonebook')
    }else{    
    const nameObject = {
      name: newName,
      id: persons.length+1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log(persons)
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.id} name={person.name} />
      ))}
    </div>
  )

}

export default App