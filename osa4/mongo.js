const mongoose = require('mongoose')
const Blog = require('./models/blog')
require('dotenv').config()

let db // Store the MongoDB client connection

const connectToDatabase = async () => {
  try {
    db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

const addBlog = async (title, author, url, likes) => {
  try {
    const blog = new Blog({
      title,
      author,
      url,
      likes
    })
    const savedBlog = await blog.save()
    console.log(`Added ${savedBlog.title} to the bloglist`)
    return savedBlog
  } catch (error) {
    console.error('Error adding a blog:', error)
    throw error
  }
}

module.exports = {
  connectToDatabase,
  addBlog,
  db, // Export the MongoDB client connection
}