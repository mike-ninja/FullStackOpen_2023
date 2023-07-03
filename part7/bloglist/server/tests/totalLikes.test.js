const listHelper = require('../utils/list_helper')

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])

    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        title: "How to be a programmer",
        author: "Michel Barutel",
        url: "link",
        likes: 5
      }
    ]

    const result = listHelper.totalLikes(blogs)

    expect(result).toBe(5)
  })

  test('of a bigger list is calculated correctly', () => {
    const blogs = [
      {
        title: "How to be a programmer",
        author: "Michel Barutel",
        url: "link",
        likes: 5
      },
      {
        title: "How to be a carpenter",
        author: "Michel Edubas",
        url: "link",
        likes: 5
      },
      {
        title: "How to be a astronaut",
        author: "Michel Kirril",
        url: "link",
        likes: 5
      },
    ]

    const result = listHelper.totalLikes(blogs)

    expect(result).toBe(15)
  })
})

