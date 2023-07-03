import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setToken } from './request'

import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  // useEffect(() => {
  //   blogService.getAll()
  //     .then(blogs =>
  //       setBlogs(blogs)
  //     )
  //     .catch(error => {
  //       console.log(error.message)
  //     })
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    // event.preventDefault()

    try {
      console.log(username)
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      // setErrorMessage('Wrong Credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 10000)
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
      // setErrorMessage('Encountered an Error. Try again!')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 3000)
    }
  }

  // const addBlog = async (blogObject) => {
  //   blogFormRef.current.toggleVisibility()
  //   const addedBlog = await blogService.create(blogObject)
  //   setSuccessMessage(`Added ${addedBlog.title} by ${addedBlog.author}`)
  //   setTimeout(() => {
  //     setSuccessMessage(null)
  //   }, 3000)
  //   setBlogs(blogs.concat(addedBlog))
  // }

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <LoginForm handleSubmit={handleLogin} />
      </div>
    )
  }

  // const removeBlog = (id) => {
  //   setBlogs(blogs.filter(blog => blog.id !== id))
  // }
  //
  // const increaseLike = async (blog) => {
  //   const blogToUpdate = {
  //     title: blog.title,
  //     author: bog.author,
  //     url: blog.url,
  //     likes: blog.likes + 1
  //   }
  //   const updatedBlog = await blogService
  //     .update(blog.id, blogToUpdate)
  //   setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
  // }
  //
  // const sortedArray = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {blogForm()}
      <Blogs />
    </div>
  )
}

export default App
