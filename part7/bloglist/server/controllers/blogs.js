/* These are the route handlers. The event handlers of routes
 * are commonly referred to as controllers.
*/
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor

const User = require('../models/user')
const Blog = require('../models/blog')

// Getting all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Getting a blog
blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// Posting a blog
blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body 
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

// Updating a blog
blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body
 
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  )

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

// Deleting a blog
blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    if (blog.user.toString() === user._id.toString()) {
      await blog.deleteOne()
      response.status(204).end()
    } else {
      response.status(400).json({ error: 'blog does not belong to user' })
    }
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter

