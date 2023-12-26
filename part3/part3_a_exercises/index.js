const express = require('express')
const app = express()

app.use(express.json())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(requestLogger)
const morgan = require('morgan')
app.use(morgan('tiny'))


let persons = [
    { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
    },
    { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
    },
    { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
    },
    { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
    }
]

const generateId = () => {
    const id = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    return id + 1
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
    
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <br/>
        <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(request.requestLogger);

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing' 
        })
    } else if (persons.map(person=>person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique' 
        })
    }
    const newPerson = {
        'name': body.name,
        'number': body.number,
        'id': generateId()
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const unknownEndpoint = (request, response) => {
    console.log(request.body)
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})