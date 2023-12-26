import { useState } from 'react'

  // returns random int between min and max
  const getRandomArbitrary = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

const Button = ({onClickFunction, text}) => {
  return (
    <button onClick={onClickFunction}>
      {text}
    </button>
  )
}

const Anecdote = ({anecdotes, index, votes}) => {
  return (
    <div>
      <p>
        {anecdotes[index]}
      </p>
      <p>
        has {votes[index]} votes
      </p>
    </div>
  )
}

const BestAnecdote = ({votes, anecdotes}) => {
  var max = Math.max( ...votes )
  var bestIndex = votes.indexOf(max)
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>
        {anecdotes[bestIndex]}
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]



  const handNextQuote = () => {
    var newSelected = getRandomArbitrary(0, anecdotes.length)
    while (newSelected == selected) { newSelected = getRandomArbitrary(0, anecdotes.length) }
    setSelected(newSelected)
  }

  const handleVote = () => {
    const newVotes = [ ...votes ]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  console.log({selected})
  return (
    <div>
      <Anecdote anecdotes={anecdotes} index={selected} votes={votes} />
      <Button onClickFunction={handleVote} text='vote' />
      <Button onClickFunction={handNextQuote} text='next anecdote' />
      <BestAnecdote votes={votes} anecdotes={anecdotes} />
      <Button onClickFunction={() => <div>heroo</div>} text='test button' />
    </div>
  )
}

export default App