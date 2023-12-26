import Button from './Button'

const Contact = ({ name, number, handleDelete}) => {
    return (
      <div>
        <p> 
          {name} 
          {number} 
          <Button onClick={handleDelete} text={`delete`} />
         </p> 
      </div>
    )
  }
  
  export default Contact