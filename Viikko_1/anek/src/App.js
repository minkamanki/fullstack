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

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdote}
    </div>
  )
}

const Votes = (props) => {
  return (
    <div>
      has {props.votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)


  const next = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log("votes: ", votes)
    console.log("max: ", Math.max(...votes));
  }

  return (
    <div>
      <Header text={'Anectode of the day'} />
      <Anecdote anecdote = {anecdotes[selected]} />
      <Votes votes = {votes[selected]} />
      <Button handleClick={vote} text='vote' />
      <Button handleClick={next} text='next anecdote' />
      <Header text={'Anectode with most votes'} />
      <Anecdote anecdote = {anecdotes[votes.indexOf(Math.max(...votes))]} />
      <Votes votes = {votes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

export default App