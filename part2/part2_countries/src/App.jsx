import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    if (searchText !== '') {
      console.log('querying the api')
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => response.data)
      .then(data => {
        let parsed = JSON.parse(data)
        let field = parsed
        console.log('field', field)
        setCountries(field)
      })
    }
  }, [searchText])

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

console.log('rendering')
  return (
    <div>
      <form>
        search: <input value={searchText} onChange={handleChange} />
      </form>
      <pre>
        {countries}
      </pre>
    </div>
  )
}

export default App