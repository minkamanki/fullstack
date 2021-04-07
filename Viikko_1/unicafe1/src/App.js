import React, { useState } from 'react'

const Header = (props) => {
  return (
      <h1>
        {props.text}
      </h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return "No feedback given"
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.good+props.neutral+props.bad} />
        <StatisticLine text="average" value ={(props.good-props.bad)/(props.good+props.neutral+props.bad)} />
        <StatisticLine text="positive" value ={props.good/(props.good+props.neutral+props.bad)*100 + '%'} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <Header text={'give feedback'} />
      <Button
        handleClick={increaseGoodByOne}
        text='good'
      />
      <Button
        handleClick={increaseNeutralByOne}
        text='neutral'
      />
      <Button
        handleClick={increaseBadByOne}
        text='bad'
      />
      <Header text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
 

    </div>
  )
}

export default App
