import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getBlogs } from '../request'
import Blog from './Blog'

const Blogs = () => {
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

  console.log(sortedBlogs)
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
