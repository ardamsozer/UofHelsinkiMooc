const NewContactForm = ({ onSubmit, value, onChange }) => {
    console.log(value[name])
    return (
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={value['name']} onChange={onChange['name']}/>
        </div>
        <div>
          number: <input value={value['number']} onChange={onChange['number']} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
    )
}

export default NewContactForm