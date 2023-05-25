const Course = (props) =>{
  const parts = props.course.parts
  const total = parts.reduce((sum, part) => console.log('what', sum, part) || sum + part.exercises, 0)
  return(
    <div>
      <h1>{props.course.name}</h1>
      <p>{parts[0].name} {parts[0].exercises}</p>
      <p>{parts[1].name} {parts[1].exercises}</p>
      <p>{parts[2].name} {parts[2].exercises}</p>
      <p><b>total of {total} exercises </b></p>
    </div>
    )
    //<p><b>total of {total} exercises </b></p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App