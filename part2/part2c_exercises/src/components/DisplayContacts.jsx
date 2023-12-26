import Contact from './Contact'

const DisplayContacts = ({ contacts }) => {
    return (
        <div>
        {contacts.map((person, index) => 
            <Contact key={index} name={person.name} number={person.number}/>
        )}
        </div>
    )
}

export default DisplayContacts