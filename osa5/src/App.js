import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' //login

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) //login
  const [title, setTitle] = useState('') //create blog
  const [author, setAuthor] = useState('') //create blog
  const [url, setUrl] = useState('') //create blog

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //if local storage has user info, do this
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //login
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //setErrorMessage('wrong credentials')
      setTimeout(() => {
        //setErrorMessage(null)
      }, 5000)
    }
  }

  //logout
  const handleLogout = (event) =>{
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  //create blog
  const createBlog = async (event) =>{
    event.preventDefault()
    console.log(title, author, url)
    
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
  
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, createdBlog])
  
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      // Handle the error here
    }
  }


  if (user !== null){
  //if logged in
  return (
    // Title and login status
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
      <div>
    {/* New blog */}
    <h2>Create new blog</h2>
    <p></p>
    <form onSubmit={createBlog}>
        <div>
          title: 
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: 
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          author: 
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
    {/* Blogs */}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
 }else{
  return(
    <div>
    <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username: 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: 
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
 }
}

export default App