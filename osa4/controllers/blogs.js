const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken') //for authorization 4.19

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username : 1, name : 1, id: 1})
  response.json(blogs)
})

//Get by id start
blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const blog = await Blog.findById(id)

    if (blog) {
      response.json(blog)
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})
//Get by id end


//authorization start
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
//auth end

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes} = request.body
  //const userId = request.body.user

  const token = getTokenFrom(request)
  //auth s
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid or missing' })
  }
  const userId = decodedToken.id
  //auth e
  
  try {
    let user = await User.findById(userId)

    if (!user) {
      //add some user if not found
      const existingUser = await User.findOne({})
      
      if (!existingUser) {
        return response.status(404).json({ error: 'User not found' })
      }
      user = existingUser    
      //return response.status(404).json({ error: 'User not found' })
    }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: userId
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
} catch (error) {
  response.status(500).json({ error: 'Something went wrong' })
}
})


blogsRouter.delete('/', async (request, response) => {
  const { title } = request.body

  try {
    const deletedBlog = await Blog.findOneAndDelete({ title })

    if (deletedBlog) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = blogsRouter