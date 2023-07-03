import { useSelector, useDispatch } from "react-redux"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, voteClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={voteClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
        .map(anecdote => anecdote)
        .sort((a, b) => b.votes - a.votes)
    } else {
      return anecdotes
        .filter(anecdote => anecdote.content.indexOf(filter) !== -1)
        .sort((a, b) => b.votes - a.votes)
    }
  })

  const vote = async (anecdote) => {
    const newObject = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(voteAnecdote(newObject))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 2))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          voteClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList
