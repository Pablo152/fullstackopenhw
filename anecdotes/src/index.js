import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Votes = ({votes}) => {
  return (
    <div>
      has {votes} votes
    </div>
  )
}

const MostVotes = ({votes, anecdotes}) => {
  const arrVotes = (Object.values(votes))
  const maxVote = arrVotes.indexOf(Math.max(...arrVotes))
  return(
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxVote]}</p>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  const handleClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  
  const handleVotes = ({selected}) => {
      const copy = {...votes}
      copy[selected] += 1
      setVotes(copy)
   }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <Votes votes={votes[selected]} />
      <div>
      <Button onClick={handleClick} text="next anecdote" />
      <Button onClick={() => handleVotes({selected})} text="vote" />   
      <MostVotes votes={votes} anecdotes={anecdotes}/> 
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
