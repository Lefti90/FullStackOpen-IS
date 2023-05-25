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
  
  const Course = (props) => {
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

  export default Course