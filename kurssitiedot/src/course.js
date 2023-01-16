
const Header = (props) => {


    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  
  const Part = (props) => {
  
  
    return (
      <>
        {props.part} {props.exercises}
      </>
    )
  }
  
  const Total = (props) => {
  
  
    return (
      <>
        <p>Number of exercises {props.total}</p>
      </>
    )
  }
  
  const Content = (props) => {
  
  
    return (
      <>
        <p>
          <Part part={props.part} exercises={props.exercises} />
        </p>
      </>
    )
  }
  
  
  const Course = (props) => {
    const course = props.course
  
    const total = course.parts.reduce((s, p) => {
      console.log('s=', s)
      console.log('p=', s)
      return s + p.exercises
    }, 0)
  
    return (
      <div>
        <Header course={course.name} />
        {course.parts.map(note =>
            {return (
          <Content part={note.name} exercises={note.exercises} />)}
        )}
        <Total total={total} />
      </div>
    )
  
  }
  
export default Course  