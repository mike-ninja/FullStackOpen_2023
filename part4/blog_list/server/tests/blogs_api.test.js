const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Where there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'How to be Jesus Christ'
    )
  })
})

describe('Viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb() 

    const blogToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })
})

describe('Deletion of blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('Blog property tests', () => {
  test('blog id is defined', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const ids = blogsAtStart.map(b => b.id)
    expect(ids).toBeDefined()
  })
})

describe('posting tests', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'This is all valid',
      author: 'This is valid',
      url: 'This is a valid link',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UtbmluamEiLCJpZCI6IjY0NzljYWYxN2YxYWM3ZWMxYTVjOWNlYiIsImlhdCI6MTY4NTg3MDU2MH0.UQAm9bdi7NPmbM0385pyYMNCEM9igXdOf5F2ir2BxgY' })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'This is all valid'
    )
  })

  test('if like property missing, default to 0', async () => {
    const newBlog = {
      title: 'Random title',
      author: 'Random author',
      url: 'Random Link',
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UtbmluamEiLCJpZCI6IjY0NzljYWYxN2YxYWM3ZWMxYTVjOWNlYiIsImlhdCI6MTY4NTg3MDU2MH0.UQAm9bdi7NPmbM0385pyYMNCEM9igXdOf5F2ir2BxgY' })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).not.toContain(undefined)
  })

  test('if title missing, get 400', async () => {
    const newBlog = {
      author: 'Random Author',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('if url missing, get 400', async () => {
    const newBlog = {
      title: 'Random title',
      author: 'Random Author',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

