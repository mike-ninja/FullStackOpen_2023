import { useQuery } from 'react-query'
import { getBlogs } from '../request'

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  )
}

const Blogs = () => {
  const result = useQuery(
    'blogs', getBlogs,
    {
      refetchOnWindowFocus: false,
      retry: 1
    }
  )

  if (result.isLoading) {
    return <div>lodaing data...</div>
  }

  const sortedBlogs = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default Blogs
