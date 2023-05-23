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
  return(
    <Table good={props.good} neutral={props.neutral} bad={props.bad} average={props.average} all={props.all} positive={props.positive}/>  
  )
}

const Table = (props) =>{
  return(
    <table>
      <tbody>
        <tr>
          <td><StatisticLine text="good"/></td>
          <td><StatisticLine value={props.good}/></td>
        </tr>
        <tr>
          <td><StatisticLine text="neutral"/></td>
          <td><StatisticLine value={props.neutral}/></td>
        </tr>
        <tr>
          <td><StatisticLine text="bad"/></td>
          <td><StatisticLine value={props.bad}/></td>
        </tr>
        <tr>
          <td><StatisticLine text="all"/></td>
          <td><StatisticLine value={props.all}/></td>
        </tr>
        <tr>
          <td><StatisticLine text="average"/></td>
          <td><StatisticLine value={props.average}/></td>
        </tr>
        <tr>
          <td><StatisticLine text="positive"/></td>
          <td><StatisticLine value={props.positive} mark="%"/></td>
        </tr>
      </tbody>
    </table>
  )
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

  if(all === 0){
    return(
      <div>
      <h1>give feedback</h1>

      <div>
      <Button text="good" good={good} handleClick={handleClickGood}/>
      <Button text="neutral" neutral={neutral} handleClick={handleClickNeutral}/>
      <Button text="bad" bad={bad} handleClick={handleClickBad}/>
      </div>

      <h1>statistics</h1>

      <p>No feedback given</p>
    </div>
    )
  }
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