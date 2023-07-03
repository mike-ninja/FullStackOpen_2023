import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import NotificationError from './components/NotificationError'
import NotificationSuccess from './components/NotificationSuccess'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem(
        'loggedBlogAppUser'
      )
      blogService.setToken(null) // this doesnt do anything yet
      setUser(null)
    } catch (exception) {
      setErrorMessage('Encountered an Error. Try again!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const addedBlog = await blogService.create(blogObject)
    setSuccessMessage(`Added ${addedBlog.title} by ${addedBlog.author}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
    setBlogs(blogs.concat(addedBlog))
  }

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <NotificationError message={errorMessage}/>
        <NotificationSuccess message={successMessage}/>
        <LoginForm handleSubmit={handleLogin} />
      </div>
    )
  }

  const removeBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const increaseLike = async (blog) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService
      .update(blog.id, blogToUpdate)
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
  }

  const sortedArray = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>

      <NotificationError message={errorMessage}/>
      <NotificationSuccess message={successMessage}/>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {blogForm()}
      {sortedArray.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          removeBlogState={removeBlog}
          loggedUser={user}
          increaseLike={increaseLike}
        />
      )}
    </div>
  )
}

export default App
