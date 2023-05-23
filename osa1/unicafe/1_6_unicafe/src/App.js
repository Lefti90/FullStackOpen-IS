import { useState } from 'react'


const StatisticLine = (props) => {
  return(
    <div>      
    <p>{props.text} {props.value} {props.mark}</p>
    </div>
  )
}


const Button = (props)=>{
  return(
    <button onClick={(props.handleClick)}>{props.text}</button>
  )
}

const Statistics = (props) => {
  console.log("s ", props.good)
  if(props.good + props.bad + props.neutral !== 0){
  return (
    <div>
    <StatisticLine text="good" value={props.good}/>
    <StatisticLine text="neutral" value={props.neutral}/>
    <StatisticLine text="bad" value={props.bad}/>
    <StatisticLine text="all" value={props.all}/>
    <StatisticLine text="average" value={props.average}/>
    <StatisticLine text="positive" value={props.positive} mark="%"/>
    </div>
  )
    }else{
      return(
        <p>No feedback given</p>
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
      <Button text="good" good={good} handleClick={handleClickGood}/>
      <Button text="neutral" neutral={neutral} handleClick={handleClickNeutral}/>
      <Button text="bad" bad={bad} handleClick={handleClickBad}/>
      </div>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App