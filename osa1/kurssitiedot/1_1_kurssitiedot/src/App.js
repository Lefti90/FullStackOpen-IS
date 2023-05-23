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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return(
  <div>
    <p>
       {part1} {exercises1} <br/>
       {part2} {exercises2} <br/>
       {part3} {exercises3} <br/>
    </p>
  </div>
  )
}

const Content = (props) =>{
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1}/>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total exercises={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App