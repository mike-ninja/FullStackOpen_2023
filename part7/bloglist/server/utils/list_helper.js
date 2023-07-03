const { countBy, maxBy } = require('lodash')

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0  
    : blogs.reduce((sum, blog) => {
      return blog.hasOwnProperty('likes')
        ? sum + blog.likes
        : sum
    }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favorite = blogs[0]

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].hasOwnProperty('likes')
    && blogs[i].likes > favorite.likes) {
      favorite = blogs[i]
    }
  }
  return favorite
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return (null)
  }

  const authorCounts = _.countBy(blogs, 'author') 
  const mostFrequentAuthor = maxBy(Object.keys(authorCounts), (author) => authorCounts[author]);
  console.log(mostFrequentAuthor)
  
  return ({
    "author": mostFrequentAuthor,
    "blogs": authorCounts
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
