import { useEffect, useState } from 'react'
import contactService from './services/contacts'
import SearchFilter from './components/SearchFilter'
import NewContactForm from './components/NewContactForm'
import DisplayContacts from './components/DisplayContacts'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage]= useState(null)

  useEffect(() => {
    console.log('fetching persons data')
    contactService.getAll()
    .then(response => {
      console.log('setting persons state')
      setPersons(response)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newContactObject = {
      'name': newName,
      'number': newNumber
    }
    if (persons.some(contact => contact.name === newName)) {
      // alert(`${newName} is already added to the phonebook`)
      if (window.confirm(`${newName} is already in the phone book. Replace the old number with the new one?`)) {
        contactService.update(newContactObject, persons.find(person => person.name === newName).id)
          .then(response => {
            setNewName('')
            setNewNumber('')  
            setPersons( persons.map(person => person.name !== newName ? person : response))
            setErrorMessage(`Successfully changed ${response.name}'s number`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);    
          })
      
      }
    } else  {
      contactService.create(newContactObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Successfully added ${response.name} to the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
    }
  }

  const handleDelete = ( contactId ) => {
    console.log('deleting ', contactId)
    const deletedPerson = personsToShow.find(person => person.id === contactId)
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      contactService.deleteObject(contactId)
      .then(response => {
        console.log(response)
        setPersons( persons.filter(person => person.id != contactId ))
        setErrorMessage(`Successfully deleted ${deletedPerson.name} from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
      .catch(error => {
        setErrorMessage(`Information of ${deletedPerson.name} has already been removed from the server`)
        setPersons(persons.filter(person => person.id != contactId))
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
    }
      }

  const personsToShow = persons.filter(contact => contact.name.slice(0, searchName.length).toLowerCase() === searchName.toLowerCase())


  const handleOnChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleOnChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleOnChangeSearch = (e) => {
    setSearchName(e.target.value)
  }

  


  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage} />
      <SearchFilter value={searchName} onChange={handleOnChangeSearch} />
      <h3>add a new</h3>
      <NewContactForm onSubmit={handleSubmit} value={{'name':newName, 'number':newNumber}} onChange={{'name':handleOnChangeName, 'number':handleOnChangeNumber}} />
      <h3>Numbers</h3>
      <DisplayContacts contacts={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App