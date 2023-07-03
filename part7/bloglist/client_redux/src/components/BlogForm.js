import { useNotificationDispatch } from '../context/NotificationContext'
import { useMutation, useQueryClient } from 'react-query'
import { useField } from '../hooks/index'
import { addBlog } from '../request'

const BlogForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const newBlogMutation = useMutation(addBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `You have added ${newBlog.title}`
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `Too short anecdote, must have length 5 or more`
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }

    newBlogMutation.mutate(newBlog)
  }

  return (
    <div>
      <h2>Create a new entry</h2>

      <form onSubmit={onCreate}>
        <div>
          Title
          <input
            id='title'
            value={title.value}
            onChange={title.onChange}
          />
        </div>
        <div>
          Author
          <input
            id='author'
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          Url
          <input
            id='url'
            value={url.value}
            onChange={url.onChange}
          />
        </div>
        <button
          id='addBlog-button'
          type="submit">
          Add Blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
