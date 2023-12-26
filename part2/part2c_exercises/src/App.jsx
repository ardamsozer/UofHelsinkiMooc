import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchFilter from './components/SearchFilter'
import NewContactForm from './components/NewContactForm'
import DisplayContacts from './components/DisplayContacts'

const App = () => {
  const [persons, setPersons] = useState([])
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('fetching persons data')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('setting persons state')
      setPersons(response.data)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newContactObject = {
      'name': newName,
      'number': newNumber
    }
    if (persons.some(contact => contact.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else  {
      console.log('shouldnt come here')
      setPersons(persons.concat(newContactObject))
      setNewName('')
      setNewNumber('')
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
    console.log('bat')
    setSearchName(e.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={searchName} onChange={handleOnChangeSearch} />
      <h3>add a new</h3>
      <NewContactForm onSubmit={handleSubmit} value={{'name':newName, 'number':newNumber}} onChange={{'name':handleOnChangeName, 'number':handleOnChangeNumber}} />
      <h3>Numbers</h3>
      <DisplayContacts contacts={personsToShow} />
    </div>
  )
}

export default App