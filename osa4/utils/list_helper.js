const blog = require("../models/blog")
const User = require("../models/user")

const dummy = (blogs) => {
    return 1
  }

const likes = (blogs) => {
    const totalLikes = blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
    return totalLikes
  }

const favorite = (blogs) =>{
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
    return blogs.find((blog) => blog.likes === maxLikes)
}

const favAuthor = (blogs) =>{
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
    const favAuth = blogs.find((blog) => blog.likes === maxLikes)
    return {
        author: favAuth.author,
        likes: favAuth.likes
    }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

  module.exports = {
    dummy,
    likes,
    favorite,
    favAuthor,
    usersInDb
  }