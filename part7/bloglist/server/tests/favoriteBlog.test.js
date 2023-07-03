const listHelper = require('../utils/list_helper')

describe('favoriteBlog testing', () => {
  test('of empty array', () => {
    const result = listHelper.favoriteBlog([])

    expect(result).toEqual(null)
  })

  test('of one element', () => {
    const blogs = [
      {
        title: "How to be a programmer",
        author: "Michel Barutel",
        url: "link",
        likes: 3
      }
    ]
    const result = listHelper.favoriteBlog(blogs)

    expect(result).toEqual(blogs[0])
  })

  test('of with multiple blogs', () => {
    const blogs = [
      {
        title: "How to be a programmer",
        author: "Michel Barutel",
        url: "link",
        likes: 3
      },
      {
        title: "How to be a carpenter",
        author: "Michel Edubas",
        url: "link",
        likes: 12
      },
      {
        title: "How to be a astronaut",
        author: "Michel Kirril",
        url: "link",
        likes: 9
      },
    ]
    const result = listHelper.favoriteBlog(blogs)

    expect(result).toEqual(blogs[1])
  })
})

