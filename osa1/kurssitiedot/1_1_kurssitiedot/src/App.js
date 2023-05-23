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
  console.log("Part->")
  console.log(props.part2)

  return(
  <div>
    <p>
       {props.part1.name} {props.part1.exercises}
    </p>
    <p>
      {props.part2.name} {props.part2.exercises}
    </p>
    <p>
      {props.part3.name} {props.part3.exercises}
    </p>
  </div>
  )
}

const Content = (props) =>{
  return (
    <div>
      <Part part1={props.part1} part2={props.part2} part3={props.part3}/>
    </div>
  )
}

const Total = (props) =>{
  return (
    <div>
      <p>
        Number of exercises {props.exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total exercises={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App