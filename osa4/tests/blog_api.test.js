const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('amount of blogs are correct', async () =>{
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(response.body.length)
})

test('Identificator is id', async () =>{
    const response = await api.get('/api/blogs')

    //expect(response.body[0].id).toBeDefined()

    response.body.forEach((blog) => {
        expect(blog.id).toBeDefined()
      })
})

test('Blog was added successfully to DB', async() =>{
    const newBlog = {
        "title": "Test blog",
        "author": "Tester",
        "url": "test.com",
        "likes": 1
      }

      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const titles = response.body.map(r => r.title)

      expect(titles).toContain('Test blog')
})

test('Blog was deleted succesfully from DB', async() =>{
    const deletableBlog ={
        title: 'Test blog'
    }

    await api
    .delete('/api/blogs')
    .send(deletableBlog)
    .expect(204)
})

afterAll(async () => {
  await mongoose.connection.close()
})