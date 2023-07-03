import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getBlogs = () =>
  axios.get(baseUrl).then(res => res.data)

export const addBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const updateBlog = async updatedBlog => {
  const result = await axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return result.data
}
