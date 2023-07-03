const Header = ({ text }) => <h2>{text}</h2>

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
)

const Exercises = ({ parts }) => {
  const totalExercises = parts.reduce((total, item) => item.exercises + total, 0)
  return (
    <h3>Total of {totalExercises} exercises</h3>
  )
}

const Course = ({ course }) => {
  console.log('Course: ', course)

  return (
    <div>
      <Header key={course.id} text={course.name} />
      <ul>
        {course.parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
      </ul>
      <Exercises parts={course.parts} />
    </div>
  )
}

export default Course
