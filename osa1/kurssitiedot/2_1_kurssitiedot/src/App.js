const Parts = (props) => {
  const parts = props.parts;
  //const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
      {parts.map((part) => (
        <tr key={part.id}>
          <td>{part.name}</td>
          <td>{part.exercises}</td>
        </tr>
      ))}
    </>
  )
}

const Courses = (props) => {
  const courses = props.courses;

  return (
    <>
      {courses.map((course) => {
        const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <table>
              <tbody>
                <Parts parts={course.parts} />
              </tbody>
            </table>
            <p>
              <b>Total of {total} exercises</b>
            </p>
          </div>
        );
      })}
    </>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App