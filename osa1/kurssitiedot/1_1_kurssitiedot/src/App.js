const Header = (props) =>{
  return (
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}

const Part = (props) =>{
  console.log("3Part: ")
  console.log(props.parts[0].name)

  return(
  <div>
    <p>
      {props.parts[0].name} {props.parts[0].exercises}
    </p>
    <p>
      {props.parts[1].name} {props.parts[1].exercises}
    </p>
    <p>
      {props.parts[2].name} {props.parts[2].exercises}
    </p>
  </div>
  )
}

const Content = (props) =>{
  console.log("2Content: ")
  console.log(props.parts)
  return (
    <div>
      <Part parts={props.parts}/>
    </div>
  )
}

const Total = (props) =>{
  console.log("1Total: ")
  console.log(props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises)
  return (
    <div>
      <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App