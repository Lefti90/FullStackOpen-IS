import { useState } from 'react'



const Statistics = (props) => {
  if(props.good + props.neutral + props.bad === 0){
    return(
    <p>No feedback given</p>
    )
  }else{
  return (
    <div>      
      <p>good {props.good} </p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>   
      <p>average {props.average}</p>
      <p>positive {props.positive}%</p>
    </div>
  )
  }
}

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

  return (
    <div>
      <h1>give feedback</h1>

      <div>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
      </div>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </div>
  )
}

export default App