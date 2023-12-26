import Contact from './Contact'

const DisplayContacts = ({ contacts, handleDelete }) => {
    return (
        <div>
        {contacts.map((person, index) => 
            <Contact key={index} name={person.name} number={person.number} handleDelete={ () => handleDelete(person.id)}/>
        )}
        </div>
    )
}

export default DisplayContacts