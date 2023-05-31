import React from 'react'
import serverModule from './ServerModule'

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      serverModule.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
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



// import React from 'react'

// const Person = (props) => {
//   return (
//     <p>
//       {props.name} {props.number}
//     </p>
//   )
// }

// const Persons = ({ persons }) => {
//   return (
//     <div>
//       {persons.map((person) => (
//         <Person key={person.id} name={person.name} number={person.number} />
//       ))}
//     </div>
//   )
// }

// export default Persons