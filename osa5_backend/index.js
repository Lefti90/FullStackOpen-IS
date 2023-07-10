const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('express').Router()

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = blogsRouter

// // old index.js start
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')
// const { connectToDatabase, addBlog} = require('./mongo')
// const Blog = require('./models/blog')


// app.use(cors())
// app.use(express.json())

// const blogSchema = mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })


// //ERROR HANDLER
// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

// //GET
// app.get('/api/blogs/:id', (request, response, next) => {
//   const id = Number(request.params.id)
//   console.log('GET started')

//   Blog.findById(id)
//     .then((blog) => {
//       if (blog) {
//         console.log('Blogs:', blog)
//         response.json(blog)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch((error) => next(error))
// })

// app.get('/api/blogs', (req, res) => {
//   Blog.find({})
//     .then((blogs) => {
//       res.json(blogs)
//     })
//     .catch((error) => next(error))
// })


// //POST
// app.post('/api/blogs', (request, response, next) => {
//   const body = request.body

//   if (!body.title || !body.author || !body.url) {
//     return response.status(400).json({ error: 'Title, author or url is missing' })
//   }

//   addBlog(body.title, body.author, body.url, body.likes)
//     .then((savedBlog) => {
//       response.json(savedBlog)
//     })
//     .catch((error) => next(error))
// }, errorHandler)


// //SERVER
// const PORT = process.env.PORT || 3001

// connectToDatabase()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`)
//     })
//   })
//   .catch((error) => {
//     console.error('Error connecting to database:', error)
//     process.exit(1)
//   })
//   //old index.js end