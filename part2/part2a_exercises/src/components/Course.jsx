import Part from './Part'

const Course = ({ course }) => {
  const id = course.id
  const name = course.name  
  const parts = course.parts

  const initialValue = 0;
  const sumWithInitial = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue,
  );
  
  console.log(sumWithInitial);
  
  console.log(parts)
    return (
      <div>
        <h2>{name}</h2>
        <div>
          {parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises} />  
          )}

          <b>total of {sumWithInitial} exercises</b>
        </div>
      </div>
    )
  }

  export default Course