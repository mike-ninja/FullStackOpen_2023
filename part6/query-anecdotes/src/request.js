import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const addAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateAnecdote = async updatedAnecdote => {
  const result = await axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  return result.data
}
