
/**
 * 3 new componenets: Header, Content, and Total
 * 
 * Header takes care of rendering the name of the course
 * Content renders the parts and their number of exercises 
 * Total renders the total number of exercises.
 * 
 */

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}
const Part = ({part, exercises}) => {
  return (
    <p>{part} {exercises}</p>
  )
}
const Content = (props) => {
  // const rows = []
  // for (let i = 0; i < props.parts.length; i++)
  // {
  //   rows.push(<p key={i}>{props.parts[i]} {props.exercises[i]}</p>)
  // }
  // return (<>{rows}</>)
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  let summ = 0
  for (let i = 0; i < props.parts.length; i++)
  {
    summ += props.parts[i].exercises
  }
  return (
      <p>Number of exercises {summ}</p>
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App