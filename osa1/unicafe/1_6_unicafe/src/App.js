import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleClickGood = () => {
    console.log('clicked the button')
    setGood(good+1)
  }

  const handleClickNeutral = () => {
    console.log('clicked the button')
    setNeutral(neutral+1)
  }

  const handleClickBad = () => {
    console.log('clicked the button')
    setBad(bad+1)
  }

  const all = good + neutral + bad
  const total = good - bad
  const average = total/all
  const positive = good / all * 100
  console.log(total)


  return (
    <div>
      <h1>give feedback</h1>

      <div>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
      </div>

      <h1>statistics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

export default App