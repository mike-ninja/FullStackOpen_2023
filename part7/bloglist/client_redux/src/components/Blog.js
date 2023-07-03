import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlogState, loggedUser, increaseLike }) => {
  const [view, setView] = useState(false)

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  let showRemoveButton
  if (!blog.user) {
    showRemoveButton = { display: 'none' }
  } else {
    showRemoveButton = { display: loggedUser.name === blog.user.name ? '' : 'none' }
  }

  const toggleView = () => {
    setView(!view)
  }

  const removeBlog = async () => {
    const result = window.confirm(`Removing blog ${blog.title} by ${blog.author}`)
    if (result) {
      await blogService
        .removeBlog(blog.id)
      removeBlogState(blog.id)
    }
  }

  const user = blog.user ? blog.user.name : ''

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button className='viewButton' style={hideWhenVisible} onClick={toggleView}>
        view
      </button>
      <button style={showWhenVisible} onClick={toggleView}>
        hide
      </button>
      <div className='extraData' style={showWhenVisible}>
        <p>{blog.url}</p>
        <div className='likes'>
          likes {blog.likes}
          <button className='likeButton' onClick={() => increaseLike(blog)}>like</button>
        </div>
        <p>{user}</p>
        <button className='remove' style={showRemoveButton} onClick={removeBlog}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
