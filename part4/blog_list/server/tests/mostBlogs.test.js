const listHelper = require('../utils/list_helper')

describe('mostBlogs testing', () => {
  test('of empty array', () => {
    const result = listHelper.mostBlogs([])

    expect(result).toEqual(null)
  })

  test('of array with multiple elements', () => {
    const result = listHelper.mostBlogs([
      {
        'title': 'How to be cool',
        'author': 'mike',
        'url': 'link',
        'likes': 5
      },
      {
        'title': 'How to be cat',
        'author': 'mike',
        'url': 'link',
        'likes': 5
      },
      {
        'title': 'How to be dog',
        'author': 'mike',
        'url': 'link',
        'likes': 5
      },
      {
        'title': 'How to be bird',
        'author': 'john',
        'url': 'link',
        'likes': 5
      },
      {
        'title': 'How to be rat',
        'author': 'carl',
        'url': 'link',
        'likes': 5
      },
    ])

    expect(result).toEqual({
      "author": "mike",
      "blogs": 3
    })
  })
})

