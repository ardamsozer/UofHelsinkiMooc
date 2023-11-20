import { useState } from 'react'

const Button = ({ onClickFunction, buttonText }) => {
  return (
    <button onClick={onClickFunction}>
      {buttonText}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + bad + neutral
  if (totalFeedback) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + neutral + bad} />
            <StatisticLine text='average' value={good + (bad * -1)} />
            <StatisticLine text='positive' value={(good / (good + bad + neutral) * 100).toFixed(2) + " %"} />
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}


const App = () => {
  //   // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClickFunction={handleGood} buttonText='good' />
      <Button onClickFunction={handleNeutral} buttonText='neutral' />
      <Button onClickFunction={handleBad} buttonText='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App