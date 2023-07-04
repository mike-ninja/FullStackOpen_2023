import { useQuery } from 'react-query'
import { getBlogs } from '../request'
import Blog from './Blog'

const Blogs = ({ loggedUser }) => {
  const result = useQuery(
    'blogs', getBlogs,
    {
      refetchOnWindowFocus: false,
      retry: 1
    }
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const sortedBlogs = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          loggedUser={loggedUser}
        />
      )}
    </div>
  )
}

export default Blogs
