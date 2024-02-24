import { useState } from 'react'

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const title = 'statistics'
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <>
        <h1>{title}</h1>
        <p>No feedback given</p>
      </>
    )
  }
  const stats = [
    {stat: 'good', value:good},
    {stat: 'neutral', value:neutral},
    {stat: 'bad', value:bad},
    {stat: 'all', value:total},
    {stat: 'average', value:(1*good + (-1)*bad)/total},
    {stat: 'positive', value:`${good/total*100}%`},
  ]
  const rows = []
  for (let i in stats) {
    rows.push(
      <StatisticLine key={i} text={stats[i].stat} value={stats[i].value} />
    )
  }
  return (
    <>
      <h1>{title}</h1>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>      
    </>
  )
}

const Button = ({onPress, text}) => <button onClick={onPress}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onPress={() => setGood(good + 1)} text='good'/>
      <Button onPress={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onPress={() => setBad(bad + 1)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App