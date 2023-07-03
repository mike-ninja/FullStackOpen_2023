import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteOf(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(note =>
        note.id !== id ? note : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { voteOf, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (votedAnecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(votedAnecdote.id, votedAnecdote)
    dispatch(voteOf(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
