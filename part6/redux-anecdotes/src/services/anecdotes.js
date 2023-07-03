import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const newObject = { content, votes: 0 }
  const response = await axios.post(baseUrl, newObject)
  console.log(response.data)
  return response.data
}

const updateAnecdote = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAnecdotes, createAnecdote, updateAnecdote }
