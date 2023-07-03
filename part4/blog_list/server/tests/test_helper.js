const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'How to be carl marx',
    author: 'Kim Jung Un',
    url: 'link',
    likes: 5
  },
  {
    title: 'How to be Jesus Christ',
    author: 'Fracis Nganou',
    url: 'link',
    likes: 5
  },
  {
    title: 'How to be Tom Cruise',
    author: 'Chris Pratt',
    url: 'link',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.delete()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
