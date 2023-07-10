describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  it('Login is succesfull', function() {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it('Login is failed on purpose', function(){
    cy.get('#username').type('wrong')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('Wrong username or password')
  })
})



describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })


  it('New blog can be created', function(){
    cy.contains('Create').click()
    cy.get('#title').type('Testblog')
    cy.get('#author').type('John Doe')
    cy.get('#url').type('johndoeblog.com')

    cy.get('#createBlog').click()

    cy.contains('Testblog')
  })

  it('Blog can be liked', function(){
    cy.contains('Create').click()
    cy.get('#title').type('Testblog')
    cy.get('#author').type('John Doe')
    cy.get('#url').type('johndoeblog.com')

    cy.get('#createBlog').click()
    //Refresh page for blog to show up
    cy.visit('http://localhost:3000')

    cy.get('#toggleDetails').click()
    cy.get('#likeButton').click()
    cy.contains('Likes: 1')
  })

  it('Blog can be deleted', function(){
    cy.contains('Create').click()
    cy.get('#title').type('Testblog')
    cy.get('#author').type('John Doe')
    cy.get('#url').type('johndoeblog.com')

    cy.get('#createBlog').click()
    //Refresh page for blog to show up
    cy.visit('http://localhost:3000')

    cy.get('#toggleDetails').click()
    cy.get('#deleteButton').click()
    cy.contains('Blog deleted')
  })

  it('Only blog owner sees the delete-button', function(){
    //new user
    const user = {
      name: 'Ilkka',
      username: 'Ilkka',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

    cy.contains('Create').click()
    cy.get('#title').type('Testblog')
    cy.get('#author').type('John Doe')
    cy.get('#url').type('johndoeblog.com')

    cy.get('#createBlog').click()
    //Refresh page for blog to show up
    cy.visit('http://localhost:3000')

    //mluukkai sees the delete button
    cy.get('#toggleDetails').click()
    cy.get('#deleteButton')
    cy.contains('Logout').click()

    cy.get('#username').type('Ilkka')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Ilkka logged in')

    cy.get('#toggleDetails').click()
    cy.get('#deleteButton').should('not.exist')
  })

  it.only('Sort by likes works as intended', function(){
    //This test is very janky, I know
    //post some blogs
    cy.contains('Create').click()
    cy.get('#title').type('Testblog')
    cy.get('#author').type('John Doe')
    cy.get('#url').type('johndoeblog.com')

    cy.get('#createBlog').click()
    //Refresh page for blog to show up
    cy.visit('http://localhost:3000')

    cy.contains('Create').click()
    cy.get('#title').type('Testblog2')
    cy.get('#author').type('John Doe2')
    cy.get('#url').type('johndoeblog2.com')

    cy.get('#createBlog').click()
    //Refresh page for blog to show up
    cy.visit('http://localhost:3000')

    cy.contains('Create').click()
    cy.get('#title').type('Testblog3')
    cy.get('#author').type('John Doe3')
    cy.get('#url').type('johndoeblog3.com')

    cy.get('#createBlog').click()
    //Like some blogs
    //Refresh page for blog to show up
    cy.visit('http://localhost:3000')

    cy.get('#toggleDetails').contains('Show details').click()
    cy.contains('Show details').click()
    cy.contains('Show details').click()
    cy.get('.blog #likeButton').eq(0).click()
    cy.get('.blog #likeButton').eq(0).click()
    cy.get('.blog #likeButton').eq(2).click()

    cy.visit('http://localhost:3000')
    cy.get('#sortButton').click()

    cy.get('#toggleDetails').contains('Show details').click()
    cy.contains('Show details').click()
    cy.contains('Show details').click()

    //Compare the likes
    cy.get('.blog #likesDiv').eq(0).contains('Likes: 2')
    cy.get('.blog #likesDiv').eq(1).contains('Likes: 1')
    cy.get('.blog #likesDiv').eq(2).contains('Likes: 0')
  })
})